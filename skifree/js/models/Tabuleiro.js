function Tabuleiro(largura, altura, borda = '2') {
  this.element = document.getElementById('tabuleiro');
  this.element.style.width  = largura + 'px';
  this.element.style.height = altura + 'px';
  this.element.style.borderWidth = borda + 'px';


  this.getWidth = () => largura;
}
