const inflacionHistorica = {
    ARS: {
        2014: 23.9, 2015: 26.5, 2016: 38.5, 2017: 24.8,
        2018: 47.6, 2019: 53.8, 2020: 36.1, 2021: 50.9,
        2022: 94.8, 2023: 211.4, 2024: 117.8
    },
    USD: {
        2014: 1.6,  2015: 0.1,  2016: 1.3,  2017: 2.1,
        2018: 2.4,  2019: 1.8,  2020: 1.2,  2021: 4.7,
        2022: 8.0,  2023: 4.1,  2024: 2.9
    }
};

function poblarAnos() {
    const anos = Object.keys(inflacionHistorica.ARS).sort();
    const selectOrigen = document.getElementById('anoOrigen');
    const selectDestino = document.getElementById('anoDestino');

    anos.forEach(ano => {
        const option1 = document.createElement('option');
        option1.value = ano;
        option1.textContent = ano;
        selectOrigen.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = ano;
        option2.textContent = ano;
        selectDestino.appendChild(option2);
    });

    selectOrigen.value = '2014';
    selectDestino.value = '2024';
}

poblarAnos();

document.getElementById('conversorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const monto = parseFloat(document.getElementById('monto').value);
    const moneda = document.getElementById('moneda').value;
    const anoOrigen = parseInt(document.getElementById('anoOrigen').value);
    const anoDestino = parseInt(document.getElementById('anoDestino').value);

    if (anoOrigen >= anoDestino) {
        alert('El año destino debe ser posterior al año origen');
        return;
    }

    const datosMoneda = inflacionHistorica[moneda];
    let factorAcumulado = 1;

    for (let ano = anoOrigen + 1; ano <= anoDestino; ano++) {
        if (datosMoneda[ano]) {
            factorAcumulado *= (1 + datosMoneda[ano] / 100);
        }
    }

    const montoConvertido = monto * factorAcumulado;
    const inflacionAcumulada = (factorAcumulado - 1) * 100;
    const anosTranscurridos = anoDestino - anoOrigen;
    const inflacionPromedio = Math.pow(factorAcumulado, 1 / anosTranscurridos) - 1;

    const simbolo = moneda === 'ARS' ? '$' : 'US$';

    document.getElementById('textoOrigen').textContent = `En ${anoOrigen} tenías`;
    document.getElementById('textoDestino').textContent = `En ${anoDestino} equivale a`;
    document.getElementById('montoConvertido').textContent =
        `${simbolo} ${montoConvertido.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    document.getElementById('inflacionAcumulada').textContent = inflacionAcumulada.toFixed(2) + '%';
    document.getElementById('anosTranscurridos').textContent = anosTranscurridos + ' años';
    document.getElementById('inflacionPromedio').textContent = (inflacionPromedio * 100).toFixed(2) + '%';

    document.getElementById('results').classList.remove('hidden');
});
