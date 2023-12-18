const Stock = require('../models/stockModel');
const mongoose = require('mongoose');

const getStocks = async (req, res) => {
  const stocks = await Stock.find({}).sort({ createsAt: -1 });

  res.status(200).json(stocks);
};

const searchStock = async (req, res) => {
  let result = await Stock.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        type: { $regex: req.params.key },
      },
      {
        supplierName: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
};

const getStock = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such stock' });
  }

  const stock = await Stock.findById(id);

  if (!stock) {
    return res.status(404).json({ error: 'No such Stock' });
  }

  res.status(200).json(stock);
};

const createStock = async (req, res) => {
  const { name, type, quantity, buying, selling, supplierName } = req.body;

  try {
    const stock = await Stock.create({
      name,
      type,
      quantity,
      buying,
      selling,
      supplierName,
    });
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStock = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such stock' });
  }

  const stock = await Stock.findOneAndDelete({ _id: id });

  if (!stock) {
    return res.status(400).json({ error: 'No such Stock' });
  }

  res.status(200).json(stock);
};

const updateStock = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such stock' });
  }

  const stock = await Stock.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!stock) {
    return res.status(400).json({ error: 'No such Stock' });
  }

  res.status(200).json(stock);
};

module.exports = {
  getStocks,
  getStock,
  createStock,
  deleteStock,
  updateStock,
  searchStock,
};
