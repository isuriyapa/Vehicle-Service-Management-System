import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { AiFillMail } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';

function Footer() {
  return (
    <footer className='text-center text-lg-start bg-primary text-muted text-white'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white'>
        <div>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-facebook-f text-white'></i>
          </a>
          <a href='/' className='me-4 text-reset text-white'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-google'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-linkedin'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-github'></i>
          </a>
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5 text-white'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem'></i>Shine On Car Service
              </h6>
              <p>
                <HiLocationMarker />
                Dikkumbura,Habaraduwa, Galle
              </p>
              <p>
                <AiFillMail />
                shine.on.habaraduwa@gmail.com
              </p>
              <p>
                <BsFillTelephoneFill />
                0769881536
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/services' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='/services' className='text-reset'>
                  Services
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Privacy
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-white'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/booknow' className='text-reset'>
                  Book Now
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Payment
                </a>
              </p>
              <p>
                <a href='/services' className='text-reset'>
                  Services
                </a>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <a href='/notices' className='text-white'>
                  <i className='fas fa-home me-3'></i> Notices
                </a>
              </p>
              <p>
                <a href='/faq' className='text-white'>
                  <i className='fas fa-envelope me-3'></i>
                  Contact Us
                </a>
              </p>

              <p>
              <i className='fas fa-envelope me-3'></i>

                <a href='/services' className='text-white'>
                  Services
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className='text-center p-4 text-white'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Shine on
        </a>
      </div>
    </footer>
  );
}

export default Footer;
