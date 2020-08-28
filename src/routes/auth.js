const express = require('express').Router;
const { login, googleSignIn } = require('../controllers/auth');
const validateFields = require('../middlewares/validate-fields');
const { check } = require('express-validator');

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

module.exports = router;
