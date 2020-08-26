const { Schema, model } = require('mongoose');

const DoctorSchema = Schema(
	{
		name: {
			type: String,
			required: true
		},
		img: {
			type: String
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		hospital: {
			type: Schema.Types.ObjectId,
			ref: 'Hospital',
			required: true
		},
		status: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

// DoctorSchema.method('toJSON', function () {
//     const { __v, password, ...rest } = this.toObject();
//     return rest;
// });

module.exports = model('Doctor', DoctorSchema);
