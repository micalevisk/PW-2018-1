function Tabuleiro(largura, altura, borda = '2') {
  this.element = document.getElementById('tabuleiro');
  this.element.style.width  = largura + 'px';
  this.element.style.height = altura + 'px';
  this.element.style.borderWidth = borda + 'px';


  this.getWidth = () => parseInt(this.element.style.width);
  this.getHeight = () => parseInt(this.element.style.height);
}
