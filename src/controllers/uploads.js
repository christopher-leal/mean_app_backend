const { v4: uuid } = require('uuid');
const path = require('path');
const { updateFile, fileExits } = require('../helpers/update-file');

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

		if (updateFile(type, id, fileName)) res.json({ ok: true, msg: 'Archivo subido', fileName });
		else
			res.status(400).json({
				ok: false,
				error: 'Ha ocurrido un error subiendo la imagen'
			});
	});
};

const getFile = (req, res) => {
	const { file, type } = req.params;
	let filePath = path.join(__dirname, `./../../uploads/${type}/${file}`);
	if (fileExits(filePath)) res.sendFile(filePath);
	else {
		filePath = path.join(__dirname, `./../../uploads/no-img.jpg`);
		res.sendFile(filePath);
	}
};

module.exports = {
	fileUpload,
	getFile
};
