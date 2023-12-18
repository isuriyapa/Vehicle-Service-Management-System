import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  deleteJobNotice,
  getJobNoticeById,
  getJobNotices,
  publishJobNotice,
  saveJobNotice,
  updateJobNotice,
} from '../actions/jobnotice.actions';

const jobNoticeSlice = createSlice({
  name: 'jobnotice',
  initialState: {
    selectedNotice: null,
    notices: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveJobNotice.fulfilled, (state, action) => {
      state.notices = [...state.notices, action.payload];
      toast.success('Saved Successfully');
    });
    builder.addCase(saveJobNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getJobNoticeById.fulfilled, (state, action) => {
      state.selectedNotice = action.payload;
    });
    builder.addCase(getJobNoticeById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getJobNotices.fulfilled, (state, action) => {
      state.notices = action.payload;
    });
    builder.addCase(getJobNotices.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(updateJobNotice.fulfilled, (state, action) => {
      state.notices = state.notices.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(updateJobNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deleteJobNotice.fulfilled, (state, action) => {
      state.notices = state.notices.filter((x) => x._id !== action.payload._id);
      toast.success('Deleted Successfully');
    });
    builder.addCase(deleteJobNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(publishJobNotice.fulfilled, (state, action) => {
      state.notices = state.notices.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(publishJobNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default jobNoticeSlice.reducer;
