const Sample = require('../models/Sample.model');

//Save DailyNotice
const sample = async (req, res) => {
  res.send({
    message: 'Sample',
  });
};

module.exports = {
  sample,
};
