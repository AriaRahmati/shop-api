const Middleware = require('@middlewares/middleware');
const multer = require('multer');
const fs = require('fs');
const mkdirp = require('mkdirp');

class UploadImage extends Middleware {
	get() {
		return multer({
			storage: this.createStorage(),
			limits: {
				fileSize: 1024 * 1024 * 5, // 5MB
			},
			fileFilter: this.fileFilter
		});
	}

	getDir = () => {
		const year = new Date().getFullYear();
		const month = new Date().getMonth();
		const date = new Date().getDate();

		return `./public/uploads/images/${year}/${month}/${date}`;
	}

	createStorage() {
		const dir = this.getDir();
		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				mkdirp.sync(dir);
				cb(null, dir);
			},
			filename: (req, file, cb) => {
				const filePath = `${dir}/${file.originalname}`;
				if (!fs.existsSync(filePath))
					cb(null, file.originalname);
				else
					cb(null, `${Date.now()}-${file.originalname}`);
			}
		});

		return storage;
	}

	fileFilter = (req, file, cb) => {
		// reject a file
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
			cb(null, true);
		else
			cb(new Error('file type invalid'), false);
	}
}

module.exports = new UploadImage;