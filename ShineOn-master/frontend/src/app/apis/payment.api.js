import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const PAYMENTAPI = {
  savePayment: (data) => axios.post(`${BASE_URL}/api/payments`, data),
  getPayments: () => axios.get(`${BASE_URL}/api/payments`),
  getPaymentsByEmail: (data) =>
    axios.post(`${BASE_URL}/api/payments/email`, data),
  getPaymentById: (id) => axios.get(`${BASE_URL}/api/payments/${id}`),
  updatePayment: (id, data) =>
    axios.put(`${BASE_URL}/api/payments/${id}`, data),
  deletePayment: (id) => axios.delete(`${BASE_URL}/api/payments/${id}`),
};
