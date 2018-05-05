export default function Arvore(tabuleiro, tipo, initialPosTop, zIndex = 200) {
  this.element = document.createElement('div');
  this.element.className = tipo;
  tabuleiro.element.appendChild(this.element);

  this.element.style.zIndex = zIndex;
  this.element.style.top = initialPosTop + 'px';

  const maxLeft = tabuleiro.getWidth() - this.element.clientWidth;
  const maxTop  = -this.element.clientHeight;

  this.element.style.left = Math.floor( Math.random() * maxLeft ) + 'px';


  this.subir = function () {
    const top = parseInt(this.element.style.top) - 1;

    if (top < maxTop) return false;

    this.element.style.top = top + 'px';
    return true;
  }
}
