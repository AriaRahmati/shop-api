const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' },
	price: { type: Number, required: true },
	quantity: { type: Number, default: 0 },
	image: { type: String, required: true },
	subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true }
}, {
	timestamps: true
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);