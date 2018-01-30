/**
 * File Overview: This function generates a unique symbol of the format
 * 'name.i', where 'name' is the the symbol's name, and 'i' is an integer, auto-
 * inserted and auto-incremented. These addresses are used for addressing jump
 * condition.
 */

function getUniqueSymbol (symbolName = 'symbol') {
  if( typeof getUniqueSymbol.counter == 'undefined' ) {
    getUniqueSymbol.counter = 0;
  }
  return symbolName + '.' + getUniqueSymbol.counter++;
}

module.exports = {
  getUniqueSymbol
};
