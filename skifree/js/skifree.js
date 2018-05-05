import Tabuleiro from './models/Tabuleiro.js';
import Skier from './models/Skier.js';
import Arvore from './models/Arvore.js';

(function () {

  // ------------------------------------------------------------------ //
  const FPS  = 60;
  const TAMX = 400; // largura do tabuleiro (em pixels)
  const TAMY = 600; // altura do tabuleiro (em pixels)
  let gameOver = false;
  //                     0            1             2
  let direcoes = ['para-esquerda','para-frente','para-direita'];
  let arvores = [];
  let skier;
  let tabuleiro;
  let gameLoop;
  // ------------------------------------------------------------------ //


  function Skier() {
    this.direcao = 1; // para-frente
    this.element = document.getElementById("skier");

    this.element.style.position = "absolute";
    this.element.style.top = "60px";
    this.element.style.left = parseInt(TAMX/2) + "px";

    this.mudarDirecao = function (direcao) {
      if ((this.direcao + direcao >= 0) && (this.direcao + direcao <= 2)) {
        this.direcao += direcao;
        this.element.className = direcoes[this.direcao];
      }
    };

    this.andar = function () {
      // TODO: não deixar passar dos extremos laterais
      if (this.direcao === 0) // para-esquerda
        this.element
            .style.left = (parseInt(this.element.style.left, 10) - 1) + "px";

      else if (this.direcao === 2) // para-direita
        this.element
            .style.left = (parseInt(this.element.style.left, 10) + 1) + "px";
    }
  }

  function Tabuleiro() {
    this.element = document.getElementById("tabuleiro");
    this.element.style.width  = TAMX + "px";
    this.element.style.height = TAMY + "px";
  }

  function Arvore(tipo) {
    this.element = document.createElement("div");
    this.element.className = tipo;
    this.element.style.position = "relative";
    this.element.style.top = TAMY + "px";
    this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
    this.element.style.zIndex = 2000;

    tabuleiro.element.appendChild(this.element);

    this.subir = function () {
      this.element
          .style.top = (parseInt(this.element.style.top, 10) - 1) + "px";
    }

    this.remover = function () {
      if (parseInt(this.element.style.top, 10) < 0)
        tabuleiro.element.removeChild(this.element); // FIXME
    }
  }


  function initEventListeners() {
    // movimentar o skier
    window.addEventListener("keydown", e => {
      if (e.keyCode === 38 || e.keyCode === 40) return false;

      if (e.keyCode === 37 || e.key === 'a')      skier.mudarDirecao(-1);
      else if (e.keyCode === 39 || e.key === 'd') skier.mudarDirecao(+1);
    });
  }


  function run() {
    skier.andar();

    let random = Math.floor(Math.random() * 100);

    if (random === 1) {
      let arvore = new Arvore('arvore-normal');
      arvores.push(arvore);
    }

    arvores.forEach(arvore => {
      // TODO: remover a árvore da DOM quando ela ultrapassar a borda superior
      arvore.subir();
      arvore.remover();
    });
  }


  (function __init__() {
    skier = new Skier();
    tabuleiro = new Tabuleiro();

    initEventListeners();
    gameLoop = setInterval(run, 1000/FPS);
  }());

}());
