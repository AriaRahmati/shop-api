const { validationResult } = require('express-validator');
const { BadRequestError } = require('@errors/errors');
const { StatusCodes } = require('http-status-codes');

const User = require('@models/user.model');

class RegisterController {
	async registerProcess(req, res, next) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const { firstName, lastName, email, password } = req.body;

		const newUser = User.create({
			firstName,
			lastName,
			email,
			password
		});

		const token = newUser.generateToken();

		res.status(StatusCodes.CREATED).json({ token });
	}
}

module.exports = new RegisterController;