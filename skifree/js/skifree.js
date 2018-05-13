(function () {

  // ------------------------------------------------------------------ //
  const FPS  = 60;
  const TAMX = 400; // largura do tabuleiro (em pixels)
  const TAMY = 600; // altura do tabuleiro (em pixels)
  const QTD_INICIAL_VIDAS_SKIER = 3;
  let gameOver = false;
  let jogoPausado = true;
  const obstaculos = new ObjectPool(Obstaculo);
  let skier;
  let tabuleiro;
  let gameLoop;

  const infoBox = (function () {
    const element = document.getElementById('infoBox');

    return {
        fpsEl: element.querySelector('#fps'),
        andadoEl: element.querySelector('#andado'),
        vidasEl: element.querySelector('#vidas'),

        setAndado(metros) {
          this.andadoEl.innerHTML = metros.toFixed(2) + 'm';
        },
        setFPS(fps) {
          this.fpsEl.innerHTML = fps;
        },
        setVidas(vidasRestantes) {
          this.vidasEl.innerHTML = vidasRestantes;
        }
    };
  }());
  // ------------------------------------------------------------------ //

  function initInfoBox() {
    infoBox.setFPS(FPS);
    infoBox.setAndado(0);
    infoBox.setVidas(QTD_INICIAL_VIDAS_SKIER);
  }

  function initEventListeners() {
    window.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.keyCode === 32) {
        jogoPausado = !jogoPausado;

        if (!skier.iniciou) skier.iniciar();
        skier.setAndando(!jogoPausado);
        return;
      }

      if (e.keyCode === 37 || e.key === 'a')      skier.mudarDirecao(-1);
      else if (e.keyCode === 39 || e.key === 'd') skier.mudarDirecao(+1);
    });
  }

  function gerarObstaculos(qtd, { tabuleiro, tipo, zIndex, tolerancia, initialTop = TAMY }) {
    for (let i = 1; i <= qtd; ++i) {
      const novo = obstaculos.alloc({ tipo, zIndex });
      novo.spawn(tabuleiro, tolerancia || i, initialTop / i);
    }
  }

  function gameRunner() {
    if (jogoPausado) return;

    infoBox.setAndado( skier.andar() );

    let random = Math.floor(Math.random() * 1000);

    obstaculos.forEach((obstaculo, idx) => {
      if (!obstaculo.subir()) {
        obstaculos.freeAt(idx); // "libera" o elemento alocado
      }
    });

    probEObstaculo.find(({ prob, tipo, zIndex }) => {
      if (random === prob) {
        gerarObstaculos(1, { tabuleiro, tipo, zIndex, tolerancia: random });
        return true;
    }

    arvores.forEach(arvore => {
      if (!arvore.subir())
        arvoresRemovidas.push( arvores.shift() );
    });
  }


  (function __init__() {
    tabuleiro = new Tabuleiro(TAMX, TAMY, 5);
    skier = new Skier(tabuleiro.getWidth(), parseInt(TAMX/2), QTD_INICIAL_VIDAS_SKIER);

    initInfoBox();
    initEventListeners();
    gameLoop = setInterval(gameRunner, 1000/FPS);
  }());

}());
