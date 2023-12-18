import React from 'react';
import DailyNotices from '../../assets/DailyNotices.png';
import faq_background from '../../assets/faq_background.png';
import Job_Notices from '../../assets/Job_Notices.png';
import testimonials_background from '../../assets/testimonials_background.png';
import { Link } from 'react-router-dom';

function Notices() {
  return (
    <div className='container mt-5 mb-5'>
      <h1>HOW CAN WE HELP YOU ?</h1>
      <hr />
      <div class='container'>
        <div class='row mb-4'>
          <div class='col-md-6 col-lg-6'>
            <Link to='/dailynotices'>
              <div class='position-relative'>
                <img
                  src={DailyNotices}
                  class='img-fluid square-img'
                  alt='...'
                />
                <div class='position-absolute top-50 start-50 translate-middle text-center'>
                  <span class='text-white fs-3 fw-bold'>DAILY NOTICES</span>
                </div>
              </div>
            </Link>
          </div>
          <div class='col-md-6 col-lg-6'>
            <Link to='/jobs'>
              <div class='position-relative'>
                <img src={Job_Notices} class='img-fluid square-img' alt='...' />
                <div class='position-absolute top-50 start-50 translate-middle text-center'>
                  <span class='text-white fs-3 fw-bold'>
                    CAREER OPPORTUNITIES
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-6 col-lg-6'>
            <Link to='/faq'>
              <div class='position-relative'>
                <img
                  src={faq_background}
                  class='img-fluid square-img'
                  alt='...'
                />
                <div class='position-absolute top-50 start-50 translate-middle text-center'>
                  <span class='text-white fs-3 fw-bold'>FAQ</span>
                </div>
              </div>
            </Link>
          </div>
          <div class='col-md-6 col-lg-6'>
            <Link to='/testimonials'>
              <div class='position-relative'>
                <img
                  src={testimonials_background}
                  class='img-fluid square-img'
                  alt='...'
                />
                <div class='position-absolute top-50 start-50 translate-middle text-center'>
                  <span class='text-white fs-3 fw-bold'>TESTIMONIALS</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notices;
