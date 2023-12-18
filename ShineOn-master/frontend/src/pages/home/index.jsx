import React from 'react';

const index = () => {
  return (
    <div className='container-fluid pt-5'>
      <div className='d-flex justify-content-center align-items-center'>
        {/* Admin Login button */}
        <a href='/admin-login' className='btn btn-primary'>
          Admin Login
        </a>

        {/* Staff Login button */}
        <a href='/staff-login' className='btn btn-primary ms-3'>
          Staff Login
        </a>
      </div>
    </div>
  );
};

export default index;
