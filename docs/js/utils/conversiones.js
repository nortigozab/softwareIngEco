import * as inter from "./tasa-interes.js";

export const convertInterest = (modalidadPago, i, modalidadInteres) => {
  // Busca la modalidad de interes en la lista de j
  let val = inter.interestJ.filter((k) => k.name === modalidadInteres);

  i /= 100;

  // Si la modalidad de interes esta en j
  if (val.length > 0) {
    i /= val[0].value;
  } else {
    // Busca la modalidad de interes en la lista de i
    val = inter.interestI.filter((k) => k.name === modalidadInteres);
  }

  const valueI = val[0].value;

  // Valida si no están en el mismo periodo de tiempo el pago y el interes, si es asi, los convierte al mismo periodo de tiempo
  if (modalidadPago != valueI) {
    const n = valueI;
    const m = parseInt(modalidadPago);
    let value = Math.pow(1 + i, n);
    i = Math.pow(value, 1 / m) - 1;
  }

  return i;
};

export const convertInterestT = (i, o, d) => {
  let origen = inter.interestI.filter((k) => k.name === o);
  let destinoOriginal = inter.interestI.filter((k) => k.name === d);
  let destino = inter.interestI.filter((k) => k.name === d);

  i /= 100;
  if (o != d) {
    // Valida si origen es j y destino es i
    if (origen.length == 0 && destino.length > 0) {
      origen = inter.interestJ.filter((k) => k.name === o);
      i /= origen[0].value;
      console.log("Origen es j: ", origen[0], "Destino es i: ", destino[0]);
    }

    if (origen.length == 0) {
      origen = inter.interestJ.filter((k) => k.name === o);
      console.log("Origen es j: ", origen[0].value);
    }

    if (destino.length == 0) {
      destino = inter.interestJ.filter((k) => k.name === d);
      console.log("Destino es j: ", destino[0]);
    }

    // Valida si no están en el mismo periodo de tiempo el origen y el destino, si es asi, los convierte al mismo periodo de tiempo
    if (origen[0].value != destino[0].value) {
      const n = origen[0].value;
      const m = destino[0].value;
      let value = Math.pow(1 + i, n);
      i = Math.pow(value, 1 / m) - 1;
      console.log("Conversión de tasas: ", origen[0]);
    }

    // Valida si origen es i y destino es j
    if (origen.length > 0 && destinoOriginal.length == 0) {
      const destinoJ = inter.interestJ.filter((k) => k.name === d);
      i *= destinoJ[0].value;
      console.log(
        "Se convierte a j\nOrigen es i: ",
        origen[0],
        "Destino es j: ",
        destino[0]
      );
    }

    i *= 100;

    return i.toFixed(2);
  }else{
    i *= 100;

    return i.toFixed(2);
  }
};
export const calculateFee = (p, i, n) => {
  let bottomPart = (1 - Math.pow(1 + i, n * -1)) / i;
  let a = p / bottomPart;

  return parseFloat(a.toFixed(3));
};
export const calculateFeeFuture = (p, i, n) => {
  let bottomPart = (Math.pow(1 + i, n) - 1) / i;
  let a = p / bottomPart;

  return parseFloat(a.toFixed(3));
};
export const convertNumber = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};
