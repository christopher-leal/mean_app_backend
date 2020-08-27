const fs = require('fs');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/usuario');

const updateFile = async (type, id, fileName) => {
	let oldPath = '';
	switch (type) {
		case 'doctors':
			const doctor = await Doctor.findOne({ _id: id });

			if (!doctor) {
				return false;
			}

			oldPath = `./uploads/${type}/${doctor.img}`;
			deleteFile(oldPath);

			doctor.img = fileName;
			await doctor.save();
			return true;
			break;
		case 'users':
			const user = await User.findOne({ _id: id });
			if (!user) {
				return false;
			}
			oldPath = `./uploads/${type}/${user.img}`;
			deleteFile(oldPath);

			user.img = fileName;
			await user.save();
			return true;

			break;
		case 'hospitals':
			const hospital = await Hospital.findOne({ _id: id });
			if (!hospital) {
				return false;
			}
			oldPath = `./uploads/${type}/${hospital.img}`;
			deleteFile(oldPath);

			hospital.img = fileName;
			await hospital.save();
			return true;

			break;

		default:
			break;
	}
};

const deleteFile = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};
const fileExits = (path) => {
	return fs.existsSync(path);
};
module.exports = { updateFile, fileExits };
