const express = require('express');
const {
  createCompanyRequest,
  getCompanyRequests,
  getCompanyRequesttById,
  updateCompanyRequest,
  deleteCompanyRequest,
} = require('../controllers/companyRequestController');

const router = express.Router();
router.route('/').get(getCompanyRequests);
router.route('/create').post(createCompanyRequest);
router
  .route('/:id')
  .get(getCompanyRequesttById)
  .put(updateCompanyRequest)
  .delete(deleteCompanyRequest);

module.exports = router;
