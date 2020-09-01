const express = require('express').Router;
const { check } = require('express-validator');
const { getDoctors, addDoctor, deleteDoctor } = require('../controllers/doctors');
const validateFields = require('../middlewares/validate-fields');
const validateToken = require('../middlewares/validate-token');

const router = express();

router.post('/getDoctors', validateToken, getDoctors);

router.post(
	'/',
	[
		validateToken,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('hospital', 'El hospital debe ser valido').isMongoId(),
		validateFields
	],
	addDoctor
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
// 	updateDoctor
// );

router.delete('/', validateToken, deleteDoctor);

module.exports = router;
