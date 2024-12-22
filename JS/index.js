
const maxcaracter = 18;
let expControl = false;

let exponents = {}
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
    } else {
        var result = document.getElementById("result").innerHTML;
        document.getElementById("result").innerHTML = result.substring(0, result.length -1);
    }
}

let positive = false; 



function clean(){
    document.getElementById("result").innerHTML = "";
}

function delete_Number(){
var result = document.getElementById("result").innerHTML;
document.getElementById("result").innerHTML = result.substring(0, result.length -1);
}

function egual(){
var result= document.getElementById('result').innerHTML; 
expControl = false;

if (result){
    let data_to_send = retrieve_data();
    fetch_and_send(data_to_send, 'http://localhost:3000/calculate');

    //Converter dicionario dos expoentes para um cookie

    let dictionary = JSON.stringify(exponents);
    document.cookie = `exponents=${dictionary}; path=/`;

} else{
    document.getElementById("result").innerHTML = "";
}
}