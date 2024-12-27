
const maxcaracter = 18;
let expControl = false;

let exponents = {}
let negatives = []
let length;

function insert(num){
    
    let result = document.getElementById("result").innerHTML;

    if (result.length <= maxcaracter){
        let lastChar = result.slice(-1) //armazena na variavel o ultimo valor inserido  

        let operators = ['+','-','/','%', 'x', '√', ',']; 

        if (expControl) { //Nao se podem escrever mais numeros no setor onde se termina com um expoente
            if (!isNaN(num)) {
                return;
            } else {
                expControl = false;
                document.getElementById("result").innerHTML += num;
            }
        }
        
        else if (operators.includes(num) && lastChar.includes(num) && fatorial.length(num)){ //Nao repetir caracteres
            return;
        }
        else{
                document.getElementById("result").innerHTML += num;
            }
    }   
}

function handle_exponent(n) {
    expControl = true;

    length = document.getElementById("result").textContent.length;

    console.log(document.getElementById("result").textContent);

    exponents[length-1] = n;

    console.log("Expoentes: ", exponents);
}


let isNegative = false;
function NegativeNumber() {
    isNegative = !isNegative;

    if (isNegative) {
        document.getElementById("result").innerHTML = "-";

        negatives.push(document.getElementById("result").textContent.length - 1);
    } else {
        var result = document.getElementById("result").innerHTML;
        document.getElementById("result").innerHTML = result.substring(0, result.length -1);
    }

    console.log("Negativos: ", negatives);
}

let positive = false; 



function clean(){
    document.getElementById("result").innerHTML = "";
    expControl = false;
    isNegative = false;
    exponents = {};
    negatives = [];

    //Limpar cookies
    document.cookie="exponents=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie="negatives=; expores=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function delete_Number(){
var result = document.getElementById("result").innerHTML;
document.getElementById("result").innerHTML = result.substring(0, result.length -1);
}

function egual(){
var result= document.getElementById('result').innerHTML; 
expControl = false;
isNegative = false;

if (result){
    //Limpar cookies
    document.cookie="exponents=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie="negatives=; expores=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //Converter dicionario dos expoentes para um cookie

    let dictionary = JSON.stringify(exponents);
    let dictionary2 = JSON.stringify(negatives);
    document.cookie = `exponents=${dictionary}; path=/` 
    document.cookie = `negatives=${dictionary2}; path=/`;
    console.log(document.cookie);

    let data_to_send = retrieve_data();
    fetch_and_send(data_to_send, 'http://localhost:3000/calculate');

    exponents = {};
    negatives = [];

    //Limpar cookies
    document.cookie="exponents=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie="negatives=; expores=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

} else{
    document.getElementById("result").innerHTML = "";
}
}