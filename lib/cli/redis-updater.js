var fs = require('fs');
var url = require('url');
var redis = require('redis');
var buildReleaseKey = require('../build-release-key');

var RedisUpdater = module.exports = function(options) {
  this.logger = options.logger;
  this.environment = options.environment;
  this.release = options.release;
  this.appName = options.appName;
  this.setRedisClient();
};

RedisUpdater.prototype.indexHTMLString = function () {
  return fs.readFileSync('./dist/index.html').toString();
};

RedisUpdater.prototype.setRedisClient = function () {
  var redisClient;
  var redisConfig;
  if (process.env.REDIS_URL) {
    redisConfig = url.parse(process.env.REDIS_URL);
    redisClient = redis.createClient(redisConfig.port, redisConfig.hostname);
    redisClient.auth(redisConfig.auth.split(':')[1]);
  } else {
    this.logger.info('No redis url found, using default');
    redisClient = redis.createClient();
  }
  this.redisClient = redisClient;
};

RedisUpdater.prototype.update = function () {
  var key = buildReleaseKey({appName: this.appName, release: this.release});
  var set = this.redisClient.set.bind(this.redisClient);
  set(key, this.indexHTMLString());
};


