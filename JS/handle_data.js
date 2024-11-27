function retrieve_data() {
    const paragrafo = document.getElementById("result");
    let data = paragrafo.textContent;

    console.log("Texto do resultado: ", data);

    const data_to_send = {
        message: data,
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
            console.log(data);
            document.getElementById("result").textContent = `${JSON.stringify(data)}`;
        })
        .catch(error => {
            console.log(error);
            document.getElementById("result").innerHTML = "Ocorreu um erro ao enviar os dados.";
        });
}