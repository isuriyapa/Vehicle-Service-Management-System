import { createAsyncThunk } from '@reduxjs/toolkit';
import { FAQAPI } from '../apis/FAQ.api';

export const saveFAQ = createAsyncThunk('faq/saveFAQ', async (data) => {
  const response = await FAQAPI.saveFAQ(data);
  return response.data;
});

export const getFAQs = createAsyncThunk('faq/getFAQs', async () => {
  const response = await FAQAPI.getFAQs();
  return response.data;
});

export const getFAQById = createAsyncThunk('faq/getFAQById', async (id) => {
  const response = await FAQAPI.getFAQById(id);
  return response.data;
});

export const updateFAQ = createAsyncThunk(
  'faq/updateFAQ',
  async (updateData) => {
    const response = await FAQAPI.updateFAQ(updateData._id, updateData);
    return response.data;
  }
);

export const deleteFAQ = createAsyncThunk('faq/deleteFAQ', async (id) => {
  const response = await FAQAPI.deleteFAQ(id);
  return response.data;
});

export const publishFAQ = createAsyncThunk(
  'faq/publishFAQ',
  async (updateData) => {
    const response = await FAQAPI.publishFAQ(updateData._id, updateData);
    return response.data;
  }
);
