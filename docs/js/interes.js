import "./main.js";

const form = document.getElementById("interes-simple");
const formCompuesto = document.getElementById("interes-compuesto");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const valor = form.ValorPrestamo.value;
  const interes = parseFloat(form.portentaje.value);
  const tiempo = parseFloat(form.tiempo.value);
  const formaTiempo = form.formaTiempo.value;
  calcularInteresSimple(valor, interes, tiempo, formaTiempo);
});

formCompuesto.addEventListener("submit", function (event) {
  event.preventDefault();
  const valor = formCompuesto.valorInteresCompuesto.value;
  const interes = parseFloat(formCompuesto.tasaCompuesta.value);
  const tiempo = parseFloat(formCompuesto.time.value);
  const te = formCompuesto.te.value;
  const tn = formCompuesto.tn.value;
  const formaTiempo = formCompuesto.formaTiempo.value;
  calcularInteresCompuesto(valor, interes, tiempo, te, tn, formaTiempo);
});

const calcularInteresSimple = (valorp, tasa, time, tiempo) => {
  console.log(valorp, tasa, time, tiempo);
  if (valorp < 0 || tasa < 0 || tasa < 0) {
    alert("No se aceptan valores negativos");
    document.getElementById("resultado").innerHTML = null;
  } else if (valorp == 0 || tasa == 0 || time == 0 || tiempo == "default") {
    alert("Ingrese todos los valores");
  } else {
    let result;
    switch (tiempo) {
      case "dias":
        result = valorp * (tasa / 100) * (time / 365);
        document.getElementById("resultado").innerHTML =
          "$ " + new Intl.NumberFormat('es-CP').format(result.toFixed(3));
        break;
      case "ano":
        result = valorp * (tasa / 100) * time;
        document.getElementById("resultado").innerHTML =
          "$ " + new Intl.NumberFormat('es-CP').format(result.toFixed(3));
        break;
    }
  }
};

const calcularInteresCompuesto = (
  valorP,
  tasa,
  tiempoCompuestp,
  te,
  tn,
  tiempo
) => {

  if (valorP < 0 || tasa < 0 || tiempoCompuestp < 0) {
    alert("No se aceptan valores negativos");
    document.getElementById("resultadoCompuesto").innerHTML = null;
  } else if (valorP == 0 || tasa == 0 || tiempoCompuestp == 0) {
    alert("Ingrese todos los valores");
  } else {
    if (te == "te" && tn == "tn") {
      alert("Ingrese todos los valores");
    } else {
      if (te != "te" && tn != "tn") alert("Elija solo un tipo de interes");
      else {
        if (tiempo == "tiempo") alert("Elija tiempo");
        else {
          let tasaMultiplicar;
          if (te != "te") {
            let t = te.charAt(1);
            if (t == tiempo)
              tasaMultiplicar = Math.pow(1 + tasa / 100, tiempoCompuestp);
            else {
              tiempoCompuestp = convertTiempoCompuesto(
                t,
                tiempoCompuestp,
                tiempo
              );
              tasaMultiplicar = Math.pow(1 + tasa / 100, tiempoCompuestp);
            }
          }
          if (tn != "tn") {
            let t = tn.charAt(1);
            tasa = convertNominaltoEfectiva(t, tasa);
            if (t == tiempo)
              tasaMultiplicar = Math.pow(1 + tasa / 100, tiempoCompuestp);
            else {
              tiempoCompuestp = convertTiempoCompuesto(
                t,
                tiempoCompuestp,
                tiempo
              );
              console.log(tiempoCompuestp);
              tasaMultiplicar = Math.pow(1 + tasa / 100, tiempoCompuestp);
            }
          }
          let resultado = valorP * tasaMultiplicar;
          document.getElementById("resultadoCompuesto").innerHTML = "$ "+new Intl.NumberFormat('es-CP').format(resultado.toFixed(3));
        }
      }
    }
  }
};
function convertNominaltoEfectiva(t, tasa) {
  switch (t) {
    case "m":
      return (tasa = tasa / 12);
      break;
    case "b":
      return (tasa = tasa / 6);
      break;
    case "t":
      return (tasa = tasa / 4);
      break;
    case "c":
      return (tasa = tasa / 3);
      break;
    case "s":
      return (tasa = tasa / 2);
      break;
  }
}
function convertTiempoCompuesto(t, tc, tiempo) {
  if (t == "m") {
    if (tiempo == "b") return (tc = tc * 2);
    if (tiempo == "t") return (tc = tc * 3);
    if (tiempo == "c") return (tc = tc * 4);
    if (tiempo == "s") return (tc = tc * 6);
    if (tiempo == "a") return (tc = tc * 12);
  }
  if (t == "b") {
    if (tiempo == "m") return (tc = tc / 2);
    if (tiempo == "t") return (tc = tc * 3 / 2);
    if (tiempo == "c") return (tc = tc * 4 / 2);
    if (tiempo == "s") return (tc = tc * 6 / 2);
    if (tiempo == "a") return (tc = tc * 12 / 2);
  }
  if (t == "t") {
    if (tiempo == "m") return (tc = tc / 3);
    if (tiempo == "b") return (tc = tc * 2 / 3);
    if (tiempo == "c") return (tc = tc * 4 * 3);
    if (tiempo == "s") return (tc = tc * 6 * 3);
    if (tiempo == "a") return (tc = tc * 12/ 3);
  }
  if (t == "c") {
    if (tiempo == "m") return (tc = tc / 4);
    if (tiempo == "b") return (tc = tc * 2 / 4);
    if (tiempo == "t") return (tc = tc * 3 / 4);
    if (tiempo == "s") return (tc = tc * 6 / 4);
    if (tiempo == "a") return (tc = tc * 12 / 4);
  }
  if (t == "s") {
    if (tiempo == "m") return (tc = tc / 6);
    if (tiempo == "b") return (tc = tc * 2 / 6);
    if (tiempo == "t") return (tc = tc * 3 / 6);
    if (tiempo == "c") return (tc = tc * 4 / 6);
    if (tiempo == "a") return (tc = tc * 12 / 6);
  }
  if (t == "a") {
    if (tiempo == "m") return (tc = tc / 12);
    if (tiempo == "b") return (tc = tc * 2 / 12);
    if (tiempo == "t") return (tc = tc * 3 / 12);
    if (tiempo == "c") return (tc = tc * 4 / 12);
    if (tiempo == "s") return (tc = tc * 6 / 12);
  }
}
