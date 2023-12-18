import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveCompany } from '../../app/actions/company.actions';
import { toast } from 'react-toastify';

function AddCompany(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

  const [vehicleNumberOne, setVehicleNumberOne] = useState('');
  const [vehicleNumberTwo, setVehicleNumberTwo] = useState('');
  const [vehicleNumberThree, setVehicleNumberThree] = useState('');

  const handleOnSubmit = () => {
    let vehicleNumbersArray = [];

    if (vehicleNumberOne) {
      vehicleNumbersArray.push(vehicleNumberOne);
    }
    if (vehicleNumberTwo) {
      vehicleNumbersArray.push(vehicleNumberTwo);
    }
    if (vehicleNumberThree) {
      vehicleNumbersArray.push(vehicleNumberThree);
    }

    const dataObject = {
      name,
      address,
      contactNumber,
      email,
      vehicleNumbers: vehicleNumbersArray,
    };

    // Add validations for all the required fields
    if (!name.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    if (!address.trim()) {
      toast.error('Please enter a valid address');
      return;
    }

    const regex = /^\d{10}$/; // regular expression to match 10 digits
    if (!regex.test(contactNumber)) {
      toast.error('Please enter a valid 10-digit contact number');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!vehicleNumbersArray.length) {
      toast.error('Please enter at least one vehicle number');
      return;
    }

    dispatch(saveCompany(dataObject));

    setEmail('');
    setName('');
    setAddress('');
    setVehicleNumberOne('');
    setVehicleNumberTwo('');
    setVehicleNumberThree('');
    setContactNumber('');
  };

  return (
    <div className='container mt-5'>
      <div className='card p-5 mb-5'>
        <div className='row'>
          <h3 className='text-center'>COMPANY REGISTRATION FORM</h3>
          <p className='text-center'>
            Register your business by using this form.
          </p>
          <hr />
          <div className='col-sm-5 p-2'>
            <label>Company Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-control'
            />
          </div>
          <div className='col-sm-5 p-2'>
            <label htmlFor='title'>Company Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='form-control'
            />
          </div>
          <div className='col-sm-5 p-2'>
            <label>Hot line</label>
            <input
              type='text'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className='form-control'
            />
          </div>
          <div className='col-sm-5 p-2'>
            <label>Company Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control'
            />
          </div>

          <div className='col-sm-5 p-2'>
            <label>Vehicle Numbers</label>
            <input
              type='text'
              value={vehicleNumberOne}
              onChange={(e) => setVehicleNumberOne(e.target.value)}
              className='form-control mb-3'
              placeholder='Enter First Vehicle Number'
            />
            <input
              type='text'
              value={vehicleNumberTwo}
              onChange={(e) => setVehicleNumberTwo(e.target.value)}
              className='form-control mb-3'
              placeholder='Enter Second Vehicle Number'
            />
            <input
              type='text'
              value={vehicleNumberThree}
              onChange={(e) => setVehicleNumberThree(e.target.value)}
              className='form-control mb-3'
              placeholder='Enter Third Vehicle Number'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <button className='btn btn-primary' onClick={handleOnSubmit}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompany;
