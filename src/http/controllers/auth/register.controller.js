const Controller = require('@controllers/controller');
const User = require('@models/user.model');
const { StatusCodes } = require('http-status-codes');

class RegisterController extends Controller {
	async registerProcess(req, res, next) {
		await this.validateData(req);

		const { firstName, lastName, email, password } = req.body;

		const newUser = await User.create({
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