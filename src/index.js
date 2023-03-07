const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const router = require('@routes/routes');

// security packages
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

class Application {
	constructor() {
		this.configDatabase()
			.then((result) => {
				console.log(result);
				this.configServer();
				this.setRoutes();
				this.startServer();
			})
			.catch(error => {
				console.error(error);
				process.exit(1);
			});
	}

	configDatabase() {
		console.log('connecting to database...');
		return new Promise((resolve, reject) => {
			mongoose.set('strictQuery', false);
			mongoose.connect(config.DATABASE.URI, error => {
				if (error) reject(`${error}\nthere was a problem connecting to database, application is terminated`);

				resolve('connected to database successfully');
			});
		});
	}

	configServer() {
		app.enable('trust proxy'); // if behind proxy/load balancer or reverse proxy
		app.use(cors());
		app.use(helmet());
		app.use(apiLimiter);
		app.use(bodyParser.json({ limit: '50kb' }));
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(express.static(config.PUBLIC_DIR));
		app.use(logger('dev'));
	}

	setRoutes() {
		app.use(router);
	}

	startServer() {
		const port = config.PORT || 3000;
		const server = http.createServer(app);
		server.listen(port, console.log(`server is listening on port ${port}`));
	}
}

module.exports = Application;