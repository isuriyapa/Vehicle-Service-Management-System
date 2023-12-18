const SupplierNew = require('../models/SupplierNew.model')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login a user
const loginSupplier = async (req, res) => {
    const {Email, Password} = req.body
    
    try {
        const supplier = await SupplierNew.login(Email, Password)
    
        //create a token
        const token = createToken(supplier._id)
    
        res.status(200).json({Email, token})
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

// signup a user
const signupSupplier = async (req, res) => {
  const {Email, Password} = req.body
  console.log(Email)

  try {
    const supplier = await SupplierNew.signup(Email, Password)

    //create a token
    const token = createToken(supplier._id)

    res.status(200).json({Email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { loginSupplier, signupSupplier }