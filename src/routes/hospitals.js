const express = require('express').Router;
const { check } = require('express-validator');
const { getHospitals, addHospital, deleteHospital } = require('../controllers/hospitals');
const validateFields = require('../middlewares/validate-fields');
const validateToken = require('../middlewares/validate-token');

const router = express();

router.post('/getHospitals', validateToken, getHospitals);

router.post(
	'/',
	[ validateToken, check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields ],
	addHospital
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
// 	updateHospital
// );

router.delete('/', validateToken, deleteHospital);

module.exports = router;
