import axios from 'axios';
import requestConfigJson from './requestConfigJson';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

class SupplierAPI {
  // Supplier Login
  static async supplierLogin(values) {

    return axios.post(`${BASE_URL}/api/suppliers/login`, values, requestConfigJson);
  }

  // Supplier Register
  static supplierSignup(values) {
    return axios.post(`${BASE_URL}/api/suppliers/signup`, values, requestConfigJson);
  }

  // Supplier Company Request
  static async createCompanyRequest(values) {
    return axios.post(`${BASE_URL}/api/company/requests/create`, values, requestConfigJson);
  }

  static async createSupplierRequest(values) {
    return axios.post(`${BASE_URL}/api/suppliers/requests/create`, values, requestConfigJson);
  }
}

export default SupplierAPI;
