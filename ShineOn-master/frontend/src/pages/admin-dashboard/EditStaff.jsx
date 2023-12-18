import React from 'react';
import { useState, useEffect } from 'react';
import StaffAPI from '../../api/StaffAPI';
import makeToast from '../../components/toast';
import storage from '../../util/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const EditStaff = ({ staff, fetchStaffs }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [basicSalary, setBasicSalary] = useState('');

  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      profilePicture,
      dateOfBirth,
      dateOfJoining,
      mobileNumber,
      nic,
      address,
      basicSalary,
    };
    const response = await StaffAPI.adminUpdateStaffById(staff._id, data);
    if (response.data.success) {
      makeToast({ type: 'success', message: response.data.message });
      fetchStaffs();
    } else {
      makeToast({ type: 'error', message: response.data.message });
    }
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
    setFirstName(staff.firstName);
    setLastName(staff.lastName);
    setEmail(staff.email);
    setProfilePicture(staff.profilePicture);
    setDateOfBirth(staff.dateOfBirth);
    setDateOfJoining(staff.dateOfJoining);
    setMobileNumber(staff.mobileNumber);
    setNic(staff.nic);
    setAddress(staff.address);
    setBasicSalary(staff.basicSalary);
  }, [staff]);

  return (
    <div
      className='modal fade'
      id='editStaffModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Edit {staff.firstName + ' ' + staff.lastName}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleFormSubmit}>
              {/* Form fields */}
              <div className='mb-3'>
                <label htmlFor='firstName' className='form-label'>
                  First Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='lastName' className='form-label'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
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
              <div className='mb-3'>
                <label htmlFor='dateOfBirth' className='form-label'>
                  Date of Birth
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='dateOfBirth'
                  value={dateOfBirth && dateOfBirth.slice(0, 10)}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='dateOfJoining' className='form-label'>
                  Date of Joining
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='dateOfJoining'
                  value={dateOfJoining && dateOfJoining.slice(0, 10)}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='mobileNumber' className='form-label'>
                  Mobile Number
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='mobileNumber'
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='nic' className='form-label'>
                  NIC
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='nic'
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='address' className='form-label'>
                  Address
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='basicSalary' className='form-label'>
                  Basic Salary
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='basicSalary'
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                />
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
