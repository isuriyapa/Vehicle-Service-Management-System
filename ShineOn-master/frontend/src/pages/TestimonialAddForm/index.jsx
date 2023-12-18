import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveTestimonial } from '../../app/actions/testimonial.action';
import { toast } from 'react-toastify';
import axios from 'axios';

function TestimonialAddForm() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userProfileImage, setUserProfileImage] = useState('');

  useEffect(() => {
    const jsonObject = JSON.parse(localStorage.getItem('user'));
    const dataObject = {
      email: jsonObject.email,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_API + '/api/user/getuser', dataObject)
      .then((response) => {
        setUserProfileImage(response.data.profileImage);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  },[]);

  const handleOnSubmit = () => {
    const dataObject = {
      userName,
      feedback,
      userProfileImage
    };

    if (!userName || !feedback) {
      toast.error('All the fields should not be empty');
      return;
    }
    dispatch(saveTestimonial(dataObject));

    clearInputFields();
  };

  const clearInputFields = () => {
    setUserName('');
    setFeedback('');
  };

  return (
    <div>
      <div className='card p-5 mb-5'>
        <div className='row'>
          <h3 className='text-center'>SUBMIT YOUR FEEDBACK</h3>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>User Name</label>
            <input
              type='text'
              id='title'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name='title'
              className='form-control'
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>Feedback</label>
            <input
              type='email'
              id='title'
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              name='title'
              className='form-control'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 p-2 gap-2 d-flex'>
            <button
              className='btn btn-success text-white'
              onClick={handleOnSubmit}
            >
              SUBMIT
            </button>
            <button
              className='btn btn-danger text-white ml-3'
              onClick={clearInputFields}
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialAddForm;
