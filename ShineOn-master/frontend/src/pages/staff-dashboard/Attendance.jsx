import React, { useState, useEffect } from 'react';
import AttendanceAPI from '../../api/AttendanceAPI';
import makeToast from '../../components/toast';
import QRCode from 'react-qr-code';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

const Attendance = () => {
  const email = localStorage.getItem('email');

  const [attendances, setAttendances] = useState([
    {
      _id: '',
      date: '',
      time: '',
      status: '',
      remarks: '',
    },
  ]);

  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [status, setStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  // getAllAttendanceForLoggedInStaff
  const getAttendances = () => {
    AttendanceAPI.getAllAttendanceForLoggedInStaff()
      .then((res) => {
        setAttendances(res.data.data);
      })
      .catch((err) => {
        makeToast({ type: 'error', message: err.response.data.message });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      date: date,
      time: time,
      status: status,
      remarks: remarks,
    };
    // Send data to backend
    AttendanceAPI.markAttendance(values)
      .then((res) => {
        makeToast({ type: 'success', message: 'Attendance marked' });
        getAttendances();
      })
      .catch((err) => {
        makeToast({ type: 'error', message: err.response.data.message });
      });

    // Reset form fields
    setRemarks('');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Update every 1 second
    getAttendances();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Attendance</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        <h2 className='border-bottom border-secondary pb-3'>
          Log your attendance
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <h1 className='text-center'>{time}</h1>
          </div>

          <div className='form-group mb-3'>
            <label htmlFor='date'>Date</label>
            <input
              type='string'
              className='form-control'
              id='date'
              value={date}
              disabled
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='remarks'>Remarks</label>
            <input
              type='text'
              className='form-control'
              id='remarks'
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={() => setStatus('present')}
          >
            Present
          </button>
          <button
            type='submit'
            className='btn btn-warning ms-2 '
            onClick={() => setStatus('late')}
          >
            Late
          </button>
          <button
            type='submit'
            className='btn btn-danger ms-2'
            onClick={() => setStatus('absent')}
          >
            Absent
          </button>
        </form>

        <div className='mt-5'>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
          >
            Scan QR Code {''}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-qr-code'
              viewBox='0 0 16 16'
            >
              <path d='M2 2h2v2H2V2Z' />
              <path d='M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z' />
              <path d='M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z' />
              <path d='M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z' />
              <path d='M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z' />
            </svg>
          </button>

          <div
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5' id='exampleModalLabel'>
                    Scan QR Code to mark attendance
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  {/* Use QR Code to mark attendance */}
                  <div className='mt-5'>
                    <div className='text-center'>
                      <QRCode
                        // replace space with %20
                        value={`${BASE_URL}/api/attendance/mark/${email}?date=${date}&time=${time.replace(' ', '%20')}`}
                      />
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className='border-bottom border-secondary pb-3 mt-5'>
          Attendance History
        </h2>
        <table className='table table-striped mt-3'>
          <thead>
            <tr>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Status</th>
              <th scope='col'>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendances
              .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map((attendance) => (
                <tr key={attendance._id}>
                  <td>{attendance.date} </td>
                  <td>{attendance.time}</td>
                  <td>
                    {attendance.status === 'present' ? (
                      <span className='badge bg-success'>
                        {attendance.status}
                      </span>
                    ) : attendance.status === 'late' ? (
                      <span className='badge bg-warning'>
                        {attendance.status}
                      </span>
                    ) : (
                      <span className='badge bg-danger'>
                        {attendance.status}
                      </span>
                    )}
                  </td>
                  <td>{attendance.remarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance