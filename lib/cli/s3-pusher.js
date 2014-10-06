var RSVP = require('rsvp');
var run = require('./run');

var S3Pusher = module.exports = function(options) {
  this.logger = options.logger;
  this.environment = options.environment;
  this.command = 'aws s3 sync ./dist/ s3://'+process.env.S3_BUCKET_NAME+' --acl=public-read --exclude ".*"';
};

S3Pusher.prototype.push = function () {
  if ('development' === this.environment) {
    this.logger.info('Skipping S3 sync for development');
    return RSVP.Promise.resolve();
  }
  this.logger.info('Syncing assets to S3...');
  return run(this.command);
};


