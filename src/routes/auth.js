const express = require('express').Router;
const { login, googleSignIn, refreshToken } = require('../controllers/auth');
const validateFields = require('../middlewares/validate-fields');
const { check } = require('express-validator');
const validateToken = require('../middlewares/validate-token');

const router = express();

router.post(
	'/login',
	[
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
		validateFields
	],
	login
);

router.post(
	'/login/google',
	[ check('token', 'El token es obligatorio').not().isEmpty(), validateFields ],
	googleSignIn
);

router.get('/refreshToken', [ validateToken ], refreshToken);

module.exports = router;
