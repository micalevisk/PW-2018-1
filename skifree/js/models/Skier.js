const PARADO      = _.criarConstante(['parado-esquerda', 'parado-direita']);
const DIRECOES    = _.criarConstante(['para-esquerda', 'para-frente', 'para-direita']);
const VELOCIDADES = _.criarConstante([20, 50]); // em metros por segundo

const incrementoParaVelocidade = (velocidade) => (16 / 1000) * velocidade;
//                                               ^^^^^^^^^^^ ~ 1000/60


function Skier(tabuleiroWidth, posLeft, posTop, qtdVidas) {
  this.direcao = 0;
  this.andando = false;
  this.iniciou = false;
  this.metrosAndados = 0;
  this.vidasRestantes = qtdVidas;
  this.velocidade = { i: 0, value: VELOCIDADES[0] };

  this.element = document.getElementById('skier');
  this.element.style.position = 'absolute';
  this.element.style.top = posTop + 'px';
  this.element.style.left = posLeft + 'px';
  this.element.style.zIndex = 2;
  this.element.className = PARADO[0];


  this.andar = function () {
    if (!this.andando) return 0; // jogo pausado ou não iniciado

    const valueLeft = parseInt(this.element.style.left);

    if (this.direcao === 0)
      if (valueLeft > 0)
        this.element.style.left = (valueLeft - 1) + 'px';
      else
        this.mudarDirecao(+1);

    else if (this.direcao === 2)
      if (valueLeft < tabuleiroWidth - this.element.clientWidth)
        this.element.style.left = (valueLeft + 1) + 'px';
      else
        this.mudarDirecao(-1);

    return this.metrosAndados += incrementoParaVelocidade(this.velocidade.value);
  };
}


Skier.prototype.getTopAndLeft = function () {
  return [
    parseInt(this.element.style.top),
    parseInt(this.element.style.left)
  ];
}

Skier.prototype.iniciar = function () {
  this.iniciou = true;
  this.element.className = DIRECOES[ (this.direcao = 1) ];
};

Skier.prototype.setAndando = function (andando) {
  return this.andando = andando;
};

Skier.prototype.perderVida = function (qtdVidasPerdidas = 1) {
  return this.vidasRestantes -= qtdVidasPerdidas;
};

Skier.prototype.ganharVida = function (qtdVidasGanhas = 1) {
  return this.vidasRestantes += qtdVidasGanhas;
};

Skier.prototype.mudarDirecao = function (sentido) {
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

Skier.prototype.caido = function () {
  const lastSprite = this.element.className;
  this.element.className = 'caido-frente';
  setTimeout(() => this.element.className = lastSprite, 400);
}

Skier.prototype.soterrado = function () {
  this.element.className = 'caido-soterrado';
}

Skier.prototype.getVelocidade = function () {
  return this.velocidade.value;
}

Skier.prototype.toggleVelocidade = function () {
  this.velocidade.i = _.incrementarCircular(
    this.velocidade.i,
    VELOCIDADES.length
  );

  this.velocidade.value = VELOCIDADES[this.velocidade.i];
}
