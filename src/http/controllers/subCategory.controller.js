const { validationResult } = require('express-validator');
const Category = require('@models/category.model');
const SubCategory = require('@models/subCategory.model');
const { BadRequestError, NotFoundError } = require('@errors/errors');
const { StatusCodes } = require('http-status-codes');

class CategoryController {
	async getAll(req, res, next) {
		const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || -1;
		const containProducts = req.query.containProducts?.toLowerCase() === 'true' || false;
		const paginateOptions = {
			pagination: limit != -1,
			page,
			limit,
			sort: { createdAt: 1 },
			select: '-__v',
			customLabels: config.PAGINATE_CUSTOM_LABELS,
			populate: [{
				path: 'category',
				select: '-__v'
			}]
		}

		if (containProducts)
			paginateOptions.populate.push({
				path: 'products',
				select: '-__v'
			});

		const subCategories = await SubCategory.paginate({}, paginateOptions);

		res.status(StatusCodes.OK).json(subCategories);
	}

	async create(req, res, next) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const { name, category: categoryId } = req.body;

		const category = await Category.findById(categoryId);
		if (!category)
			throw new NotFoundError(`no category was found with id: '${categoryId}'`);

		const newSubCategory = new SubCategory({
			name,
			category: categoryId
		});

		await newSubCategory.save();

		res.status(StatusCodes.CREATED).json({ message: `sub category '${newSubCategory.name}' created` });
	}

	async get(req, res, next) {
		const { params: { id: subCategoryId } } = req;
		const containProducts = req.query.containProducts?.toLowerCase() === 'true' || false;

		const populateOption = [{
			path: 'category',
			select: '-__v'
		}];

		if (containProducts)
			populateOption.push({
				path: 'products',
				select: '-__v'
			});

		const subCategory = await SubCategory.findById(subCategoryId)
			.populate(populateOption)
			.select('-__v -id');

		if (!subCategory)
			throw new NotFoundError(`no sub category was found with id: '${subCategoryId}'`);

		res.status(StatusCodes.OK).json({ subCategory });
	}

	async update(req, res, next) {
		const result = await validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			throw new BadRequestError(errors[0].msg);
		}

		const {
			params: { id: subCategoryId },
			body: { name, category: categoryId },
		} = req;

		const subCategory = await SubCategory.findById(subCategoryId);
		if (!subCategory)
			throw new NotFoundError(`no sub category was found with id: '${subCategoryId}'`);

		const category = await Category.findById(categoryId);
		if (!category)
			throw new NotFoundError(`no category was found with id: '${categoryId}'`);

		await subCategory.updateOne({ $set: { name, category: categoryId } });

		res.status(StatusCodes.OK).json({ message: `subCategory '${subCategory.name}' updated` });
	}

	async remove(req, res, next) {
		const { params: { id: subCategoryId } } = req;

		const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);
		if (!subCategory)
			throw new NotFoundError(`no sub category was found with id: '${subCategoryId}'`);

		res.status(StatusCodes.OK).json({ message: `sub category '${subCategory.name}' deleted` });
	}
}

module.exports = new CategoryController;