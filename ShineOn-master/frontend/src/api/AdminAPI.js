import axios from 'axios';
import requestConfigJson from './requestConfigJson';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

class AdminAPI {
  // Admin Login
  static adminLogin(values) {
    return axios.post(`${BASE_URL}/api/admin/login`, values, requestConfigJson);
  }

  // Admin Register
  static adminSignup(values) {
    return axios.post(
      `${BASE_URL}/api/admin/signup`,
      values,
      requestConfigJson
    );
  }
}

export default AdminAPI;
