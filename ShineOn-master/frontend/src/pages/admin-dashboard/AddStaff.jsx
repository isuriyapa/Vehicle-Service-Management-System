import React, { useState } from 'react';
import StaffAPI from '../../api/StaffAPI';
import makeToast from '../../components/toast';
import storage from '../../util/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AddStaff = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [basicSalary, setBasicSalary] = useState('');

  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here with form data
    const formData = {
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      dateOfBirth,
      dateOfJoining,
      mobileNumber,
      nic,
      address,
      basicSalary,
    };
    await StaffAPI.staffSignup(formData)
      .then((res) => {
        makeToast({ type: 'success', message: res.data.message });
      })
      .catch((err) => {
        makeToast({ type: 'error', message: err.response.data.message });
      });

    // Reset form fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePicture('');
    setDateOfBirth('');
    setDateOfJoining('');
    setMobileNumber('');
    setNic('');
    setAddress('');
    setBasicSalary('');
    setFile('');
    setPercent(0);
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

  return (
    <>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Staff</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        <h2 className='border-bottom border-secondary pb-3'>Add Staff</h2>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group mb-3'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='firstName'
                  placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='lastName'
                  placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='profilePicture'>Profile Picture</label>
                <input
                  type='file'
                  className='form-control'
                  id='profilePicture'
                  placeholder='Upload profile picture'
                  onChange={handleChange}
                  required
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
            </div>
            <div className='col-md-6'>
              <div className='form-group mb-3'>
                <label htmlFor='dateOfBirth'>Date of Birth</label>
                <input
                  type='date'
                  className='form-control'
                  id='dateOfBirth'
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='dateOfJoining'>Date of Joining</label>
                <input
                  type='date'
                  className='form-control'
                  id='dateOfJoining'
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='mobileNumber'>Mobile Number</label>
                <input
                  type='text'
                  className='form-control'
                  id='mobileNumber'
                  placeholder='Enter mobile number'
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='nic'>NIC</label>
                <input
                  type='text'
                  className='form-control'
                  id='nic'
                  placeholder='Enter NIC'
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='basicSalary'>Basic Salary</label>
                <input
                  type='number'
                  className='form-control'
                  id='basicSalary'
                  placeholder='Enter basic salary'
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  placeholder='Enter address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !password ||
              !dateOfBirth ||
              !dateOfJoining ||
              !mobileNumber ||
              !nic ||
              !basicSalary ||
              !address ||
              !profilePicture
            }
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStaff;
