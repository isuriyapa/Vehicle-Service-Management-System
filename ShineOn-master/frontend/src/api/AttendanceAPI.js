import axios from 'axios';
import requestConfigJson from './requestConfigJson';
import requestConfig from './requestConfig';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

class AttendanceAPI {
  // Mark Attendance
  static markAttendance(values) {
    return axios.post(`${BASE_URL}/api/attendance`, values, requestConfigJson);
  }

  // Get all attendance records logged in staff
  static getAllAttendanceForLoggedInStaff() {
    return axios.get(`${BASE_URL}/api/attendance/`, requestConfig);
  }

  // Get all attendance records for a staff
  static getAllAttendanceForStaff(staffId) {
    return axios.get(
      `${BASE_URL}/api/attendance/staff/${staffId}`,
      requestConfig
    );
  }
}

export default AttendanceAPI;
