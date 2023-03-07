const fs = require('fs');
const path = require('path');
const Controller = require('@controllers/controller');
const Product = require('@models/product.model');
const SubCategory = require('@models/subCategory.model');
const { NotFoundError } = require('@errors/errors');
const { StatusCodes } = require('http-status-codes');

class CategoryController extends Controller {
	async getAll(req, res, next) {
		const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || -1;
		const paginateOptions = {
			pagination: limit != -1,
			page,
			limit,
			sort: { createdAt: 1 },
			select: '-__v',
			customLabels: config.PAGINATE_CUSTOM_LABELS,
			populate: [{
				path: 'subCategory',
				select: '-__v'
			}]
		}

		const products = await Product.paginate({}, paginateOptions);

		res.status(StatusCodes.OK).json(products);
	}

	async create(req, res, next) {
		await this.validateData(req, (errors) => {
			if (req.file)
				try {
					fs.unlinkSync(req.file.path);
				} catch (error) { console.error(error) }
		});

		const { name, description, price: _price, quantity: _quantity, subCategory: subCategoryId } = req.body;
		const image = req.file;

		const subCategory = await SubCategory.findById(subCategoryId);
		if (!subCategory)
			throw new NotFoundError(`no subCategory was found with id: '${subCategoryId}'`);

		const price = !isNaN(_price) ? Number(_price) : 0, quantity = !isNaN(_quantity) ? Number(_quantity) : 0;

		const newProduct = await Product.create({
			name,
			description,
			price,
			quantity,
			subCategory: subCategoryId,
			image: this.getImagePath(image)
		});

		res.status(StatusCodes.CREATED).json({
			message: `product '${newProduct.name}' created`,
			_id: newProduct._id
		});
	}

	async get(req, res, next) {
		const { params: { id: productId } } = req;

		const populateOption = [{
			path: 'subCategory',
			select: '-__v'
		}];

		const product = await Product.findById(productId)
			.populate(populateOption)
			.select('-__v');

		if (!product)
			throw new NotFoundError(`no product was found with id: '${productId}'`);

		res.status(StatusCodes.OK).json({ product });
	}

	async update(req, res, next) {
		await this.validateData(req);

		const {
			params: { id: productId },
			body: { name, description, price: _price, quantity: _quantity, subCategory: subCategoryId },
			file: image
		} = req;

		const price = !isNaN(_price) ? Number(_price) : 0, quantity = !isNaN(_quantity) ? Number(_quantity) : 0;

		const product = await Product.findById(productId);
		if (!product)
			throw new NotFoundError(`no product was found with id: '${productId}'`);

		const subCategory = await SubCategory.findById(subCategoryId);
		if (!subCategory)
			throw new NotFoundError(`no subCategory was found with id: '${subCategoryId}'`);

		let imagePath;
		if (image) {
			try {
				fs.unlinkSync(this.getImageDir(product.image));
				imagePath = this.getImagePath(image);
			} catch (error) { console.error(error) }
		}

		await product.updateOne({
			$set: {
				name,
				description,
				price,
				quantity,
				subCategory: subCategoryId,
				image: imagePath
			}
		});

		res.status(StatusCodes.OK).json({ message: `product '${product.name}' updated` });
	}

	async remove(req, res, next) {
		const { params: { id: productId } } = req;

		const product = await Product.findByIdAndDelete(productId);
		if (!product)
			throw new NotFoundError(`no product was found with id: '${productId}'`);

		try {
			fs.unlinkSync(this.getImageDir(product.image));
		} catch (error) { console.error(error) }

		res.status(StatusCodes.OK).json({ message: `product '${product.name}' deleted` });
	}

	getImagePath(image) {
		const imageFullPath = `${image.destination}/${image.filename}`;
		const imagePath = imageFullPath.replace(config.PUBLIC_DIR, '');
		return encodeURI(imagePath);
	}

	getImageDir(image) {
		const dir = path.join(config.PUBLIC_DIR, image);
		return decodeURI(dir);
	}
}

module.exports = new CategoryController;