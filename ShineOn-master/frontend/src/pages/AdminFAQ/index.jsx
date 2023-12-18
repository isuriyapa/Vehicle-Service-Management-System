import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQs } from '../../app/actions/faq.actions';
import FAQTable from '../../components/FAQTable';

function AdminFAQ() {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faq.faqs);

  useEffect(() => {
    dispatch(getFAQs());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-4'>
          <h1>FAQ</h1>
        </div>
      </div>
      <FAQTable dataArray={faqs} />
    </div>
  );
}

export default AdminFAQ;
