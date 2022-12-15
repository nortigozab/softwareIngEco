import './main.js';
import * as conv from './utils/conversiones.js';

// Get the form and table
const form = document.getElementById("formulario-conversiones");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("texto-resultado");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;

    if (form.checkValidity()) {
        // Get the values from the form
        const interes = parseFloat(form.interes.value);
        const modalidadInteresOrigen = form.modalidadInteresOrigen.value;
        const modalidadInteresDestino = form.modalidadInteresDestino.value;

        // Calculate the interest
        const realInterest = conv.convertInterestT(interes, modalidadInteresOrigen, modalidadInteresDestino);
        //document.getElementById("texto-resultado").innerHTML = `El interés convertido es ${realInterest}%`;
        textoResultado.innerText = `El interés convertido es ${realInterest}%`;
        resultado.classList.remove("invisible");
    }
});
