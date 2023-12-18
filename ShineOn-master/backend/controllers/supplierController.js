const Supplier = require('../models/SupplierModel');
const mongoose = require('mongoose');

// get all suppliers
const getSuppliers = async (req, res) => {
  // const user_id = req.user._id

  const suppliers = await Supplier.find().sort({ createAt: -1 });

  res.status(200).json(suppliers);
};

//get a single supplier
const getSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }
  const supplier = await Supplier.findById(id);
  if (!supplier) {
    return res.status(404).json({ error: 'No such supplier' });
  }
  res.status(200).json(supplier);
};

//create new supplier
const createSupplier = async (req, res) => {
  const {
    SuppllieId,
    SuppllierName,
    Address,
    ContactNumber,
    Email,
    ItemId,
    ItemName,
  } = req.body;

  let emptyFields = [];

  if (!SuppllieId) {
    emptyFields.push('SuppllieId');
  }
  if (!SuppllierName) {
    emptyFields.push('SuppllierName');
  }
  if (!Address) {
    emptyFields.push('Address');
  }
  if (!ContactNumber) {
    emptyFields.push('ContactNumber');
  }
  if (!Email) {
    emptyFields.push('Email');
  }
  if (!ItemId) {
    emptyFields.push('ItemId');
  }
  if (!ItemName) {
    emptyFields.push('ItemName');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please Fill in All the Fields', emptyFields });
  }

  //add doc to db
  try {
    // const user_id = req.user._id
    const supplier = await Supplier.create({
      SuppllieId,
      SuppllierName,
      Address,
      ContactNumber,
      Email,
      ItemId,
      ItemName,
    });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a supplier
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }
  const supplier = await Supplier.findOneAndDelete({ _id: id });

  if (!supplier) {
    return res.status(404).json({ error: 'No such supplier' });
  }
  res.status(200).json(supplier);
};

//update a supplier
const updateSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }
  const supplier = await Supplier.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!supplier) {
    return res.status(404).json({ error: 'No such supplier' });
  }
  res.status(200).json(supplier);
};

module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier,
  deleteSupplier,
  updateSupplier,
};
