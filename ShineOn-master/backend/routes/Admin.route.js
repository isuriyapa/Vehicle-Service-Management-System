const express = require('express');
const router = express.Router();
const { loginAdmin, signupAdmin } = require('../controllers/Admin.controller');
// const { admin_auth } = require("../middleware/AdminAuth.middleware");

router.post('/', (request, response) => {
  response.send('Admin Route');
});

router.post('/login', loginAdmin);
router.post('/signup', signupAdmin);

module.exports = router;
