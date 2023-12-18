import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const FAQAPI = {
  saveFAQ: (data) => axios.post(`${BASE_URL}/api/faqs`, data),
  getFAQs: () => axios.get(`${BASE_URL}/api/faqs`),
  getFAQById: (id) => axios.get(`${BASE_URL}/api/faqs/${id}`),
  updateFAQ: (id, updateData) =>
    axios.put(`${BASE_URL}/api/faqs/${id}`, updateData),
  deleteFAQ: (id) => axios.delete(`${BASE_URL}/api/faqs/${id}`),
  publishFAQ: (id, updateData) =>
    axios.put(`${BASE_URL}/api/faqs/publish/${id}`, updateData),
};
