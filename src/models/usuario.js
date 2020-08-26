const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	img: {
		type: String
	},
	role: {
		type: String,
		required: true,
		default: 'USER'
	},
	google: {
		type: Boolean,
		default: false
	},
	status: {
		type: Boolean,
		default: true
	}
});

UserSchema.method('toJSON', function() {
	const { __v, password, ...rest } = this.toObject();
	return rest;
});

module.exports = model('User', UserSchema);
