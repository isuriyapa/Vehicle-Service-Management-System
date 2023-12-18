const DailyNotice = require('../models/DailyNotice.model');

//Save DailyNotice
const saveNotice = async (req, res) => {
  //get notice details from request
  const { title, description } = req.body;

  //Create a object from DailyNotice model
  const dailyNotice = new DailyNotice({
    title,
    description,
  });

  //Save to mongodb database
  dailyNotice
    .save()
    .then((savedNotice) => {
      res.json(savedNotice);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

//Fetch all notices
const getNotices = async (req, res) => {
  try {
    const dailyNotices = await DailyNotice.find();
    res.json(dailyNotices);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch Notice by Id
const getNoticeById = async (req, res) => {
  try {
    const dailyNotice = await DailyNotice.findById(req.params.id);
    res.json(dailyNotice);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Update Notice by Id
const updateNotice = async (req, res) => {
  DailyNotice.findByIdAndUpdate(req.params.id)
    .then((existingDailyNotice) => {
      //Assign updated value from request to exiting notice
      existingDailyNotice.title = req.body.title;
      existingDailyNotice.description = req.body.description;
      if (req.body.isPublished) {
        existingDailyNotice.isPublished = req.body.isPublished;
      }
      //Save the changes from request to database
      existingDailyNotice
        .save()
        .then((updatedNotice) => res.json(updatedNotice))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

//Delete Notice by Id
const deleteNotice = async (req, res) => {
  DailyNotice.findByIdAndDelete(req.params.id)
    .then((deletedNotice) => {
      res.json(deletedNotice);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

const publish = async (req, res) => {
  DailyNotice.findByIdAndUpdate(req.params.id)
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
