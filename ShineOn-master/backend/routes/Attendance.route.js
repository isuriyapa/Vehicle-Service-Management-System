const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAllAttendanceForLoggedInStaff,
  getAllAttendanceForStaff,
  markAttendanceByEmail,
} = require('../controllers/Attendance.controller');
const { staff_auth } = require('../middleware/StaffAuth.middleware');

// Route for creating a new attendance record
router.post('/', staff_auth, markAttendance);

// Get all attendance records for a staff
router.get('/', staff_auth, getAllAttendanceForLoggedInStaff);

// Route for retrieving all attendance records
router.get('/staff/:staffId', getAllAttendanceForStaff);

// Mark attendance for a staff user by email
router.get('/mark/:email', markAttendanceByEmail);

module.exports = router;
