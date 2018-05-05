import Tabuleiro from './models/Tabuleiro.js';
import Skier from './models/Skier.js';
import Arvore from './models/Arvore.js';

(function () {

  // ------------------------------------------------------------------ //
  const FPS  = 60;
  const TAMX = 400; // largura do tabuleiro (em pixels)
  const TAMY = 600; // altura do tabuleiro (em pixels)
  let gameOver = false;
  let jogoPausado = true;
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
    window.addEventListener("keydown", e => {
      if (e.keyCode === 38 || e.keyCode === 40) return false;

      if (e.keyCode === 32) {
        jogoPausado = !jogoPausado;

        skier.setAndando(!jogoPausado);
        return;
      }

      if (e.keyCode === 37 || e.key === 'a')      skier.mudarDirecao(-1);
      else if (e.keyCode === 39 || e.key === 'd') skier.mudarDirecao(+1);
    });
  }


  function gameRunner() {
    if (jogoPausado) return;

    infoBox.setAndado( skier.andar() );
    let random = Math.floor(Math.random() * 100);

    if (random === 1) {
      arvores.push( new Arvore(tabuleiro, 'arvore-normal', TAMY) );
    }

    arvores.forEach(arvore => {
      // TODO: remover a árvore da DOM quando ela ultrapassar a borda superior
      arvore.subir();
      arvore.remover();
    });
  }


  (function __init__() {
    tabuleiro = new Tabuleiro(TAMX, TAMY, 5);
    skier = new Skier(tabuleiro.getWidth(), parseInt(TAMX/2));

    initInfoBox();
    initEventListeners();
    gameLoop = setInterval(gameRunner, 1000/FPS);
  }());

}());
