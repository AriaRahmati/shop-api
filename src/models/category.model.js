const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const categorySchema = new Schema({
	name: { type: String, unique: true, required: true },
}, {
	id: false,
	timestamps: true,
	toJSON: {
		virtuals: true
	}
});

categorySchema.virtual('subCategories', {
	ref: 'SubCategory',
	localField: '_id',
	foreignField: 'category'
});

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', categorySchema);