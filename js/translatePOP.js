/**
 * File Overview:
 *
 * This file contains a function, the purpose of which is to control the flow of
 * translation of POP instructions to their appropriate tempates. Detailed
 * descriptions of each template can be found in the popFunctions.js file.
 */
const { generateGeneralPOP, generateStaticPOP, generatePointerPOP } = require('./popFunctions');

function translatePOP(words) {
  /* words is an array of strings of size >= 3, the first element is "POP",
   * the second element is the memory segment, and the third is the address.
   *  ex. POP LOCAL 5 -> ["POP", "LOCAL", '5']
   */
  const memorySegment = words[1];
  const memoryAddress = parseInt(words[2]);

  switch (memorySegment.toUpperCase()) {

    /* use the general template for LOCAL, ARGUMENT, THIS, THAT, and TEMP memory
     * segments.
     */
    case 'LOCAL':
    case 'ARGUMENT':
    case 'THIS':
    case 'THAT':
    case 'TEMP':
      return generateGeneralPOP(memorySegment, memoryAddress);

    case 'STATIC':
      return generateStaticPOP(memoryAddress);

    case 'POINTER':
      return generatePointerPOP(memoryAddress);

    default:
      return '';
      //TODO probably an error amirite
  }
}

module.exports = {
  translatePOP
}
