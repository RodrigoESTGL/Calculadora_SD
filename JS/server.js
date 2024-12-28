const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

const { Pool } = require('pg'); //Conector com o Postgre

const pool = new Pool({ //Mudar aqui
    user: 'rrr',
    host: 'localhost',
    database: 'Calculadora',
    password: 'rrr',
    port: 5432,
});

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


// Endpoint para conectar a base de dados
app.get('/connect-db', (req, res) => {
    pool.query('SELECT NOW()', (err, result) => {
        if (err) {
            console.error('Erro ao conectar ao PostgreSQL:', err);
            res.status(500).send('Erro ao conectar a base de dados');
        } else {
            console.log('Conexão bem-sucedida. Hora atual:', result.rows[0].now);
            res.send(`Conexão bem-sucedida. Hora atual: ${result.rows[0].now}`);
        }
    });
});

//Endpoint para inserir dados no histórico
app.post('/insert-history', async (req, res) => {
    
    const {op, timeStamp} = req.body;

    console.log("Operaçáo:", op);
    console.log("Time:", timeStamp);

    if (!op || !timeStamp) {
        return res.status(400).send('Os campos op e timestamp são obrigatórios.');
      }

    try {
        const query = 'INSERT INTO public."Operacoes"("op") VALUES ($1);';
        const values = [op];

        console.log(query);

        await pool.query(query, values);

        res.status(201).json({ message: 'Operação inserida com sucesso!' });
    } catch (err) {
        console.error("Erro ao inserir a operação:", err);
        res.status(500).send("Erro na inserção da operação.");
    }
});

//Endpoint para ir buscar dados do histórico
app.get('/get-history', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public."Operacoes" ORDER BY "id" DESC LIMIT 5'); //Mudar o nome da tabela aqui
        
        res.json(result.rows); // result.rows contém os dados retornados
      } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao obter o histórico.');
      }
});

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