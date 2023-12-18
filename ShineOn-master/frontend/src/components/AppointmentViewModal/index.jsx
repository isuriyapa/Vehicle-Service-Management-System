import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

function AppointmentViewModal(props) {
  const appointment = useSelector(
    (state) => state.appointment.selectedAppointment
  );

  return (
    <>
        {appointment && (
      <div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            value={appointment.firstName}
            name='firstName'
            className='form-control'
            readOnly
          />
        </div>
        <div className='col-sm-6 p-2'>
          <label for='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            value={appointment.lastName}
            name='lastName'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='contactNumber'>Contact Number</label>
          <input
            type='text'
            id='contactNumber'
            value={appointment.contactNumber}
            name='contactNumber'
            className='form-control'
            readOnly
          />
        </div>
        <div className='col-sm-6 p-2'>
          <label for='email'>Email</label>
          <input
            type='email'
            id='email'
            value={appointment.email}
            name='email'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='address'>Address</label>
          <input
            type='text'
            id='address'
            value={appointment.address}
            name='address'
            className='form-control'
            readOnly
          />
        </div>
        <div className='col-sm-6 p-2'>
          <label for='vehicleType'>Vehicle Type</label>
          <input
            type='text'
            id='vehicleType'
            value={appointment.vehicleType}
            name='vehicleType'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='vehicleRegistrationNumber'>Registration Number</label>
          <input
            type='text'
            id='vehicleRegistrationNumber'
            value={appointment.vehicleRegistrationNumber}
            name='vehicleRegistrationNumber'
            className='form-control'
            readOnly
          />
        </div>
        <div className='col-sm-6 p-2'>
          <label for='vehicleModel'>Vehicle Model</label>
          <input
            type='text'
            id='vehicleModel'
            value={appointment.vehicleModel}
            name='vehicleModel'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='service'>Service</label>
          <input
            type='text'
            id='service'
            value={appointment.service}
            name='service'
            className='form-control'
            readOnly
          />
        </div>
        <div className='col-sm-6 p-2'>
          <label for='date'>Service Date</label>
          <input
            type='date'
            id='date'
            value={moment(appointment.date).format('YYYY-MM-DD')}
            name='date'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='timeSlot'>Time Slot</label>
          <select className='form-select' value={appointment.timeSlot} readOnly>
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
          <label for='assignedTo'>Assigned To</label>
          <input
            type='text'
            id='assignedTo'
            value={appointment.assignedTo}
            name='assignedTo'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 p-2'>
          <label for='status'>Status</label>
          <input
            type='text'
            id='status'
            value={appointment.status}
            name='status'
            className='form-control'
            readOnly
          />
        </div>
      </div>
      <div className='row'>
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
    )}
    </>


  );
}

export default AppointmentViewModal;
