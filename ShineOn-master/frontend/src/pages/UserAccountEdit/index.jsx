import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import storage from '../../util/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UserAccountEdit = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [address, setaddress] = useState(props.address);
  const [contactNumber, setcontact_number] = useState(props.contactNumber);
  const [email, setEmail] = useState(props.email);
  const [profileImage, setProfileImage] = useState(props.profileImage);

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert('Please upload an image first!');
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProfileImage(url);
        });
      }
    );
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    let updateData = {};
    if (profileImage) {
      updateData = {
        firstName,
        lastName,
        address,
        contactNumber,
        email,
        profileImage,
      };
    } else {
      updateData = {
        firstName,
        lastName,
        address,
        contactNumber,
        email,
      };
    }

    axios
      .put(
        process.env.REACT_APP_BACKEND_API + '/api/user/' + props.id,
        updateData
      )
      .then(() => {
        toast.success('Edit successfull');
        props.closeModal();
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };

  return (
    <div className='container mt-1' style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='card p-1 mb-1'>
        <div className='row'>
          <form onSubmit={onHandleSubmit}>
  
            <div className='col-sm-15 p-2'>
              <label>Email address:</label>
              <input
                className='form-control'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                readOnly
              />
            </div>
  
            <div id='emailHelp' class='form-text mb-3'>
              We'll never share your email with anyone else.
            </div>
  
            <div className='col-sm-15 p-2'>
              <label>First Name:</label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
  
            <div className='col-sm-15 p-2'>
              <label>Last Name:</label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
  
            <div className='col-sm-15 p-2'>
              <label>Address:</label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => setaddress(e.target.value)}
                value={address}
              />
            </div>
  
            <div className='col-sm-15 p-2'>
              <label>Contact Number:</label>
              <input
                className='form-control'
                type='tel'
                onChange={(e) => setcontact_number(e.target.value)}
                value={contactNumber}
              />
            </div>
  
            <div className='col-sm-15 p-2'>
              <label>Profile Image:</label>
              {profileImage && (
                <img src={profileImage} width='200' height='200' alt='profile' />
              )}
              <input
                className='form-control'
                type='file'
                onChange={(e) => uploadImage(e)}
              />
            </div>
  
            <div></div>
            <div className='row'>
              <div className='col-sm-12 p-2'>
                <button className='btn btn-success text-white w-100' type='submit'>
                  EDIT
                </button>
              </div>
              <div className='col-sm-12 p-2'>
                <button
                  className='btn btn-danger text-white w-100'
                  onClick={props.closeModal}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
              }
export default UserAccountEdit;
