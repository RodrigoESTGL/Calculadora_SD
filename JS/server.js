const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/calculate', (req, res) => {
    const data = req.body;
    let str_eval = JSON.stringify(data.message);
    let calcStatus = false;
    let resultado = 0;

    console.log('Dados recebidos:', data);
    console.log(str_eval);
    console.log(eval(str_eval));

    try {
        resultado = eval(str_eval);
        resultado2 = resultado;
        calcStatus = true;
    } catch(error) {
        resultado = error.message;
        calcStatus = false;
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