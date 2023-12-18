import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonials } from '../../app/actions/testimonial.action';
import TestimonialTable from '../../components/TestimonialTable';

function AdminTestimonials() {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonials);

  useEffect(() => {
    dispatch(getTestimonials());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-4'>
          <h1>TESTIMONIALS</h1>
        </div>
      </div>
      <TestimonialTable dataArray={testimonials} />
    </div>
  );
}

export default AdminTestimonials;
