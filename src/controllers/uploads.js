const { v4: uuid } = require('uuid');

const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/usuario');
const fileUpload = async (req, res) => {
	const { id, type } = req.body;
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({ ok: false, error: 'No files were uploaded.' });
	}

	const { file } = req.files;

	const cutedName = file.name.split('.');
	const fileExt = cutedName[cutedName.length - 1];
	const validExtensions = [ 'png', 'jpeg', 'jpg', 'pdf' ];

	if (!validExtensions.includes(fileExt)) {
		return res.status(400).json({
			ok: false,
			error: 'Ingrese un formato de archivo valido'
		});
	}

	const validtypes = [ 'hospitals', 'doctors', 'users' ];

	if (!validtypes.includes(type)) {
		return res.status(400).json({
			ok: false,
			error: 'Ingrese un tipo valido'
		});
	}

	const fileName = `${uuid()}.${fileExt}`;

	const path = `./uploads/${type}/${fileName}`;

	file.mv(path, (error) => {
		if (error) return res.status(500).json({ of: false, error });

		res.json({ ok: true, msg: 'Archivo subido', fileName });
	});
};

module.exports = {
	fileUpload
};
