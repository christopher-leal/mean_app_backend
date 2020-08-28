const express = require('express').Router;
const { check } = require('express-validator');
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users');
const validateFields = require('../middlewares/validate-fields');
const validateToken = require('../middlewares/validate-token');

const router = express();

router.post('/getUsers', validateToken, getUsers);

router.post(
	'/',
	[
		validateToken,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
		validateFields
	],
	addUser
);

router.put(
	'/:id',
	[
		validateToken,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
		check('role', 'El rol es obligatorio').not().isEmpty(),
		validateFields
	],
	updateUser
);

router.delete('/', validateToken, deleteUser);

module.exports = router;
