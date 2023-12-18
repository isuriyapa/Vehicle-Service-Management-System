import React, { useState } from 'react';
import LeaveAPI from '../../api/LeaveAPI';

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaves = async () => {
    const response = await LeaveAPI.getAllLeaves();
    setLeaves(response.data.data);
  };

  React.useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Leaves</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        {/* <h2 className="border-bottom border-secondary pb-3">
          All Leave Requests
        </h2> */}
        <div className='container mt-3'>
          <div className='row'>
            <div className='col-md-6'>
              <h3 className='border-bottom border-secondary pb-3'>
                All Leave Requests
              </h3>
            </div>
            <div className='col-md-6'>
              <input
                type='text'
                className='form-control'
                placeholder='Search by staff name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Photo</th>
              <th scope='col'>Reason</th>
              <th scope='col'>From</th>
              <th scope='col'>To</th>
              <th scope='col'>Status</th>
              <th scope='col'>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {leaves
              .filter((leave) => {
                return (leave.staffId.firstName + ' ' + leave.staffId.lastName)
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
              .map((leave) => (
                <tr key={leave._id}>
                  {/* put array index as key */}
                  <th scope='row'>{leaves.indexOf(leave) + 1}</th>
                  <td>
                    {leave.staffId.firstName + ' ' + leave.staffId.lastName}
                  </td>
                  <td>
                    <img
                      src={leave.staffId.profilePicture}
                      alt='staff'
                      style={{ width: '50px' }}
                    />
                  </td>
                  <td>{leave.reason}</td>
                  {/* Format date from 2023-04-15T00:00:00.000Z to 15-04-2023 */}
                  <td>{leave.startDate && leave.startDate.split('T')[0]}</td>
                  <td>{leave.endDate && leave.endDate.split('T')[0]}</td>
                  <td>
                    <h4>
                      {leave.status === 'pending' ? (
                        <span className='badge bg-warning'>
                          {leave.status.toUpperCase()}
                        </span>
                      ) : leave.status === 'approved' ? (
                        <span className='badge bg-success'>
                          {leave.status.toUpperCase()}
                        </span>
                      ) : (
                        <span className='badge bg-danger'>
                          {leave.status.toUpperCase()}
                        </span>
                      )}
                    </h4>
                  </td>
                  <td>{leave.createdAt && leave.createdAt.split('T')[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leave;
