const Hospital = require('./../models/hospital');

const getHospitals = async (req, res) => {
	const { limit, offset } = req.body;

	const [ hospitals, total ] = await Promise.all([
		Hospital.find({ status: true }).populate('createdBy', 'name').limit(limit).skip(offset),
		Hospital.count()
	]);
	res.json({ ok: true, items: hospitals, total });
};

const addHospital = async (req, res) => {
	try {
		const { name } = req.body;
		const id = req.id;
		// const { token } = req.headers;

		// const { id } = decodeToken(token);
		// console.log(id);
		// const hospitalDb = await Hospital.findOne({ email });

		// if (hospitalDb) {
		//     return res.status(400).json({ ok: false, error: 'Correo existente' });
		// }

		const hospital = new Hospital({ name, createdBy: id });

		await hospital.save();

		res.json({ ok: true, hospital });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

const updateHospital = async (req, res) => {
	try {
		const { id } = req.params;

		const hospitalDB = await Hospital.findById(id);
		if (!hospitalDB) return res.status(400).json({ ok: false, error: 'No se encontro el usuario' });

		const { password, google, email, ...rest } = req.body;
		if (hospitalDB.email !== email) {
			const emailExists = await Hospital.findOne({ email });
			if (emailExists) return res.status(400).json({ ok: false, error: 'El email ya esta registrado' });
		}

		rest.email = email;
		const updatedHospital = await Hospital.findOneAndUpdate({ _id: id }, rest, { new: true });

		res.json({ ok: true, hospital: updatedHospital });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

const deleteHospital = async (req, res) => {
	try {
		const { id } = req.body;

		// const deletedHospital = await Hospital.findOneAndDelete({ _id: id });
		const deletedHospital = await Hospital.findOne({ _id: id });
		if (!deletedHospital) return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
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
	updateHospital,
	deleteHospital
};
