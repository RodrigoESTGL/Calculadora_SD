
var menuIntem = document.querySelectorAll('.itens-menu');
var historyContent = document.querySelector('#history-content');
var aboutContent = document.querySelector('#about-content');
var technologyContent = document.querySelector('#technology-content')

// Função para esconder conteúdo
function hideContent() {
    historyContent.innerHTML = ''; 
    aboutContent.innerHTML = '';
    technologyContent.innerHTML = '';
}

function selectlink(){
    menuIntem.forEach((item)=>
    item.classList.remove('classON') //Vai remover de forma dinamica uma classe de um intem que no caso será o (menu)
    );
    this.classList.add('classON');

    hideContent();

    //Obter o texto do link clicado 
    var linkText = this.querySelector('.txt-link').textContent.toLowerCase();
    var dynamicContentN;

    if (linkText === 'history') {
        //Lógica para as informações do banco de dados. 
        dynamicContentN = this.querySelector('#history-content');
        get_history(dynamicContentN);
    } else if (linkText === 'technology') {
        dynamicContentN = this.querySelector('#technology-content');
        dynamicContentN.innerHTML = "<p><b>Front-End:</b> HTML,CSS e JavaScript<br><b>Back-End:</b> Express.js e JSON<br><b>»</b> Docker e Base de dados (PostgreSQL)</p>";
    }else if (linkText === 'about') {
        dynamicContentN = this.querySelector('#about-content');
        dynamicContentN.innerHTML = "<p>Esta é uma calculadora simples que permite realizar operações matemáticas básicas.</li> <br><br><b>Grupo:</b> Rodrigo Siqueira, Ricardo Cunha e Ronilson Gomes</li></p>";
    }

}

//Aguarda um evento especifico para executar o evento
menuIntem.forEach((item)=>
    item.addEventListener('click',selectlink)
);

//Expandir menu 
var btn_List = document.querySelector('#btn-list');
var sideMenu = document.querySelector('.side-menu');

btn_List.addEventListener('click', function(){
    sideMenu.classList.toggle('expandir')

    if(!sideMenu.classList.contains('expandir')){
        hideContent();
    }
})