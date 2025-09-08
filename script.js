let palavraEscolhida = "";
let dicaEscolhida = ""
let letrasCertas = [];
let letrasErradas = [];
let tentativasRestantes = 6;
let nivelDificuldade = ""

const modal = document.querySelector('.modal');
const btnFecharModal = document.querySelector('.btnFecharModal');

function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavrasComDicas.length);
    palavraEscolhida = palavrasComDicas[indice].palavra;
    dicaEscolhida = palavrasComDicas[indice].dica;
    nivelDificuldade = palavrasComDicas[indice].nivel;
}

function mostrarDica() {
    document.getElementById("dica").innerText = `Dica: ${dicaEscolhida}`;
    document.getElementById("nivelDificuldade").innerText = `Nível: ${nivelDificuldade}`;
}

function mostrarPalavra() {
    let display = "";
    for (let letra of palavraEscolhida) {
        if (letrasCertas.includes(letra)) {
            display += letra + " ";
        } else {
            display += "_ ";
        }
    }
    document.getElementById("palavra").innerText = display.trim();
}

function mostrarLetrasErradas() {
    document.getElementById("letrasErradas").innerText = "Letras erradas: " + letrasErradas.join(", ");
}

function mostrarTentativas() {
    document.getElementById("tentativas").innerText = `Tentativas restantes: ${tentativasRestantes}`;
}

function chutarLetra() {
    const input = document.getElementById("letraInput");
    const letra = input.value.toUpperCase();

    if (letra.length === 0) {
        alert("Digite uma letra.");
        return;
    }
    if (!/^[A-Z]$/.test(letra)) {
        alert("Digite apenas uma letra válida.");
        input.value = "";
        return;
    }
    if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) {
        alert("Você já tentou essa letra.");
        input.value = "";
        return;
    }

    if (palavraEscolhida.includes(letra)) {
        letrasCertas.push(letra);
        somAcerto.currentTime = 0
        somAcerto.play();
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
        somErro.currentTime = 0
        somErro.play();
    }

    input.value = "";
    input.focus();

    // Inicia o som de fundo na primeira interação
    if (somFundo.paused) {
        somFundo.currentTime = 0;
        somFundo.play();
    }

    atualizarJogo();
}

function verificarVitoria() {
    for (let letra of palavraEscolhida) {
        if (!letrasCertas.includes(letra)) {
            return false;
        }
    }
    return true;
}

function atualizarJogo() {
    mostrarPalavra();
    mostrarLetrasErradas();
    mostrarTentativas();

    if (verificarVitoria()) {
        document.querySelector('.modal').showModal();
        document.querySelector(".tituloModal").innerText = "Você venceu!";
        document.querySelector(".tituloModal").style.color = '#8db057';
        somFundo.pause()
        somVitoria.currentTime = 0
        somVitoria.play();
        finalizarJogo();

    } else if (tentativasRestantes <= 0) {
        document.querySelector('.modal').showModal();
        document.querySelector(".tituloModal").innerText = "Você perdeu!";
        document.querySelector(".tituloModal").style.color = '#e63946';
        document.querySelector(".textoModal").innerText = `A palavra era: ${palavraEscolhida}`;
        somFundo.pause()
        somDerrota.currentTime = 0
        somDerrota.play();
        finalizarJogo();
    }
}

//Modal
btnFecharModal.addEventListener('click', () => {
    modal.close();
    iniciarJogo()
});

function finalizarJogo() {
    document.getElementById("letraInput").disabled = true;
    document.querySelector("button").disabled = true;
}

function iniciarJogo() {
    letrasCertas = [];
    letrasErradas = [];
    tentativasRestantes = 6;
    document.querySelector(".tituloModal").innerText = "";
    document.querySelector(".textoModal").innerText = "";
    document.getElementById("letraInput").disabled = false;
    document.querySelector("button").disabled = false;
    escolherPalavra();
    mostrarDica();
    mostrarPalavra();
    mostrarLetrasErradas();
    mostrarTentativas();
    somFundo.play();
}

window.onload = iniciarJogo;

document.getElementById("ano-atual").innerText = new Date().getFullYear();
