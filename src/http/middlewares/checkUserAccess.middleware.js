const Middleware = require('@middlewares/middleware');
const AuthCheck = require('@middlewares/authCheck.middleware');
const { UnAuthorizedError } = require('@errors/errors');

class CheckUserAccess extends Middleware {
	async handle(req, res, next) {
		await AuthCheck.handle(req, res, next, true);
		const { user } = req;
		if (user.isAdmin())
			next();
		else
			throw new UnAuthorizedError('not authorized to access this route');
	}
}

module.exports = new CheckUserAccess;