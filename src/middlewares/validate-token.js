const jwt = require('jsonwebtoken');
const User = require('./../models/usuario');
const validateToken = (req, res, next) => {
	try {
		const token = req.headers['token'];
		if (!token)
			return res.status(401).json({
				ok: false,
				error: 'Unauthorized'
			});
		const decodedToken = jwt.verify(token, process.env.SEED);
		if (decodedToken) {
			req.id = decodedToken.id;
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(401).json({
			ok: false,
			error
		});
	}
};

const validateRole = async (req, res, next) => {
	try {
		const userDB = await User.findById(req.id);
		const { id } = req.body;
		console.log(id);
		if (!userDB)
			return res.status(404).json({
				ok: false,
				error: 'Revisar con el administrador'
			});
		if (userDB.role !== 'ADMIN' && id !== req.id)
			return res.status(403).json({
				ok: false,
				error: 'Unauthorized'
			});

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error: 'Revisar con el administrador'
		});
	}
};

module.exports = { validateToken, validateRole };
