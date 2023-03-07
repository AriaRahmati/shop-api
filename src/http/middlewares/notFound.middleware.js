const Middleware = require('@middlewares/middleware');
const { NotFoundError } = require('@errors/errors');

class NotFound extends Middleware {
	handle(req, res, next) {
		throw new NotFoundError('route does not exist');
	}
}

module.exports = new NotFound;