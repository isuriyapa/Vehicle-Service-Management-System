import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { savePayment } from '../../app/actions/payment.actions';

function PaymentModal(props) {
  const [isContinue, setIsContinue] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [paymentAmount, setpaymentAmount] = useState("");
  const dispatch = useDispatch();
  const appointment =
    useSelector((state) => state.appointment.selectedAppointment) || {};

    useEffect(() => {
      if (appointment) {
        setAppointmentId(appointment._id);
        setUserEmail(appointment.email);
      }
    }, [appointment]);

  const handleOnSubmit = () => {
    const payment = { 
      userEmail,
      appointmentId,
      paymentAmount,
      status:"SUCCESS"
    };
    dispatch(savePayment(payment));
    props.closeModal()
  };
  return (
    <div>
      <div className='col-sm-12 p-2'>
        <label>Reference</label>
        <input
          type='text'
          value={appointmentId}
          className='form-control mb-3'
          readOnly
        />
      </div>
      <div className='col-sm-12 p-2'>
        <label>Payment Amount ( LKR )</label>
        <input
          type='number'
          value={paymentAmount}
          onChange={(e)=>setpaymentAmount(e.target.value)}
          className='form-control mb-3'
          readOnly={isContinue}
        />
      </div>

      {isContinue ? (
        <StripeCheckout
          token={handleOnSubmit}
          stripeKey='pk_test_51ImBWIFPpVy9RtnRQ1DoSxhxuRc2FvpV9fPDYLOENquoMZj2eOFXzlMwjvptCN9w1qey1jb8RU8UpFrXgKUDpYTX00ARcMnDNE'
        />
      ) : (
        <div className='col-sm-12 p-2'>
          <button
            className='btn btn-primary'
            onClick={() => {
              setIsContinue(true);
            }}
          >
            Continue Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentModal;
