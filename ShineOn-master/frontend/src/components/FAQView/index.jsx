import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function FAQView(props) {
  const selectedFaq = useSelector((state) => state.faq.selectedFaq);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (selectedFaq) {
      setName(selectedFaq.name);
      setEmail(selectedFaq.email);
      setIssue(selectedFaq.issue);
      setAnswer(selectedFaq.answer);
    }
  }, [selectedFaq]);

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={name}
              onChange={(e) => setName(e.target.value)}
              name='title'
              className='form-control'
              readOnly
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='title'>Email</label>
            <input
              type='email'
              id='title'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='title'
              className='form-control'
              readOnly
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='description'>Issue</label>
            <input
              type='text'
              id='description'
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              name='description'
              className='form-control'
              readOnly
            />
          </div>
          <div className='col-sm-12 p-2'>
            <label htmlFor='description'>Answer</label>
            <input
              type='text'
              id='description'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              name='description'
              className='form-control'
              readOnly
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 p-2'>
            <button
              className='btn btn-danger text-white w-100'
              onClick={props.closeModal}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQView;
