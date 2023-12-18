const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
  SearchIncome
} = require('../controllers/income');
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  SearchExpense
} = require('../controllers/expense');

const router = require('express').Router();

router
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .patch('/update-income/:id', updateIncome)
  .post('/add-expense', addExpense)
  .get('/get-expenses', getExpenses)
  .delete('/delete-expense/:id', deleteExpense)
  .patch('/update-expense/:id', updateExpense)
  .get('/search-income/:key1', SearchIncome)
  .get('/search-expense/:key2', SearchExpense);

module.exports = router;