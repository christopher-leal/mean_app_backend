const express = require('express').Router;
const { fileUpload, getFile } = require('../controllers/uploads');
const validateToken = require('../middlewares/validate-token');
const fileup = require('express-fileupload');

const router = express();
router.use(fileup());

router.put('/', [ validateToken ], fileUpload);
router.post('/', [ validateToken ], getFile);

module.exports = router;
