const jwt = require('jsonwebtoken');
const { UnAuthorizedError } = require('@errors/errors');
const User = require('@models/user.model');


const authCheck = async (req, res, next, outsideMiddleware) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer'))
		throw new UnAuthorizedError('token must be provided');

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded._id).select('-__v -password');
		if (!user)
			throw Error(); // token is for an invalid user

		req.user = user;
		if (!outsideMiddleware)
			next();
	} catch (error) {
		throw new UnAuthorizedError('not authorized to access this route');
	}
}

module.exports = authCheck;