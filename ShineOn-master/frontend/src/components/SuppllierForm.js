import React, { useState } from 'react';
import { useSuppliersContext } from '../hooks/useSuppliersContext';

const SuppllierForm = () => {
  const { dispatch } = useSuppliersContext();

  const [SuppllierName, setSuppllierName] = useState('');
  const [SuppllieId, setSuppllieId] = useState('');
  const [Address, setAddress] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [ItemId, setItemId] = useState('');
  const [ItemName, setItemName] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionStorage.getItem('permissionLevel') === 'ADMIN') {
      setError('You Must Be Logged In');
      return;
    }

    const supplier = {
      SuppllierName,
      SuppllieId,
      Address,
      ContactNumber,
      Email,
      ItemId,
      ItemName,
    };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + '/api/suppliers',
      {
        method: 'POST',
        body: JSON.stringify(supplier),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setSuppllierName('');
      setSuppllieId('');
      setAddress('');
      setContactNumber('');
      setEmail('');
      setItemId('');
      setItemName('');
      setError(null);
      setEmptyFields([]);
      console.log('new supplier added', json);
      dispatch({ type: 'CREATE_SUPPLIER', payload: json });
    }
  };
  return (
    <form className='create mt-3 p-5' onSubmit={handleSubmit}>
      <h3 className='text-white'>Add a New Supplier</h3>

      <label>Supplier Name :</label>
      <input
        type='text'
        placeholder='Name'
        onChange={(e) => setSuppllierName(e.target.value)}
        value={SuppllierName}
        className={emptyFields.includes('SuppllierName') ? 'error' : ''}
      />

      <label>Suppllier Id :</label>
      <input
        type='text'
        placeholder='S#####'
        onChange={(e) => setSuppllieId(e.target.value)}
        value={SuppllieId}
        className={emptyFields.includes('SuppllieId') ? 'error' : ''}
      />

      <label>Address :</label>
      <input
        type='Address'
        onChange={(e) => setAddress(e.target.value)}
        value={Address}
        className={emptyFields.includes('Address') ? 'error' : ''}
      />

      <label>Contact Number :</label>
      <input
        type='Phone'
        placeholder='########'
        onChange={(e) => setContactNumber(e.target.value)}
        value={ContactNumber}
        className={emptyFields.includes('ContactNumber') ? 'error' : ''}
      />

      <label>Email :</label>
      <input
        type='mail'
        placeholder='ABC@gmail.com'
        onChange={(e) => setEmail(e.target.value)}
        value={Email}
        className={emptyFields.includes('Email') ? 'error' : ''}
      />

      <label>Item Id :</label>
      <input
        type='text'
        placeholder='I####'
        onChange={(e) => setItemId(e.target.value)}
        value={ItemId}
        className={emptyFields.includes('ItemId') ? 'error' : ''}
      />

      <label>Item Name :</label>
      <input
        type='text'
        onChange={(e) => setItemName(e.target.value)}
        value={ItemName}
        className={emptyFields.includes('ItemName') ? 'error' : ''}
      />
      <button>Add Supplier</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default SuppllierForm;
