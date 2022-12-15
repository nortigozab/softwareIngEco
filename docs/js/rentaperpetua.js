import './main.js';

const form = document.getElementById("RentaPerpetua");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const valorPresente = (form.Valor.value);
    const interes = parseFloat(form.portentaje.value);

    mostrarData(valorPresente, interes)

});


const mostrarData = (valor, tasa) => {
    const tasaReal = tasa / 100;
    const result = (valor / tasaReal);
    document.getElementById("resultado").innerHTML = "$ "+new Intl.NumberFormat('es-CP').format(result.toFixed(3));

}
