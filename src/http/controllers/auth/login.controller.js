const Controller = require('@controllers/controller');
const User = require('@models/user.model');
const { NotFoundError, UnAuthorizedError } = require('@errors/errors');
const { StatusCodes } = require('http-status-codes');

class LoginController extends Controller {
	async loginProcess(req, res, next) {
		await this.validateData(req);

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