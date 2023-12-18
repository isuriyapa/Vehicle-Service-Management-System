import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppointment } from '../../app/actions/appointment.actions';
import moment from 'moment';
import { toast } from 'react-toastify';

function AppointmentEditModal(props) {
  const dispatch = useDispatch();
  const appointment =
    useSelector((state) => state.appointment.selectedAppointment) || {};

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
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (appointment) {
      setFirstName(appointment.firstName);
      setLastName(appointment.lastName);
      setContactNumber(appointment.contactNumber);
      setEmail(appointment.email);
      setAddress(appointment.address);
      setVehicleType(appointment.vehicleType);
      setVehicleRegistrationNumber(appointment.vehicleRegistrationNumber);
      setVehicleModel(appointment.vehicleModel);
      setService(appointment.service);
      setDate(moment(appointment.date).format('YYYY-MM-DD'));
      setTimeSlot(appointment.timeSlot);
      setAssignedTo(appointment.assignedTo);
      setStatus(appointment.status);
    }
  }, [appointment]);

  const handleOnSubmit = () => {
    const editedAppointment = {
      _id: appointment._id,
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
      assignedTo,
      status,
    };

    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !email ||
      !address ||
      !vehicleType ||
      !vehicleRegistrationNumber ||
      !vehicleModel ||
      !service ||
      !date ||
      !timeSlot
    ) {
      toast.error('All the fields should not be empty');
      return;
    }

    dispatch(updateAppointment(editedAppointment));
    props.closeModal();
  };

  return (
    <div>
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
          />
        </div>
        <div className='col-sm-6 p-2'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='form-control'
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
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label htmlFor='vehicleRegistrationNumber'>Registration Number</label>
          <input
            type='text'
            id='vehicleRegistrationNumber'
            value={vehicleRegistrationNumber}
            onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
            name='vehicleRegistrationNumber'
            className='form-control'
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
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label htmlFor='service'>Service</label>
          <select
            className='form-select'
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option selected>Open this select menu</option>
            <option value='BODY WASH'>BODY WASH</option>
            <option value='OILE CHANGING'>OILE CHANGING</option>
            <option value='TIRE REPLACEMENT'>TIRE REPLACEMENT</option>
            <option value='FULL SERVICE'>FULL SERVICE</option>
            <option value='INTERIOR SERVICE'>INTERIOR SERVICE</option>
            <option value='OTHER'>OTHER</option>
          </select>
        </div>
        <div className='col-sm-6 p-2'>
          <label htmlFor='date'>Service Date</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name='date'
            className='form-control'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label htmlFor='timeSlot'>Time Slot</label>
          <select
            className='form-select'
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
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
        <div className='col-sm-6 p-2'>
          <label htmlFor='assignedTo'>Assigned To</label>
          <select
            className='form-select'
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option selected>Open this select menu</option>
            <option value='Supun Perera'>Supun Perera</option>
            <option value='Malith Jayasinghe'>Malith Jayasinghe</option>
            <option value='Namal Rajakaruna'>Namal Rajakaruna</option>
            <option value='Mahinda Rajakaruna'>Mahinda Rajakaruna</option>
            <option value='Nimal Perera'>Nimal Perera</option>
          </select>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label htmlFor='status'>Status</label>
          <select
            className='form-select'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected>Open this select menu</option>
            <option value='PENDING'>PENDING</option>
            <option value='CONFIREMED'>CONFIREMED</option>
            <option value='REJECTED'>REJECTED</option>
            <option value='ONGOING'>ONGOING</option>
            <option value='COMPLETED'>COMPLETED</option>
          </select>
        </div>
      </div>
      <div className='flex-row'>
        <div className='col-sm-12 p-2 text-center'>
          <button
            className='btn btn-success text-white w-25'
            onClick={handleOnSubmit}
          >
            SAVE CHANGES
          </button>
        </div>
        <div className='col-sm-12 p-2 text-center'>
          <button
            className='btn btn-danger text-white w-25'
            onClick={() => props.closeModal()}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentEditModal;
