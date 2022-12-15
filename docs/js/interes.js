import "./main.js";

const formCompuesto = document.getElementById("interes-compuesto");



formCompuesto.addEventListener("submit", function (event) {
  event.preventDefault();
  const valor = formCompuesto.valorInteresCompuesto.value;
  const interes = parseFloat(formCompuesto.tasaCompuesta.value);
  const tiempo = parseFloat(formCompuesto.time.value);
  const te = formCompuesto.te.value;
  const tn = formCompuesto.tn.value;
  const formaTiempo = formCompuesto.formaTiempo.value;
  const monto = formCompuesto.monto.value;
  calcularInteresCompuesto(valor, interes, tiempo, te, tn, formaTiempo,monto);
});

const calcularInteresCompuesto = (
  valorP,
  tasa,
  tiempoCompuestp,
  te,
  tn,
  tiempo,monto
) => {
if(valorP!=0 && monto == 0)Vmonto(valorP,tasa,tiempoCompuestp,te,tn,tiempo);
else{
  if(monto!=0 && valorP==0)Vcapital(monto,tasa,tiempoCompuestp,te,tn,tiempo);
  else{
    if(monto!=0 && valorP!=0)alert("Elija entre uno, monto o valor")
    if(monto==0 && valorP==0)alert("Ingrese valores entre monto o valor")
  }
}
  
};
function Vmonto(valorP,tasa,tiempoCompuestp,te,tn,tiempo){
  if (tasa < 0 || tiempoCompuestp < 0) {
    alert("No se aceptan valores negativos");
    document.getElementById("resultadoCompuesto").innerHTML = null;
  } else if (tasa == 0 || tiempoCompuestp == 0) {
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
          document.getElementById("resultadoCompuesto").innerHTML = "El monto es $ "+new Intl.NumberFormat('es-CP').format(resultado.toFixed(3));
        }
      }
    }
  }
}
function Vcapital(monto,tasa,tiempoCompuestp,te,tn,tiempo){
  if (tasa < 0 || tiempoCompuestp < 0) {
    alert("No se aceptan valores negativos");
    document.getElementById("resultadoCompuesto").innerHTML = null;
  } else if (tasa == 0 || tiempoCompuestp == 0) {
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
          let resultado = monto / tasaMultiplicar;
          document.getElementById("resultadoCompuesto").innerHTML = "El capital es $ "+new Intl.NumberFormat('es-CP').format(resultado.toFixed(3));
        }
      }
    }
  }
}
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
