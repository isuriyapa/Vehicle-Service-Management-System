import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobNotices } from '../../app/actions/jobnotice.actions';
import { FaSuitcase } from 'react-icons/fa';

function JobNotices() {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.jobnotice.notices);

  useEffect(() => {
    dispatch(getJobNotices());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <h1>Job Notices</h1>
      <hr />
      <div>
        {notices &&
          notices.map((notice) => {
            if (notice.isPublished) {
              return (
                <div className='card mb-3' key={notice._id}>
                  <h5 className='card-header'>
                    <FaSuitcase /> {notice.title}
                  </h5>
                  <div className='card-body'>
                    <p className='card-text'>{notice.description}</p>
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

export default JobNotices;
