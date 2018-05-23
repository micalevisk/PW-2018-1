// Adaptado de (c) https://gist.github.com/mudge/5830382

const EventEmitter = function () {
  this._events = {};
};

// https://nodejs.org/api/events.html#events_emitter_emit_eventname_args
EventEmitter.prototype.emit = function (eventName, ...args) {
  if (typeof this._events[eventName] === 'object') {
    const listeners = this._events[eventName].slice();
    listeners.forEach(l => l.apply(this, args));
  }
};

// https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
EventEmitter.prototype.on = function (eventName, listener) {
  if (typeof this._events[eventName] !== 'object')
    this._events[eventName] = [];

  this._events[eventName].push(listener);
};

// https://nodejs.org/api/events.html#events_emitter_once_eventname_listener
EventEmitter.prototype.once = function (eventName, listener) {
  this.on(eventName, function g() {
      this.removeListener(eventName, g);
      listener.apply(this, arguments);
  });
};

// https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener
EventEmitter.prototype.removeListener = function (eventName, listener) {
  if (typeof this._events[eventName] === 'object') {
    const idx = this._events[eventName].indexOf(listener);

    if (idx > -1)
      this._events[eventName].splice(idx, 1);
  }
};
