/**
 * File Overview:
 */
class AbstractError extends Error {
	constructor(errorName = 'NON-DESCIPT ERROR', ...messages) {

    if (new.target === AbstractError) {
      // Error Type 1. Abstract class can not be constructed.
      throw new TypeError("Can not construct the AbstractError class.");
    }

    console.log('');
    // \x1b[31m causes the text following it to be red, \x1b[0m resets to default
		console.log('✶✷✸ ' + '\x1b[31m' + errorName + '\x1b[0m' + ' ✸✷✶');
    // loop over the messages passed in, and print each to a new line.
    for (const message of messages) {
      console.log(message);
    }
    console.log('');

		process.exit(1);
	}
}

module.exports = {
	AbstractError
}
