import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppointmentsByEmail } from '../../app/actions/appointment.actions';
import AppointmentsTable from '../../components/AppointmentsTable';

function UserAppontments({ email, userROLE }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const appointments = useSelector((state) => state.appointment.appointments);
  const [appointmentslist, setAppointmentsList] = useState([]);

  useEffect(() => {
    const appointment = {
      email,
    };

    dispatch(getAppointmentsByEmail(appointment));
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
          <h1>My Appointments</h1>
        </div>
        {userROLE && !userROLE === 'USER' && (
          <div className='col-4'>
            <Link to='/appointmentreport'>
              <button className='btn btn-warning'>Appointment Report</button>
            </Link>
          </div>
        )}

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
        <AppointmentsTable userROLE="USER" appointments={appointmentslist} />
      </div>
    </div>
  );
}

export default UserAppontments;
