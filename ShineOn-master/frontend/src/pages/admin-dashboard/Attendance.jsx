import React, { useState } from 'react';
import StaffAPI from '../../api/StaffAPI';
import AttendanceAPI from '../../api/AttendanceAPI';
import makeToast from '../../components/toast';
import * as XLSX from 'xlsx';

const Attendance = () => {
  const [staffs, setStaffs] = useState([]);

  const fetchStaffs = async () => {
    const response = await StaffAPI.getAllStaffs();
    setStaffs(response.data.data);
  };

  // Download report
  const downloadExcel = (data) => {
    console.log(data);
    // cusromize attribute name
    data = data.map((item) => {
      return {
        'Staff ID': item.staffId,
        Date: item.date,
        Time: item.time,
        Status: item.status,
        Remark: item.remarks,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // Get today's date
    const today = new Date();
    XLSX.writeFile(workbook, 'Attendance Report ' + today + '.xlsx');
  };

  // Async function to download report
  const onDownload = async (id) => {
    try {
      // await fetchAttendances(id);
      const response = await AttendanceAPI.getAllAttendanceForStaff(id);
      downloadExcel(response.data.data);
    } catch (error) {
      makeToast({ type: 'error', message: error.response.data.message });
    }
  };

  React.useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <>
      <div className='py-2 border-bottom border-secondary'>
        <div className='container'>
          <h1 className='text-center'>
            <strong>Attendance Report</strong>
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
              <th scope='col'>Attendance Report</th>
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
                <td>
                  <button
                    className='btn btn-success'
                    onClick={() => onDownload(staff._id)}
                  >
                    Download
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

export default Attendance;
