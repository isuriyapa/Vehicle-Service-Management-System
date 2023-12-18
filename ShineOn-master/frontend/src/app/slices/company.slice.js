import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  deleteCompany,
  getCompanies,
  getCompanyById,
  saveCompany,
  updateCompany,
} from '../actions/company.actions';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    selectedCompany: null,
    companies: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveCompany.fulfilled, (state, action) => {
      state.companies = [...state.companies, action.payload];
      toast.success('Saved Successfully');
    });

    builder.addCase(saveCompany.rejected, (state, action) => {
      toast.error('Something went wrong');
    });

    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.selectedCompany = action.payload;
    });
    builder.addCase(getCompanyById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
    builder.addCase(getCompanies.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.companies = state.companies.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Edited Successfully');
    });
    builder.addCase(updateCompany.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.companies = state.companies.filter(
        (x) => x._id !== action.payload._id
      );
      toast.success('Deleted Successfully');
    });
    builder.addCase(deleteCompany.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default companySlice.reducer;
