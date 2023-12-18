import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StockForm = () => {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [buying, setBuying] = React.useState('');
  const [selling, setSelling] = React.useState('');
  const [supplierName, setSupplierName] = React.useState('');
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const addStock = async (e) => {
    e.preventDefault();

    if (!name || !type || !quantity || !buying || !selling || !supplierName) {
      setError(true);
      return false;
    }

    const stock = { name, type, quantity, buying, selling, supplierName };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + '/api/stock',
      {
        method: 'Post',
        body: JSON.stringify(stock),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();
    if (json) {
      navigate('/StockList');
    }

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setName('');
      setType('');
      setQuantity('');
      setBuying('');
      setSelling('');
      setSupplierName('');

      navigate('/StockList');
    }
  };

  return (
         <div className='stock-create'>
          <form>
            <h3>Add a New Stock</h3>
            <hr />
            <label>Name:</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {error && !name && (
              <span className='invalid-input'>Enter GRN date</span>
            )}

            <label>Type:</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => setType(e.target.value)}
              value={type}
              placeholder='Enter name'
            />
            {error && !type && (
              <span className='invalid-input'>Enter GRN date</span>
            )}

            <label>Quantity:</label>
            <input
              type='number'
              className='form-control'
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            {error && !quantity && (
              <span className='invalid-input'>Enter GRN date</span>
            )}

            <label>Buying:</label>
            <input
              type='number'
              className='form-control'
              onChange={(e) => setBuying(e.target.value)}
              value={buying}
            />
            {error && !buying && (
              <span className='invalid-input'>Enter GRN date</span>
            )}

            <label>Selling:</label>
            <input
              type='number'
              className='form-control'
              onChange={(e) => setSelling(e.target.value)}
              value={selling}
            />
            {error && !selling && (
              <span className='invalid-input'>Enter GRN date</span>
            )}

            <label>Supplier Name:</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => setSupplierName(e.target.value)}
              value={supplierName}
            />
            {error && !supplierName && (
              <span className='invalid-input'>Enter GRN date</span>
            )}

            <Link to='/StockList'>
              <button className='cancelButton'>Cancel</button>
            </Link>
            <button className='submitButton' onClick={addStock}>
              Add Stock
            </button>
            {error && <div className='error'>{error}</div>}
          </form>
        </div>
  );
};

export default StockForm;
