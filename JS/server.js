const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/calculate', (req, res) => {
    const data = req.body;
    let operators = data.operators;
    let numbers = data.numbers;
    let exponents = data.exponents;
    let calcStatus = true;
    let resultado;
    let index;
    let numbercut;
    let result;

    console.log(operators);
    console.log(numbers);
    console.log(exponents);

    if (numbers.length !== operators.length + 1) {
        resultado = "Formato inválido";
        calcStatus = false;
    } else {

        //Procura por expoentes
        for (const key in exponents) {
            result = exponent(parseFloat(numbers[key]), parseInt(exponents[key]));
            numbers[key] = result;            
        }

        //Procura por percentagens
        for (let i = 0; i < numbers.length; i++) { //Indices dos numeros
            index = numbers[i];

            if (index[index.length - 1] === "%") {
                index.slice(0, index.length-2);
                result = percentage(parseFloat(index));
                console.log(result);
                numbers.splice(i, 1);
                numbers.splice(i, 0, result);
            }
        }

        //Procura por raízes quadradas
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '√') {
                result = squareroot(numbers[i+1]);
                operators.splice(i, 1); //Remove a raiz
                numbers.splice(i+1, 1); //Remove o numero
                numbers.splice(i, 1); //Remove o valor anterior
                numbers.splice(i, 0, result); //Insere resultado
            }
        }

        //Procura por multiplicações e divisões
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === 'x') {
                result = mult(numbers[i], numbers[i+1]);
                operators.splice(i, 1);
                numbers.splice(i+1, 1);
                numbers.splice(i, 1);
                numbers.splice(i, 0, result);
            }

            if (operators[i] === '/') {
                result = div(parseFloat(numbers[i]), parseFloat(numbers[i+1]));
                operators.splice(i, 1);
                numbers.splice(i+1, 1);
                numbers.splice(i, 1);
                numbers.splice(i, 0, result);
            }
        }

        //Procura por adições e subtrações
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '+') {
                result = add(parseFloat(numbers[i]), parseFloat(numbers[i+1]));
                operators.splice(i, 1);
                numbers.splice(i+1, 1);
                numbers.splice(i, 1);
                numbers.splice(i, 0, result);
            }

            if (operators[i] === '-') {
                result = sub(numbers[i], numbers[i+1]);
                operators.splice(i, 1);
                numbers.splice(i+1, 1);
                numbers.splice(i, 1);
                numbers.splice(i, 0, result);
            }
        }

        result = numbers[0];
    }

    console.log("Numbers:", numbers);
    console.log("Operators:", operators)

    const response = {
        message: result,
        status: calcStatus,
        timestamp: new Date()
    };

    console.log('Dados enviados:', response);

    res.json(response);
});

const port = 3000;
app.listen(port, () => console.log(`Servidor a correr em http://localhost:${port}`));

//Funções das operações

const add = (a, b) => {
    return a+b;
}

const sub = (a, b) => {
    return a-b;
}

const mult = (a, b) => {
    return a*b;
}

const div = (a, b) => {
    return a/b;
}

const squareroot = a => {
    return Math.sqrt(a);
}

const percentage = a => {
    return a/100;
}

const exponent = (a, b) => {
    return a ** b;
}