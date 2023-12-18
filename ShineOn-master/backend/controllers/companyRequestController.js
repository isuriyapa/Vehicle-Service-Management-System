const CompanyRequest = require('../models/companyRequestModel');
const asyncHandler = require('express-async-handler');

const getCompanyRequests = asyncHandler(async (req, res) => {
  const requests = await CompanyRequest.find();
  res.json(requests);
});

const createCompanyRequest = asyncHandler(async (req, res) => {
  const { CompanyCode, CompanyName, Address, ContactNumber, Email, Product } =
    req.body;

  if (
    !CompanyCode ||
    !CompanyName ||
    !Address ||
    !ContactNumber ||
    !Email ||
    !Product
  ) {
    res.status(400);
    throw new Error('Please Fill all the fields');
  } else {
    const companyRequest = new CompanyRequest({
      CompanyCode,
      CompanyName,
      Address,
      ContactNumber,
      Email,
      Product,
    });

    const createdRequest = await companyRequest.save();

    res.status(201).json(createdRequest);
  }
});

const getCompanyRequesttById = asyncHandler(async (req, res) => {
  const companyRequest = await CompanyRequest.findById(req.params.id);

  if (companyRequest) {
    res.json(companyRequest);
  } else {
    res.status(404).json({ message: 'Company Request not found' });
  }
});

const updateCompanyRequest = asyncHandler(async (req, res) => {
  const { CompanyCode, CompanyName, Address, ContactNumber, Email, Product } =
    req.body;

  const companyRequest = await CompanyRequest.findById(req.params.id); //find the companyRequest

  if (companyRequest) {
    companyRequest.CompanyCode = CompanyCode;
    companyRequest.CompanyName = CompanyName;
    companyRequest.Address = Address;
    companyRequest.ContactNumber = ContactNumber;
    companyRequest.Email = Email;
    companyRequest.Product = Product;

    const updateCompanyRequest = await companyRequest.save();
    res.json(updateCompanyRequest);
  } else {
    res.status(404);
    throw new Error('Company Request not found');
  }
});

const deleteCompanyRequest = asyncHandler(async (req, res) => {
  const companyRequest = await CompanyRequest.findById(req.params.id);

  if (companyRequest) {
    await companyRequest.deleteOne();
    res.json({ message: 'Company Request Removed' });
  } else {
    res.status(404);
    throw new Error('Company Request not Found');
  }
});

module.exports = {
  createCompanyRequest,
  getCompanyRequests,
  getCompanyRequesttById,
  updateCompanyRequest,
  deleteCompanyRequest,
};
