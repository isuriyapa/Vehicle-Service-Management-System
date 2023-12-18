import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  deleteFAQ,
  getFAQById,
  getFAQs,
  publishFAQ,
  saveFAQ,
  updateFAQ,
} from '../actions/faq.actions';

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    selectedFaq: null,
    faqs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveFAQ.fulfilled, (state, action) => {
      state.faqs = [...state.faqs, action.payload];
      toast.success('Saved Successfully');
    });
    builder.addCase(saveFAQ.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getFAQById.fulfilled, (state, action) => {
      state.selectedFaq = action.payload;
    });
    builder.addCase(getFAQById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getFAQs.fulfilled, (state, action) => {
      state.faqs = action.payload;
    });
    builder.addCase(getFAQs.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(updateFAQ.fulfilled, (state, action) => {
      state.faqs = state.faqs.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(updateFAQ.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deleteFAQ.fulfilled, (state, action) => {
      state.faqs = state.faqs.filter((x) => x._id !== action.payload._id);
      toast.success('Deleted Successfully');
    });
    builder.addCase(deleteFAQ.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(publishFAQ.fulfilled, (state, action) => {
      state.faqs = state.faqs.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(publishFAQ.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default faqSlice.reducer;
