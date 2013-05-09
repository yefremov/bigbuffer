
/**
 * Module dependencies.
 */

var bignum = require('bignum');

/**
 * Expose `BigBuffer`.
 */

module.exports = BigBuffer;

/**
 * Initialize new `BigBuffer` with `options`.
 */

function BigBuffer(options) {
  this.endian = null;
  this.encoding = null;
  this.parts = [];
  this.size = 0;
  this.offset = 0;
  this.buffer = null;
  this.reset(options);
}

/**
 * Return empty buffer placeholder with specified `size`.
 */

BigBuffer.prototype.create = function (size) {
  return new Buffer(size);
};

/**
 * Reset internal buffer with `options`.
 */

BigBuffer.prototype.reset = function (options) {
  this.endian = (options && options.endian || 'BE').toUpperCase();
  this.encoding = (options && options.encoding || 'utf8');
  this.parts.length = 0;
  this.size = 0;
  this.offset = 0;
  this.buffer = this.create(0);
};

/**
 * Read data chunk from current internal buffer.
 */

BigBuffer.prototype.read = function (size) {
  if (this.size !== this.buffer.length) this.toBuffer();
  return this.buffer.slice(this.offset, this.offset += size);
};

/**
 * Read unsigned 8-bit integer.
 */

BigBuffer.prototype.readUInt8 = function () {
  var buf = this.read(1);
  return bignum.fromBuffer(buf);
};

/**
 * Read unsigned 16-bit integer with specified `endian` format.
 */

BigBuffer.prototype.readUInt16 = function (endian) {
  var buf = this.read(2);
  return bignum.fromBuffer(buf, {
    'endian': (endian ? endian.toUpperCase() : this.endian)
  });
};

/**
 * Read unsigned 32-bit integer with specified `endian` format.
 */

BigBuffer.prototype.readUInt32 = function (endian) {
  var buf = this.read(4);
  return bignum.fromBuffer(buf, {
    'endian': (endian ? endian.toUpperCase() : this.endian)
  });
};

/**
 * Read unsigned 64-bit integer with specified `endian` format.
 */

BigBuffer.prototype.readUInt64 = function (endian) {
  var buf = this.read(8);
  return bignum.fromBuffer(buf, {
    'endian': (endian ? endian.toUpperCase() : this.endian)
  });
};

/**
 * Read signed 8-bit integer.
 */

BigBuffer.prototype.readInt8 = function () {
  var buf = this.read(1);
  return buf.readInt8(0);
};

/**
 * Read unsigned 16-bit integer with specified `endian` format.
 */

BigBuffer.prototype.readInt16 = function (endian) {
  var buf = this.read(2);
  return buf['readInt16' + (endian ? endian.toUpperCase() : this.endian)](0);
};

/**
 * Read signed 32-bit integer with specified `endian` format.
 */

BigBuffer.prototype.readInt32 = function (endian) {
  var buf = this.read(4);
  return buf['readInt32' + (endian ? endian.toUpperCase() : this.endian)](0);
};

/**
 * Read signed 64-bit integer with specified `endian` format.
 */

BigBuffer.prototype.readInt64 = function (endian) {
  var buf = this.read(8);
  var big = bignum.fromBuffer(buf, {
    'endian': (endian ? endian.toUpperCase() : this.endian) === 'LE' ? 'little' : 'big'
  , 'size': 8
  });
  return big;
};

/**
 * Write data to the internal buffer.
 */

BigBuffer.prototype.write = function (data, encoding) {
  if ('string' === typeof data) return this.writeString(data, encoding);
  this.parts.push(data);
  this.buffer = null;
  this.size += data.length;
  return this;
};

/**
 * Write string `value` using the given `encoding`.
 */

BigBuffer.prototype.writeString = function (value, encoding) {
  var buf = new Buffer(value, encoding || this.encoding);
  return this.write(buf);
};

/**
 * Write unsigned 8-bit integer `value`.
 */

BigBuffer.prototype.writeUInt8 = function (value) {
  var buf = this.create(1);
  buf.writeUInt8(value, 0);
  return this.write(buf);
};

/**
 * Write unsigned 16-bit integer `value` with specified `endian` format.
 */

BigBuffer.prototype.writeUInt16 = function (value, endian) {
  var buf = this.create(2);
  buf['writeUInt16' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

/**
 * Write unsigned 32-bit integer `value` with specified `endian` format.
 */

BigBuffer.prototype.writeUInt32 = function (value, endian) {
  var buf = this.create(4);
  buf['writeUInt32' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

/**
 * Write unsigned 64-bit integer `value` with specified `endian` format.
 */

BigBuffer.prototype.writeUInt64 = function (value, endian) {
  var buf = bignum(value).toBuffer({
    'endian': (endian ? endian.toUpperCase() : this.endian) === 'LE' ? 'little' : 'big'
  , 'size': 8
  });
  return this.write(buf);
};

/**
 * Write signed 8-bit integer `value`.
 */

BigBuffer.prototype.writeInt8 = function (value) {
  var buf = this.create(1);
  buf.writeInt8(value, 0);
  return this.write(buf);
};

/**
 * Write signed 16-bit integer `value` with specified `endian` format.
 */

BigBuffer.prototype.writeInt16 = function (value, endian) {
  var buf = this.create(2);
  buf['writeInt16' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

/**
 * Write signed 32-bit integer `value` with specified `endian` format.
 */

BigBuffer.prototype.writeInt32 = function (value, endian) {
  var buf = this.create(4);
  buf['writeInt32' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

/**
 * Write signed 64-bit integer `value` with specified `endian` format.
 */

BigBuffer.prototype.writeInt64 = function (value, endian) {
  var buf = bignum(value).toBuffer({
    'endian': (endian ? endian.toUpperCase() : this.endian) === 'LE' ? 'little' : 'big'
  , 'size': 8
  });
  return this.write(buf);
};

/**
 * Write float point precision `value` with specified `endian` format.
 */

BigBuffer.prototype.writeFloat = function (value, endian) {
  var buf = this.create(4);
  buf['writeFloat' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

/**
 * Write double point precision `value` with specified `endian` format.
 */

BigBuffer.prototype.writeDouble = function (value, endian) {
  var buf = this.create(8);
  buf['writeDouble' + (endian ? endian.toUpperCase() : this.endian)](value, 0);
  return this.write(buf);
};

/**
 * Return current internal buffer representation.
 */

BigBuffer.prototype.toBuffer = function () {
  this.buffer = Buffer.concat(this.parts);
  return this.buffer;
};
