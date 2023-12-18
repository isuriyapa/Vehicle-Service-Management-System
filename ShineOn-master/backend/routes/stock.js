const express = require('express');
const {
  createStock,
  getStocks,
  getStock,
  deleteStock,
  updateStock,
  searchStock,
} = require('../controllers/stockController');

const stockRouter = express.Router();

stockRouter.get('/', getStocks);

stockRouter.get('/:id', getStock);

stockRouter.get(`/search/:key`, searchStock);

stockRouter.post('/', createStock);

stockRouter.delete('/:id', deleteStock);

stockRouter.patch('/:id', updateStock);

module.exports = stockRouter;
