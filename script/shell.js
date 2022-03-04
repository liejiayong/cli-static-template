const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);

exports.execShell = async function execShell(comand, options) {
  return exec(comand, options);
};
