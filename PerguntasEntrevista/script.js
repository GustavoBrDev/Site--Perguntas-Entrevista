let botaoCorreto = '';
let contadorPergunta = 1;
let respostasCertas = 0;
let pergunta = '';
let esperandoResposta = false; 

const textoPergunta = document.getElementById('pergunta');
const textoContador = document.getElementById('numero');

window.onload = function () {

    if ( localStorage.getItem('contador') == null ){
        localStorage.setItem('contador', 1);
    }

    if ( localStorage.getItem('respostas') == null ){
        localStorage.setItem('respostas', 0);
    }

    escolherPergunta();
    exibirPergunta();
};

function escolherPergunta() {
    
    contadorPergunta = parseInt(localStorage.getItem('contador'));
    
    switch (contadorPergunta) {
        case 1:
            pergunta = "Quais são suas forças?";
            botaoCorreto = "botao1";
            break;
        case 2:
            pergunta = "Quais seus objetivos de carreira?";
            botaoCorreto = "botao3";
            break;
        case 3:
            pergunta = "Por que eu devo te contratar?";
            botaoCorreto = "botao4";
            break;
        case 4:
            pergunta = "Me fale sobre sua formação acadêmica";
            botaoCorreto = "botao2"; 
            break;
        case 5:
            pergunta = "Conte sobre uma realização sua que te dá orgulho.";
            botaoCorreto = "botao2";
            break;
        case 6:
            pergunta = "Como você lidaria com um cliente irritado?";
            botaoCorreto = "botao1"; 
            break;
        case 7:
            pergunta = "Quem são nossos competidores?";
            botaoCorreto = "botao4";
            break;
        case 8:
            pergunta = "Quais são as três coisas que seu ex-gerente gostaria que você melhorasse?";
            botaoCorreto = "botao2"; 
            break;
        case 9:
            pergunta = "Você possui alguma pergunta para fazer a mim?";
            botaoCorreto = "botao4";
            break;
        case 10:
            pergunta = "Onde você se vê em cinco anos? E em dez?";
            botaoCorreto = "botao3";
            break;
        case 11:
            pergunta = "O que você pensa em fazer nos seus primeiros 30/60/90 dias nesse novo emprego?";
            botaoCorreto = "botao3";
            break;
        case 12:
            pergunta = "Por que existe um intervalo entre esse seu emprego e outro?";
            botaoCorreto = "botao2";
            break;
    }
}

function exibirPergunta() {
    textoPergunta.textContent = pergunta;
    textoContador.textContent = contadorPergunta;
}

function enviarResposta() {
    if (esperandoResposta) return;
    
    respostasCertas = localStorage.getItem('respostas');

    esperandoResposta = true; 

    let botao = document.getElementById(event.target.id);
    let botaoCerto = document.getElementById(botaoCorreto);
    let certo = true;

    if (event.target.id === botaoCorreto) {
        respostasCertas++;
        localStorage.setItem('respostas', respostasCertas);
        botao.classList.add('correto');
        certo = true;
    } else {
        botao.classList.add('errado');
        botaoCerto.classList.add('esperado');
        certo = false;
    }

    setTimeout(() => {
        contadorPergunta++;
        localStorage.setItem( 'contador', contadorPergunta );
        if (contadorPergunta <= 12) {  
            escolherPergunta();   
            exibirPergunta();    
        }

        if (certo) {
            botao.classList.remove('correto');
        } else {
            botao.classList.remove('errado');
            botaoCerto.classList.remove('esperado');
        }

        esperandoResposta = false;
        
        if ( contadorPergunta == 13 ){

            setTimeout ( () => {
                // Mostrar o modal com a quantidade de respostas corretas
                let resultadoTexto = document.getElementById('resultadoTexto');
                resultadoTexto.textContent = "Você acertou " + respostasCertas + " de 12 perguntas!";
                let modal = document.getElementById('resultadoModal');
                modal.style.display = "block";
            }, 1000);
        }

    }, 2000); 
}

function resetarRespostas (){

    localStorage.setItem('contador', 1);
    localStorage.setItem('respostas', 0);
    escolherPergunta();
    exibirPergunta();

}

document.querySelector('.close').onclick = function() {
    document.getElementById('resultadoModal').style.display = "none";
};
