import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFAQ } from '../../app/actions/faq.actions';
import { toast } from 'react-toastify';

function InquiryForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [email, setEmail] = useState('');

  const handleOnSubmit = () => {
    const newFaq = {
      name,
      issue,
      email,
    };

    if (!name || !issue || !email) {
      toast.error('All the fields should not be empty');
      return;
    }
    dispatch(saveFAQ(newFaq));

    clearInputFields();
  };

  const clearInputFields = () => {
    setName('');
    setEmail('');
    setIssue('');
  };
  return (
    <div>
      <div className='container mt-5 mb-5 card p-5'>
        <h4>INQUIRY FORM</h4>
        <hr />
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              name='name'
              className='form-control'
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              className='form-control'
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='issue'>Issue</label>
            <textarea
              id='issue'
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              name='issue'
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

export default InquiryForm;
