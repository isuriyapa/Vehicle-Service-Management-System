const FAQ = require('../models/FAQ.model');

//Save FAQ
const saveFaq = async (req, res) => {
  const { name, issue, email } = req.body;

  const faq = new FAQ({
    name,
    issue,
    email,
  });

  //Save to mongodb database
  faq
    .save()
    .then((savedData) => {
      res.json(savedData);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

//Fetch all FAQs
const getFaqs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch FAQ by Id
const getFaqById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    res.json(faq);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

const updateFaq = async (req, res) => {
  FAQ.findByIdAndUpdate(req.params.id)
    .then((existingFAQ) => {
      //Assign updated value from request to exiting notice
      if (req.body.answer) {
        existingFAQ.answer = req.body.answer;
      }
      if (req.body.isPublished) {
        existingFAQ.isPublished = req.body.isPublished;
      }

      //Save the changes from request to database
      existingFAQ
        .save()
        .then((updatedFaq) => res.json(updatedFaq))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

//Delete FAQ by Id
const deleteFaq = async (req, res) => {
  FAQ.findByIdAndDelete(req.params.id)
    .then((deletedData) => {
      res.json(deletedData);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

const publish = async (req, res) => {
  FAQ.findByIdAndUpdate(req.params.id)
    .then((existingData) => {
      //Assign updated value from request to exiting notice
      if (req.body.isPublished) {
        existingData.isPublished = req.body.isPublished;
      }

      //Save the changes from request to database
      existingData
        .save()
        .then((updatedData) => res.json(updatedData))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

module.exports = {
  saveFaq,
  getFaqById,
  getFaqs,
  updateFaq,
  deleteFaq,
  publish,
};
