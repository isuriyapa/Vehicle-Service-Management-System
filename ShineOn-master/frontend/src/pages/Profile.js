import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import UserAccountEdit from './UserAccountEdit';
import UserAppontments from './UserAppointments';
import PaymentTable from '../components/PaymentTable';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsByEmail } from '../app/actions/payment.actions';

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

const Profile = () => {
  const [profileImage, setProfileimage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [address, setAddress] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);

  function openModal() {
    setEditModalIsOpen(true);
  }

  function closeModal() {
    setEditModalIsOpen(false);
  }

  useEffect(() => {
    const jsonObject = JSON.parse(localStorage.getItem('user'));
    const dataObject = {
      email: jsonObject.email,
    };

    console.log(dataObject);

    axios
      .post(process.env.REACT_APP_BACKEND_API + '/api/user/getuser', dataObject)
      .then((response) => {
        console.log(response);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserId(response.data._id);
        setAddress(response.data.address);
        setContactNumber(response.data.contactNumber);
        setProfileimage(response.data.profileImage);

        const obj = {
          userEmail: response.data.email,
        }
        dispatch(getPaymentsByEmail(obj));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });
  });

  const onHandleDelete = () => {
    axios
      .delete(process.env.REACT_APP_BACKEND_API + '/api/user/' + userId)
      .then((response) => {
        console.log(response);
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });
  };

  return (
    <div className='container mb-5'>
      <div className='row justify-content-center mt-5'>
        <div className='col-lg-5 col-md-5 col-sm-10'>
          <div className='card'>
            <div className='card-body'>
              <div className='text-center'>
                {!profileImage ? (
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    alt='Profile'
                    className='rounded-circle mb-3'
                    style={{ width: '150px', height: '150px' }}
                  />
                ) : (
                  <img
                    src={profileImage}
                    alt='Profile'
                    className='rounded-circle mb-3'
                    style={{ width: '150px', height: '150px' }}
                  />
                )}

                <p className='fs-1'>
                  {firstName} {lastName}
                </p>
              </div>
              <hr />
              <div className='profile-details text-right'>
                <p>
                  <strong>Email:</strong> {email}{' '}
                </p>
                <p>
                  <strong>Location:</strong> {address}
                </p>
                <p>
                  <strong>Contact:</strong> {contactNumber}
                </p>
              </div>
              <div className='row'>
                <div className='col-12 p-2'>
                  <button
                    className='btn btn-outline-primary w-100'
                    onClick={openModal}
                  >
                    EDIT
                  </button>
                </div>
                <div className='col-12 p-2'>
                  <button
                    className='btn btn-outline-danger w-100'
                    onClick={() => {
                      onHandleDelete();
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12'>
            {email && <UserAppontments userRole="USER" email={email}/>} 
        </div>
        <div className='col-12'>
            <PaymentTable payments={payments}/>
        </div>
      </div>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>EDIT USER</h2>
        <div>
          <UserAccountEdit
            closeModal={closeModal}
            firstName={firstName}
            lastName={lastName}
            id={userId}
            email={email}
            address={address}
            contactNumber={contactNumber}
            profileImage={profileImage}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
