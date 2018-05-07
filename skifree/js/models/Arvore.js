function Arvore(tabuleiro, tipo, initialPosTop, element, zIndex = 200) {
  if (element) {
    this.element = element;
  } else {
    this.element = document.createElement('div');
    tabuleiro.element.appendChild(this.element);
  }

  this.element.className = tipo;
  this.element.style.zIndex = zIndex;
  this.element.style.top = initialPosTop + 'px';

  this.element.style.left = Math.floor(
    Math.random() * (tabuleiro.getWidth() - this.element.clientWidth)
  ) + 'px';
}

Arvore.prototype.subir = function () {
  const top = parseInt(this.element.style.top) - 1;

  if (top < -this.element.clientHeight) return false;

  this.element.style.top = top + 'px';
  return true;
}

// função construtora https://goo.gl/Wo5JS4
// alterando o prototype https://goo.gl/rmn2Rf
