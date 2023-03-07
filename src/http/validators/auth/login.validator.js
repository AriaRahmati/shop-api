const Validator = require('@validators/validator');
const { check } = require('express-validator');

class LoginValidator extends Validator {
	handle() {
		return [
			check('email')
				.isEmail()
				.withMessage('email is not valid'),
			check('password')
				.isLength({ min: 8, max: 32 })
				.withMessage('password must be between 8 and 32 characters'),
		];
	}
}

module.exports = new LoginValidator;