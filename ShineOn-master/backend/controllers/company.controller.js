const Company = require('../models/Company.model');

//Save Company
const saveCompany = async (req, res) => {
  //get company details from request
  const { name, address, contactNumber, email, vehicleNumbers } = req.body;

  //Create a object from DailyNotice model
  const company = new Company({
    name,
    address,
    contactNumber,
    email,
    vehicleNumbers,
  });

  //Save to mongodb database
  company
    .save()
    .then((savedData) => {
      res.json(savedData);
    })
    .catch((error) => res.status(500).send('Server Error' + error));
};

//Fetch all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Fetch Company by Id
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.json(company);
  } catch (error) {
    res.status(500).send('Server Error' + error);
  }
};

//Update Company by Id
const updateCompany = async (req, res) => {
  Company.findByIdAndUpdate(req.params.id)
    .then((existingData) => {
      //Assign updated value from request to exiting company
      existingData.name = req.body.name;
      existingData.address = req.body.address;
      existingData.contactNumber = req.body.contactNumber;
      existingData.email = req.body.email;
      existingData.vehicleNumbers = req.body.vehicleNumbers;
      //Save the changes from request to database
      existingData
        .save()
        .then((updatedData) => res.json(updatedData))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

//Delete company by Id
const deleteCompany = async (req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then((deletedData) => {
      res.json(deletedData);
    })
    .catch((error) => res.status(400).json('Error: ' + error));
};

module.exports = {
  saveCompany,
  getCompanyById,
  getCompanies,
  updateCompany,
  deleteCompany,
};
