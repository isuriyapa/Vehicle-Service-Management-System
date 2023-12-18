const express = require('express');
const {
  createGrn,
  getGrns,
  getGrn,
  deleteGrn,
  updateGrn,
  searchGrn,
} = require('../controllers/grnController');

const grnRouter = express.Router();

grnRouter.get('/', getGrns);

grnRouter.get('/:id', getGrn);

grnRouter.get(`/search/:key`, searchGrn);

grnRouter.post('/', createGrn);

grnRouter.delete('/:id', deleteGrn);

grnRouter.patch('/:id', updateGrn);

module.exports = grnRouter;
