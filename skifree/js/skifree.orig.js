const FPS = 1;  // Frames por segundo
const TAM = 40; // Número de campos do tabuleiro
var snake = {};
var gameLoop;

function init() {
    createBoard();
    createSnake();
    gameLoop = setInterval(run,1000 / FPS);
}

window.addEventListener("keydown", function(event) {
    if (event.keyCode==38) snake.mudarDirecao(0);
    if (event.keyCode==39) snake.mudarDirecao(1);
    if (event.keyCode==40) snake.mudarDirecao(2);
    if (event.keyCode==37) snake.mudarDirecao(3);
});

function createSnake() {

    var corpo = [[4,4],[4,5],[4,6]];
    var corsnake = "#111111";
    var corboard = "#EEEEEE";
    var direcao = 1; // 0=pracima; 1=direita; 2=prabaixo; 3=direita
    var comida = [10,10];
    var gameover = false;
    var vezes = 0;

    corpo.forEach(function(campo) {
        document.querySelector("#tabuleiro tr:nth-child("+campo[0]+") td:nth-child("+campo[1]+")").style.backgroundColor = corsnake;
    });

    document.querySelector("#tabuleiro tr:nth-child("+comida[0]+") td:nth-child("+comida[1]+")").style.backgroundColor = corsnake;

    snake.mudarDirecao = function(novaDirecao) {
        if (vezes>0 && direcao%2 != novaDirecao%2) {
            direcao = novaDirecao;
            vezes = 0;
        }
    }

    snake.endgame = function () {
        clearInterval(gameLoop);
        gameover = true;
        alert("Fim de jogo!");
    }

    snake.andar = function () {
        var cabeca = corpo[corpo.length-1];
        switch (direcao) {
            case 1: // direita
                add = [cabeca[0],cabeca[1]+1];
                break;
            case 3: // esquerda
                add = [cabeca[0],cabeca[1]-1];
                break;
            case 0: // pra cima
                add = [cabeca[0]-1,cabeca[1]];
                break;
            case 2: // pra baixo
                add = [cabeca[0]+1,cabeca[1]];
                break;
        }

        add.forEach(function(valor) {
            if (valor<1 || valor>TAM) snake.endgame();
        });

        corpo.forEach(function(parte) {
            if (parte.toString() == add.toString()) snake.endgame();
        });

        if (!gameover) {
            corpo.push(add);
            document.querySelector("#tabuleiro tr:nth-child("+add[0]+") td:nth-child("+add[1]+")").style.backgroundColor = corsnake;
            if (cabeca.toString() != comida.toString()) {
                rem = corpo.shift();
                document.querySelector("#tabuleiro tr:nth-child("+rem[0]+") td:nth-child("+rem[1]+")").style.backgroundColor = corboard;
            } else {
                do {
                    comida = [Math.floor(Math.random() * TAM) + 1, Math.floor(Math.random() * TAM) + 1];
                } while (corpo.indexOf(comida) != -1);
                document.querySelector("#tabuleiro tr:nth-child("+comida[0]+") td:nth-child("+comida[1]+")").style.backgroundColor = corsnake;
            }
        }

        vezes++;
    }
}

function run() {
    snake.andar();
}

function createBoard() {
    let tabuleiro = document.createElement("table");
    tabuleiro.setAttribute('id','tabuleiro');
    for (let row=0; row<TAM; row++) {
        let linha = document.createElement("tr");
        for (let col=0; col<TAM; col++) {
            let campo = document.createElement("td");
            linha.appendChild(campo);
        }
        tabuleiro.appendChild(linha);
    }
    document.body.appendChild(tabuleiro);
}

init();
