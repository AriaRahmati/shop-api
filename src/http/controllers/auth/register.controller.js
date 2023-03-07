const Controller = require('@controllers/controller');
const User = require('@models/user.model');
const { StatusCodes } = require('http-status-codes');

class RegisterController extends Controller {
	async register(req, res, next) {
		await this.validateData(req);

		const { firstName, lastName, email, password } = req.body;

		const token = await this.registerProcess(firstName, lastName, email, password);

		res.status(StatusCodes.CREATED).json({ token });
	}

	async registerProcess(firstName, lastName, email, password) {
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password
		});

		const token = newUser.generateToken();

		return token;
	}
}

module.exports = new RegisterController;