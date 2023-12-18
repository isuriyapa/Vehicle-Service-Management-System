import { createAsyncThunk } from '@reduxjs/toolkit';
import { DAILYNOTICEAPI } from '../apis/DailyNotice.api';

export const saveDailyNotice = createAsyncThunk(
  'dailynotice/saveDailyNotice',
  async (data) => {
    const response = await DAILYNOTICEAPI.saveDailyNotice(data);
    return response.data;
  }
);

export const getDailyNotices = createAsyncThunk(
  'dailynotice/getDailyNotices',
  async () => {
    const response = await DAILYNOTICEAPI.getDailyNotices();
    return response.data;
  }
);

export const getDailyNoticeById = createAsyncThunk(
  'dailynotice/getDailyNoticeById',
  async (id) => {
    const response = await DAILYNOTICEAPI.getDailyNoticeById(id);
    return response.data;
  }
);

export const updateDailyNotice = createAsyncThunk(
  'dailynotice/updateDailyNotice',
  async (updateData) => {
    const response = await DAILYNOTICEAPI.updateDailyNotice(
      updateData._id,
      updateData
    );
    return response.data;
  }
);

export const deleteDailyNotice = createAsyncThunk(
  'dailynotice/deleteDailyNotice',
  async (id) => {
    const response = await DAILYNOTICEAPI.deleteDailyNotice(id);
    return response.data;
  }
);

export const publishDailyNotice = createAsyncThunk(
  'dailynotice/publishDailyNotice',
  async (updateData) => {
    const response = await DAILYNOTICEAPI.publishDailyNotice(
      updateData._id,
      updateData
    );
    return response.data;
  }
);
