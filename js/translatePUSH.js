/**
 * File Overview:
 *
 * This file contains a function, the purpose of which is to control the flow of
 * translation of PUSH instructions to their appropriate tempates. Detailed
 * descriptions of each template can be found in the pushFunctions.js file.
 *
 */
const { generateGeneralPUSH, generateConstantPUSH, generatePointerPUSH, generateStaticPUSH } = require('./pushFunctions');

function translatePUSH(words) {
  /* words is an array of strings of size >= 3, the first element is "PUSH",
   * the second element is the memory segment, and the third is the address.
   *  ex. PUSH LOCAL 5 -> ["PUSH", "LOCAL", '5']
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
      return generateGeneralPUSH(memorySegment, memoryAddress);

    case 'CONSTANT':
      return generateConstantPUSH(memoryAddress);

    case 'STATIC':
      return generateStaticPUSH(memoryAddress);

    case 'POINTER':
      return generatePointerPUSH(memoryAddress);

    default:
      return '';
  }
}

module.exports = {
  translatePUSH
};
