const jwt = require('jsonwebtoken');

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
		res.status(401).json({
			ok: false,
			error
		});
	}
};

module.exports = validateToken;
