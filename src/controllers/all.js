const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/usuario');

const findAll = async (req, res) => {
	const { find } = req.body;

	const regex = new RegExp(find, 'i');

	const [ doctors, hospitals, users ] = await Promise.all([
		Doctor.find({ name: regex }).populate('createdBy', 'name').populate('hospital', 'name'),
		Hospital.find({ name: regex }).populate('createdBy', 'name'),
		User.find({ name: regex })
		// .limit(limit)
		// .skip(offset),
		// Doctor.count()
	]);
	res.json({ ok: true, doctors, hospitals, users });
};

const findAllByCollection = async (req, res) => {
	const { find, collection } = req.body;

	const regex = new RegExp(find, 'i');
	let items;
	switch (collection) {
		case 'doctor':
			items = await Doctor.find({ name: regex }).populate('createdBy', 'name').populate('hospital', 'name');
			break;
		case 'hospital':
			items = await Hospital.find({ name: regex }).populate('createdBy', 'name');

			break;
		case 'user':
			items = await User.find({ name: regex });
			break;

		default:
			return res.status(400).json({ ok: false, error: 'No se ha recibido ninguna coleccion' });
			break;
	}

	res.json({ ok: true, items });
};

module.exports = {
	findAll,
	findAllByCollection
};
