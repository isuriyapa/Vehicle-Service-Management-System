import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQs } from '../../app/actions/faq.actions';
import InquiryForm from '../../components/InquiryForm';

function FAQ() {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faq.faqs);

  useEffect(() => {
    dispatch(getFAQs());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <h1>FAQ</h1>
      <hr />
      <InquiryForm />
      <div>
        {faqs &&
          faqs.map((faq) => {
            if (faq.isPublished) {
              return (
                <div className='card mb-3' key={faq._id}>
                  <h5 className='card-header'>{faq.issue}</h5>
                  <div className='card-body'>
                    <p className='card-text'>{faq.answer}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default FAQ;
