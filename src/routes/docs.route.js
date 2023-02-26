const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const { SwaggerTheme } = require('swagger-themes');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');
const url = require('node:url');

const file = fs.readFileSync('./docs.yaml', 'utf-8');
const swaggerDocument = YAML.parse(file);

const theme = new SwaggerTheme('v3');

const options = {
	// explorer: true,
	customSiteTitle: "Shop API Document",
	customfavIcon: ' ',
	customCss: theme.getBuffer('dark')
}

router.get('/', (req, res, next) => {
	let generatedURL = new url.URL('https://test.com');
	generatedURL.hostname = req.hostname;
	generatedURL.protocol = req.protocol;
	generatedURL.pathname = req.originalUrl.endsWith('/') ? req.originalUrl : `${req.originalUrl}/`;

	const host = req.headers.host.split(':');
	const port = host[host.length - 1];
	console.log(host, port)
	generatedURL.port = port;

	res.json({
		swagger: new url.URL('swagger', generatedURL),
		redoc: new url.URL('redoc', generatedURL)
	});
});

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument, options));

router.get('/redoc', (req, res, next) => {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(path.resolve(__dirname, '../../docs.html'));
});

module.exports = router;