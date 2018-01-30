/**
* File Overview:
*
*/
const { CompilationError } = require('./error/CompilationError');
const { translatePOP } = require('./translatePOP');
const { translatePUSH } = require('./translatePUSH');
const { removeExtraWhiteSpaceFrom } = require('./util/removeExtraWhiteSpace');
const { translateADD,
  translateSUB,
  translateNEG,
  translateEQ,
  translateGT,
  translateLT,
  translateAND,
  translateOR,
  translateNOT } = require('./arithmeticFunctions');

function translateLine(line, lineNumber) {
  line = line.toString();
  line = removeExtraWhiteSpaceFrom(line);
  // if the string is empty, return an empty line
  if(!line) return '';

  const words = line.toString().split(' ');

  let translatedLine;

  switch(words[0].toUpperCase()) {

    case 'POP':
      translatedLine = translatePOP(words);
      break;

    case 'PUSH':
      translatedLine = translatePUSH(words);
      break;

    case 'ADD':
      translatedLine = translateADD(words);
      break;

    case 'SUB':
      translatedLine = translateSUB(words);
      break;

    case 'NEG':
      translatedLine = translateNEG(words);
      break;

    case 'EQ':
      translatedLine = translateEQ(words);
      break;

    case 'GT':
      translatedLine = translateGT(words);
      break;

    case 'LT':
      translatedLine = translateLT(words);
      break;

    case 'AND':
      translatedLine = translateAND(words);
      break;

    case 'OR':
      translatedLine = translateOR(words);
      break;

    case 'NOT':
      translatedLine = translateNOT(words);
      break;

    default:
      throw new CompilationError(line, lineNumber);
  }

  const completeStatement =
  '// ' + line +
  translatedLine + '\n';

  return completeStatement;
}

module.exports = {
  translateLine
}
