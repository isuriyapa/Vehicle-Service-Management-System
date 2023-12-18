import React, { useState } from 'react';
import AdminAPI from '../../api/AdminAPI';

const index = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAPI.adminLogin({ email, password });
      localStorage.setItem('authToken', response.data.data.authToken);
      localStorage.setItem('email', response.data.data.email);
      localStorage.setItem('name', response.data.data.name);
      localStorage.setItem(
        'permissionLevel',
        response.data.data.permissionLevel
      );
      localStorage.setItem('_id', response.data.data._id);
      localStorage.setItem('profilePicture', response.data.data.profilePicture);

      sessionStorage.setItem('authToken', response.data.data.authToken);
      sessionStorage.setItem('email', response.data.data.email);
      sessionStorage.setItem('name', response.data.data.name);
      sessionStorage.setItem(
        'permissionLevel',
        response.data.data.permissionLevel
      );
      sessionStorage.setItem('_id', response.data.data._id);
      sessionStorage.setItem(
        'profilePicture',
        response.data.data.profilePicture
      );

      window.location.href = '/admin';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mt-5 mb-5 d-flex justify-content-center align-items-center'>
      <div className='card'>
        <div className='card-body p-5'>
          <h1 className='card-title text-center mb-4'>Admin Login</h1>
          <hr />
          <form onSubmit={handleFormSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div id='emailHelp' class='form-text'>
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
