const Payment = require('../models/Payment.model');
const moment = require('moment');
const { sendEmailNodemailer } = require('../util/sendmail');

const savePayment = async (req, res) => {
  const {
    appointmentId,
    userEmail,
    paymentAmount,
    status
  } = req.body;

  const payment = new Payment({
    appointmentId,
    userEmail,
    paymentAmount,
    status
  });

  //Save to mongodb database
  payment
    .save()
    .then((savedData) => {
      sendEmailNodemailer(userEmail,"Appointment Payment Completed", "This is to confirm your payment appointment")
      res.json(savedData);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

const getPaymentsByEmail = async (req, res) => {
  try {
    const payments = await Payment.find({userEmail:req.body.userEmail});
    res.json(payments);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch Appointment by Id
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    res.json(payment);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Update Appointment by Id
const updatePayment = async (req, res) => {
    Payment.findByIdAndUpdate(req.params.id)
    .then((existingPayment) => {
      existingPayment.status = req.body.status;
      //Save the changes from request to database
      existingPayment
        .save()
        .then((updatedData) => res.json(updatedData))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

const deletePayment = async (req, res) => {
    Payment.findByIdAndDelete(req.params.id)
    .then((deletedData) => {
      res.json(deletedData);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

module.exports = {
  savePayment,
  getPaymentById,
  getPayments,
  updatePayment,
  deletePayment,
  getPaymentsByEmail
};
