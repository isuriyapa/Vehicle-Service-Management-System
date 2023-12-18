import React from 'react';
import { useState } from 'react';
import { useCustomersContext } from '../hooks/useCustomersContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CustomerForm = () => {
  const { dispatch } = useCustomersContext();
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const customer = {
      name,
      address,
      contact_number: contactNumber,
      vehicle_number: vehicleNumber,
      email,
      NIC,
    };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + '/api/customer',
      {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setName('');
      setAddress('');
      setContactNumber('');
      setVehicleNumber('');
      setEmail('');
      setNIC('');
      setError(null);
      setEmptyFields([]);
      console.log('new customer added:', json);
      dispatch({ type: 'CREATE_CUSTOMER', payload: json });
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Customer</h3>

      <label>Customer Name:</label>
      <input
        type='string'
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Customer Address:</label>
      <input
        type='string'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        className={emptyFields.includes('address') ? 'error' : ''}
      />

      <label>Customer Contact Number:</label>
      <input
        type='tel'
        onChange={(e) => setContactNumber(e.target.value)}
        value={contactNumber}
        className={emptyFields.includes('contact_number') ? 'error' : ''}
      />

      <label>Customer Vehicle Number:</label>
      <input
        type='string'
        onChange={(e) => setVehicleNumber(e.target.value)}
        value={vehicleNumber}
        className={emptyFields.includes('vehicle_number') ? 'error' : ''}
      />

      <label>Customer Email:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <label>NIC:</label>
      <input
        type='string'
        onChange={(e) => setNIC(e.target.value)}
        value={NIC}
        className={emptyFields.includes('NIC') ? 'error' : ''}
      />

      <button>Add Customer</button>

      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default CustomerForm;
