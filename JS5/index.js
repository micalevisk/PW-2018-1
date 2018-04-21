const QTD_BARRAS = 5;
const PREFIXO_BARRA = 'b';
const formGrafico = document.grafico;

const getBarra = n => document.getElementById(PREFIXO_BARRA + n);
const definirHeightEWidth = (numBarra, h, w) => {
  // Assumindo que não existe outro estilo sobre as DIVs:
  getBarra(numBarra).style.cssText = `height:${h}px; width:${w}px`;
  // Não sobrescreve outros estilos; 2 versões:
  /*
  Object.assign(getBarra(numBarra).style, {height: h + 'px', width: w + 'px'});
  */
  /*
  getBarra(numBarra).style.setProperty('height', h + 'px');
  getBarra(numBarra).style.setProperty('width', w + 'px');
  */
}

function atualizarGrafico() {
  const wbarras = formGrafico.wbarras.value;
  for (let i=1; i <= QTD_BARRAS; ++i)
    definirHeightEWidth(i, formGrafico[PREFIXO_BARRA + i].value.trim(), wbarras);
}

formGrafico.desenhar.onclick = function() {
  atualizarGrafico();
  return false;
}

// ----- EXTRA
const inputsText = document.querySelectorAll('input[type=text]');
Array.from(inputsText).forEach(input => {
  input.addEventListener('keyup', atualizarGrafico);
});
