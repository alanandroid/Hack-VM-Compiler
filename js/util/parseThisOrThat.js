/**
 * File Overview:
 *
 */

function parseTHISorTHAT (memoryAddress) {
  if (memoryAddress === 0) {
    return 'THIS';
  } else if (memoryAddress === 1) {
    return 'THAT';
  } else {
    // TODO make this less bad
    throw new Error('A nondesript error occurred.');
  }
}

module.exports = {
  parseTHISorTHAT
};
