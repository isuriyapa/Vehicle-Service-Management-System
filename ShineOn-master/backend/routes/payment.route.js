const express = require('express');
const router = express.Router();
const {
    savePayment,
    getPaymentById,
    getPayments,
    updatePayment,
    deletePayment,
    getPaymentsByEmail
} = require('../controllers/payment.controller');

router.get('/', getPayments);

router.get('/:id', getPaymentById);

router.post('/', savePayment);

router.post('/email', getPaymentsByEmail);

router.put('/:id', updatePayment);

router.delete('/:id', deletePayment);

module.exports = router;
