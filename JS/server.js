const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/calculate', (req, res) => {
    const data = req.body;
    let operators = data.operators;
    let numbers = data.numbers;
    let calcStatus = false;
    let resultado;

    console.log(operators.length);
    console.log(numbers.length);

    if (numbers.length !== operators.length + 1) {
        resultado = "Formato inválido";
        calcStatus = false;
    } else {
        try {
            resultado = eval("2+2");
            calcStatus = true;
        } catch(error) {
            resultado = error.message;
            calcStatus = false;
        }
    }

    const response = {
        message: resultado,
        status: calcStatus,
        timestamp: new Date()
    };

    console.log('Dados enviados:', response);

    res.json(response);
});

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));