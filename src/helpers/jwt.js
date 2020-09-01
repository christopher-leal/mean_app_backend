const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.SEED, { expiresIn: '8h' });
};

const decodeToken = (token) => {
	return jwt.verify(token, process.env.SEED);
};

module.exports = { generateToken, decodeToken };
