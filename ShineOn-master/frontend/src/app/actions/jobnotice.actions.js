import { createAsyncThunk } from '@reduxjs/toolkit';
import { JOBNOTICEAPI } from '../apis/JobNotice.api';

export const saveJobNotice = createAsyncThunk(
  'jobnotice/saveJobNotice',
  async (data) => {
    const response = await JOBNOTICEAPI.saveJobNotice(data);
    return response.data;
  }
);

export const getJobNotices = createAsyncThunk(
  'jobnotice/getJobNotices',
  async () => {
    const response = await JOBNOTICEAPI.getJobNotices();
    return response.data;
  }
);

export const getJobNoticeById = createAsyncThunk(
  'jobnotice/getJobNoticeById',
  async (id) => {
    const response = await JOBNOTICEAPI.getJobNoticeById(id);
    return response.data;
  }
);

export const updateJobNotice = createAsyncThunk(
  'jobnotice/updateJobNotice',
  async (updateData) => {
    const response = await JOBNOTICEAPI.updateJobNotice(
      updateData._id,
      updateData
    );
    return response.data;
  }
);

export const deleteJobNotice = createAsyncThunk(
  'jobnotice/deleteJobNotice',
  async (id) => {
    const response = await JOBNOTICEAPI.deleteJobNotice(id);
    return response.data;
  }
);

export const publishJobNotice = createAsyncThunk(
  'jobnotice/publishJobNotice',
  async (updateData) => {
    const response = await JOBNOTICEAPI.publishJobNotice(
      updateData._id,
      updateData
    );
    return response.data;
  }
);
