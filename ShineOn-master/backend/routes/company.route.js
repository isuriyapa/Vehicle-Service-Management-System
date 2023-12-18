const express = require('express');
const router = express.Router();
const {
  saveCompany,
  getCompanyById,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require('../controllers/company.controller');

//GET all companies
router.get('/', getCompanies);

//GET a single company
router.get('/:id', getCompanyById);

//post a new company
router.post('/', saveCompany);

//DELETE a company
router.delete('/:id', deleteCompany);

//update a company
router.put('/:id', updateCompany);

module.exports = router;
