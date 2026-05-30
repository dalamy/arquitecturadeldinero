let retiroChart = null;

document.getElementById('retiroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const gastoMensual = parseFloat(document.getElementById('gastoMensual').value);
    const tasaRetiro = parseFloat(document.getElementById('tasaRetiro').value);
    const rendimientoAnual = parseFloat(document.getElementById('rendimientoAnual').value);
    const inflacion = parseFloat(document.getElementById('inflacion').value);
    const capitalActual = parseFloat(document.getElementById('capitalActual').value) || 0;

    const gastoAnual = gastoMensual * 12;
    const capitalObjetivo = gastoAnual / (tasaRetiro / 100);
    const faltaAcumular = Math.max(0, capitalObjetivo - capitalActual);

    const simulacion = simularRetiro(
        capitalObjetivo,
        gastoMensual,
        rendimientoAnual,
        inflacion
    );

    document.getElementById('capitalObjetivo').textContent =
        window.FinanceUtils.formatCurrency(capitalObjetivo);
    document.getElementById('anosCobertura').textContent =
        simulacion.years + ' años';
    document.getElementById('retiroMensual').textContent =
        window.FinanceUtils.formatCurrency(gastoMensual);
    document.getElementById('faltaAcumular').textContent =
        faltaAcumular > 0 ? window.FinanceUtils.formatCurrency(faltaAcumular) : 'Ya lo lograste!';

    document.getElementById('results').classList.remove('hidden');
    createChart(simulacion.timeline);
});

function simularRetiro(capital, gastoMensualInicial, rendimientoAnual, inflacion) {
    let balance = capital;
    const timeline = [{year: 0, balance: capital, withdrawal: 0}];
    let year = 0;
    const maxYears = 50;

    let gastoAnual = gastoMensualInicial * 12;

    while (balance > 0 && year < maxYears) {
        year++;
        gastoAnual *= (1 + inflacion / 100);
        balance -= gastoAnual;
        if (balance > 0) {
            balance *= (1 + rendimientoAnual / 100);
        }
        timeline.push({
            year: year,
            balance: Math.max(0, balance),
            withdrawal: gastoAnual
        });
    }

    return {
        years: balance > 0 ? maxYears : year,
        timeline: timeline
    };
}

function createChart(timeline) {
    const ctx = document.getElementById('retiroChart').getContext('2d');

    const labels = timeline.map(item => `Año ${item.year}`);
    const balances = timeline.map(item => item.balance);

    if (retiroChart) {
        retiroChart.destroy();
    }

    retiroChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Capital Restante',
                    data: balances,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { color: '#e0e0e0', font: { size: 12 } }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            label += window.FinanceUtils.formatCurrency(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#a0a0a0',
                        callback: function(value) { return '$' + (value / 1000000).toFixed(1) + 'M'; }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    ticks: { color: '#a0a0a0', maxTicksLimit: 15 },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });
}
