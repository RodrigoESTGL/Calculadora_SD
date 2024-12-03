const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/calculate', (req, res) => {
    const data = req.body;
    let str_eval = JSON.stringify(data.message);
    let calcStatus = false;
    let resultado;

    console.log('Dados recebidos:', data);
    console.log(str_eval);
    console.log(eval("6+5"));
    console.log(eval(str_eval));

    try {
        resultado = eval("2+2");
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