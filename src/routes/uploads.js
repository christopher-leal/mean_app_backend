const express = require('express').Router;
const { fileUpload } = require('../controllers/uploads');
const validateToken = require('../middlewares/validate-token');
const fileup = require('express-fileupload');

const router = express();
router.use(fileup());

router.post('/', [ validateToken ], fileUpload);

module.exports = router;
