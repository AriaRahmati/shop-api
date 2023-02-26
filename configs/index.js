const database = require('@configs/database');
const paginate = require('@configs/paginate');

module.exports = {
	PORT: process.env.PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_LIFETIME: process.env.JWT_LIFETIME,
	DATABASE: database,
	PAGINATE_CUSTOM_LABELS: paginate
}