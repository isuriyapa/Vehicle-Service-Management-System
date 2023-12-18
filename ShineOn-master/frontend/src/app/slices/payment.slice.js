import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  savePayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsByEmail,
} from '../actions/payment.actions';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    selectedPayment: null,
    payments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(savePayment.fulfilled, (state, action) => {
      state.payments = [...state.payments, action.payload];
      toast.success('Payment Successful');
    });
    builder.addCase(savePayment.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getPaymentById.fulfilled, (state, action) => {
      state.selectedPayment = action.payload;
    });
    builder.addCase(getPaymentById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getPayments.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
    builder.addCase(getPayments.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getPaymentsByEmail.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
    builder.addCase(getPaymentsByEmail.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(updatePayment.fulfilled, (state, action) => {
      state.payments = state.payments.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Payment Edited Successfull');
    });
    builder.addCase(updatePayment.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deletePayment.fulfilled, (state, action) => {
      state.payments = state.payments.filter(
        (x) => x._id !== action.payload._id
      );
      toast.success('Payment Removed Successfull');
    });
    builder.addCase(deletePayment.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default paymentSlice.reducer;
