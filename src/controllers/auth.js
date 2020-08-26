const User = require('./../models/usuario');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userDB = await User.findOne({ email });

		if (!userDB) return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });

		const checkPass = await bcrypt.compare(password, userDB.password);
		if (!checkPass) return res.status(400).json({ ok: false, error: 'Usuario y/o contraseña incorrectos' });

		const token = generateToken({ email: userDB.email, role: userDB.role, id: userDB.id });
		res.json({ ok: true, token });
	} catch (error) {
		res.status(500).json({ ok: false, userDB });
	}
};

module.exports = {
	login
};
