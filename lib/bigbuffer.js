
/**
 * Module dependencies.
 */

var bignum = require('bignum');

/**
 * Expose `BigBuffer`.
 */

module.exports = BigBuffer;

/**
 * Initialize new `BigBuffer`.
 */

function BigBuffer(options) {
  this.endian = (options && options.endian || 'BE').toUpperCase();
  this.encoding = (options && options.encoding || 'utf8');
  this.parts = [];
}

BigBuffer.prototype.create = function (size) {
  return new Buffer(size);
};

BigBuffer.prototype.write = function (data, encoding) {
  if ('string' === typeof data) return this.writeString(data, encoding);
  this.parts.push(data);
  return this;
};

BigBuffer.prototype.writeString = function (value, encoding) {
  var buf = new Buffer(value, encoding || this.encoding);
  return this.write(buf);
};

BigBuffer.prototype.writeUInt8 = function (value) {
  var buf = this.create(1);
  buf.writeUInt8(value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeUInt16 = function (value, endian) {
  var buf = this.create(2);
  buf['writeUInt16' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeUInt32 = function (value, endian) {
  var buf = this.create(4);
  buf['writeUInt32' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeUInt64 = function (value, endian) {
  var big = bignum(value);
  var buf = big.toBuffer({
    'endian': (endian ? endian.toUpperCase() : this.endian) === 'LE' ? 'little' : 'big'
  , 'size': 8
  });
  return this.write(buf);
};

BigBuffer.prototype.writeInt8 = function (value) {
  var buf = this.create(1);
  buf.writeInt8(value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeInt16 = function (value, endian) {
  var buf = this.create(2);
  buf['writeInt16' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeInt32 = function (value, endian) {
  var buf = this.create(4);
  buf['writeInt32' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeInt64 = function (value, endian) {
  var big = bignum(value);
  var buf = big.toBuffer({
    'endian': (endian ? endian.toUpperCase() : this.endian) === 'LE' ? 'little' : 'big'
  , 'size': 8
  });
  return this.write(buf);
};

BigBuffer.prototype.writeFloat = function (value, endian) {
  var buf = this.create(4);
  buf['writeFloat' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

BigBuffer.prototype.writeDouble = function (value, endian) {
  var buf = this.create(8);
  buf['writeDouble' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

BigBuffer.prototype.toBuffer = function () {
  return Buffer.concat(this.parts);
};
