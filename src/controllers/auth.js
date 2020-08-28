const User = require('./../models/usuario');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res) => {
	try {
		const { token } = req.body;
		const { name, email, picture: img } = await googleVerify(token);

		const userDB = await User.findOne({ email });
		let user;
		if (!userDB) {
			// return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
			user = new User({
				name,
				email,
				img,
				google: true,
				password: '@@@'
			});
		} else {
			user = userDB;
			user.google = true;
			user.password = '@@@';
		}

		await user.save();

		const appToken = generateToken({ email: user.email, role: user.role, id: user.id });

		res.json({ ok: true, token: appToken });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

module.exports = {
	login,
	googleSignIn
};
