const PARADO   = ['parado-esquerda', 'parado-direita'];
const DIRECOES = ['para-esquerda','para-frente','para-direita'];

function Skier(tabuleiroWidth, posLeft, qtdVidas, posTop = 60) {
  this.direcao = 0;
  this.andando = false;
  this.iniciou = false;
  this.metrosAndados = 0;
  this.vidasRestantes = qtdVidas;

  this.element = document.getElementById('skier');
  this.element.style.position = 'absolute';
  this.element.style.top = posTop + 'px';
  this.element.style.left = posLeft + 'px';
  this.element.className = PARADO[0];


  this.iniciar = function () {
    this.iniciou = true;
    this.element.className = DIRECOES[ (this.direcao = 1) ];
  };

  this.setAndando = function (andando) {
    return this.andando = andando;
  };

  this.perderVida = function (qtdVidasPerdidas = 1) {
    return this.vidasRestantes -= qtdVidasPerdidas;
  };

  this.ganharVida = function (qtdVidasGanhas = 1) {
    return this.vidasRestantes += qtdVidasGanhas;
  };

  this.mudarDirecao = function (sentido) {
    if (!this.andando) {
      if (!this.iniciou) {
        if ((this.direcao + sentido >= 0)
         && (this.direcao + sentido < PARADO.length))
          this.element.className = PARADO[ (this.direcao += sentido) ];
      }

      return;
    }

    if ((this.direcao + sentido >= 0)
     && (this.direcao + sentido < DIRECOES.length))
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
