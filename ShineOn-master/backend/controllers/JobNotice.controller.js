const JobNotice = require('../models/JobNotice.model');

//Save Notice
const saveNotice = async (req, res) => {
  //get notice details from request
  const { title, description } = req.body;

  //Create a object from DailyNotice model
  const jobNotice = new JobNotice({
    title,
    description,
  });

  //Save to mongodb database
  jobNotice
    .save()
    .then((savedNotice) => {
      res.json(savedNotice);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

//Fetch all notices
const getNotices = async (req, res) => {
  try {
    const jobNotices = await JobNotice.find();
    res.json(jobNotices);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch Notice by Id
const getNoticeById = async (req, res) => {
  try {
    const jobNotice = await JobNotice.findById(req.params.id);
    res.json(jobNotice);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Update Notice by Id
const updateNotice = async (req, res) => {
  JobNotice.findByIdAndUpdate(req.params.id)
    .then((existingJobNotice) => {
      //Assign updated value from request to exiting notice
      existingJobNotice.title = req.body.title;
      existingJobNotice.description = req.body.description;
      if (req.body.isPublished) {
        existingJobNotice.isPublished = req.body.isPublished;
      }
      //Save the changes from request to database
      existingJobNotice
        .save()
        .then((updatedNotice) => res.json(updatedNotice))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

//Delete Notice by Id
const deleteNotice = async (req, res) => {
  JobNotice.findByIdAndDelete(req.params.id)
    .then((deletedNotice) => {
      res.json(deletedNotice);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

const publish = async (req, res) => {
  JobNotice.findByIdAndUpdate(req.params.id)
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
  saveNotice,
  getNoticeById,
  getNotices,
  updateNotice,
  deleteNotice,
  publish,
};
