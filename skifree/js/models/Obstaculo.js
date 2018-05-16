function Obstaculo({ tipo, zIndex = 1, onCollision }) {
  if (!this.element) {
    this.element = document.createElement('div');
  }

  this.onCollision = onCollision;
  this.element.className = tipo;
  this.element.style.zIndex = zIndex;
}


Obstaculo.prototype.spawn = function (tabuleiro, tolerancia, initialTop) {
  tabuleiro.element.appendChild(this.element);

  this.element.style.top = initialTop + 'px';
  this.element.style.left = Math.floor(
    Math.random() * (tabuleiro.getWidth() - this.element.clientWidth + 1 + tolerancia)
  ) + this.element.clientWidth + 'px';
}

Obstaculo.prototype.subir = function () {
  const top = parseInt(this.element.style.top) - 1;

  if (top < -this.element.clientHeight) return false;

  this.element.style.top = top + 'px';
  return true;
}

// função construtora https://goo.gl/Wo5JS4
// alterando o prototype https://goo.gl/rmn2Rf
