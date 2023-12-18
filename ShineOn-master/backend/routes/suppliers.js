const express = require('express');
const {
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  createSupplier,
} = require('../controllers/supplierController');
const { loginSupplier, signupSupplier } = require('../controllers/SupplierNewController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all supplier routes
// router.use(requireAuth);


//GET all suppliers
router.get('/', getSuppliers);

//GET a single supplier
router.get('/:id', getSupplier);

//POST a new supplier
router.post('/', createSupplier);

//DELETE a supplier
router.delete('/:id', deleteSupplier);

//UPDATE a supplier
router.patch('/:id', updateSupplier);

//login route
router.post('/login', loginSupplier)

//signup route
router.post('/signup', signupSupplier)

module.exports = router;
