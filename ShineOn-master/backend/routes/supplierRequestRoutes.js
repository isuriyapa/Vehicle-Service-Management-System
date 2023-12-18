const express = require('express');
const {
  createSupplierRequest,
  getSupplierRequests,
  getSupplierRequestById,
  updateSupplierRequest,
  deleteSupplierRequest,
} = require('../controllers/supplierRequestController');

const router = express.Router();

router.route('/').get(getSupplierRequests);
router.route('/create').post(createSupplierRequest);
router
  .route('/:id')
  .get(getSupplierRequestById)
  .put(updateSupplierRequest)
  .delete(deleteSupplierRequest);

module.exports = router;
