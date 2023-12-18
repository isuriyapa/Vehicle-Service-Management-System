const Grn = require('../models/grnModel');
const mongoose = require('mongoose');

const getGrns = async (req, res) => {
  const grns = await Grn.find({}).sort({ createsAt: -1 });

  res.status(200).json(grns);
};

const getGrn = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such grn' });
  }

  const grn = await Grn.findById(id);

  if (!grn) {
    return res.status(404).json({ error: 'No such grn' });
  }

  res.status(200).json(grn);
};

const searchGrn = async (req, res) => {
  let result = await Grn.find({
    $or: [
      {
        date: { $regex: req.params.key },
      },
      {
        supplier: { $regex: req.params.key },
      },
      {
        product: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
};

const createGrn = async (req, res) => {
  const { date, supplier, product, quantity, buying, selling } = req.body;

  try {
    const grn = await Grn.create({
      date,
      supplier,
      product,
      quantity,
      buying,
      selling,
    });
    res.status(200).json(grn);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGrn = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such grn' });
  }

  const grn = await Grn.findOneAndDelete({ _id: id });

  if (!grn) {
    return res.status(400).json({ error: 'No such grn' });
  }

  res.status(200).json(grn);
};

const updateGrn = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such grn' });
  }

  const grn = await Grn.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!grn) {
    return res.status(400).json({ error: 'No such grn' });
  }

  res.status(200).json(grn);
};

module.exports = {
  getGrns,
  getGrn,
  createGrn,
  deleteGrn,
  updateGrn,
  searchGrn,
};
