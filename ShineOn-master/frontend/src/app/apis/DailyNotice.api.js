import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const DAILYNOTICEAPI = {
  saveDailyNotice: (notice) =>
    axios.post(`${BASE_URL}/api/daily/notices`, notice),
  getDailyNotices: () => axios.get(`${BASE_URL}/api/daily/notices`),
  getDailyNoticeById: (id) => axios.get(`${BASE_URL}/api/daily/notices/${id}`),
  updateDailyNotice: (id, updateData) =>
    axios.put(`${BASE_URL}/api/daily/notices/${id}`, updateData),
  deleteDailyNotice: (id) =>
    axios.delete(`${BASE_URL}/api/daily/notices/${id}`),
  publishDailyNotice: (id, updateData) =>
    axios.put(`${BASE_URL}/api/daily/notices/publish/${id}`, updateData),
};
