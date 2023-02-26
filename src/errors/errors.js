const { StatusCodes } = require('http-status-codes');

class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.status = StatusCodes.BAD_REQUEST;
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.status = StatusCodes.NOT_FOUND;
	}
}

class UnAuthorizedError extends Error {
	constructor(message) {
		super(message);
		this.status = StatusCodes.UNAUTHORIZED;
	}
}

module.exports = {
	BadRequestError,
	NotFoundError,
	UnAuthorizedError
}