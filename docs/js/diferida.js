import './main.js';

const formpresente = document.getElementById("valor-presente");


formpresente.addEventListener("submit", function (event) {
    event.preventDefault();
    const valor = (formpresente.valorcuota.value);
    const interes = parseFloat(formpresente.interes.value);
    const tiempo = parseFloat(formpresente.tiempo.value);
    const tgracia = parseFloat(formpresente.tGracia.value);
    const vp = (formpresente.vp.value);
    calcularAnualidadPresente(valor, interes, tiempo,tgracia, vp);
});
const calcularAnualidadPresente = (valor, interes, tiempo,tgracia, vp) => {
    console.log(valor, interes, tiempo,tgracia, vp, 'estos son los valores')
    if (valor == 0 && vp != 0) {
        valorCuota(valor, interes, tiempo,tgracia, vp);
    }
    else if (valor != 0 && vp == 0) {
        let inte = interes / 100;
        var auxtime = -1 * tiempo;
        var tasa = Math.pow((1 + inte), auxtime)
        var gracia = Math.pow((1 + inte), (-1*tgracia))
        var result = valor * ((1 - tasa) / inte)
        result=result*gracia;
        document.getElementById("ValorPresente").innerHTML = "Valor Presente $ " + new Intl.NumberFormat('es-CP').format(result.toFixed(3));
    }
    else if (valor == 0 || interes == 0 || tiempo == 0 || tgracia == 0) {
        alert('ingrese todos los valores');
        document.getElementById("ValorPresente").innerHTML = null;
    }
    else if (valor < 0 || interes < 0 || tiempo < 0 || vp < 0 || tgracia < 0) {
        alert('ingrese solo valores positivos')
        document.getElementById("ValorPresente").innerHTML = null;
    } else if (valor != 0 && vp != 0) {
        alert('debe ingresar un solo valor')
        document.getElementById("ValorPresente").innerHTML = null;
    }

}
function valorCuota(valor, interes, tiempo,tgracia, vp) {
    let inte = interes / 100;
    var auxtime = -1 * tiempo;
    var tasa = Math.pow((1 + inte), auxtime);
    var gracia = Math.pow((1 + inte),-1*tgracia);
    let result = vp /(((1 - tasa) / inte)*gracia) ;
    //console.log('el valor de la  cuota es  ', result);
    document.getElementById("ValorPresente").innerHTML = "Valor de la Cuota $ " + new Intl.NumberFormat('es-CP').format(result.toFixed(3));;
}
