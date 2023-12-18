import React, { useEffect } from 'react';
import Modal from 'react-modal';
import {
  deletePayment,
  getPaymentById,
} from '../../app/actions/payment.actions';
import AppointmentEditModal from '../AppointmentEditModal';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import PaymentEditModal from '../PaymentEditModal';

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

function PaymentTable({ payments }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [paymentList, setPaymentList] = React.useState(payments);

  useEffect(() => {
    setPaymentList(payments);
  }, [payments]);
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const filterPayments = (searchWord) => {
    let newArray = payments.filter(function (el) {
      return el.appointmentId.toLowerCase().includes(searchWord.toLowerCase());
    });
    setPaymentList(newArray);
  };

  return (
    <div>
      <div className='row'>
        <div className='col-4'>
           <h1>Payment History</h1>
        </div>

        <div className='col-4'>
        <input
        type='text'
        onChange={(e) => filterPayments(e.target.value)}
        name='search'
        placeholder='search...'
        className='form-control'
      />
        </div>

      </div>
      
      
      <table className='table table-striped table-hover mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>

            <th scope='col'>Payment Date</th>
            <th scope='col'>Amount (LKR)</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentList &&
            paymentList.map((payment, key) => {
              return (
                <tr key={payment._id}>
                  <th scope='row'>{++key}</th>

                  <td>
                    {payment.createdAt &&
                      moment(payment.createdAt).format('MMMM Do YYYY')}
                  </td>
                  <td>{payment.paymentAmount}</td>
                  <td>
                    {payment.status === 'PENDING' && (
                      <span className='text-warning'>{payment.status}</span>
                    )}
                    {payment.status === 'REJECTED' && (
                      <span className='text-danger'>{payment.status}</span>
                    )}
                    {payment.status === 'SUCCESS' && (
                      <span className='text-success'>{payment.status}</span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>EDIT PAYMENT</h2>
        <div className='p-5'>
          <PaymentEditModal closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default PaymentTable;
