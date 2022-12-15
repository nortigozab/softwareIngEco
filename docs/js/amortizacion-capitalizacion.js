import './main.js';
import * as conv from './utils/conversiones.js';

document.getElementById("formulario-amortizacion").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the form and table
    const table = document.getElementById("tabla-amortizacion");
    const data = document.getElementById("datos-amortizacion");

    const form = event.target;

    if (form.checkValidity()) {
        // Get the values from the form
        const valorDeuda = parseFloat(form.valorDeuda.value);
        const numPagos = parseInt(form.numeroPagos.value);
        const modalidadPago = form.modalidadPago.value;
        const interes = parseFloat(form.interes.value);
        const modalidadInteres = form.modalidadInteres.value;

        // Calculate the interest
        const realInterest = conv.convertInterest(modalidadPago, interes, modalidadInteres);
        // Calculate the fee
        const cuota = conv.calculateFee(valorDeuda, realInterest, numPagos);

        createTable(valorDeuda, numPagos, cuota, realInterest, table, data);
    }
});

document.getElementById("formulario-capitalizacion").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the form and table
    const table = document.getElementById("tabla-capitalizacion");
    const data = document.getElementById("datos-capitalizacion");

    const form = event.target;

    if (form.checkValidity()) {
        // Get the values from the form
        const valorCapitalizable = parseFloat(form.valorCapitalizable.value);
        const numPagos = parseInt(form.numeroPagos.value);
        const modalidadPago = form.modalidadPago.value;
        const interes = parseFloat(form.interes.value);
        const modalidadInteres = form.modalidadInteres.value;

        // Calculate the interest
        const realInterest = conv.convertInterest(modalidadPago, interes, modalidadInteres);
        // Calculate the fee
        const cuota = conv.calculateFeeFuture(valorCapitalizable, realInterest, numPagos);

        createTableCapitalization(valorCapitalizable, numPagos, cuota, realInterest, table, data);
    }
});

const createTable = (valorDeuda, numPagos, cuota, realInterest, table, data) => {
    let periodo = 0;
    let saldo = valorDeuda;
    let valorInteres = 0;
    let valorCuota = 0;
    let amortizacion = 0;

    table.innerHTML = "";

    table.insertAdjacentHTML('beforeend',
        `<thead>
            <tr>
                <th scope="col">Periodo</th>
                <th scope="col">Saldo</th>
                <th scope="col">Interes</th>
                <th scope="col">Cuota</th>
                <th scope="col">Amortización</th>
            </tr>
        </thead><tbody>`
    );

    while (periodo <= numPagos) {
        table.insertAdjacentHTML('beforeend', '<tr><th scope="row">'
            + periodo + '</th><td>'
            + conv.convertNumber(saldo) + '</td><td>'
            + conv.convertNumber(valorInteres) + '</td><td>'
            + conv.convertNumber(valorCuota) + '</td><td>'
            + conv.convertNumber(amortizacion) + '</td></tr>');

        valorInteres = saldo * realInterest;

        if (saldo < valorCuota) valorCuota = saldo + valorInteres;
        else if (periodo == 0) valorCuota = cuota;

        amortizacion = valorCuota - valorInteres;
        saldo -= amortizacion;
        periodo++;
    }

    table.insertAdjacentHTML('beforeend', '</tbody>');

    data.classList.remove("invisible");
}

const createTableCapitalization = (valorCapitalizable, numPagos, cuota, realInterest, table, data) => {
    let periodo = 1;
    let saldo = cuota;
    let valorInteres = 0;
    let valorCuota = cuota;
    let incremento = cuota;

    table.innerHTML = "";

    table.insertAdjacentHTML('beforeend',
        `<thead>
            <tr>
                <th scope="col">Periodo</th>
                <th scope="col">Saldo</th>
                <th scope="col">Interes</th>
                <th scope="col">Cuota</th>
                <th scope="col">Incremento</th>
            </tr>
        </thead><tbody>`
    );

    while (parseInt(saldo.toFixed(0)) <= valorCapitalizable) {
        table.insertAdjacentHTML('beforeend', '<tr><th scope="row">'
            + periodo + '</th><td>'
            + conv.convertNumber(saldo) + '</td><td>'
            + conv.convertNumber(valorInteres) + '</td><td>'
            + conv.convertNumber(valorCuota) + '</td><td>'
            + conv.convertNumber(incremento) + '</td></tr>');

        valorInteres = saldo * realInterest;

        if (saldo < valorCuota) valorCuota = saldo + valorInteres;
        else if (periodo == 0) valorCuota = cuota;

        incremento = valorCuota + valorInteres;
        saldo += incremento;
        periodo++;
    }

    table.insertAdjacentHTML('beforeend', '</tbody>');

    data.classList.remove("invisible");
}