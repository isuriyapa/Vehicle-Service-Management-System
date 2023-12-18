import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyNotices } from '../../app/actions/dailynotice.actions';

function DailyNotices() {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.dailynotice.notices);

  useEffect(() => {
    dispatch(getDailyNotices());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <h1>Daily Notices</h1>
      <hr />
      <div>
        {notices &&
          notices.map((notice) => {
            if (notice.isPublished) {
              return (
                <div className='card mb-3' key={notice._id}>
                  <h5 className='card-header'>{notice.title}</h5>
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

export default DailyNotices;
