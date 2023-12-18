import React, { useState } from 'react';
import StaffAPI from '../../api/StaffAPI';
import makeToast from '../../components/toast';
import EditStaff from './EditStaff';

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});

  const fetchStaffs = async () => {
    const response = await StaffAPI.getAllStaffs();
    setStaffs(response.data.data);
  };

  React.useEffect(() => {
    fetchStaffs();
  }, []);

  // Delete Staff
  const deleteStaff = async (id) => {
    const response = await StaffAPI.deleteStaffById(id);
    if (response.data.success) {
      makeToast({ type: 'success', message: response.data.message });
      fetchStaffs();
    } else {
      makeToast({ type: 'error', message: response.data.message });
    }
  };

  return (
    <>
      {/* Modal */}
      <EditStaff staff={selectedStaff} fetchStaffs={fetchStaffs} />

      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Staff</strong>
          </h1>
        </div>
      </div>
      <div className='container mt-3'>
        <h2 className='border-bottom border-secondary pb-3'>Staff List</h2>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Photo</th>
              <th scope='col'>Email</th>
              <th scope='col'>Total Leaves</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <th scope='row'>{staffs.indexOf(staff) + 1}</th>
                <td>{staff.firstName + ' ' + staff.lastName}</td>
                <td>
                  <img
                    src={staff.profilePicture}
                    alt='staff'
                    style={{ width: '50px' }}
                  />
                </td>
                <td>{staff.email}</td>
                <td>{staff.totalLeaves}</td>
                <td>
                  <button
                    className='btn btn-danger mx-1'
                    onClick={() => deleteStaff(staff._id)}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary mx-1'
                    data-bs-toggle='modal'
                    data-bs-target='#editStaffModal'
                    onClick={() => setSelectedStaff(staff)}
                  >
                    Edit
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

export default Staff;
