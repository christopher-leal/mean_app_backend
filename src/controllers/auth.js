const User = require('./../models/usuario');
const bcrypt = require('bcryptjs');
const { generateToken, decodeToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuItems } = require('../helpers/get-menu');

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userDB = await User.findOne({ email });

		if (!userDB) return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });

		const checkPass = await bcrypt.compare(password, userDB.password);
		if (!checkPass) return res.status(400).json({ ok: false, error: 'Usuario y/o contraseña incorrectos' });

		const token = generateToken({ email: userDB.email, role: userDB.role, id: userDB.id });
		res.json({ ok: true, token, menuItems: getMenuItems(userDB.role) });
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, error });
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

		res.json({ ok: true, token: appToken, menuItems: getMenuItems(user.role) });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

const refreshToken = async (req, res) => {
	const token = req.headers['token'];
	if (!token)
		return res.status(401).json({
			ok: false,
			error: 'Unauthorized'
		});

	const decodedToken = decodeToken(token);
	const user = await User.findById(decodedToken.id);
	const newToken = generateToken({ email: decodedToken.email, role: decodedToken.role, id: decodedToken.id });
	res.json({ ok: true, token: newToken, user, menuItems: getMenuItems(decodedToken.role) });
};

module.exports = {
	login,
	googleSignIn,
	refreshToken
};
