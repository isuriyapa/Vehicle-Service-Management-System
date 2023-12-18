const SupplierRequest = require('../models/supplierRequestModel');
const asyncHandler = require('express-async-handler');

const getSupplierRequests = asyncHandler(async (req, res) => {
  console.log(11)
  const requests = await SupplierRequest.find();
  res.json(requests);
});

const createSupplierRequest = asyncHandler(async (req, res) => {
  const { chooseItem, quantity, typeOfNeedService, addingAcomment } = req.body;

  if (!chooseItem || !quantity || !typeOfNeedService || !addingAcomment) {
    res.status(400);
    throw new Error('Please Fill all the fields');
  } else {
    const supplierRequest = new SupplierRequest({
      chooseItem,
      quantity,
      typeOfNeedService,
      addingAcomment,
    });

    const createdRequest = await supplierRequest.save();

    res.status(201).json(createdRequest);
  }
});

const getSupplierRequestById = asyncHandler(async (req, res) => {
  const supplierRequest = await SupplierRequest.findById(req.params.id);

  if (supplierRequest) {
    res.json(supplierRequest);
  } else {
    res.status(404).json({ message: 'Supplier Request not found' });
  }
});

const updateSupplierRequest = asyncHandler(async (req, res) => {
  const { chooseItem, quantity, typeOfNeedService, addingAcomment } = req.body;

  const supplierRequest = await SupplierRequest.findById(req.params.id); //find the supplierRequest

  if (supplierRequest) {
    supplierRequest.chooseItem = chooseItem;
    supplierRequest.quantity = quantity;
    supplierRequest.typeOfNeedService = typeOfNeedService;
    supplierRequest.addingAcomment = addingAcomment;

    const updatedSupplierRequest = await supplierRequest.save();
    res.json(updatedSupplierRequest);
  } else {
    res.status(404);
    throw new Error('Supplier Request not found');
  }
});

const deleteSupplierRequest = asyncHandler(async (req, res) => {
  const supplierRequest = await SupplierRequest.findById(req.params.id);

  if (supplierRequest) {
    await supplierRequest.deleteOne();
    res.json({ message: 'Supplier Request Removed' });
  } else {
    res.status(404);
    throw new Error('Supplier Request not Found');
  }
});

module.exports = {
  createSupplierRequest,
  getSupplierRequests,
  getSupplierRequestById,
  updateSupplierRequest,
  deleteSupplierRequest,
};
