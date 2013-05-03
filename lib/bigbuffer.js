
/**
 * Module dependencies.
 */

var bignum = require('bignum');

/**
 * Initialize new `BigBuffer`.
 */

function BigBuffer(data) {
  this.chunks = [];
  this.size = 0;
  this.offset = 0;
  if (data) this.write(data);
}

/**
 * Write to buffer.
 */

BigBuffer.prototype.write = function (data) {
  var buf = new Buffer(data);
  this.chunks.push(buf);
  this.size = buf.length;
  return this;
};

/**
 * Reset buffer.
 */

BigBuffer.prototype.reset = function () {
  this.chunks.length = 0;
  this.size = 0;
  this.offset = 0;
};

/**
 * Return buffer.
 */

BigBuffer.prototype.toBuffer = function () {
  return Buffer.concat(this.parts);
};
