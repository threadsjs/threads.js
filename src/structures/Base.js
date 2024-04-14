'use strict';

/**
 * Represents a data model.
 * @abstract
 */
class Base {
  constructor(client) {
    /**
     * The client that instantiated this
     * @name Base#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'client', { value: client });
  }

  valueOf() {
    return this.id;
  }
}

module.exports = Base;