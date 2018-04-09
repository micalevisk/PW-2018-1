var opcoes = ['Papel', 'Pedra', 'Tesoura']; // prioridade da esquerda pra direita
var resultados = {
      0: 'A rodada empatou!',
      1: 'Você ganhou!',
  '-1': 'O computador ganhou!!',
  '-2': 'O computador ganhou!!'
}

var getRandom = max => Math.floor(Math.random() * max); // [0;max)
var incrementoCircular = (i, n) => (i+1)%n;
var listagemOpcoes = opcoes.map((curr, i) => `${i+1} - ${curr}`).join('\n');


function rodada(pontosUser) { // FIXME logica
  var qtdOpcoes = opcoes.length;

  console.log('-------------------');
  console.log('Escolha sua Jogada:\n' + listagemOpcoes);
  var numEscolhaUser = parseInt( prompt() ) - 1;
  if ( isNaN(numEscolhaUser) ) return {next:false, points:pontosUser};
  var numEscolhaBot = getRandom(qtdOpcoes);

  console.log('o bot escolheu', opcoes[numEscolhaBot]);
  //var numEscolhaUserNormalizada = incrementoCircular(numEscolhaUser, qtdOpcoes);
  //var numEscolhaBotNormalizada  = incrementoCircular(numEscolhaBot, qtdOpcoes);
  var numEscolhaUserNormalizada = numEscolhaUser;
  var numEscolhaBotNormalizada  = numEscolhaBot;


  var numResultado = numEscolhaUserNormalizada - numEscolhaBotNormalizada;
  console.log(numEscolhaUserNormalizada, numEscolhaBotNormalizada);
  console.log(resultados[numResultado]);
  return {next:true, points:pontosUser+(numResultado>0)}
}

(function (){

  var pontosUser = 0;
  do {
    var { next, points } = rodada(pontosUser);
    pontosUser += points;
    console.log('pontuação somada:', pontosUser)
  } while (next);

  console.log('\nA sua pontuação foi de', pontosUser);

})()
