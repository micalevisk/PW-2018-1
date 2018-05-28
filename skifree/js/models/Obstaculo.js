function Obstaculo({ tipo, zIndex = 1, onColission }) {
  if (!this.element) {
    this.element = document.createElement('div');
  }

  this.colisaoJaRegistrada = false;
  this.element.className = tipo;
  this.element.style.zIndex = zIndex;

  this.onColission = () => {
    // só executa se ainda não colidiu
    if (!this.colisaoJaRegistrada) {
      this.colisaoJaRegistrada = true;
      this.element.style.zIndex = 0; // vai para trás do skier
      onColission(this);
    }
  };
}


Obstaculo.prototype.spawn = function (tabuleiro, tolerancia, initialTop, initialLeft) {
  tabuleiro.element.appendChild(this.element);

  this.larguraTabuleiro = tabuleiro.getWidth();

  this.element.style.top = initialTop + 'px';
  this.element.style.left = (initialLeft || Math.floor(
    Math.random() * (tabuleiro.getWidth() - this.element.clientWidth + 1 + tolerancia)
  ) + this.element.clientWidth) + 'px';

  const minTop = parseInt( _.getCSSProperty(this.element, '--diff-min-top') );
  if ( _.isNumeric(minTop) ) {
    const maxTop = parseInt( _.getCSSProperty(this.element, '--diff-max-top') );
    const minLeft= parseInt( _.getCSSProperty(this.element, '--diff-min-left') );
    const maxLeft= parseInt( _.getCSSProperty(this.element, '--diff-max-left') );

    const topEstaEntre  = _.isNumberBetween(minTop, maxTop);
    const leftEstaEntre = _.isNumberBetween(minLeft, maxLeft);

    this.colidiu = function (targetTop, targetLeft) {
      return topEstaEntre(targetTop - parseInt(this.element.style.top))
          && leftEstaEntre(targetLeft - parseInt(this.element.style.left));
    }
  } else {
    this.colidiu = function () { return false; } // nop
  }
}

Obstaculo.prototype.subir = function (decremento) {
  const top = parseInt(this.element.style.top) - decremento;
  this.element.style.top = top + 'px';
  return (top > -this.element.clientHeight);
}

Obstaculo.prototype.sairDoTabuleiro = function () {
  this.element.style.top = - this.element.clientHeight + 'px';
}

Object.prototype.saiuDoTabuleiro = function () {
  const top  = parseInt(this.element.style.top);
  const left = parseInt(this.element.style.left);

  return (top <= -this.element.clientHeight)
      || (left >= this.larguraTabuleiro || left <= -this.element.clientWidth)
}

// função construtora https://goo.gl/Wo5JS4
// alterando o prototype https://goo.gl/rmn2Rf
