import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      await login(email, password);
    }
  };

  return (
    <div className='container card mt-5 mb-5'>
      <div className='row container'>
        <div className='col-6 mt-2 p-3 mb-5 border-end border-dark'>
          <img
            src='https://www.ymfcarparts.co.uk/images/blog/full-car-service.jpg'
            className='rounded'
            width={500}
            height={500}
            alt='user login'
          />
        </div>
        <div className='col-6'>
          <form className='p-5 mt-5 mb-5' onSubmit={handleSubmit}>
            <h3 className='text-center'>LOGIN</h3>
            <hr />
            <label>Email address:</label>
            <input
              className={`form-control mb-3 ${emailError ? 'is-invalid' : ''}`}
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              value={email}
            />
            
            {emailError && <div className='invalid-feedback'>{emailError}</div>}
            <label>Password:</label>
            <div className="input-group mb-3">
              <input
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                value={password}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            {passwordError && (
              <div className='invalid-feedback'>{passwordError}</div>
            )}
            <button className='btn btn-primary' disabled={isLoading}>
              Log In
            </button>
            <hr />
            <div className='row text-center'>
              <div className='col-6'>
                <Link className='btn btn-primary' to='/forgotpassword'>
                  Forgot Password
                </Link>
              </div>
              <div className='col-6'>
                <Link className='btn btn-primary' to='/registercompany'>
                  Company Registration
                </Link>
              </div>
            </div>
            <hr />
            <div className='row text-center'>
              <div className='col-12 p-2'>
                <Link className='btn btn-warning w-100' to='/adminlogin'>
                  Admin
                </Link>
              </div>
              <div className='col-12 p-2'>
                <Link className='btn btn-warning w-100' to='/stafflogin'>
                  Staff
                </Link>
              </div>
              <div className='col-12 p-2'>
                <Link className='btn btn-warning w-100' to='/supplierLogin'>
                  Supplier
                </Link>
              </div>
            </div>
            {error && <div className='error'>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
