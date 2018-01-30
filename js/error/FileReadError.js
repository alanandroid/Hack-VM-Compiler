const { AbstractError } = require('./AbstractError');

class FileReadError extends AbstractError {
	constructor() {
    super('COMMAND LINE ERROR', 'The input file provided does not exist.');
	}
}

module.exports = {
	FileReadError
}
