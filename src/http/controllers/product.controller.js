const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Product = require('@models/product.model');
const SubCategory = require('@models/subCategory.model');
const { BadRequestError, NotFoundError } = require('@errors/errors');
const { StatusCodes } = require('http-status-codes');

class CategoryController {
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
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			if (req.file)
				try {
					fs.unlinkSync(req.file.path, error => console.error(error));
				} catch (error) { console.error(error) }

			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const { name, description, price: _price, quantity: _quantity, subCategory: subCategoryId } = req.body;
		const image = req.file;

		const subCategory = await SubCategory.findById(subCategoryId);
		if (!subCategory)
			throw new NotFoundError(`no subCategory was found with id: '${subCategoryId}'`);

		const price = !isNaN(_price) ? Number(_price) : 0, quantity = !isNaN(_quantity) ? Number(_quantity) : 0;

		const newProduct = Product.create({
			name,
			description,
			price,
			quantity,
			subCategory: subCategoryId,
			image: path.resolve(image.path)
		});

		res.status(StatusCodes.CREATED).json({ message: `product '${newProduct.name}' created` });
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
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			if (req.file)
				try {
					fs.unlinkSync(req.file.path, error => console.error(error));
				} catch (error) { console.error(error) }

			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

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
				fs.unlinkSync(product.image);
				imagePath = path.resolve(image.path);
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
			fs.unlinkSync(product.image);
		} catch (error) { console.error(error) }

		res.status(StatusCodes.OK).json({ message: `product '${product.name}' deleted` });
	}
}

module.exports = new CategoryController;