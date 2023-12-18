import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonials } from '../../app/actions/testimonial.action';
import TestimonialAddForm from '../TestimonialAddForm';
import { BiUserVoice } from 'react-icons/bi';

function Testimonials() {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonials);

  useEffect(() => {
    dispatch(getTestimonials());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <h1>Testimonials</h1>
      <hr />
      <div className='row'>
        {testimonials &&
          testimonials.map((testimonial) => {
            if (testimonial.isPublished) {
              return (
                <div className='col-lg-3 col-md-4 col-sm-6 mb-4' >
                  <div class='card' >
                    <div class='card-header text-center' >
                      <img
                        src={testimonial.userProfileImage}
                        class='card-img-top rounded-circle'
                        alt='...'
                        style={{width:"100px", height:"100px", objectFit:'cover'}}
                      />
                    </div>

                    <div class='card-body'>
                      <blockquote class='blockquote mb-0'>
                        <p>{testimonial.feedback}</p>
                        <footer class='blockquote-footer'>
                          {testimonial.userName}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
      <TestimonialAddForm />
    </div>
  );
}

export default Testimonials;
