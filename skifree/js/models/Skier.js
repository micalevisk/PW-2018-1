//                     0            1             2
const DIRECOES = ['para-esquerda','para-frente','para-direita'];

export default function Skier(tabuleiroWidth, posLeft, posTop = 60) {
  this.direcao = 1;
  this.andando = false;
  this.metrosAndados = 0;

  this.element = document.getElementById('skier');
  this.element.style.position = 'absolute';
  this.element.style.top = posTop + 'px';
  this.element.style.left = posLeft + 'px';


  this.setAndando = function(andando) {
    this.andando = andando;
  };

  this.mudarDirecao = function (sentido) {
    if ((this.direcao + sentido >= 0)
     && (this.direcao + sentido <= 2))
      this.element.className = DIRECOES[ (this.direcao += sentido) ];
  };

  this.andar = function () {
    if (!this.andando) return 0; // jogo pausado ou não iniciado

    const valueLeft = parseInt(this.element.style.left);

    if ((this.direcao === 0)
     && (valueLeft > 0))
      this.element.style.left = (valueLeft - 1) + 'px';

    else if ((this.direcao === 2)
          && (valueLeft < tabuleiroWidth - this.element.clientWidth))
      this.element.style.left = (valueLeft + 1) + 'px';

    // TODO: retornar quantidade de metros andados
    return this.metrosAndados += 0.05;
  }
}