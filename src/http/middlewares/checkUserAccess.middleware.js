const { UnAuthorizedError } = require('@errors/errors');
const authCheck = require('@middlewares/authCheck.middleware');

const checkUserAccess = async (req, res, next) => {
	await authCheck(req, res, next, true);
	const { user } = req;
	if (user.isAdmin())
		next();
	else
		throw new UnAuthorizedError('not authorized to access this route');
}

module.exports = checkUserAccess;