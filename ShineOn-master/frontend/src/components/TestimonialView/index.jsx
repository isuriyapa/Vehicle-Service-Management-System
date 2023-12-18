import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TestimonialView(props) {
  const selectedTestimonial = useSelector(
    (state) => state.testimonial.selectedTestimonial
  );

  const [userName, setUserName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isPublished, setIsPublished] = useState('');

  useEffect(() => {
    if (selectedTestimonial) {
      setUserName(selectedTestimonial.userName);
      setFeedback(selectedTestimonial.feedback);
      setIsPublished(selectedTestimonial.isPublished);
    }
  }, [selectedTestimonial]);

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>User Name</label>
            <input
              type='text'
              id='title'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name='title'
              className='form-control'
              readOnly
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
              readOnly
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>Status</label>
            <input
              type='email'
              id='title'
              value={isPublished ? 'PUBLISHED' : 'PENDING'}
              onChange={(e) => setIsPublished(e.target.value)}
              name='title'
              className='form-control'
              readOnly
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <button
              className='btn btn-danger text-white w-100'
              onClick={props.closeModal}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialView;
