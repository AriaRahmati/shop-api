const { NotFoundError } = require('@errors/errors');

const notFound = (req, res, next) => {
	throw new NotFoundError('route does not exist');
}

module.exports = notFound;