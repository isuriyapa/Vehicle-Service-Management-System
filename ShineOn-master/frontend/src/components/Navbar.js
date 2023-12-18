import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [supplier, setSupplier] = useState(sessionStorage.getItem('supplier'));
  const [permissionLevel, setpermissionLevel] = useState(null);

  useEffect(() => {
    const permissionLevel = sessionStorage.getItem('permissionLevel');
    if (permissionLevel) {
      
      setpermissionLevel(permissionLevel);
    }
  }, []);

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light bg-primary p-2 text-white'>
        <div className='container-fluid text-white'>
          <a className='navbar-brand text-white' href='/'>
            SHINE ON
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse text-white'
            id='navbarSupportedContent'
          >
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 text-white'>
              {!user &&
                permissionLevel !== 'ADMIN' &&
                permissionLevel !== 'USER' &&
                permissionLevel !== 'STAFF' && (
                  <>
                    <li className='nav-item'>
                      <Link
                        className='nav-link'
                        aria-current='page'
                        to='/services'
                      >
                        Services
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link
                        className='nav-link'
                        aria-current='page'
                        to='/notices'
                      >
                        Notices
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link
                        className='nav-link'
                        aria-current='page'
                        to='/faq'
                      >
                        Contact Us
                      </Link>
                    </li>
                  </>
                )}
              {permissionLevel === 'STAFF' && (
                <>
                  {/* <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/finance'
                    >
                      Finance
                    </Link>
                  </li> */}
                </>
              )}
              {permissionLevel === 'USER' && (
                <>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/requestsuppliers'
                    >
                      Request Suppliers
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/services'
                    >
                      Services
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/notices'
                    >
                      Notices
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/faq'
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/booknow'>
                      Book Now
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to='/testimonials'
                    >
                      Testimonials
                    </Link>
                  </li>
                </>
              )}
              {permissionLevel === 'ADMIN' && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/admin'>
                      Employee
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to='/admin/company'
                    >
                      Companies
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to='/suppliers'
                    >
                      Suppliers
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/appointments'
                    >
                      Appointments
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/StockList'
                    >
                      Stock
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/adminnotices'
                    >
                      Notices
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/finance'
                    >
                      Finance
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className='d-flex'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0 text-white'>
                {user && (
                  <>
                    <li className='nav-item'>
                      <Link
                        className='nav-link me-2'
                        aria-current='page'
                        to='/Profile'
                      >
                        {user.email}
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <button
                        className='btn btn-warning'
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {(permissionLevel === 'ADMIN' ||
                  permissionLevel === 'STAFF' ||
                  permissionLevel === 'SUPPLIER') && (
                  <>
                    <li className='nav-item'>
                      <Link
                        className='nav-link me-2'
                        aria-current='page'
                      >
                        {sessionStorage.getItem('email')}
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <button
                        className='btn btn-warning'
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                

                {!user &&
                  permissionLevel !== 'ADMIN' &&
                  permissionLevel !== 'USER' &&
                  permissionLevel !== 'STAFF' &&
                  permissionLevel !== 'SUPPLIER' && (
                    <>
                      <li className='nav-item'>
                        <Link
                          className='btn btn-warning me-2'
                          aria-current='page'
                          to='/login'
                        >
                          Login
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link
                          className='btn btn-warning'
                          to='/signup'
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
