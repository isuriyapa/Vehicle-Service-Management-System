const express = require('express');
const router = express.Router();
const {
  loginStaff,
  signupStaff,
  getAllStaff,
  updateStaffById,
  deleteStaffById,
  getStaffById,
  changePassword,
  adminUpdateStaffById,
} = require('../controllers/Staff.controller');
const { staff_auth } = require('../middleware/StaffAuth.middleware');

router.post('/', (request, response) => {
  response.send('Staff Route');
});

router.get('/', getAllStaff);
router.post('/login', loginStaff);
router.post('/signup', signupStaff);
router.patch('/change-password', staff_auth, changePassword);
router.patch('/admin/:id', adminUpdateStaffById);
router.patch('/:id', updateStaffById);
router.delete('/:id', deleteStaffById);
router.get('/id', staff_auth, getStaffById);

module.exports = router;
