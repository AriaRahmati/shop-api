const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	bAdmin: { type: Boolean, default: false }
}, {
	timestamps: true
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();

	const salt = bcrypt.genSaltSync(15);
	const hash = bcrypt.hashSync(this.password, salt);
	this.password = hash;

	next();
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
}

userSchema.methods.isAdmin = function () {
	return this.bAdmin;
}

userSchema.methods.generateToken = function () {
	const token = jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		bAdmin: this.bAdmin
	}, config.JWT_SECRET, { expiresIn: config.JWT_LIFETIME });
	return token;
}

module.exports = mongoose.model('User', userSchema);