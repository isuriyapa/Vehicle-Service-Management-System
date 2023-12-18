const express = require('express');
const router = express.Router();
const { sample } = require('../controllers/Sample.controller');

router.get('/', sample);

module.exports = router;
