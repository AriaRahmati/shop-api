const Middleware = require('@middlewares/middleware');
const { StatusCodes } = require('http-status-codes');

class ErrorHandler extends Middleware {
	handle(error, req, res, next) {
		let customError = {
			status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message || 'something went wrong, please try again later'
		}

		if (error.name === 'ValidationError') {
			customError = {
				status: StatusCodes.BAD_REQUEST,
				message: Object.values(error.errors).map(item => item.message).join(',')
			}
		}

		if (error.name === 'CastError') {
			customError = {
				status: StatusCodes.NOT_FOUND,
				message: `no item was found with id: '${error.value}'`
			}
		}

		if (error.code && error.code === 11000) {
			customError = {
				status: StatusCodes.BAD_REQUEST,
				message: `duplicate value entered for '${Object.keys(error.keyValue)}' field, please choose another value`
			}
		}

		res.status(customError.status).json({ message: customError.message });
	}
}

module.exports = new ErrorHandler;