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
    this._poolInUse.push( new this.objType(params) )
    console.log(`in use: ${this._poolInUse.length}`);
    return this._poolInUse[ this._poolInUse.length - 1 ];
  }

  const reusedObj = this._poolFree.pop();
  this._poolInUse.push(reusedObj);
  console.log(`reused: ${this._poolFree.length} left`);
  reusedObj.constructor(params);
  return reusedObj;
}

ObjectPool.prototype.freeAt = function (idx) {
  const removedObj = this._poolInUse.splice(idx, 1)[0];
  this._poolFree.push(removedObj);
  console.log(`free: ${this._poolFree.length}`);
}

Object.prototype.forEach = function (cb) {
  this._poolInUse.forEach(cb);
}
