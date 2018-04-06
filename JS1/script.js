const inicioTabela = `
  <div>
    <table border="1px">
    <tr>
      <th colspan="2">Produtos de {valor}</th>
    </tr>
`;

const fimTabela = '</table></div>';


for (let i=1; i < 11; ++i) {
  let meioTabela = '';

  for (let j=1; j < 11; ++j) {
    meioTabela += `
      <tr>
      <td><code>${i}x${j}</code></td>
      <td><code>${i*j}</code></td>
     </tr>`;
  }

  document.write(inicioTabela.replace('{valor}', i) + meioTabela + fimTabela);
}
