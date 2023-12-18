import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GrnForm = () => {
  const [date, setDate] = React.useState('');
  const [supplier, setSupplier] = React.useState('');
  const [product, setProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [buying, setBuying] = React.useState('');
  const [selling, setSelling] = React.useState('');
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const addGrn = async (e) => {
    e.preventDefault();

    if (!date || !supplier || !product || !quantity || !buying || !selling) {
      setError(true);
      return false;
    }

    const grn = { date, supplier, product, quantity, buying, selling };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + '/api/grn',
      {
        method: 'Post',
        body: JSON.stringify(grn),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();
    if (json) {
      navigate('/GrnList');
    }

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setDate('');
      setSupplier('');
      setProduct('');
      setQuantity('');
      setBuying('');
      setSelling('');
    }
  };

  return (
    <div className='stock-create'>
      <h3>Add New Product to GRN</h3>

      <label>Date:</label>
      <input
        type='date'
        className='form-control'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      {error && !date && <span className='invalid-input'>Enter GRN date</span>}

      <label>Supplier Name:</label>
      <input
        type='text'
        className='form-control'
        onChange={(e) => setSupplier(e.target.value)}
        value={supplier}
      />
      {error && !supplier && (
        <span className='invalid-input'>Enter supplier name</span>
      )}

      <label>Product Name:</label>
      <input
        type='text'
        className='form-control'
        onChange={(e) => setProduct(e.target.value)}
        value={product}
      />
      {error && !product && (
        <span className='invalid-input'>Enter product name</span>
      )}

      <label>Quantity:</label>
      <input
        type='number'
        className='form-control'
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
      {error && !quantity && <span className='invalid-input'>Enter date</span>}

      <label>Buying:</label>
      <input
        type='number'
        className='form-control'
        onChange={(e) => setBuying(e.target.value)}
        value={buying}
      />
      {error && !buying && (
        <span className='invalid-input'>Enter buying price</span>
      )}

      <label>Selling:</label>
      <input
        type='number'
        className='form-control'
        onChange={(e) => setSelling(e.target.value)}
        value={selling}
      />
      {error && !selling && (
        <span className='invalid-input'>Enter selling price</span>
      )}
      <div className='row'>
        <div className='col-12 p-2'>
          <Link to={'/GrnList'}>
            <button className='cancelButton'>Cancel</button>
          </Link>
          <button className='submitButton' onClick={addGrn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrnForm;
