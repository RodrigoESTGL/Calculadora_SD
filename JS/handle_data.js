function retrieve_data() {
    let paragrafo = document.getElementById("result");
    let data = paragrafo.textContent;

    console.log("Texto do resultado: ", data);

    let numbers_split = data.split(/[+-/x]/);
    let operators_match = data.match(/[+\-x/]/g);

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
            document.getElementById("result").innerHTML = "Ocorreu um erro ao enviar os dados.";
        });
}