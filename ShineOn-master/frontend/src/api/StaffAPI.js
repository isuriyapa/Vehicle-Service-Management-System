import axios from 'axios';
import requestConfigJson from './requestConfigJson';
import requestConfig from './requestConfig';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

class StaffAPI {
  // Staff Login
  static staffLogin(values) {
    return axios.post(`${BASE_URL}/api/staff/login`, values, requestConfigJson);
  }

  // Staff Register
  static staffSignup(values) {
    return axios.post(
      `${BASE_URL}/api/staff/signup`,
      values,
      requestConfigJson
    );
  }

  // Get all staff
  static getAllStaffs() {
    return axios.get(`${BASE_URL}/api/staff`, requestConfig);
  }

  // Delete a staff by ID
  static deleteStaffById(id) {
    return axios.delete(`${BASE_URL}/api/staff/${id}`, requestConfig);
  }

  // Update a staff by ID
  static updateStaffById(id, values) {
    return axios.patch(
      `${BASE_URL}/api/staff/${id}`,
      values,
      requestConfigJson
    );
  }

  // Get a staff by ID
  static getStaffById() {
    return axios.get(`${BASE_URL}/api/staff/id`, requestConfig);
  }

  // Change password
  static changePassword(values) {
    return axios.patch(
      `${BASE_URL}/api/staff/change-password`,
      values,
      requestConfigJson
    );
  }

  // Admin update a staff by ID
  static adminUpdateStaffById(id, values) {
    return axios.patch(
      `${BASE_URL}/api/staff/admin/${id}`,
      values,
      requestConfigJson
    );
  }
}

export default StaffAPI;
