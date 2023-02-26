const { validationResult } = require('express-validator');
const User = require('@models/user.model');
const { BadRequestError, NotFoundError, UnAuthorizedError } = require('@errors/errors');
const { StatusCodes } = require('http-status-codes');


class LoginController {
	async loginProcess(req, res, next) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			throw new NotFoundError(`'${email}' is not registered`);

		if (!user.comparePassword(password))
			throw new UnAuthorizedError('password is not correct');

		const token = user.generateToken();
		res.status(StatusCodes.OK).json({ token });
	}
}

module.exports = new LoginController;