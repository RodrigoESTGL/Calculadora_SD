
var menuIntem = document.querySelectorAll('.itens-menu');
var historicContent = document.querySelector('#historic-content');
var aboutContent = document.querySelector('#about-content');

// Função para esconder conteúdo
function hideContent() {
    historicContent.innerHTML = ''; 
    aboutContent.innerHTML = '';
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

    if (linkText === 'historic') {
        //Lógica para as informações do banco de dados. 
        dynamicContentN = this.querySelector('#historic-content');
        dynamicContentN.innerHTML = "<p>Histórico das operações</p>";
    } else if (linkText === 'about') {
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
var sideMenu = document.querySelector('.side-menu')

btn_List.addEventListener('click', function(){
    sideMenu.classList.toggle('expandir')

    if(!sideMenu.classList.contains('expandir')){
        hideContent();
    }
})