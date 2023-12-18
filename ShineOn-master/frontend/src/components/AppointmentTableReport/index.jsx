import React from 'react';
import moment from 'moment';

function AppointmentsTableReport({ appointments }) {
  return (
    <div className='mt-5 mb-5'>
      <table className='table table-striped table-hover mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>

            <th scope='col'>Service Date</th>
            <th scope='col'>Client Name</th>
            <th scope='col'>Vehicle Name</th>
            <th scope='col'>Vehicle Registration Number</th>
            <th scope='col'>Assigned To</th>
            <th scope='col'>Service</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments &&
            appointments.map((appointment, key) => {
              return (
                <tr key={appointment._id}>
                  <th scope='row'>{++key}</th>

                  <td>
                    {' '}
                    {appointment.date &&
                      moment(appointment.date).format('MMMM Do YYYY')}{' '}
                    {appointment.timeSlot === '1' && '8.30 - 9.00'}
                    {appointment.timeSlot === '2' && '9.00 - 10.00'}
                    {appointment.timeSlot === '3' && '10.30 - 11.15'}
                    {appointment.timeSlot === '4' && '11.30 - 12.30'}
                    {appointment.timeSlot === '5' && '12.30 - 13.00'}
                    {appointment.timeSlot === '6' && '13.00 - 13.45'}
                  </td>
                  <td>{appointment.firstName + ' ' + appointment.lastName}</td>
                  <td>{appointment.vehicleModel}</td>
                  <td>{appointment.vehicleRegistrationNumber}</td>
                  <td>
                    {appointment.assignedTo
                      ? appointment.assignedTo
                      : 'No One Assigned'}
                  </td>
                  <td>{appointment.service}</td>
                  <td>
                    {appointment.status === 'CONFIREMED' && (
                      <span className='text-success'>{appointment.status}</span>
                    )}
                    {appointment.status === 'REJECTED' && (
                      <span className='text-danger'>{appointment.status}</span>
                    )}
                    {appointment.status === 'PENDING' && (
                      <span className='text-warning'>{appointment.status}</span>
                    )}
                    {appointment.status === 'ONGOING' && (
                      <span className='text-secondary'>
                        {appointment.status}
                      </span>
                    )}
                    {appointment.status === 'COMPLETED' && (
                      <span className='text-info'>{appointment.status}</span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTableReport;
