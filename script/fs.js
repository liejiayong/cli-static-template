const fs = require('fs');

exports.mkDir = function mkDir(path) {
  if (fs.existsSync(path)) {
    console.warn(`${path} is existe`);
    return Promise.resolve(false);
  }
  fs.mkdirSync(path);
  return Promise.resolve(true);
};
