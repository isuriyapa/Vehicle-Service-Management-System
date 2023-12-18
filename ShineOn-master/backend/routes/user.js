const express = require('express');
const upload = require('../util/fileUploader')

// controller functions
const {
  loginUser,
  signupUser,
  generateToken,
  resetPassword,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

router.post('/signup', signupUser); // signup route

router.post('/generateresetkey', generateToken);

router.post('/resetpassword', resetPassword);

router.post('/getuser', getUser);

router.put('/:id', upload.upload.single('fileData') ,updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
