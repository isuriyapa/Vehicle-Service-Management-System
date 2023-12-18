const express = require('express');
const router = express.Router();
const {
  saveAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  checkTimeSlot,
  getAppointmentsByEmail
} = require('../controllers/Appointment.controller');

//@route  GET api/appointments
//@desc   fetch all appointments
//@access Public
router.get('/', getAppointments);

//@route  GET api/appointments/:id
//@desc   fetch appointments by Id
//@access Public
router.get('/:id', getAppointmentById);

//@route  POST api/appointments/
//@desc   save appointments
//@access Public
router.post('/', saveAppointment);

//@route  POST api/appointments/
//@desc   get appointments
//@access Public
router.post('/email', getAppointmentsByEmail);

//@route  PUT api/appointments/:id
//@desc   update appointments by Id
//@access Public
router.put('/:id', updateAppointment);

//@route  DELETE api/appointments/:id
//@desc   delete appointments by Id
//@access Public
router.delete('/:id', deleteAppointment);

//@route  POST api/appointments/checkTimeSlot
//@desc   check appointments for a given time slot
//@access Public
router.post('/checktimeslot', checkTimeSlot);

module.exports = router;
