
/**
 * Module dependencies.
 */

var bignum = require('bignum');

/**
 * Initialize new `BigBuffer`.
 */

function BigBuffer() {
  this.chunks = [];
  this.size = 0;
  this.offset = 0;
}

/**
 * Write to buffer.
 */

BigBuffer.prototype.write = function (data) {};

/**
 * Reset buffer.
 */

BigBuffer.prototype.reset = function () {};
