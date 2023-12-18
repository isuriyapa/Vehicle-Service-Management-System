import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  deleteTestimonial,
  getTestimonialById,
  getTestimonials,
  publishTestimonial,
  saveTestimonial,
} from '../actions/testimonial.action';

const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState: {
    selectedTestimonial: null,
    testimonials: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveTestimonial.fulfilled, (state, action) => {
      state.testimonials = [...state.testimonials, action.payload];
      toast.success('Saved Successfully');
    });
    builder.addCase(saveTestimonial.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getTestimonialById.fulfilled, (state, action) => {
      state.selectedTestimonial = action.payload;
    });
    builder.addCase(getTestimonialById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getTestimonials.fulfilled, (state, action) => {
      state.testimonials = action.payload;
    });
    builder.addCase(getTestimonials.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.testimonials = state.testimonials.filter(
        (x) => x._id !== action.payload._id
      );
      toast.success('Deleted Successfully');
    });
    builder.addCase(deleteTestimonial.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(publishTestimonial.fulfilled, (state, action) => {
      state.testimonials = state.testimonials.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(publishTestimonial.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default testimonialSlice.reducer;
