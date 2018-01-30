/**
* File Overview:
*
* This file is our primary access point for translating VM code into Assembly
* (both, in this case, refering to the HACK computer, as described in the
* course nand2tetris, from which this codebase is derived).
*
* See readme.md for further information.
*/
const fs  = require('fs');
const path = require('path');

const { CommandLineError } = require('./js/error/CommandLineError');
const { FileReadError } = require('./js/error/FileReadError');
const { translateLine } = require('./js/translateLine');

// If the user didn't give us an input file
if (process.argv.length < 3) {
  throw new CommandLineError();

} else {
  // capture out input file
  const input = './' + process.argv[2];
  let output;
  // if an output file is supplied, use it
  if (process.argv[3]) {
    output = './' + process.argv[3];
  // otherwise, we'll make one based upon the input file's name
  } else {
    // make sure the input file has an extension
    const indexOfFilenameEnd = input.lastIndexOf('.');
    // if not, we'll just slap '.asm' on there,
    if (indexOfFilenameEnd < 0) {
      output = input + '.asm';
    // otherwise, we'll remove the preexisting extension first
    } else {
      output = input.substring(0,indexOfFilenameEnd) + '.asm';
    }
  }

  // does the input file exist? if not, let's get out of here.
  if (!fs.existsSync(input)) {
    throw new FileReadError();

  } else {
    // create, or clear content in the output file.
    fs.writeFileSync(output, '');

    // read from our input, split it into lines, and iterate over those lines.
    fs.readFileSync(input).toString().split('\n').forEach(function (line, lineNumber) {
      /* if the line is a comment (identified by starting with the string '//')
       * then we'll ignore it.
       */
      if(line.startsWith('//') || line.trim() === '') {
        return;
      // otherwise, we'll translate the line, and write to our output file
      } else {
        fs.appendFileSync(output, translateLine(line, lineNumber + 1));
      }
    });
  }
}
