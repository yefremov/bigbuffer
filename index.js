
module.exports = process.env.BIG_BUFFER_COV
  ? require('./lib-cov/bigbuffer')
  : require('./lib/bigbuffer');
