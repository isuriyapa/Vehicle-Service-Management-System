const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const supplierSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  }
})

// static signup method
supplierSchema.statics.signup = async function(Email, Password) {

  // validator
  if (!Email || !Password){
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(Email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(Password)) {
    throw Error('Password not strong Enough')
  }
  
  const exists = await this.findOne({ Email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(Password, salt)

  const supplier = await this.create({ Email, Password: hash })

  return supplier
}

// static login method
supplierSchema.statics.login = async function(Email, Password){
    if (!Email || !Password){
        throw Error('All fields must be filled')
      }
    const supplier = await this.findOne({ Email })

    if (!supplier) {
    throw Error('Incorrect Email')
  }
  const match = await bcrypt.compare(Password, supplier.Password)

  if(!match){
    throw Error('Incorrect Password')
  }

  return supplier
  
}

module.exports = mongoose.model('SupplierNew', supplierSchema)