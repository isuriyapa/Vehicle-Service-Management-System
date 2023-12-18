import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateDailyNotice } from '../../app/actions/dailynotice.actions';

function DailyNoticeEdit(props) {
  const dispatch = useDispatch();
  const selectedNotice = useSelector(
    (state) => state.dailynotice.selectedNotice
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedNotice) {
      setTitle(selectedNotice.title);
      setDescription(selectedNotice.description);
    }
  }, [selectedNotice]);

  const handleOnSubmit = () => {
    const dataObject = {
      _id: selectedNotice._id,
      title,
      description,
    };

    if (!title || !description) {
      toast.error('All the fields should not be empty');
      return;
    }
    dispatch(updateDailyNotice(dataObject));

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
      </div>
    </div>
  );
}

export default DailyNoticeEdit;
