import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppointments } from '../../app/actions/appointment.actions';
import AppointmentsTable from '../../components/AppointmentsTable';

function AppointmentList() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const [appointmentslist, setAppointmentsList] = useState([]);

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  useEffect(() => {
    if (appointments) {
      setAppointmentsList(appointments);
    }
  }, [appointments]);

  const filterAppointment = (searchWord) => {
    let newArray = appointments.filter(function (el) {
      return (
        el.firstName.toLowerCase().includes(searchWord.toLowerCase()) ||
        el.lastName.toLowerCase().includes(searchWord.toLowerCase()) ||
        el.service.toLowerCase().includes(searchWord.toLowerCase()) ||
        el.status.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    setAppointmentsList(newArray);
  };

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-4'>
          <h1>List of Appointments</h1>
        </div>
        <div className='col-4'>
          <Link to='/appointmentreport'>
            <button className='btn btn-warning'>Appointment Report</button>
          </Link>
        </div>
        <div className='col-4'>
          <input
            type='text'
            onChange={(e) => filterAppointment(e.target.value)}
            name='search'
            placeholder='search...'
            className='form-control'
          />
        </div>
      </div>

      <div>
        <AppointmentsTable appointments={appointmentslist} userROLE="ADMIN"/>
      </div>
    </div>
  );
}

export default AppointmentList;
