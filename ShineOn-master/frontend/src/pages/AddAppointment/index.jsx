import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAppointment } from '../../app/actions/appointment.actions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

function AddAppointment() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
    useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const [timeSlotMessage, setTimeSlotMessage] = useState('');

  useEffect(()=>{
    if(user){
      setEmail(user.email)
    }

  },user)

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      firstName,
      lastName,
      contactNumber,
      email,
      address,
      vehicleType,
      vehicleRegistrationNumber,
      vehicleModel,
      service,
      date,
      timeSlot,
    };

    // if (!firstName) {
    //   toast.error("First Name Field is Empty");
    //   return;
    // }

    // if (!lastName) {
    //   toast.error("Last Name Field is Empty");
    //   return;
    // }
    // if (!contactNumber) {
    //   toast.error("Contact Number Field is Empty");
    //   return;
    // }

    let regex = /^\d{10}$/;

    if (regex.test(contactNumber)) {
      console.log('Valid phone number');
    } else {
      toast.error('Invalid phone number');
      return;
    }

    let regex2 = /^([A-Z]{2,3}-\d{4})$/;

    if (regex2.test(vehicleRegistrationNumber)) {
      console.log('Valid Registration Number');
    } else {
      toast.error('Invalid Registration Number');
      return;
    }

    // if (!email) {
    //   toast.error("Email Field is Empty");
    //   return;
    // }
    // if (!address) {
    //   toast.error("Address Field is Empty");
    //   return;
    // }
    // if (!vehicleType) {
    //   toast.error("Vehicle Type Field is Empty");
    //   return;
    // }
    // if (!vehicleRegistrationNumber) {
    //   toast.error("Registration number Field is Empty");
    //   return;
    // }
    // if (!vehicleModel) {
    //   toast.error("Vehicle Model Field is Empty");
    //   return;
    // }
    // if (!service) {
    //   toast.error("Service Field is Empty");
    //   return;
    // }
    // if (!timeSlot) {
    //   toast.error("Time Slot Field is Empty");
    //   return;
    // }

    // if (!date) {
    //   toast.error("Date Field is Empty");
    //   return;
    // }

    dispatch(saveAppointment(newAppointment));

    clearInputFields();
  };

  const clearInputFields = () => {
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setEmail('');
    setAddress('');
    setVehicleType('');
    setVehicleRegistrationNumber('');
    setVehicleModel('');
    setService('');
    setDate('');
    setTimeSlot('');
  };

  const checkTimeSlot = (timeSlot) => {
    const checkDetails = {
      date,
      timeSlot,
    };
    axios
      .post(
        process.env.REACT_APP_BACKEND_API + '/api/appointments/checktimeslot',
        checkDetails
      )
      .then((res) => {
        if (res.data.length) {
          setTimeSlotMessage(
            'Selected time slot already booked. We will assign another for your appointment based on the availability. Stay tuned with us'
          );
        } else {
          setTimeSlotMessage('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container mt-5 mb-5'>
      <h1>ADD APPOINTMENT</h1>
      <hr />
      <form onSubmit={handleOnSubmit}>
        <div className='row'>
          <div className='col-sm-6 p-2'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name='firstName'
              className='form-control'
              required
            />
          </div>
          <div className='col-sm-6 p-2'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name='lastName'
              className='form-control'
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 p-2'>
            <label htmlFor='contactNumber'>Contact Number</label>
            <input
              type='text'
              id='contactNumber'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              name='contactNumber'
              className='form-control'
              required
            />
          </div>
          <div className='col-sm-6 p-2'>
            <label htmlFor='vehicleType'>Vehicle Type</label>
            <input
              type='text'
              id='vehicleType'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              name='vehicleType'
              className='form-control'
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 p-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              className='form-control'
              required
              readOnly
            />
          </div>
          <div className='col-sm-6 p-2'>
            <label htmlFor='vehicleModel'>Vehicle Model</label>
            <input
              type='text'
              id='vehicleModel'
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              name='vehicleModel'
              className='form-control'
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 p-2'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name='address'
              className='form-control'
              required
            />
          </div>
          <div className='col-sm-6 p-2'>
            <label htmlFor='vehicleRegistrationNumber'>
              Vehicle Registration Number
            </label>
            <input
              type='text'
              id='vehicleRegistrationNumber'
              value={vehicleRegistrationNumber}
              onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
              name='vehicleRegistrationNumber'
              className='form-control'
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 p-2'>
            <label htmlFor='date'>Service Date</label>
            <input
              type='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name='date'
              className='form-control'
              required
            />
          </div>
          <div className='col-sm-6 p-2'>
            <label htmlFor='service'>Service</label>
            <select
              className='form-select'
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option selected>Open this select menu</option>
              <option value='BODY WASH'>BODY WASH</option>
              <option value='CHANGE OILD'>CHANGE OILD</option>
              <option value='TIRE REPLACEMENT'>TIRE REPLACEMENT</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 p-2'>
            <label htmlFor='timeSlot'>Time Slot</label>
            <select
              className='form-select'
              value={timeSlot}
              onChange={(e) => {
                checkTimeSlot(e.target.value);
                setTimeSlot(e.target.value);
              }}
              required
            >
              <option selected>Open this select menu</option>
              <option value='1'>8.30 - 9.00</option>
              <option value='2'>9.00 - 10.00</option>
              <option value='3'>10.30 - 11.15</option>
              <option value='4'>11.30 - 12.30</option>
              <option value='5'>12.30 - 13.00</option>
              <option value='6'>13.00 - 13.45</option>
              <option value='7'>14.00 - 15.00</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            {timeSlotMessage && (
              <div
                className='alert alert-warning d-flex align-items-center'
                role='alert'
              >
                <div>{timeSlotMessage}</div>
              </div>
            )}
          </div>
          <div className='col-sm-12 p-2 text-center'>
            <button className='btn btn-success text-white' type='Submit'>
              SAVE CHANGES
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAppointment;
