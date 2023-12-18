const express = require('express');
const router = express.Router();
const {
  insertLeave,
  getAllLeaves,
  getLeaveById,
  updateLeaveById,
  deleteLeaveById,
  updateLeaveStatusById,
  getAllLeavesForUser,
} = require('../controllers/Leave.controller');
const { staff_auth } = require('../middleware/StaffAuth.middleware');

// Create a new Leave
router.post('/', staff_auth, insertLeave);

// Get all Leaves
router.get('/', getAllLeaves);

// Get all Leaves of a user
router.get('/user/:userId', getAllLeavesForUser);

// Get a Leave by ID
router.get('/:id', getLeaveById);

// Update a Leave by ID
router.put('/:id', updateLeaveById);

// Delete a Leave by ID
router.delete('/:id', deleteLeaveById);

// Update leave status by ID
router.put('/:id/status', updateLeaveStatusById);

module.exports = router;
