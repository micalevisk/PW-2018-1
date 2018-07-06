function Tabuleiro(largura, altura) {
  this.element = document.getElementById('container-jogo');
  _.changeRootVariable(_.CSS_VARIABLES.tabuleiroLargura, largura);
  _.changeRootVariable(_.CSS_VARIABLES.tabuleiroAltura, altura);
}

Tabuleiro.prototype.getWidth = function() {
  return parseInt(
    _.getRootVariable(_.CSS_VARIABLES.tabuleiroLargura)
  );
}

Tabuleiro.prototype.getHeight = function() {
  return parseInt(
    _.getRootVariable(_.CSS_VARIABLES.tabuleiroAltura)
  );
}
