const express = require('express').Router;
const { check } = require('express-validator');
const { getUsers, addUser, deleteUser } = require('../controllers/users');
const validateFields = require('../middlewares/validate-fields');
const { validateToken, validateRole } = require('../middlewares/validate-token');

const router = express();

router.post('/getUsers', validateToken, getUsers);

router.post(
	'/register',
	[
		// validateToken,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
		validateFields
	],
	addUser
);

router.post(
	'/',
	[
		validateToken,
		validateRole,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
		validateFields
	],
	addUser
);

// router.put(
// 	'/:id',
// 	[
// 		validateToken,
// 		check('name', 'El nombre es obligatorio').not().isEmpty(),
// 		check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
// 		check('role', 'El rol es obligatorio').not().isEmpty(),
// 		validateFields
// 	],
// 	updateUser
// );

router.post('/delete', validateToken, deleteUser);

module.exports = router;
