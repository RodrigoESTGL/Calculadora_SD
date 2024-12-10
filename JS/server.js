const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/calculate', (req, res) => {
    const data = req.body;
    let operators = data.operators;
    let numbers = data.numbers;
    let calcStatus = true;
    let resultado;
    let index;
    let result;

    if (numbers.length !== operators.length + 1) {
        resultado = "Formato inválido";
        calcStatus = false;
    } else {

        //Primeiro procura por raízes quadradas
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '√') {
                result = squareroot(numbers[i+1]);
                operators.splice(i, 1);
                numbers.splice(i+1, 1);
                numbers.splice(i, 1);
                numbers.splice(i, 0, result);
            }
        }

        result = numbers[0];
    }

    const response = {
        message: result,
        status: calcStatus,
        timestamp: new Date()
    };

    console.log('Dados enviados:', response);

    res.json(response);
});

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));

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