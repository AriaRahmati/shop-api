const { validationResult } = require('express-validator');
const Category = require('@models/category.model');
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
				path: 'subCategories',
				select: '-__v'
			}]
		}

		const categories = await Category.paginate({}, paginateOptions);

		res.status(StatusCodes.OK).json(categories);
	}

	async create(req, res, next) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const { name } = req.body;

		const newCategory = new Category({ name });

		await newCategory.save();

		res.status(StatusCodes.CREATED).json({ message: `category '${newCategory.name}' created` });
	}

	async get(req, res, next) {
		const { params: { id: categoryId } } = req;

		const populateOption = [{
			path: 'subCategories',
			select: '-__v'
		}];

		const category = await Category.findById(categoryId)
			.populate(populateOption)
			.select('-__v');

		if (!category)
			throw new NotFoundError(`no category was found with id: '${categoryId}'`);

		res.status(StatusCodes.OK).json({ category });
	}

	async update(req, res, next) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const {
			params: { id: categoryId },
			body: { name },
		} = req;

		const category = await Category.findById(categoryId);
		if (!category)
			throw new NotFoundError(`no category was found with id: '${categoryId}'`);

		await category.updateOne({ $set: { name } });

		res.status(StatusCodes.OK).json({ message: `category '${category.name}' updated` });
	}

	async remove(req, res, next) {
		const { params: { id: categoryId } } = req;

		const category = await Category.findByIdAndDelete(categoryId);
		if (!category)
			throw new NotFoundError(`no category was found with id: '${categoryId}'`);

		res.status(StatusCodes.OK).json({ message: `category '${category.name}' deleted` });
	}
}

module.exports = new CategoryController;