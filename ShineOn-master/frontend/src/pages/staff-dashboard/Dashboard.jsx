import React, { useState } from 'react';
import LeaveAPI from '../../api/LeaveAPI';
import makeToast from '../../components/toast';

const Dashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaves = async () => {
    // Await for the userId to be fetched from local storage
    const userId = await localStorage.getItem('_id');
    const response = await LeaveAPI.getLeavesOfUser(userId);
    setLeaves(response.data.data);
  };

  React.useEffect(() => {
    fetchLeaves();
  }, []);

  // Delete leave
  const deleteLeave = async (id) => {
    const response = await LeaveAPI.deleteLeave(id);
    if (response.data.success) {
      makeToast({ type: 'success', message: response.data.message });
      fetchLeaves();
    } else {
      makeToast({ type: 'error', message: response.data.message });
    }
  };

  return (
    <>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Staff Dashboard</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h3 className='border-bottom border-secondary pb-3 text-dark'>
              My Leave Requests
            </h3>
          </div>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by reason'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Reason</th>
              <th scope='col'>From</th>
              <th scope='col'>To</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves
              // filter decending order by createdAt
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              // filter by search query
              .filter((leave) => {
                return leave.reason
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
              .map((leave) => (
                <tr key={leave._id}>
                  {/* put array index as key */}
                  <th scope='row'>{leaves.indexOf(leave) + 1}</th>
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
                  <td>
                    {leave.status === 'pending' && (
                      <button
                        className='btn btn-outline-danger'
                        onClick={() => deleteLeave(leave._id)}
                      >
                        Cancel
                      </button>
                    )}
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
