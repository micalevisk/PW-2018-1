const _ = Object.freeze({
  //#region configs globais
  CSS_VARIABLES: {
    gameState: '--game-state',
    tabuleiroLargura: '--tabuleiro-largura',
    tabuleiroAltura: '--tabuleiro-altura',
    splashBlur: '--splash-blur',
    splashVisibility: '--splash-visibility',
  },
  //#endregion

  isNumberBetween: (min, max) => x => x > min == x < max,

  isNumeric: (n) => !isNaN( parseFloat(n) ) && isFinite(n),

  randomRange: (min, max) => Math.random() * (max - min) + min,

  // mantém animações já iniciadas
  removerAnimationName: (el) => el.style.setProperty('animation-name', ''),

  incrementarCircular: (i, max) => (i + 1) % max,

  criarConstante: (o) => Object.freeze(o),

  alterarAnimationNameApos: function (timeMs, novoNome, el) {
    return new Promise((resolve) => {
      setTimeout(() => {
        el.style.setProperty('animation-name', novoNome);
        resolve();
      }, timeMs);
    });
  },

  getCSSProperty: function (elem, property) {
    return window.
              getComputedStyle(elem, null).
              getPropertyValue(property);
  },

  changeRootVariable: function (cssVarName, newValue) {
    document.documentElement.style.setProperty(cssVarName, newValue);
  },

  getRootVariable: function (cssVarName) {
    return document.documentElement.style.getPropertyValue(cssVarName);
  },
});
