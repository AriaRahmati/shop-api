const Validator = require('@validators/validator');
const { check } = require('express-validator');

class ProductValidator extends Validator {
	handle() {
		return [
			check('name')
				.isLength({ min: 3, max: 60 })
				.withMessage('name must be between 3 and 20 characters'),
			check('description')
				.isLength({ max: 200 })
				.withMessage('description must be between less 200 characters'),
			check('price')
				.notEmpty()
				.withMessage('price must be provided'),
			check('subCategory')
				.notEmpty()
				.withMessage('parent sub category must be provided'),
			check('image')
				.custom(async (value, { req }) => {
					if (!value && req.method === 'PATCH') return;

					if (!value)
						throw new Error('image must be provided');
				})
		];
	}
}

module.exports = new ProductValidator;