/**
 * File Overview:
 *
 */

const path = require('path')

function getFileName() {

  if(!process.argv[2]) {
    throw new Error('Unable to extract filename argument. please execute again using translate.js');
  }
  return path.parse(process.argv[2]).name;
}

module.exports = {
  getFileName
};
