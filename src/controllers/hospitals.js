const Hospital = require('./../models/hospital');

const getHospitals = async (req, res) => {
	const { limit, offset } = req.body;

	const [ hospitals, total ] = await Promise.all([
		Hospital.find({ status: true })
			.populate('createdBy', 'name')
			.populate('updatedBy', 'name')
			.limit(limit)
			.skip(offset),
		Hospital.countDocuments()
	]);
	res.json({ ok: true, items: hospitals, total });
};

const addHospital = async (req, res) => {
	try {
		const { id, ...rest } = req.body;
		const userId = req.id;
		let hospital;

		if (id) {
			hospital = await Hospital.findById(id);
			if (!hospital) return res.status(400).json({ ok: false, error: 'No se encontro el hospital' });
			hospital = await Hospital.findOneAndUpdate({ _id: id }, { ...rest, updatedBy: userId }, { new: true });
			// hospital = { ...hospital, ...rest };
		} else {
			hospital = new Hospital({ ...rest, createdBy: userId });
		}

		await hospital.save();

		res.json({ ok: true, hospital });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

// const updateHospital = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const hospitalDB = await Hospital.findById(id);
// 		if (!hospitalDB) return res.status(400).json({ ok: false, error: 'No se encontro el usuario' });

// 		const { password, google, email, ...rest } = req.body;
// 		if (hospitalDB.email !== email) {
// 			const emailExists = await Hospital.findOne({ email });
// 			if (emailExists) return res.status(400).json({ ok: false, error: 'El email ya esta registrado' });
// 		}

// 		rest.email = email;
// 		const updatedHospital = await Hospital.findOneAndUpdate({ _id: id }, rest, { new: true });

// 		res.json({ ok: true, hospital: updatedHospital });
// 	} catch (error) {
// 		res.status(500).json({ ok: false, error });
// 	}
// };

const deleteHospital = async (req, res) => {
	try {
		const { id } = req.body;

		// const deletedHospital = await Hospital.findOneAndDelete({ _id: id });
		const deletedHospital = await Hospital.findOne({ _id: id });
		if (!deletedHospital) return res.status(400).json({ ok: false, error: 'Hopital no encontrado' });
		deletedHospital.status = false;
		await deletedHospital.save();
		res.json({ ok: true, hospital: deletedHospital });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

module.exports = {
	getHospitals,
	addHospital,
	deleteHospital
};
