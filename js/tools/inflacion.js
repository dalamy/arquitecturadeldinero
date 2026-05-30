let inflacionChart = null;

const datosInflacion = {
    argentina: {
        anos: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        tasas: [23.9, 26.5, 38.5, 24.8, 47.6, 53.8, 36.1, 50.9, 94.8, 211.4, 117.8]
    },
    usa: {
        anos: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        tasas: [1.6, 0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 2.9]
    },
    global: {
        anos: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        tasas: [2.9, 2.8, 2.8, 3.2, 3.6, 3.5, 3.2, 4.7, 8.7, 6.9, 5.8]
    }
};

function generarGrafico() {
    const pais = document.getElementById('pais').value;
    const tipoGrafico = document.getElementById('tipoGrafico').value;
    const datos = datosInflacion[pais];

    let datosParaGrafico;
    let labelGrafico;

    if (tipoGrafico === 'anual') {
        datosParaGrafico = datos.tasas;
        labelGrafico = 'Inflación Anual (%)';
    } else {
        datosParaGrafico = calcularInflacionAcumulada(datos.tasas);
        labelGrafico = 'Inflación Acumulada (%)';
    }

    const ultimos10 = datos.tasas.slice(-10);
    const promedio = ultimos10.reduce((a, b) => a + b, 0) / ultimos10.length;
    document.getElementById('promedio10').textContent = promedio.toFixed(2) + '%';

    const inflacionAcumuladaFinal = datosParaGrafico[datosParaGrafico.length - 1];
    document.getElementById('acumuladaTotal').textContent = inflacionAcumuladaFinal.toFixed(2) + '%';

    crearGrafico(datos.anos, datosParaGrafico, labelGrafico);
}

function calcularInflacionAcumulada(tasasAnuales) {
    let acumulada = 0;
    const resultado = [];

    for (let tasa of tasasAnuales) {
        acumulada = ((1 + acumulada / 100) * (1 + tasa / 100) - 1) * 100;
        resultado.push(acumulada);
    }

    return resultado;
}

function crearGrafico(labels, data, label) {
    const ctx = document.getElementById('inflacionChart').getContext('2d');

    if (inflacionChart) {
        inflacionChart.destroy();
    }

    inflacionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: data.map(value => {
                        if (value > 100) return 'rgba(239, 68, 68, 0.8)';
                        if (value > 50) return 'rgba(245, 158, 11, 0.8)';
                        if (value > 10) return 'rgba(59, 130, 246, 0.8)';
                        return 'rgba(16, 185, 129, 0.8)';
                    }),
                    borderColor: data.map(value => {
                        if (value > 100) return '#ef4444';
                        if (value > 50) return '#f59e0b';
                        if (value > 10) return '#3b82f6';
                        return '#10b981';
                    }),
                    borderWidth: 2
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
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#a0a0a0',
                        callback: function(value) { return value + '%'; }
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

// Generar gráfico inicial
generarGrafico();
