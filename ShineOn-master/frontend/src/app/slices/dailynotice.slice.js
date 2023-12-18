import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  deleteDailyNotice,
  getDailyNoticeById,
  getDailyNotices,
  publishDailyNotice,
  saveDailyNotice,
  updateDailyNotice,
} from '../actions/dailynotice.actions';

const dailyNoticeSlice = createSlice({
  name: 'dailynotice',
  initialState: {
    selectedNotice: null,
    notices: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveDailyNotice.fulfilled, (state, action) => {
      state.notices = [...state.notices, action.payload];
      toast.success('Saved Successfully');
    });
    builder.addCase(saveDailyNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getDailyNoticeById.fulfilled, (state, action) => {
      state.selectedNotice = action.payload;
    });
    builder.addCase(getDailyNoticeById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getDailyNotices.fulfilled, (state, action) => {
      state.notices = action.payload;
    });
    builder.addCase(getDailyNotices.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(updateDailyNotice.fulfilled, (state, action) => {
      state.notices = state.notices.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(updateDailyNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deleteDailyNotice.fulfilled, (state, action) => {
      state.notices = state.notices.filter((x) => x._id !== action.payload._id);
      toast.success('Deleted Successfully');
    });
    builder.addCase(deleteDailyNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(publishDailyNotice.fulfilled, (state, action) => {
      state.notices = state.notices.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(publishDailyNotice.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default dailyNoticeSlice.reducer;
