import React, { useState } from 'react';
import LeaveAPI from '../../api/LeaveAPI';
import makeToast from '../../components/toast';

const Leave = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const insertLeave = async () => {
    await LeaveAPI.requestLeave(formData)
      .then((res) => {
        makeToast({ type: 'success', message: res.data.message });
        window.location.href = '/staff';
      })
      .catch((err) => {
        makeToast({ type: 'error', message: err.response.data.message });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertLeave();
  };

  return (
    <>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Leaves</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        <h2 className='border-bottom border-secondary pb-3'>Apply Leave</h2>
        <form onSubmit={handleSubmit} className='col-md-6 m-5'>
          <div className='form-group'>
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='date'
              className='form-control'
              id='startDate'
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='endDate'>End Date</label>
            <input
              type='date'
              className='form-control'
              id='endDate'
              name='endDate'
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='reason'>Reason</label>
            <input
              type='text'
              className='form-control'
              id='reason'
              name='reason'
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Leave;
