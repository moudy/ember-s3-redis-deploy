var RSVP = require('rsvp');
var exec = require('child_process').exec;

module.exports = function (command) {
  return new RSVP.Promise(function (resolve, reject) {
    exec(command, function (error, stdout) {
      if (error) return reject(error);
      resolve(stdout);
    });
  });
};

