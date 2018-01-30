/**
 * File Overview:
 *
 */

function getMemoryPointer(memorySegment) {

  switch (memorySegment.toUpperCase()) {
    case 'LOCAL':
      return '@LCL' + '\n'
        + 'A=M';
    case 'ARGUMENT':
      return '@ARG' + '\n'
        + 'A=M';
    case 'THIS':
      return '@THIS' + '\n'
        + 'A=M';
    case 'THAT':
      return '@THAT' + '\n'
        + 'A=M';
    case 'TEMP':
      return '@5';
    case 'CONSTANT':
      return 'CONSTANT';
    case 'POINTER':
      return 'POINTER';
    case 'STATIC':
      return 'STATIC';
    default:
      return '';
      // TODO probably error out
  }
}

module.exports = {
  getMemoryPointer
};
