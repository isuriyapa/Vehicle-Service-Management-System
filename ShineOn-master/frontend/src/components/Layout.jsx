import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <div className='container-fluid min-vh-100 g-0 bg-light'>{children}</div>
    </>
  );
};

export default Layout;
