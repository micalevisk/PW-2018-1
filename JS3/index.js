const someFn = valInicial =>
  valIncremento => valInicial += valIncremento;

// Resultado esperado
const adicionar = someFn(1);
console.log('Primeira chamada', adicionar(3));
console.log('Segunda chamada', adicionar(1));
console.log('Terceira chamada', adicionar(5));
