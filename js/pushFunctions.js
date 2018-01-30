/**
 * File Overview:
 *
 * This file contains functions whose purpose is to generate symbolic assembly
 * for the PUSH opertaions in the HACK VM code. Descriptions found within
 * heavily leverage pseudo symbolic assembly code.
 *
 * You can find a thorough explanation of the symbolic assemly used here in
 * Chapter 4 of The Elements of Computing Systems by Noam Nisan and Shimon
 * Schocken, which is available for free on the internet at the course website,
 * found at http://www.nand2tetris.org/ as of this writing.
 *
 * Note: The pseudo-syntax *{address} is not dicussed until Chapter 7. It is
 * used to denote the data store in the memory address found in the register at
 * {address}. For example, if the value at the top of your stack is 5, *SP is
 * equal to the value found in RAM[5].
 */
 const { getFileName } = require('./util/getFileName');
 const { getMemoryPointer } = require('./util/getMemoryPointer');
 const { parseTHISorTHAT } = require('./util/parseThisOrThat');

/* This function provides a template for the PUSH operation for the following
 * memory sections: local, argument, this, that, temp. The process flow is as
 * follows:
 *
 * A = memorySegment+memoryAddress      point the address register to the
 *                                        memory segment plus the address offset
 * *SP = M                              push to the stack the contents of the
 *                                        memory register
 * SP++;                                 increment the stack pointer
 */
function generateGeneralPUSH(memorySegment, memoryAddress) {
  memorySegment = getMemoryPointer(memorySegment);

  return `
@${memoryAddress}
D=A
${memorySegment}
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}

/* This function provides a template for the PUSH operation for constants.
 * The process flow is as follows:
 *
 * @memoryAddress         point the address register to the value of our
 *                          constant
 * D=A                    store the contents of the address register in the data
 *                          register (D now equals memoryAddress)
 * *SP = D                push the contents of the data register to the stack
 * SP++                   increment the stack pointer
 */
function generateConstantPUSH(memoryAddress) {
 return `
@${memoryAddress}
D=A
@SP
A=M
M=D
@SP
M=M+1
`;
}

/* This function provides a template for the PUSH operation for the pointer
 * memory section. The process flow is as follows:
 *
 * *SP = THIS/THAT        push to the top of the stack the contents of THIS or
 *                          THAT
 * SP++                   increment the stack pointer
 */
function generatePointerPUSH(memoryAddress) {
  // decide, based upon the memory address, whether we want THIS or THAT
  let THISorTHAT = parseTHISorTHAT(memoryAddress);

  return `
@${THISorTHAT}
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}


/* This function provides a template for the PUSH operation for static memory
 * storage. Because of the nature of static variables, they are stored under
 * their own symbols. The process flow is as follows:
 *
  * *SP = fileName.i        push to the stack the contents of fileName.i
  * SP++                    increment the stack pointer
 */
function generateStaticPUSH(memoryAddress) {
  const fileName = getFileName();
  /*
   */
 return `
@${fileName}.${memoryAddress}
D=M
@SP
A=M
M=D
@SP
M=M+1
`;
}

module.exports = {
  generateGeneralPUSH,
  generateConstantPUSH,
  generatePointerPUSH,
  generateStaticPUSH,
};
