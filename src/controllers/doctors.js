const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getDoctors = async (req, res) => {
	const { limit, offset } = req.body;
	const [ doctors, total ] = await Promise.all([
		Doctor.find({ status: true })
			.populate('createdBy', 'name')
			.populate('updatedBy', 'name')
			.populate('hospital', 'name')
			.limit(limit)
			.skip(offset),
		Doctor.countDocuments()
	]);
	res.json({ ok: true, items: doctors, total });
};

const addDoctor = async (req, res) => {
	try {
		const { hospital, id, ...rest } = req.body;
		const userId = req.id;
		let doctor;

		const hospitalDB = await Hospital.findOne({ _id: hospital });

		if (!hospitalDB) {
			return res.status(400).json({ ok: false, error: 'El hospital no existe' });
		}

		if (id) {
			doctor = await Doctor.findById(id);
			if (!doctor) return res.status(400).json({ ok: false, error: 'No se encontro el doctor' });
			doctor = await Doctor.findOneAndUpdate(
				{ _id: id },
				{ ...rest, hospital, updatedBy: userId },
				{ new: true }
			);
			// hospital = { ...hospital, ...rest };
		} else {
			doctor = new Doctor({
				name,
				hospital,
				createdBy: userId
			});
		}

		await doctor.save();

		res.json({ ok: true, doctor });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

// const updateDoctor = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const doctorDB = await Doctor.findById(id);
// 		if (!doctorDB) return res.status(400).json({ ok: false, error: 'No se encontro el usuario' });

// 		const { password, google, email, ...rest } = req.body;
// 		if (doctorDB.email !== email) {
// 			const emailExists = await Doctor.findOne({ email });
// 			if (emailExists) return res.status(400).json({ ok: false, error: 'El email ya esta registrado' });
// 		}

// 		rest.email = email;
// 		const updatedDoctor = await Doctor.findOneAndUpdate({ _id: id }, rest, { new: true });

// 		res.json({ ok: true, Doctor: updatedDoctor });
// 	} catch (error) {
// 		res.status(500).json({ ok: false, error });
// 	}
// };

const deleteDoctor = async (req, res) => {
	try {
		const { id } = req.body;

		// const deletedDoctor = await Doctor.findOneAndDelete({ _id: id });
		const deletedDoctor = await Doctor.findOne({ _id: id });
		if (!deletedDoctor) return res.status(400).json({ ok: false, error: 'Doctor no encontrado' });
		deletedDoctor.status = false;
		await deletedDoctor.save();
		res.json({ ok: true, Doctor: deletedDoctor });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

module.exports = {
	getDoctors,
	addDoctor,
	deleteDoctor
};
