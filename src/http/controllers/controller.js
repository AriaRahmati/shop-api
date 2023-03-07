const autoBindI = require('auto-bind-inheritance');
const { validationResult } = require('express-validator');
const { BadRequestError } = require('@errors/errors');

class Controller {
	constructor() {
		autoBindI(this);
	}

	async validateData(req, cb = (errors) => { }) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			const messages = [];
			errors.forEach(err => { messages.push(err.msg) });

			cb(errors);
			throw new BadRequestError(messages[0]); // TODO: Handle multiple errors in the future
		}
	}
}

module.exports = Controller;