const express = require('express').Router;
const { login } = require('../controllers/auth');
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

module.exports = router;
