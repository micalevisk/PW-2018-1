/* ++++ utils */
const getRandom = max => Math.floor(Math.random() * max); // [0;max)
const incrementoCircular = (i, n) => (i+1)%n;
/* ---- utils */


const opcoes = ['Papel', 'Pedra', 'Tesoura']; // prioridade da esquerda pra direita
const listagemOpcoes = opcoes.map((curr, i) => `${i+1} - ${curr}`).join('\n');
const resultados = {
      0: 'A rodada empatou!',
      1: 'O computador ganhou!',
  '-1': 'Você ganhou!!'
};


function rodada(numRodada) {
  const qtdOpcoes = opcoes.length;

  console.log('-------------------');
  console.log(`Escolha sua [${numRodada}] Jogada:\n`+ listagemOpcoes);

  const strEscolhaUser = prompt('Escolha Sua Jogada (número entre 1 e 3)');
  const numEscolhaUser = parseInt(strEscolhaUser) - 1;
  if ( isNaN(numEscolhaUser)
    || numEscolhaUser < 0
    || numEscolhaUser >= qtdOpcoes ) return {next:false};

  const numEscolhaBot = getRandom(qtdOpcoes);
  console.log('o computador escolheu', opcoes[numEscolhaBot]);

  const numEscolhaUserNormalizada = incrementoCircular(numEscolhaUser, qtdOpcoes);
  const numEscolhaBotNormalizada  = incrementoCircular(numEscolhaBot, qtdOpcoes);

  const numResultado =  numEscolhaUserNormalizada - numEscolhaBotNormalizada;
  console.log(numEscolhaUserNormalizada, numEscolhaBotNormalizada);
  console.log(resultados[numResultado]);

  return {next:true, points:(numResultado < 0)};
}

function iniciarJogo() {

  let pontosUser = 0, numRodada = 1;
  let next;

  do {
    ({ next, points=0 } = rodada(numRodada++));
    pontosUser += points;
  } while (next);

  console.log('\nA sua pontuação foi de', pontosUser);

}
