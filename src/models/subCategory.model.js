const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const subCategorySchema = new Schema({
	name: { type: String, unique: true, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, {
	id: false,
	timestamps: true,
	toJSON: {
		virtuals: true
	}
});

subCategorySchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'subCategory'
});

subCategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SubCategory', subCategorySchema);