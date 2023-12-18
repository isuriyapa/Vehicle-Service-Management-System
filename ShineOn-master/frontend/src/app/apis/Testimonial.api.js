import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const TESTIMONIALAPI = {
  saveTestimonial: (data) => axios.post(`${BASE_URL}/api/testimonials`, data),
  getTestimonials: () => axios.get(`${BASE_URL}/api/testimonials`),
  getTestimonialById: (id) => axios.get(`${BASE_URL}/api/testimonials/${id}`),
  deleteTestimonial: (id) => axios.delete(`${BASE_URL}/api/testimonials/${id}`),
  publishTestimonial: (id, updateData) =>
    axios.put(`${BASE_URL}/api/testimonials/publish/${id}`, updateData),
};
