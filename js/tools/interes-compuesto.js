let growthChart = null;

document.getElementById('compoundForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const capitalInicial = parseFloat(document.getElementById('capitalInicial').value);
    const aporteMensual = parseFloat(document.getElementById('aporteMensual').value);
    const tasaAnual = parseFloat(document.getElementById('tasaAnual').value);
    const anos = parseInt(document.getElementById('anos').value);

    const resultado = window.FinanceUtils.calculateCompoundInterest(
        capitalInicial,
        aporteMensual,
        tasaAnual,
        anos
    );

    document.getElementById('montoFinal').textContent =
        window.FinanceUtils.formatCurrency(resultado.finalBalance);
    document.getElementById('totalInvertido').textContent =
        window.FinanceUtils.formatCurrency(resultado.totalContributions);
    document.getElementById('interesesGanados').textContent =
        window.FinanceUtils.formatCurrency(resultado.totalInterest);

    const rendimientoPorcentaje = (resultado.totalInterest / resultado.totalContributions) * 100;
    document.getElementById('rendimiento').textContent =
        `${rendimientoPorcentaje.toFixed(2)}%`;

    document.getElementById('results').classList.remove('hidden');
    createChart(resultado.timeline);
});

function createChart(timeline) {
    const ctx = document.getElementById('growthChart').getContext('2d');

    const filteredTimeline = timeline.filter((item, index) => index % 12 === 0);

    const labels = filteredTimeline.map(item => `Año ${(item.month / 12).toFixed(0)}`);
    const balances = filteredTimeline.map(item => item.balance);
    const contributions = filteredTimeline.map(item => item.contributions);
    const interests = filteredTimeline.map(item => item.interest);

    if (growthChart) {
        growthChart.destroy();
    }

    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Balance Total',
                    data: balances,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Capital Invertido',
                    data: contributions,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Intereses',
                    data: interests,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
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
                        callback: function(value) { return '$' + (value / 1000).toFixed(0) + 'k'; }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    ticks: { color: '#a0a0a0' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });
}
