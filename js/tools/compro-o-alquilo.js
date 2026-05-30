let comparacionChart = null;

document.getElementById('comparacionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const valorPropiedad = parseFloat(document.getElementById('valorPropiedad').value);
    const pagoInicial = parseFloat(document.getElementById('pagoInicial').value);
    const gastosCompra = parseFloat(document.getElementById('gastosCompra').value);
    const tasaHipoteca = parseFloat(document.getElementById('tasaHipoteca').value) / 100;
    const expensasExtra = parseFloat(document.getElementById('expensasExtra').value);
    const mantenimiento = parseFloat(document.getElementById('mantenimiento').value);
    const apreciacion = parseFloat(document.getElementById('apreciacion').value) / 100;

    const alquiler = parseFloat(document.getElementById('alquiler').value);
    const aumentoAlquiler = parseFloat(document.getElementById('aumentoAlquiler').value) / 100;
    const rendimientoInversion = parseFloat(document.getElementById('rendimientoInversion').value) / 100;

    const anos = parseInt(document.getElementById('anos').value);

    if (pagoInicial > valorPropiedad) {
        alert('El anticipo no puede ser mayor al valor de la propiedad.');
        return;
    }
    if (anos <= 0) {
        alert('El período debe ser mayor a 0.');
        return;
    }

    const resultado = simularComparacion({
        valorPropiedad,
        pagoInicial,
        gastosCompra,
        tasaHipoteca,
        expensasExtra,
        mantenimientoAnual: mantenimiento,
        apreciacion,
        alquilerMensual: alquiler,
        aumentoAlquiler,
        rendimientoInversion,
        anos
    });

    document.getElementById('patrimonioCompra').textContent =
        window.FinanceUtils.formatCurrency(resultado.compra.patrimonioFinal);
    document.getElementById('patrimonioAlquiler').textContent =
        window.FinanceUtils.formatCurrency(resultado.alquiler.capitalFinal);

    document.getElementById('presupuestoFijo').textContent = window.FinanceUtils.formatCurrency(resultado.presupuestoMensualFijo);
    document.getElementById('cuotaHipoteca').textContent = window.FinanceUtils.formatCurrency(resultado.hipoteca.cuotaMensual);
    document.getElementById('costosDueno').textContent = window.FinanceUtils.formatCurrency(resultado.compra.costosDuenoMensualInicial);
    document.getElementById('totalComprarMes').textContent = window.FinanceUtils.formatCurrency(resultado.compra.costoViviendaMensualInicial);
    document.getElementById('alquilerMes').textContent = window.FinanceUtils.formatCurrency(resultado.alquiler.alquilerMensualInicial);

    const inversionComprarMes = Math.max(0, resultado.presupuestoMensualFijo - resultado.compra.costoViviendaMensualInicial);
    const inversionAlquilarMes = Math.max(0, resultado.presupuestoMensualFijo - resultado.alquiler.alquilerMensualInicial);

    document.getElementById('inversionComprarMes').textContent = window.FinanceUtils.formatCurrency(inversionComprarMes);
    document.getElementById('inversionAlquilarMes').textContent = window.FinanceUtils.formatCurrency(inversionAlquilarMes);

    const diffMes = resultado.compra.costoViviendaMensualInicial - resultado.alquiler.alquilerMensualInicial;
    document.getElementById('diffMes').textContent = window.FinanceUtils.formatCurrency(diffMes);

    document.getElementById('capitalFinanciado').textContent = window.FinanceUtils.formatCurrency(resultado.hipoteca.capital);
    document.getElementById('tasaMensual').textContent = (resultado.hipoteca.tasaMensual * 100).toFixed(4) + '%';
    document.getElementById('cantidadCuotas').textContent = resultado.hipoteca.cuotas + ' meses';
    document.getElementById('interesesTotales').textContent = window.FinanceUtils.formatCurrency(resultado.hipoteca.interesesTotalesEstimados);

    document.getElementById('totalPagadoAlquiler').textContent = window.FinanceUtils.formatCurrency(resultado.alquiler.totalPagadoAlquiler);
    document.getElementById('totalPagadoComprar').textContent = window.FinanceUtils.formatCurrency(resultado.compra.totalPagadoComprar);

    document.getElementById('valorCasaFinal').textContent = window.FinanceUtils.formatCurrency(resultado.compra.valorCasaFinal);
    document.getElementById('invComprarFinal').textContent = window.FinanceUtils.formatCurrency(resultado.compra.inversionFinal);
    document.getElementById('invAlquilarFinal').textContent = window.FinanceUtils.formatCurrency(resultado.alquiler.inversionFinal);

    const factorAprec = Math.pow(1 + apreciacion, anos);
    document.getElementById('factorApreciacion').textContent = factorAprec.toFixed(4) + 'x';

    const diferencia = Math.abs(resultado.compra.patrimonioFinal - resultado.alquiler.capitalFinal);
    const mejorOpcion = resultado.compra.patrimonioFinal > resultado.alquiler.capitalFinal
        ? 'Comprar'
        : 'Alquilar + Invertir';

    document.getElementById('mejorOpcion').textContent = mejorOpcion;
    document.getElementById('diferencia').textContent = window.FinanceUtils.formatCurrency(diferencia);

    generarInterpretacion(resultado, mejorOpcion, diferencia, anos, valorPropiedad);

    document.getElementById('results').classList.remove('hidden');
    createChart(resultado.compra.timeline, resultado.alquiler.timeline);
});

function generarInterpretacion(resultado, mejorOpcion, diferencia, anos, valorPropiedad) {
    const patrimonioCompra = resultado.compra.patrimonioFinal;
    const capitalAlquiler = resultado.alquiler.capitalFinal;
    const totalPagadoComprar = resultado.compra.totalPagadoComprar;
    const totalPagadoAlquiler = resultado.alquiler.totalPagadoAlquiler;
    const valorCasaFinal = resultado.compra.valorCasaFinal;
    const inversionComprar = resultado.compra.inversionFinal;
    const porcentajeDiferencia = ((diferencia / Math.max(patrimonioCompra, capitalAlquiler)) * 100).toFixed(1);

    let interpretacion = '';

    if (mejorOpcion === 'Comprar') {
        const ventajaStr = window.FinanceUtils.formatCurrency(diferencia);
        interpretacion = `<strong>✅ Comprar es la mejor opción</strong> en este escenario. `;
        interpretacion += `Al cabo de ${anos} años, tendrías un patrimonio neto de ${window.FinanceUtils.formatCurrency(patrimonioCompra)}, `;
        interpretacion += `que es ${ventajaStr} (${porcentajeDiferencia}%) superior a alquilar e invertir.<br><br>`;
        interpretacion += `<strong>Composición del patrimonio al comprar:</strong><br>`;
        interpretacion += `• Valor de la casa: ${window.FinanceUtils.formatCurrency(valorCasaFinal)} (apreciación incluida)<br>`;
        if (inversionComprar > 0) {
            interpretacion += `• Capital invertido: ${window.FinanceUtils.formatCurrency(inversionComprar)}<br>`;
        }
        interpretacion += `• Total pagado: ${window.FinanceUtils.formatCurrency(totalPagadoComprar)}<br><br>`;
        interpretacion += `<strong>⚠️ Consideraciones:</strong><br>`;
        interpretacion += `• Necesitarás vender la propiedad para acceder al capital.<br>`;
        interpretacion += `• Los costos de venta (comisiones, impuestos) reducirán el patrimonio neto.<br>`;
        interpretacion += `• La propiedad requiere mantenimiento y puede tener períodos de vacancia al vender.`;
    } else {
        const ventajaStr = window.FinanceUtils.formatCurrency(diferencia);
        interpretacion = `<strong>✅ Alquilar + Invertir es la mejor opción</strong> en este escenario. `;
        interpretacion += `Al cabo de ${anos} años, tendrías un capital acumulado de ${window.FinanceUtils.formatCurrency(capitalAlquiler)}, `;
        interpretacion += `que es ${ventajaStr} (${porcentajeDiferencia}%) superior a comprar.<br><br>`;
        interpretacion += `<strong>Ventajas del escenario de alquilar:</strong><br>`;
        interpretacion += `• Capital 100% líquido y accesible en cualquier momento.<br>`;
        interpretacion += `• Mayor flexibilidad para cambiar de ubicación.<br>`;
        interpretacion += `• Sin preocupaciones de mantenimiento o reparaciones.<br>`;
        interpretacion += `• Total pagado en alquileres: ${window.FinanceUtils.formatCurrency(totalPagadoAlquiler)}<br><br>`;
        interpretacion += `<strong>⚠️ Consideraciones:</strong><br>`;
        interpretacion += `• Requiere disciplina para invertir consistentemente la diferencia.<br>`;
        interpretacion += `• Los alquileres pueden aumentar más de lo proyectado.<br>`;
        interpretacion += `• No tienes la seguridad de tener un techo propio garantizado.`;
    }

    document.getElementById('interpretacionTexto').innerHTML = interpretacion;
}

function frenchPayment(capital, tasaAnual, anos) {
    const cuotas = Math.max(0, Math.round(anos * 12));
    const tasaMensual = tasaAnual / 12;

    if (cuotas === 0) return { cuotaMensual: 0, tasaMensual, cuotas };
    if (tasaMensual === 0) return { cuotaMensual: capital / cuotas, tasaMensual, cuotas };

    const cuotaMensual = (capital * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cuotas));
    return { cuotaMensual, tasaMensual, cuotas };
}

function simularComparacion(params) {
    const {
        valorPropiedad, pagoInicial, gastosCompra, tasaHipoteca,
        expensasExtra, mantenimientoAnual, apreciacion,
        alquilerMensual, aumentoAlquiler, rendimientoInversion, anos
    } = params;

    const meses = Math.round(anos * 12);
    const capitalHipoteca = Math.max(0, valorPropiedad - pagoInicial);
    const hipoteca = frenchPayment(capitalHipoteca, tasaHipoteca, anos);

    const tasaInvMensual = Math.pow(1 + rendimientoInversion, 1 / 12) - 1;
    const costosDuenoMensual = expensasExtra + (mantenimientoAnual / 12);
    const costoComprarInicial = hipoteca.cuotaMensual + costosDuenoMensual;
    const presupuestoMensualFijo = Math.max(costoComprarInicial, alquilerMensual);

    let valorCasa = valorPropiedad;
    let saldoHipoteca = capitalHipoteca;
    let inversionComprar = 0;
    let totalPagadoComprar = pagoInicial + gastosCompra;

    let inversionAlquilar = pagoInicial + gastosCompra;
    let alquilerActual = alquilerMensual;
    let totalPagadoAlquiler = 0;

    const timelineCompra = [];
    const timelineAlquiler = [];
    let interesesAcumulados = 0;

    timelineCompra.push({
        year: 0, valorCasa, saldoHipoteca, inversion: inversionComprar,
        patrimonio: Math.max(0, (valorCasa - saldoHipoteca) + inversionComprar),
        pagadoAcumulado: totalPagadoComprar
    });
    timelineAlquiler.push({
        year: 0, inversion: Math.max(0, inversionAlquilar),
        alquilerPagadoAcumulado: totalPagadoAlquiler
    });

    for (let mes = 1; mes <= meses; mes++) {
        if (mes % 12 === 1 && mes !== 1) {
            alquilerActual *= (1 + aumentoAlquiler);
        }

        const cuota = (capitalHipoteca > 0 && mes <= hipoteca.cuotas) ? hipoteca.cuotaMensual : 0;
        const costoComprarMes = cuota + costosDuenoMensual;
        totalPagadoComprar += costoComprarMes;

        const diferenciaComprar = Math.max(0, presupuestoMensualFijo - costoComprarMes);
        inversionComprar = (inversionComprar * (1 + tasaInvMensual)) + diferenciaComprar;

        if (capitalHipoteca > 0 && mes <= hipoteca.cuotas && saldoHipoteca > 0) {
            const interesMes = saldoHipoteca * hipoteca.tasaMensual;
            const amortizacion = Math.max(0, hipoteca.cuotaMensual - interesMes);
            interesesAcumulados += interesMes;
            saldoHipoteca = Math.max(0, saldoHipoteca - amortizacion);
        }

        const costoAlquilarMes = alquilerActual;
        totalPagadoAlquiler += costoAlquilarMes;
        const diferenciaAlquilar = Math.max(0, presupuestoMensualFijo - costoAlquilarMes);
        inversionAlquilar = (inversionAlquilar * (1 + tasaInvMensual)) + diferenciaAlquilar;

        if (mes % 12 === 0) {
            const year = mes / 12;
            valorCasa *= (1 + apreciacion);
            const patrimonioComprar = (valorCasa - saldoHipoteca) + inversionComprar;
            timelineCompra.push({
                year, valorCasa, saldoHipoteca,
                inversion: Math.max(0, inversionComprar),
                patrimonio: Math.max(0, patrimonioComprar),
                pagadoAcumulado: totalPagadoComprar
            });
            timelineAlquiler.push({
                year, inversion: Math.max(0, inversionAlquilar),
                alquilerPagadoAcumulado: totalPagadoAlquiler
            });
        }
    }

    const patrimonioFinalCompra = timelineCompra[timelineCompra.length - 1].patrimonio;
    const capitalFinalAlquiler = timelineAlquiler[timelineAlquiler.length - 1].inversion;
    const interesesTotalesEstimados = Math.max(0, (hipoteca.cuotaMensual * hipoteca.cuotas) - capitalHipoteca);

    return {
        presupuestoMensualFijo,
        hipoteca: {
            capital: capitalHipoteca,
            tasaMensual: hipoteca.tasaMensual,
            cuotas: hipoteca.cuotas,
            cuotaMensual: hipoteca.cuotaMensual,
            interesesTotalesEstimados,
            interesesAcumulados
        },
        compra: {
            costosDuenoMensualInicial: costosDuenoMensual,
            costoViviendaMensualInicial: hipoteca.cuotaMensual + costosDuenoMensual,
            patrimonioFinal: patrimonioFinalCompra,
            totalPagadoComprar,
            valorCasaFinal: valorCasa,
            saldoHipotecaFinal: saldoHipoteca,
            inversionFinal: inversionComprar,
            timeline: timelineCompra
        },
        alquiler: {
            alquilerMensualInicial: alquilerMensual,
            capitalFinal: capitalFinalAlquiler,
            totalPagadoAlquiler,
            inversionFinal: inversionAlquilar,
            timeline: timelineAlquiler
        }
    };
}

function createChart(timelineCompra, timelineAlquiler) {
    const ctx = document.getElementById('comparacionChart').getContext('2d');

    const labels = timelineCompra.map(item => `Año ${item.year}`);
    const dataPatrimonioCompra = timelineCompra.map(item => item.patrimonio);
    const dataInversionAlquiler = timelineAlquiler.map(item => item.inversion);

    if (comparacionChart) {
        comparacionChart.destroy();
    }

    comparacionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Comprar (patrimonio neto)',
                    data: dataPatrimonioCompra,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0
                },
                {
                    label: 'Alquilar (capital invertido)',
                    data: dataInversionAlquiler,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0
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
                    ticks: { color: '#a0a0a0' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });
}
