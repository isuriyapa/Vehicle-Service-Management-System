import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { saveJobNotice } from '../../app/actions/jobnotice.actions';

function JobNoticeAdd(props) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOnSubmit = () => {
    const dataObject = {
      title,
      description,
    };

    if (!title || !description) {
      toast.error('All the fields should not be empty');
      return;
    }
    dispatch(saveJobNotice(dataObject));

    clearInputFields();

    props.closeModal();
  };

  const clearInputFields = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='title'
              className='form-control'
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              className='form-control'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <button
              className='btn btn-success text-white w-100'
              onClick={handleOnSubmit}
            >
              SUBMIT
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
      </div>
    </div>
  );
}

export default JobNoticeAdd;
