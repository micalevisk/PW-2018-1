const _ = Object.freeze({
  isNumberBetween: (min, max) => x => x > min == x < max,

  isNumeric: (n) => !isNaN( parseFloat(n) ) && isFinite(n),

  getCSSProperty: function (elem, property) {
    return window.
              getComputedStyle(elem, null).
              getPropertyValue(property);
  },

  changeRootVariable: function (cssVarName, newValue) {
    document.documentElement.style.setProperty(cssVarName, newValue);
  },
});
