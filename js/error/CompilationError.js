const { AbstractError } = require('./AbstractError');

class CompilationError extends AbstractError {
	constructor(line, lineNumber) {
		super('COMPILATION ERROR',
      'Error at line number ' + lineNumber,
	    'Unable to parse "' + line + '"');

	}
}

module.exports = {
	CompilationError
}
