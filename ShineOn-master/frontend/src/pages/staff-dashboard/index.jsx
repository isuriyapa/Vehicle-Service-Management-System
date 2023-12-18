import React from 'react';
import { useState } from 'react';

import Dashboard from './Dashboard';
import Leave from './Leave';
import Profile from './Profile';
import Attendance from './Attendance';

import './style.css';

const index = () => {
  const staffName = localStorage.getItem('name') || 'Staff';
  const profilePicture =
    localStorage.getItem('profilePicture') ||
    'https://cdn2.iconfinder.com/data/icons/web-solid/32/user-512.png';

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className='container-fluid g-0'>
      <div className='row g-0'>
        {/* Left Sidebar */}
        <div className='col-md-3'>
          <div className='bg-primary p-3 min-vh-100'>
            {/* Side by side logo and text */}
            <a
              href='#profile'
              onClick={() => handleTabClick(2)}
              className='my-link'
            >
              <div className='d-flex align-items-center mb-3'>
                <img
                  src={profilePicture}
                  alt='logo'
                  className='img-fluid bg-white rounded-circle border border-white'
                  style={{ width: '50px' }}
                />
                <h3 className='text-white ms-3'>
                  <strong>{staffName}</strong>
                </h3>
              </div>
            </a>

            {/* Sidebar Content */}
            <ul className='nav flex-column p-2 rounded bg-light '>
              <li className='nav-item py-1'>
                <a
                  className={`nav-link on-hover rounded ${
                    activeTab === 0 ? 'bg-primary text-white' : ''
                  }`}
                  href='#dashboard'
                  onClick={() => handleTabClick(0)}
                >
                  Dashboard
                </a>
              </li>
              <li className='nav-item py-1'>
                <a
                  className={`nav-link on-hover rounded ${
                    activeTab === 1 ? 'bg-primary text-white' : ''
                  }`}
                  href='#leave'
                  onClick={() => handleTabClick(1)}
                >
                  Apply Leave
                </a>
              </li>
              <li className='nav-item py-1'>
                <a
                  className={`nav-link on-hover rounded ${
                    activeTab === 3 ? 'bg-primary text-white' : ''
                  }`}
                  href='#attendance'
                  onClick={() => handleTabClick(3)}
                >
                  Attendance
                </a>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>

            {/* Logout Button */}
            <div className='mt-3'>
              <button className='btn btn-danger w-100' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className='col-md-9 mt-3'>
          <div className=''>
            {activeTab === 0 && <Dashboard />}
            {activeTab === 1 && <Leave />}
            {activeTab === 2 && <Profile />}
            {activeTab === 3 && <Attendance />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
