var chalk = require('chalk');

var Logger = module.exports = function() {};

Logger.prototype.error = function (error) {
  var args = [
    chalk.bgRed.bold('Error'),
    chalk.red(error)
  ];
  if (error.stack) args.push(chalk.red(error.stack));
  console.log.apply(console, args);
};

Logger.prototype.info = function (str) {
  console.log(chalk.cyan(str));
};

Logger.prototype.success = function (str) {
  console.log(chalk.green(str));
};

