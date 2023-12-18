const Testimonials = require('../models/Testimonials.model');

const saveTestimonials = async (req, res) => {

  
  const { userName, feedback, userProfileImage } = req.body;
  console.log(userName, feedback, userProfileImage)
  const testimonial = new Testimonials({
    userName,
    feedback,
    userProfileImage
  });

  //Save to mongodb database
  testimonial
    .save()
    .then((savedData) => {
      res.json(savedData);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

//Fetch all Testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch Testimonials by Id
const getTestimonialsById = async (req, res) => {
  try {
    const testimonials = await Testimonials.findById(req.params.id);
    res.json(testimonials);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Delete Testimonials by Id
const deleteTestimonials = async (req, res) => {
  Testimonials.findByIdAndDelete(req.params.id)
    .then((deletedData) => {
      res.json(deletedData);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

const publish = async (req, res) => {
  Testimonials.findByIdAndUpdate(req.params.id)
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
  saveTestimonials,
  getTestimonialsById,
  getTestimonials,
  deleteTestimonials,
  publish,
};
