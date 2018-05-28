(function () {

  // ======================================================== //
  // ======================== VALUES ======================== //
  // ======================================================== //

  let skier, tabuleiro, gameLoop;

  const FPS  = 60;
  const TAMX = 400; // largura do tabuleiro (em pixels)
  const TAMY = 600; // altura do tabuleiro (em pixels)
  const QTD_INICIAL_VIDAS_SKIER = 3;
  let gameOver = false;
  let jogoPausado = true;
  const GAME_STATES = ['running', 'paused'];
  const obstaculos = new ObjectPool(Obstaculo);
  const probEObstaculo = [
    { prob: 1,  tipo: 'cogumelo', onColission: onCollisionObstaculoNaoDestrutor },
    { prob: 2,  tipo: 'arvore-normal' },
    { prob: 3,  tipo: 'arvore-2' },
    { prob: 4,  tipo: 'gif-cachorro-direita', zIndex: 2, afterSpawn: afterSpawnCachorro },
    { prob: 5,  tipo: 'gif-cachorro-esquerda', zIndex: 2, afterSpawn: afterSpawnCachorro },
    { prob: 7,  tipo: 'arvore-3' },
    { prob: 11, tipo: 'rocha' },
    { prob: 13, tipo: 'arvore-grande' },
    { prob: 29, tipo: 'neve-grande',  zIndex: 0 },
    { prob: 31, tipo: 'neve-pequena', zIndex: 0 },
    { prob: 41, tipo: 'gif-arbusto-chamas' }
  ];

  const infoBox = (function () {
    const element = document.getElementById('infoBox');

    return {
        fpsEl: element.querySelector('#fps'),
        andadoEl: element.querySelector('#andado'),
        vidasEl: element.querySelector('#vidas'),

        get andado() {
          return this.andadoEl.innerHTML;
        },

        set andado(metros) {
          this.andadoEl.innerHTML = metros.toFixed(2);
        },

        set fps(fps) {
          this.fpsEl.innerHTML = fps;
        },

        set vidas([ valor, tipo ]) {
          this.vidasEl.innerHTML = valor;
          this.vidasEl.classList.add('destaque-' + tipo);
          setTimeout(() => this.vidasEl.classList.remove('destaque-' + tipo), 300);
        }
    };
  }());


  // ======================================================== //
  // ======================== EVENTS ======================== //
  // ======================================================== //

  function onGameOver() {
    clearInterval(gameLoop);
    skier.setAndando(false);

    // TODO: se skier foi comido, deixar o yeti se animando

    setTimeout(() => {
      const reiniciar = confirm(`Game Over :(\nVocê Andou: ${infoBox.andado} metros!\nDeseja reiniciar o jogo?`);
      if (reiniciar) location.reload();
    }, 500);
  }

  function onCollisionObstaculoNaoDestrutor(obstaculo) {
    infoBox.vidas = [skier.ganharVida(), 'positivo'];
    obstaculo.element.classList.add('animado-spin');
    setTimeout(() => {
      obstaculo.sairDoTabuleiro();
    }, 500);
  }

  function onCollisionObstaculoDestrutor() {
    const skierVidasRestantes = skier.perderVida();
    infoBox.vidas = [skierVidasRestantes, 'negativo'];
    if (skierVidasRestantes > 0) skier.caido();
    else {
      skier.soterrado();
      onGameOver();
    }
  }

  function afterSpawnCachorro(obstaculo) {
    // para tratar as versões do cachorro olhando para direita e para esquerda
    const incremento = (obstaculo.element.className.includes('esquerda')) ? -1 : 1;

    // FIXME: ignora o estado do jogo, i.e., mesmo pausado, a alteração (abaixo) será realizada
    _.alterarAnimationNameApos(
      _.randomRange(2000, 7000),
      'cachorro-andando',
      obstaculo.element
    ).then(function () {
        const idIntervalObstaculo = setInterval(function () {
        if (jogoPausado) return;

        const leftCorrente = parseInt(obstaculo.element.style.left);
        const novoLeft = leftCorrente + incremento;

        obstaculo.element.style.left = novoLeft + 'px';
          if ( obstaculo.saiuDoTabuleiro() ) {
          _.removerAnimationName(obstaculo.element);
          obstaculo.sairDoTabuleiro();
          clearInterval(idIntervalObstaculo);
        }
      }, 1000/FPS);
    });
  }


  // ======================================================= //
  // ======================== INITS ======================== //
  // ======================================================= //

  function initInfoBox() {
    infoBox.fps = FPS;
    infoBox.andado = 0;
    infoBox.vidas = [QTD_INICIAL_VIDAS_SKIER];
  }

  function initEventListeners() {
    window.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.keyCode === 32) {
        jogoPausado = !jogoPausado;
        _.changeRootVariable('--game-state', GAME_STATES[+jogoPausado]);

        if (!skier.iniciou) skier.iniciar();
        skier.setAndando(!jogoPausado);
        return;
      }

      if (e.keyCode === 37 || e.key.toLocaleLowerCase() === 'a')      skier.mudarDirecao(-1);
      else if (e.keyCode === 39 || e.key.toLocaleLowerCase() === 'd') skier.mudarDirecao(+1);
    });
  }


  // ======================================================== //
  // ======================== OUTROS ======================== //
  // ======================================================== //

  function gerarObstaculos(qtd, opts) {
    const {
      tabuleiro,
      tipo,
      zIndex = 3,
      tolerancia,
      initialTop = TAMY,
      initialLeft,
      onColission = onCollisionObstaculoDestrutor,
      afterSpawn
    } = opts;

    for (let i = 1; i <= qtd; ++i) {
      const novo = obstaculos.alloc({tipo, zIndex: zIndex|0, onColission});
      if (novo) {
        novo.spawn(tabuleiro, tolerancia|0, initialTop / i, initialLeft);
        if (typeof afterSpawn === 'function') afterSpawn(novo);
      }
    }
  }

  function gameRunner() {
    if (jogoPausado) return;
    let random = Math.floor( _.randomRange(0, 1000) );

    infoBox.andado = skier.andar();

    obstaculos.forEach((obstaculo, idx) => {
      if ( obstaculo.subir() ) {
        return obstaculo.colidiu(...skier.getTopAndLeft())
            && obstaculo.onColission();
      }

      obstaculos.freeAt(idx); // "libera" o elemento alocado
    });

    probEObstaculo.find(({ prob, tipo, zIndex, onColission, afterSpawn }) => {
      if (random == prob) {
        gerarObstaculos(1, {tabuleiro, tipo,
                            zIndex, tolerancia: random/10,
                            onColission, afterSpawn});
        return true;
      }
    });
  }


  (function __init__() {
    const posInicialSkier = { x: parseInt(TAMX/2), y: 60 };

    tabuleiro = new Tabuleiro(TAMX, TAMY, 5);
    skier = new Skier(tabuleiro.getWidth(), posInicialSkier.x, posInicialSkier.y, QTD_INICIAL_VIDAS_SKIER);

    initInfoBox();
    initEventListeners();

    gerarObstaculos(1, {tabuleiro, tipo: 'placa-start', initialLeft: posInicialSkier.x - 50, initialTop: posInicialSkier.y });
    gerarObstaculos(4, {tabuleiro, tipo: probEObstaculo[8].tipo, zIndex: probEObstaculo[8].zIndex, initialTop: TAMY-300});
    gerarObstaculos(2, {tabuleiro, tipo: probEObstaculo[7].tipo, initialTop: TAMY-100});

    gameLoop = setInterval(gameRunner, 1000/FPS);
  }());

}());
