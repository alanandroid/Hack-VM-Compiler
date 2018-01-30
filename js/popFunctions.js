/**
 * File Overview:
 *
 * This file contains functions whose purpose is to generate symbolic assembly
 * for the POP opertaions in the HACK VM code. Descriptions found within heavily
 * leverage pseudo symbolic assembly code.
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

/* This function provides a template for the POP operation for the following
 * memory sections: local, argument, this, that, temp. The process flow is as
 * follows:
 *
 * @addr = memorySegment+memoryAddress     store the absolute memory address
 * SP--;                                   decrement the stack pointer
 * *addr = *SP                             store in *addr the value previously
 *                                           at the top of the stack
 */
function generateGeneralPOP(memorySegment, memoryAddress) {
  // get a pointer to *memorySegment
  const memoryPointer = getMemoryPointer(memorySegment);

  return `
@${memoryAddress}
D=A
${memoryPointer}
D=D+A
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
`;
}

/* This function provides a template for the POP operation for the pointer
 * memory section. The process flow is as follows:
 *
 * SP--                   decrement the stack pointer
 * THIS/THAT = *SP        store the value previously on top of the stack in THIS
 *                          or THAT.
 */
function generatePointerPOP(memoryAddress) {
  // decide, based upon the memory address, whether we want THIS, or THAT
  let THISorTHAT = parseTHISorTHAT(memoryAddress);

  return `
@SP
M=M-1
A=M
D=M
@${THISorTHAT}
M=D
`;
}

/* This function provides a template for the POP operation for static memory
 * storage. Because of the nature of static variables, they are stored under
 * their own symbols. The process flow is as follows:
 *
 * SP--                   decrement the stack pointer
 * D=*SP                  store the value previously on the top of the stack in
 *                          the data register
 * fileName.i = D         store the contents of the data register in fileName.i
 */
function generateStaticPOP(memoryAddress) {
  // get the filename of the VM file we're currently translating
  const fileName = getFileName();

  return `
@SP
M=M-1
A=M
D=M
@${fileName}.${memoryAddress}
M=D
`;
}

module.exports = {
  generateGeneralPOP,
  generatePointerPOP,
  generateStaticPOP,
};
