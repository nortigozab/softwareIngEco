import './main.js';

document.getElementById("calcu").onclick = function calcular(){

    var vl = document.getElementById('valorLiquido').value;
    var nv = document.getElementById('valorNominal').value;
    var po = document.getElementById('porcentaje').value/100;
    var di = document.getElementById('dias').value;

    if (vl === ""){
        if(nv === "" || po === "" || di === ""){
            alert("Debe de ingresar almenos tres valores para realizar el calculo");
        }else{
            var result = nv * (1 - (po*(di/360)));
            console.log(result);
            document.getElementById("resultado").innerHTML = "$ " + new Intl.NumberFormat('es-CP').format(result.toFixed(3));
        }
    }else if(nv === ""){    
        if(vl === "" || po === "" || di === ""){
            alert("Debe de ingresar almenos tres valores para realizar el calculo");
        }else{
            var result = vl / (1 - (po*(di/360)));
            console.log(result);
            document.getElementById("resultado").innerHTML = "$ " + new Intl.NumberFormat('es-CP').format(result.toFixed(3));
        }
    }else if(po === "" || di === ""){
        alert("Debe ingresar valor nominal o valor liqudo para realizar el calculo");
    }
    console.log(vl + " " + nv + " " + po + " " + di);
};

