const { AbstractError } = require('./AbstractError');

class CommandLineError extends AbstractError {
	constructor() {
		// \x1b[31m causes the text following it to be red, \x1b[0m resets to default
		super('COMMAND LINE ERROR',
      'You must provide 2 filenames to proceed.',
      'Please enter commands using the syntax: node translate <input file>',
      'or, you can include an output file name: node translate <input filename> <output filename>');

	}
}

module.exports = {
	CommandLineError
}
