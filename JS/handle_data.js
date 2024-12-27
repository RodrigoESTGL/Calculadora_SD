function get_cookie(n) { //Dicionarios
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === n) {
            return value;
        }
    }

    return null;
}

function retrieve_data() {
    let paragrafo = document.getElementById("result");
    let data = paragrafo.textContent;
    let index;
    let numbers_split;
    let operators_match;
    let exponentFinal = {}; //Dicionario final enviado para o servidor

    let exponentsString = get_cookie("exponents");
    let negativesString = get_cookie("negatives");

    console.log("aaa:",negativesString);

    console.log("Paragrafo bruto: ", paragrafo);
    console.log("Texto do resultado: ", data);

    //Divide em numeros e operadores
    numbers_split = data.split(/[+\-x√/]/);
    operators_match = data.match(/[+\-x√/]/g);

    if (numbers_split === null) {
        numbers_split = [];
    }

    if (operators_match === null) {
        operators_match = [];
    }

    //Retira valores vazios

    if (numbers_split !== null) {
        numbers_split = numbers_split.filter(v => v != '');
    }
    
    if (operators_match !== null) {
        operators_match = operators_match.filter(v => v != '');
    }
    

    //Se tiver alguma raiz quadrada coloca um vazio nos numeros atras
    for (let i = 0; i < operators_match.length; i++) {
        if (operators_match[i] === '√') {
            numbers_split.splice(i, 0, '');
        }
    }

    console.log(numbers_split);
    console.log(operators_match);

    if (exponentsString) { //Se houver cookie de expoentes
        let exponents = JSON.parse(exponentsString);
        let contador = 0;

        for (const key in exponents) {
            for (let i = 0; i < numbers_split.length; i++) {
                contador += numbers_split[i].length;
                if (parseInt(key) <= contador) {
                    numbers_split[i] = numbers_split[i].slice(0, -1); //Elimina ultimo caractere
                    exponentFinal[i] = exponents[key]; //Atualiza o indice onde o expoente vai atuar
                    
                    console.log("Dicionario de expoentes finais atualizado: ", exponentFinal);
                    
                    break;
                }  
            }
            contador = 0;
        }
    }

    if (negativesString) { //Se houver cookie de negativos
        let negatives = JSON.parse(negativesString);

        console.log("Negative string: ", negatives);
        console.log("Negative string length: ", negatives.length);

        for (let i = 0; i < negatives.length; i++) {
            numbers_split[i] = "-" + numbers_split[i];
            operators_match.splice(i, 1);
        }
    }

    console.log("Numeros finais: ", numbers_split);
    console.log("Operadores finais: ", operators_match);
    console.log("Expoentes finais: ", exponentFinal);

    let data_to_send = {
        numbers: numbers_split,
        operators: operators_match,
        exponents: exponentFinal,
        timeStamp: new Date()
    };

    return data_to_send;
}

function fetch_and_send(data_to_send, endpoint) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_to_send)
    })
        .then(response => response.json())
        .then(data => {

            if (data.status === false) {
                //Mostra o erro parando tudo
                document.getElementById("result").textContent = data.message;
                document.getElementById("result").style.color = "red";
                document.body.style.pointerEvents = "none";
            
                //Espera 2 segundos para voltar ao normal
                setTimeout(() => {
                    document.getElementById("result").style.color = "black";
                    document.getElementById("result").textContent = "";
                    document.body.style.pointerEvents = "auto";
                }, 2000);
            } else {
                document.getElementById("result").textContent = `${JSON.stringify(data.message)}`;
            }

        })
        .catch(error => {
            console.log(error);
            alert("Ocorreu um erro ao enviar os dados. Verifique se o servidor está a rodar!")
        });
}