const { Schema, model } = require('mongoose');

const HospitalSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		img: {
			type: String
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		status: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

// HospitalSchema.method('toJSON', function () {
//     const { __v, password, ...rest } = this.toObject();
//     return rest;
// });

module.exports = model('Hospital', HospitalSchema);
