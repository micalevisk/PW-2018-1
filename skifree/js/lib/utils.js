const _ = Object.freeze({
  isNumberBetween: (min, max) => x => x > min == x < max,

  isNumeric: (n) => !isNaN( parseFloat(n) ) && isFinite(n),

  randomRange: (min, max) => Math.random() * (max - min) + min,

  // mantém animações já iniciadas
  removerAnimationName: (el) => el.style.setProperty('animation-name', ''),

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
});
