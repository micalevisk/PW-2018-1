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

  this.element.style.top = initialTop + 'px';
  this.element.style.left = (initialLeft || Math.floor(
    Math.random() * (tabuleiro.getWidth() - this.element.clientWidth + 1 + tolerancia)
  ) + this.element.clientWidth) + 'px';

  const minTop = parseInt( _.getCssProperty(this.element, '--diff-min-top') );
  if ( _.isNumeric(minTop) ) {
    const maxTop = parseInt( _.getCssProperty(this.element, '--diff-max-top') );
    const minLeft= parseInt( _.getCssProperty(this.element, '--diff-min-left') );
    const maxLeft= parseInt( _.getCssProperty(this.element, '--diff-max-left') );

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

Obstaculo.prototype.subir = function () {
  const top = parseInt(this.element.style.top) - 1;

  if (top < -this.element.clientHeight) return false;

  this.element.style.top = top + 'px';
  return true;
}

Obstaculo.prototype.sairDoTabuleiro = function () {
  this.element.style.top = - this.element.clientHeight;
}

// função construtora https://goo.gl/Wo5JS4
// alterando o prototype https://goo.gl/rmn2Rf
