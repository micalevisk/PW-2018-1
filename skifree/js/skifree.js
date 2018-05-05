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

  const infoBox = {

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

  }.init();
  // ------------------------------------------------------------------ //

  function setInnerHTMLbyDataset(el, text) {
    el.innerHTML = `<b>${el.dataset['label']}</b> ${text}`;
  }

  function initInfoBox() {
    infoBox.setFPS(FPS);
    infoBox.setAndado(0);
  }

  function initEventListeners() {
    // movimentar o skier
    window.addEventListener("keydown", e => {
      if (e.keyCode === 38 || e.keyCode === 40) return false;

      if (e.keyCode === 37 || e.key === 'a')      skier.mudarDirecao(-1);
      else if (e.keyCode === 39 || e.key === 'd') skier.mudarDirecao(+1);
    });
  }



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

    initInfoBox();
    initEventListeners();
    gameLoop = setInterval(run, 1000/FPS);
  }());

}());
