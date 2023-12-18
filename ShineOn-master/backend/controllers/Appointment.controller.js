const Appointment = require('../models/Appointment.model');
const moment = require('moment');
const { sendEmailNodemailer } = require('../util/sendmail');


//Save Appointment
const saveAppointment = async (req, res) => {
  //get appointment details from request
  const {
    firstName,
    lastName,
    contactNumber,
    email,
    address,
    vehicleType,
    vehicleRegistrationNumber,
    vehicleModel,
    service,
    date,
    timeSlot,
  } = req.body;

  //Create a object from Appointment model
  const appointment = new Appointment({
    firstName,
    lastName,
    contactNumber,
    email,
    address,
    vehicleType,
    vehicleRegistrationNumber,
    vehicleModel,
    service,
    date,
    timeSlot,
  });

  //Save to mongodb database
  appointment
    .save()
    .then((savedAppointment) => {
      sendEmailNodemailer(email,"Appointment Booked", "This is to confirm your appointment")
      res.json(savedAppointment);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

//Fetch all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch all appointments by user email
const getAppointmentsByEmail = async (req, res) => {
  try {
    const appointments = await Appointment.find({email:req.body.email});
    res.json(appointments);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch Appointment by Id
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

const checkTimeSlot = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    let filteredAppointments = appointments.filter(
      (appointment) =>
        moment(appointment.date).format('YYYY-MM-DD') === req.body.date &&
        appointment.timeSlot === req.body.timeSlot
    );
    res.json(filteredAppointments);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Update Appointment by Id
const updateAppointment = async (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id)
    .then((existingAppointment) => {
      //Assign updated value from request to exiting appointment
      existingAppointment.firstName = req.body.firstName;
      existingAppointment.lastName = req.body.lastName;
      existingAppointment.contactNumber = req.body.contactNumber;
      existingAppointment.email = req.body.email;
      existingAppointment.address = req.body.address;
      existingAppointment.vehicleType = req.body.vehicleType;
      existingAppointment.vehicleRegistrationNumber =
        req.body.vehicleRegistrationNumber;
      existingAppointment.vehicleModel = req.body.vehicleModel;
      existingAppointment.service = req.body.service;
      existingAppointment.date = req.body.date;
      existingAppointment.timeSlot = req.body.timeSlot;
      existingAppointment.status = req.body.status;
      if (req.body.assignedTo) {
        existingAppointment.assignedTo = req.body.assignedTo;
      }

      //Save the changes from request to database
      existingAppointment
        .save()
        .then((updatedAppointment) => res.json(updatedAppointment))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

//Delete Appointment by Id
const deleteAppointment = async (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then((deletedAppointment) => {
      res.json(deletedAppointment);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

module.exports = {
  saveAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  checkTimeSlot,
  getAppointmentsByEmail
};
