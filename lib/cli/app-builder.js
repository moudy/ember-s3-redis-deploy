var run = require('./run');

var AppBuilder = module.exports = function(options) {
  this.logger = options.logger;
  this.environment = options.environment;
  this.command = 'ember build --environment '+options.environment;
};

AppBuilder.prototype.build = function () {
  this.logger.info('Building app...');
  return run(this.command);
};


