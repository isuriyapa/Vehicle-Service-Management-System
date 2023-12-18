const express = require('express');
const router = express.Router();
const {
  saveFaq,
  getFaqById,
  getFaqs,
  updateFaq,
  deleteFaq,
  publish,
} = require('../controllers/FAQ.controller');

//@route  GET api/faqs/
//@desc   fetch all faqs
//@access Public
router.get('/', getFaqs);

//@route  GET api/faqs/:id
//@desc   fetch faq by Id
//@access Public
router.get('/:id', getFaqById);

//@route  POST api/faqs/
//@desc   save faq
//@access Public
router.post('/', saveFaq);

//@route  PUT api/faqs/:id
//@desc   update faq by Id
//@access Public
router.put('/:id', updateFaq);

//@route  DELETE api/faqs/:id
//@desc   delete faq by Id
//@access Public
router.delete('/:id', deleteFaq);

//@route  PUT api/faqs/publish/:id
//@desc   update faq by Id
//@access Public
router.put('/publish/:id', publish);

module.exports = router;
