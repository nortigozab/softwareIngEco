import './main.js';
import * as conv from './utils/conversiones.js';


const form = document.getElementById("formulario-conversiones");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("texto-resultado");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;

    if (form.checkValidity()) {
        const interes = parseFloat(form.interes.value);
        const modalidadInteresOrigen = form.modalidadInteresOrigen.value;
        const modalidadInteresDestino = form.modalidadInteresDestino.value;

        const realInterest = conv.convertInterestT(interes, modalidadInteresOrigen, modalidadInteresDestino);

        textoResultado.innerText = `El interés convertido es ${realInterest}%`;

        resultado.classList.remove("invisible");
    }
});
