import React, { useState } from 'react';
import LeaveAPI from '../../api/LeaveAPI';
import makeToast from '../../components/toast';

const Dashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaves = async () => {
    const response = await LeaveAPI.getAllLeaves();
    setLeaves(response.data.data);
  };

  React.useEffect(() => {
    fetchLeaves();
  }, []);

  // Approve leave
  const approveLeave = async (id) => {
    const response = await LeaveAPI.approveLeave(id);
    if (response.data.success) {
      makeToast({ type: 'success', message: 'Leave approved' });
    }
    fetchLeaves();
  };

  // Reject leave
  const rejectLeave = async (id) => {
    const response = await LeaveAPI.rejectLeave(id);
    if (response.data.success) {
      makeToast({ type: 'success', message: 'Leave rejected' });
    }
    fetchLeaves();
  };

  return (
    <>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container mt-3'>
          <h1 className='text-center'>
            <strong>Employee Dashboard</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        {/* <h3 className="border-bottom border-secondary pb-3">
          Pending Leave Requests
        </h3> */}
        <div className='container mt-3'>
          <div className='row'>
            <div className='col-md-6'>
              <h3 className='border-bottom border-secondary pb-3 text-dark'>
                Pending Leave Requests
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
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves
              .filter((leave) => leave.status === 'pending')
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
                    <button
                      className='btn btn-success'
                      onClick={() => approveLeave(leave._id)}
                    >
                      Approve
                    </button>
                    <button
                      className='btn btn-danger ms-2'
                      onClick={() => rejectLeave(leave._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
