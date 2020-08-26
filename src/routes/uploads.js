const express = require('express').Router;
const { findAll, findAllByCollection } = require('../controllers/all');
const validateToken = require('../middlewares/validate-token');

const router = express();

router.post('/', validateToken, findAll);

router.post('/collection', validateToken, findAllByCollection);

module.exports = router;
