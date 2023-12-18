import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateGrn = () => {
  const [date, setDate] = React.useState('');
  const [supplier, setSupplier] = React.useState('');
  const [product, setProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [buying, setBuying] = React.useState('');
  const [selling, setSelling] = React.useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStockDetails();
  }, []);

  const getStockDetails = async () => {
    console.warn(params);
    let result = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/grn/${params.id}`
    );
    result = await result.json();
    console.warn(result);
    setDate(result.date);
    setSupplier(result.supplier);
    setProduct(result.product);
    setQuantity(result.quantity);
    setBuying(result.buying);
    setSelling(result.selling);
  };

  const updateGrn = async (e) => {
    let result = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/grn/${params.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          date,
          supplier,
          product,
          quantity,
          buying,
          selling,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      }
    );
    result = await result.json();
    if (result) {
      navigate('/GrnList');
    }
  };

  return (
    <div className='stock-create'>
      <h3>Update GRN</h3>

      <label>Name:</label>
      <input
        type='date'
        className='form-control'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <label>Supplier:</label>
      <input
        type='text'
        className='form'
        onChange={(e) => setSupplier(e.target.value)}
        value={supplier}
      />

      <label>Product Name:</label>
      <input
        type='text'
        className='form'
        onChange={(e) => setProduct(e.target.value)}
        value={product}
      />

      <label>Quantity:</label>
      <input
        type='number'
        className='form'
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <label>Buying:</label>
      <input
        type='number'
        className='form'
        onChange={(e) => setBuying(e.target.value)}
        value={buying}
      />

      <label>Selling:</label>
      <input
        type='number'
        className='form'
        onChange={(e) => setSelling(e.target.value)}
        value={selling}
      />
      <div className='col-12 p-2'>
          <Link to={'/GrnList'}>
            <button className='cancelButton'>Cancel</button>
          </Link>
          <button className='submitButton' onClick={updateGrn}>
            Send
          </button>
        </div>
    </div>
  );
};

export default UpdateGrn;
