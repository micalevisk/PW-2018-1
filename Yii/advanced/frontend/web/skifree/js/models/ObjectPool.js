const QTD_MAX_OBJECTS_IN_USE = 20;

function ObjectPool(type) {
  this.objType = type;
  this._poolFree = []; // guarda as instâncias que não estão sendo usadas
  this._poolInUse = []; // guarda as instâncias que estão em uso

  // permitir uso do `for-of` Array-like
  // this[Symbol.iterator] = function () {
  //   return this._poolInUse[Symbol.iterator]();
  // }
}

ObjectPool.prototype.alloc = function (params) {
  if (this._poolFree.length <= 0) {
    // nenhum objeto a ser re-utilizado, então alocar um
    if (this._poolInUse.length >= QTD_MAX_OBJECTS_IN_USE) return; // definir um máximo de alocações
    this._poolInUse.push( new this.objType(params) )
    return this._poolInUse[ this._poolInUse.length - 1 ];
  }

  const reusedObj = this._poolFree.pop();
  this._poolInUse.push(reusedObj);
  reusedObj.constructor(params);
  return reusedObj;
}

ObjectPool.prototype.freeAt = function (idx) {
  const removedObj = this._poolInUse.splice(idx, 1)[0];
  this._poolFree.push(removedObj);
}

ObjectPool.prototype.forEach = function (cb) {
  this._poolInUse.forEach(cb);
}
