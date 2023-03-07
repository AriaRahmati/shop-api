const Validator = require('@validators/validator');
const { check } = require('express-validator');

class CategoryValidator extends Validator {
	handle() {
		return [
			check('name')
				.isLength({ min: 3, max: 20 })
				.withMessage('name must be between 3 and 20 characters'),
		];
	}
}

module.exports = new CategoryValidator;