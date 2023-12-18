import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const JOBNOTICEAPI = {
  saveJobNotice: (notice) => axios.post(`${BASE_URL}/api/job/notices`, notice),
  getJobNotices: () => axios.get(`${BASE_URL}/api/job/notices`),
  getJobNoticeById: (id) => axios.get(`${BASE_URL}/api/job/notices/${id}`),
  updateJobNotice: (id, updateData) =>
    axios.put(`${BASE_URL}/api/job/notices/${id}`, updateData),
  deleteJobNotice: (id) => axios.delete(`${BASE_URL}/api/job/notices/${id}`),
  publishJobNotice: (id, updateData) =>
    axios.put(`${BASE_URL}/api/job/notices/publish/${id}`, updateData),
};
