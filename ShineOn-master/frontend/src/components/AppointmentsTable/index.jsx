import React from 'react';
import Modal from 'react-modal';
import {
  deleteAppointment,
  getAppointmentById,
} from '../../app/actions/appointment.actions';
import AppointmentViewModal from '../AppointmentViewModal';
import AppointmentEditModal from '../AppointmentEditModal';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import PaymentModal from '../PaymentModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('div');

function AppointmentsTable({ appointments, userROLE }) {
  const dispatch = useDispatch();
  const [viewAppointmentModalIsOpen, setViewAppointmentModalIsOpen] =
    React.useState(false);
  const [addAppointmentModalIsOpen, setAddAppointmentModalIsOpen] =
    React.useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = React.useState(false);

  function openModal() {
    setViewAppointmentModalIsOpen(true);
  }

  function closeModal() {
    setViewAppointmentModalIsOpen(false);
  }

  function addAppointmentOpenModal() {
    setAddAppointmentModalIsOpen(true);
  }

  function addAppointmentCloseModal() {
    setAddAppointmentModalIsOpen(false);
  }

  function openPaymentModal() {
    setPaymentModalIsOpen(true);
  }

  function closePaymentModal() {
    setPaymentModalIsOpen(false);
  }

  return (
    <div>
      <table className='table table-striped table-hover mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>

            <th scope='col'>Date Created</th>
            {userROLE && userROLE !== 'USER' && (
              <th scope='col'>Client Name</th>
            )}

            <th scope='col'>Service</th>
            <th scope='col'>Status</th>
            {userROLE && userROLE !== 'USER' && <th scope='col'>Action</th>}
            {userROLE && userROLE === 'USER' && <th scope='col'>Pay Now</th>}
          </tr>
        </thead>
        <tbody>
          {appointments &&
            appointments.map((appointment, key) => {
              return (
                <tr key={appointment._id}>
                  <th scope='row'>{++key}</th>

                  <td>
                    {appointment.date &&
                      moment(appointment.date).format('MMMM Do YYYY')}{' '}
                    {appointment.timeSlot === '1' && '8.30 - 9.00'}
                    {appointment.timeSlot === '2' && '9.00 - 10.00'}
                    {appointment.timeSlot === '3' && '10.30 - 11.15'}
                    {appointment.timeSlot === '4' && '11.30 - 12.30'}
                    {appointment.timeSlot === '5' && '12.30 - 13.00'}
                    {appointment.timeSlot === '6' && '13.00 - 13.45'}
                  </td>
                  {userROLE && userROLE !== 'USER' && (
                    <td>
                      {appointment.firstName + ' ' + appointment.lastName}
                    </td>
                  )}

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
                  {userROLE && userROLE !== 'USER' && (
                    <td>
                      <div className='dropdown'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          id='dropdownMenuButton1'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          Action
                        </button>
                        <ul
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton1'
                        >
                          <li>
                            <button
                              className='dropdown-item'
                              onClick={() => {
                                dispatch(getAppointmentById(appointment._id));
                                openModal();
                              }}
                            >
                              VIEW
                            </button>
                          </li>
                          <li>
                            <button
                              className='dropdown-item btn btn-primary'
                              onClick={() => {
                                dispatch(getAppointmentById(appointment._id));
                                addAppointmentOpenModal();
                              }}
                            >
                              EDIT
                            </button>
                          </li>
                          <li>
                            <button
                              className='dropdown-item btn btn-danger'
                              onClick={() =>
                                dispatch(deleteAppointment(appointment._id))
                              }
                            >
                              DELETE
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  )}
                  {userROLE && userROLE === 'USER' && (
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() => {
                          dispatch(getAppointmentById(appointment._id));
                          openPaymentModal();
                        }}
                      >
                        PAY NOW
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal
        isOpen={viewAppointmentModalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>APPOINTMENT DETAILS</h2>
        <div className='p-5'>
          <AppointmentViewModal closeModal={closeModal} />
        </div>
      </Modal>
      <Modal
        isOpen={addAppointmentModalIsOpen}
        onRequestClose={addAppointmentCloseModal}
        // style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>EDIT APPOINTMENT</h2>
        <div className='p-5'>
          <AppointmentEditModal closeModal={addAppointmentCloseModal} />
        </div>
      </Modal>
      <Modal
        isOpen={paymentModalIsOpen}
        onRequestClose={closePaymentModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='p-5'>
          <h2 className='text-center'>PAYMENT</h2>
          <PaymentModal closeModal={closePaymentModal} />
        </div>
      </Modal>
    </div>
  );
}

export default AppointmentsTable;
