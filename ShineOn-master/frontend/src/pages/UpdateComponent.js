import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UpdateStock = () => {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [buying, setBuying] = React.useState('');
  const [selling, setSelling] = React.useState('');
  const [supplierName, setSupplierName] = React.useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStockDetails();
  }, []);

  const getStockDetails = async () => {
    console.warn(params);
    let result = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/stock/${params.id}`
    );
    result = await result.json();
    console.warn(result);
    setName(result.name);
    setType(result.type);
    setQuantity(result.quantity);
    setBuying(result.buying);
    setSelling(result.selling);
    setSupplierName(result.supplierName);
  };

  const updateStock = async (e) => {
    let result = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/stock/${params.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          type,
          quantity,
          buying,
          selling,
          supplierName,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      }
    );
    result = await result.json();
    if (result) {
      navigate('/StockList');
    }
  };

  return (
    <div className='stock-create'>
      <h3>Update Stock</h3>

      <label>Name:</label>
      <input
        type='text'
        className='form-control'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Type:</label>
      <input
        type='text'
        className='form-control'
        onChange={(e) => setType(e.target.value)}
        value={type}
      />

      <label>Quantity:</label>
      <input
        type='number'
        className='form-control'
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <label>Buying:</label>
      <input
        type='number'
        className='form-control'
        onChange={(e) => setBuying(e.target.value)}
        value={buying}
      />

      <label>Selling:</label>
      <input
        type='number'
        className='form-control'
        onChange={(e) => setSelling(e.target.value)}
        value={selling}
      />

      <label>Supplier Name:</label>
      <input
        type='text'
        className='form-control'
        onChange={(e) => setSupplierName(e.target.value)}
        value={supplierName}
      />
      <div className='col-12 p-2'>
          <Link to={'/GrnList'}>
            <button className='cancelButton'>Cancel</button>
          </Link>
          <button className='submitButton' onClick={updateStock}>
            Send
          </button>
        </div>
    </div>
  );
};

export default UpdateStock;
