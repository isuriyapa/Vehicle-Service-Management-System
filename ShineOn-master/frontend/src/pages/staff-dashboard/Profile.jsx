import React, { useState, useEffect } from 'react';
import StaffAPI from '../../api/StaffAPI';
import makeToast from '../../components/toast';
import storage from '../../util/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);

  // Join date is not editable
  const [dateOfJoining, setDateOfJoining] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      profilePicture,
      dateOfBirth,
      mobileNumber,
      nic,
      address,
    };
    StaffAPI.updateStaffById(id, data)
      .then((res) => {
        localStorage.setItem(
          'name',
          res.data.data.firstName + ' ' + res.data.data.lastName
        );
        localStorage.setItem('email', res.data.data.email);
        localStorage.setItem('profilePicture', res.data.data.profilePicture);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeMyPassword = async () => {
    const data = {
      currentPassword,
      newPassword,
    };
    await StaffAPI.changePassword(data)
      .then((res) => {
        makeToast({ type: 'success', message: res.data.message });
      })
      .catch((err) => {
        makeToast({ type: 'error', message: err.response.data.message });
      });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    changeMyPassword();

    // Clear the form
    setCurrentPassword('');
    setNewPassword('');
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
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
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProfilePicture(url);
        });
      }
    );
  };

  useEffect(() => {
    StaffAPI.getStaffById()
      .then((res) => {
        setId(res.data.data._id);
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
        setProfilePicture(res.data.data.profilePicture);
        setDateOfBirth(res.data.data.dateOfBirth);
        setDateOfJoining(res.data.data.dateOfJoining);
        setMobileNumber(res.data.data.mobileNumber);
        setNic(res.data.data.nic);
        setAddress(res.data.data.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Profile</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        <h2 className='border-bottom border-secondary pb-3'>Edit Profile</h2>
      </div>
      <div className='container mt-5'>
        <form onSubmit={handleSubmit} className='row'>
          <div className='form-group col-md-6'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              className='form-control'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              className='form-control'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group col-md-6'>
            {/* <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="string"
              className="form-control"
              id="profilePicture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            /> */}
            <label htmlFor='profilePicture'>Profile Picture</label>
            <input
              type='file'
              className='form-control'
              id='profilePicture'
              placeholder='Upload profile picture'
              onChange={handleChange}
            />
            <button
              type='button'
              onClick={handleUpload}
              disabled={!file}
              className='btn btn-primary mt-2 btn-sm'
            >
              Upload
            </button>
            <div className='progress mt-2'>
              <div
                className='progress-bar'
                role='progressbar'
                style={{ width: `${percent}%` }}
                aria-valuenow={percent}
                aria-valuemin='0'
                aria-valuemax='100'
              >
                {percent}%
              </div>
            </div>
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='dateOfBirth'>Date of Birth</label>
            <input
              type='string'
              className='form-control'
              id='dateOfBirth'
              value={dateOfBirth && dateOfBirth.split('T')[0]}
              readOnly
              disabled
            />
          </div>
          {/* Join date is not editable */}
          <div className='form-group col-md-6'>
            <label htmlFor='dateOfJoining'>Date of Joining</label>
            <input
              type='string'
              className='form-control'
              id='dateOfJoining'
              value={dateOfJoining && dateOfJoining.split('T')[0]}
              readOnly
              disabled
            />
          </div>

          <div className='form-group col-md-6'>
            <label htmlFor='mobileNumber'>Mobile Number</label>
            <input
              type='text'
              className='form-control'
              id='mobileNumber'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='nic'>NIC</label>
            <input
              type='text'
              className='form-control'
              id='nic'
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
          </div>
          <div className='form-group col-md-12 mb-5'>
            <label htmlFor='address'>Address</label>
            <textarea
              className='form-control'
              id='address'
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group col-md-12'>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </div>
        </form>
      </div>

      <div className='container mt-5'>
        <h2 className='border-bottom border-top border-secondary py-3'>
          Change Password
        </h2>
      </div>
      <div className='container mt-5'>
        <form className='row' onSubmit={handlePasswordChange}>
          <div className='form-group col-md-6'>
            <label htmlFor='currentPassword'>Current Password</label>
            <input
              type='password'
              className='form-control'
              id='currentPassword'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='newPassword'>New Password</label>
            <input
              type='password'
              className='form-control'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='form-group col-md-12 mt-3 mb-5'>
            <button type='submit' className='btn btn-outline-danger'>
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
