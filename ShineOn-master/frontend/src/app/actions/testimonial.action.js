import { createAsyncThunk } from '@reduxjs/toolkit';
import { TESTIMONIALAPI } from '../apis/Testimonial.api';

export const saveTestimonial = createAsyncThunk(
  'testimonial/saveTestimonial',
  async (data) => {
    const response = await TESTIMONIALAPI.saveTestimonial(data);
    return response.data;
  }
);

export const getTestimonials = createAsyncThunk(
  'testimonial/getTestimonials',
  async () => {
    const response = await TESTIMONIALAPI.getTestimonials();
    return response.data;
  }
);

export const getTestimonialById = createAsyncThunk(
  'testimonial/getTestimonialById',
  async (id) => {
    const response = await TESTIMONIALAPI.getTestimonialById(id);
    return response.data;
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonial/deleteTestimonial',
  async (id) => {
    const response = await TESTIMONIALAPI.deleteTestimonial(id);
    return response.data;
  }
);

export const publishTestimonial = createAsyncThunk(
  'testimonial/publishTestimonial',
  async (updateData) => {
    const response = await TESTIMONIALAPI.publishTestimonial(
      updateData._id,
      updateData
    );
    return response.data;
  }
);
