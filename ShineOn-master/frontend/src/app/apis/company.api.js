import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const COMPANYAPI = {
  saveCompany: (data) => axios.post(`${BASE_URL}/api/companies`, data),
  getCompanies: () => axios.get(`${BASE_URL}/api/companies`),
  getCompanyById: (id) => axios.get(`${BASE_URL}/api/companies/${id}`),
  updateCompany: (id, updateData) =>
    axios.put(`${BASE_URL}/api/companies/${id}`, updateData),
  deleteCompany: (id) => axios.delete(`${BASE_URL}/api/companies/${id}`),
};
