const DIRECOES_YETI = _.criarConstante(['direita', 'esquerda']);

function Yeti(tabuleiro, aposComer) {
  this.element = document.createElement('div');
  this.spawnRealizado = false;
  this.colisaoJaRegistrada = false;
  this.saiuDoTabuleiro = true;
  this.tabuleiroEl = tabuleiro.element;
  this.larguraTabuleiro = tabuleiro.getWidth();
  this.alturaTabuleiro = tabuleiro.getHeight();

  this.element.className = 'gif-yeti-comemorando';
  this.element.style.zIndex = 2;

  this.onColission = function () {
    if (!this.colisaoJaRegistrada) {
      this.element.className = 'gif-yeti';
      this.element.style.setProperty('animation-name', 'yeti-comendo-1');

      // FIXME: ignora o estado (pausado ou não) do jogo
      setTimeout(() => {
        _.removerAnimationName(this.element);
        this.element.className = 'gif-yeti-comemorando';
      }, 1000);
    }
  }
}

Yeti.prototype.mudarDirecao = function (sentido) {
  this.element.style.setProperty('animation-name', 'yeti-andando-' + DIRECOES_YETI[sentido]);
}

Yeti.prototype.spawn = function (skierCurrTop, skierCurrLeft) {
  if (!this.spawnRealizado) {
    this.spawnRealizado = true;
    this.saiuDoTabuleiro = false;
    this.tabuleiroEl.appendChild(this.element);

    const sentido = Math.floor( _.randomRange(0, 2) );
    this.mudarDirecao(sentido);
    this.incrementoLeft = (sentido - 1 || 1) * -2;

    const minTop = parseInt( _.getCSSProperty(this.element, '--diff-min-top') );
    const maxTop = parseInt( _.getCSSProperty(this.element, '--diff-max-top') );
    const minLeft= parseInt( _.getCSSProperty(this.element, '--diff-min-left') );
    const maxLeft= parseInt( _.getCSSProperty(this.element, '--diff-max-left') );

    const topEstaEntre  = _.isNumberBetween(minTop, maxTop);
    const leftEstaEntre = _.isNumberBetween(minLeft, maxLeft);

    this.colidiu = function (targetTop, targetLeft) {
      return topEstaEntre(targetTop - parseInt(this.element.style.top))
          && leftEstaEntre(targetLeft - parseInt(this.element.style.left));
    }
  } else if (!this.saiuDoTabuleiro) return;

  this.velocidade = Math.floor( _.randomRange(10, 28) );

  this.element.style.top = - this.element.clientHeight + 'px';
  this.element.style.left= skierCurrLeft - _.randomRange(50, 70) + 'px';
}

Yeti.prototype.estaAbaixoTabuleiro = function () {
  return parseInt(this.element.style.top) >= this.alturaTabuleiro;
}

Yeti.prototype.descer = function () {
  if (!this.spawnRealizado) return false;
  if (this.estaAbaixoTabuleiro()) {
    this.spawnRealizado = false;
    return;
  }

  const currTop = parseInt(this.element.style.top);
  const currLeft  = parseInt(this.element.style.left);

  // ir para a direita
  if (currLeft <= 5) {
    this.mudarDirecao(0);
    this.incrementoLeft = 2;
  } else if (currLeft >= 350) {
    this.mudarDirecao(1);
    this.incrementoLeft = -2;
  }

  this.element.style.top = currTop + 1 + 'px';
  this.element.style.left= currLeft + this.incrementoLeft + 'px';

  return true;
}
