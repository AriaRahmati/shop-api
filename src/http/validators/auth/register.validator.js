const { check } = require('express-validator');

class RegisterValidator {
	handle() {
		return [
			check('firstName')
				.isLength({ min: 3, max: 20 })
				.withMessage('first name must be between 3 and 20 characters'),
			check('lastName')
				.isLength({ min: 3, max: 20 })
				.withMessage('last name must be between 3 and 20 characters'),
			check('email')
				.isEmail()
				.withMessage('email is not valid'),
			check('password')
				.isLength({ min: 8, max: 32 })
				.withMessage('password must be between 8 and 32 characters'),
		];
	}
}

module.exports = new RegisterValidator();