const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    await income.save();
    res.status(200).json({ message: 'Income added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: 'Income Deleted' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server Error' });
    });
};

exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await IncomeSchema.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.SearchIncome = async (req, resp) => {
  let result = await IncomeSchema.find({
      "$or": [
          {
              title:{ $regex: req.params.key1},
          },
          {
              category:{ $regex: req.params.key1},
          },
      ],
  });
  resp.send(result);
};
