import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const APPOINTMENTAPI = {
  saveAppointment: (appointment) =>
    axios.post(`${BASE_URL}/api/appointments`, appointment),
  getAppointments: () => axios.get(`${BASE_URL}/api/appointments`),
  getAppointmentsByEmail: (data) => axios.post(`${BASE_URL}/api/appointments/email`,data),
  getAppointmentById: (appointmentId) =>
    axios.get(`${BASE_URL}/api/appointments/${appointmentId}`),
  updateAppointment: (appointmentId, updateAppointment) =>
    axios.put(
      `${BASE_URL}/api/appointments/${appointmentId}`,
      updateAppointment
    ),
  deleteAppointment: (appointmentId) =>
    axios.delete(`${BASE_URL}/api/appointments/${appointmentId}`),
};
