
const maxcaracter = 18;

function insert(num){
    
    let result = document.getElementById("result").innerHTML;

    if (result.length < maxcaracter){
        document.getElementById("result").innerHTML += num;
    }   
}

let isNegative = false;
function NegativeNumber() {
    isNegative = !isNegative;
    if (isNegative) {
        document.getElementById("result").innerHTML = "-";
    } else {
        var result = document.getElementById("result").innerHTML;
        document.getElementById("result").innerHTML = result.substring(0, result.length -1);
    }
}


function clean(){
    document.getElementById("result").innerHTML = "";
}

function delete_Number(){
var result = document.getElementById("result").innerHTML;
document.getElementById("result").innerHTML = result.substring(0, result.length -2);
}

function egual(){
var result= document.getElementById('result').innerHTML; 

if (result){


} else{
    document.getElementById("result").innerHTML = "Impossível calcular esta operação.";
}
}