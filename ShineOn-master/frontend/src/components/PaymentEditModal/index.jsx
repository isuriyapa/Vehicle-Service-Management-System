import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../../app/actions/payment.actions';

function PaymentEditModal(props) {
  const dispatch = useDispatch();
  const payment =
    useSelector((state) => state.payment.selectedPayment) || {};
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (payment) {
      setStatus(payment.status);
    }
  }, [payment]);

  const handleOnSubmit = () => {
    const editedPayment= {
      _id: payment._id,
      status,
    };
    dispatch(updatePayment(editedPayment));
    props.closeModal();
  };

  return (
    <div>
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
            <option value='REJECTED'>REJECTED</option>
            <option value='SUCCESS'>SUCCESS</option>
          </select>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12 p-2'>
          <button
            className='btn btn-success text-white w-100'
            onClick={handleOnSubmit}
          >
            SAVE CHANGES
          </button>
        </div>
        <div className='col-sm-12 p-2'>
          <button
            className='btn btn-danger text-white w-100'
            onClick={() => props.closeModal()}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentEditModal;
