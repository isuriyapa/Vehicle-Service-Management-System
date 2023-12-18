const express = require('express');
const router = express.Router();
const {
  saveTestimonials,
  getTestimonialsById,
  getTestimonials,
  deleteTestimonials,
  publish,
} = require('../controllers/Testimonials.controller');

//@route  GET api/testimonials/
//@desc   fetch all testimonials
//@access Public
router.get('/', getTestimonials);

//@route  GET api/testimonials/:id
//@desc   fetch testimonials by Id
//@access Public
router.get('/:id', getTestimonialsById);

//@route  POST api/testimonials/
//@desc   save testimonials
//@access Public
router.post('/', saveTestimonials);

//@route  DELETE api/testimonials/:id
//@desc   delete testimonials by Id
//@access Public
router.delete('/:id', deleteTestimonials);

//@route  PUT api/testimonials/publish/:id
//@desc   update testimonials by Id
//@access Public
router.put('/publish/:id', publish);

module.exports = router;
