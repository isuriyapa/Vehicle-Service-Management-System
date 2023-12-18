import { createAsyncThunk } from '@reduxjs/toolkit';
import { COMPANYAPI } from '../apis/company.api';

export const saveCompany = createAsyncThunk(
  'company/saveCompany',
  async (data) => {
    const response = await COMPANYAPI.saveCompany(data);
    return response.data;
  }
);

export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async () => {
    const response = await COMPANYAPI.getCompanies();
    return response.data;
  }
);

export const getCompanyById = createAsyncThunk(
  'company/getCompanyById',
  async (id) => {
    const response = await COMPANYAPI.getCompanyById(id);
    return response.data;
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (updateData) => {
    const response = await COMPANYAPI.updateCompany(updateData._id, updateData);
    return response.data;
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id) => {
    const response = await COMPANYAPI.deleteCompany(id);
    return response.data;
  }
);
