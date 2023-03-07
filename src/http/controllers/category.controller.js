const Controller = require('@controllers/controller');
const Category = require('@models/category.model');
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
				path: 'subCategories',
				select: '-__v'
			}]
		}

		const categories = await Category.paginate({}, paginateOptions);

		res.status(StatusCodes.OK).json(categories);
	}

	async create(req, res, next) {
		await this.validateData(req);

		const { name } = req.body;

		const newCategory = await Category.create({ name });

		res.status(StatusCodes.CREATED).json({
			message: `category '${newCategory.name}' created`,
			_id: newCategory._id
		});
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
		await this.validateData(req);

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