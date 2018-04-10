/* ++++ utils */
const getRandom = max => Math.floor(Math.random() * max); // [0;max)
const incrementoCircular = (i, n) => (i+1)%n;
/* ---- utils */


const opcoes = ['Papel', 'Pedra', 'Tesoura']; // prioridade da esquerda pra direita
const cores  = ['#c0dd95', '#e55c00', '#4ba2ca'];

const listagemOpcoes = opcoes.map((curr, i) => [`%c${i+1} - ${opcoes[i]}`, `font-weight:bold;color:${cores[i]}`])
const printEscolha = (text, numChoice) => console.log(text + ' %c' + opcoes[numChoice], `color:${cores[numChoice]};`);

const resultados = {
  '-2': ['O computador ganhou!', '#800000'],
  '-1': ['Você ganhou!', '#008000'],
     0: ['A rodada empatou!', '#807e00'],
     1: ['O computador ganhou!', '#800000'],
     2: ['Você ganhou!', '#008000']
};


function rodada(numRodada) {
  const qtdOpcoes = opcoes.length;

  console.info(`%c>> Escolha sua (${numRodada}) Jogada:`, 'font:1.5em italic comic sans;color:hotpink');
  listagemOpcoes.forEach(xs => console.log(...xs))

  const strEscolhaUser = prompt('Escolha Sua Jogada (inteiro entre 1 e 3)');
  const numEscolhaUser = parseInt(strEscolhaUser) - 1;
  if ( isNaN(numEscolhaUser)
    || numEscolhaUser < 0
    || numEscolhaUser >= qtdOpcoes ) return {next:false};

  const numEscolhaBot = 2;//getRandom(opcoes.length);

  printEscolha('você escolheu', numEscolhaUser);
  printEscolha('o computador escolheu', numEscolhaBot);

  const numEscolhaUserNormalizada = incrementoCircular(numEscolhaUser, qtdOpcoes);
  const numEscolhaBotNormalizada  = incrementoCircular(numEscolhaBot, qtdOpcoes);
  const numResultado = numEscolhaUserNormalizada - numEscolhaBotNormalizada;
  console.log('%c' + resultados[numResultado][0],
             `background:${resultados[numResultado][1]};color:white;display:block;`);

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
