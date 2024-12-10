function retrieve_data() {
    let paragrafo = document.getElementById("result");
    let data = paragrafo.textContent;
    let index;

    console.log("Texto do resultado: ", data);

    //Divide em numeros e operadores
    let numbers_split = data.split(/[+-/x√]/);
    let operators_match = data.match(/[+\-x√/]/g);

    //Retira valores vazios
    numbers_split = numbers_split.filter(v => v != '')
    operators_match = operators_match.filter(v => v != '')

    //Se tiver alguma raiz quadrada coloca um vazio nos numeros atras
    for (let i = 0; i < operators_match.length; i++) {
        if (operators_match[i] === '√') {
            numbers_split.splice(i, 0, '');
        }
    }

    if (numbers_split === null) {
        numbers_split = [];
    }

    if (operators_match === null) {
        operators_match = [];
    }

    console.log(numbers_split);
    console.log(operators_match);

    let data_to_send = {
        numbers: numbers_split,
        operators: operators_match,
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