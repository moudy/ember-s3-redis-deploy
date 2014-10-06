module.exports = function (options) {
  return [options.appName, options.release, 'index.html'].join('/');
};

