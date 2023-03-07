const autoBindI = require('auto-bind-inheritance');

class Middleware {
	constructor() {
		autoBindI(this);
	}
}

module.exports = Middleware;