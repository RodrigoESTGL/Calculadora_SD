
const maxcaracter = 18;

function insert(num){
    
    let result = document.getElementById("result").innerHTML;

    if (result.length <= maxcaracter){
        let lastChar = result.slice(-1) //armazena na variavel o ultimo valor inserido  

        let operators = ['+','-','÷','%', 'x', '√', ','];
        
        if (operators.includes(num) && lastChar.includes(num) && fatorial.length(num)){
            return;
        }
        else{
                document.getElementById("result").innerHTML += num;
            }
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

if (result){
    let data_to_send = retrieve_data();
    fetch_and_send(data_to_send, 'http://localhost:3000/calculate');
} else{
    document.getElementById("result").innerHTML = "";
}
}