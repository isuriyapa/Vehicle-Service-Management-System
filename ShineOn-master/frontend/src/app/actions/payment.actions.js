import { createAsyncThunk } from '@reduxjs/toolkit';
import { PAYMENTAPI } from '../apis/payment.api';

export const savePayment = createAsyncThunk(
  'payment/savePayment',
  async (data) => {
    const response = await PAYMENTAPI.savePayment(data);
    return response.data;
  }
);

export const getPayments = createAsyncThunk(
  'payment/getPayments',
  async () => {
    const response = await PAYMENTAPI.getPayments();
    return response.data;
  }
);

export const getPaymentsByEmail = createAsyncThunk(
  'payment/getPaymentsByEmail',
  async (data) => {
    const response = await PAYMENTAPI.getPaymentsByEmail(data);
    return response.data;
  }
);

export const getPaymentById = createAsyncThunk(
  'payment/getPaymentById',
  async (id) => {
    const response = await PAYMENTAPI.getPaymentById(id);
    return response.data;
  }
);

export const updatePayment = createAsyncThunk(
  'payment/updatePayment',
  async (data) => {
    const response = await PAYMENTAPI.updatePayment(
        data._id,
        data
    );
    return response.data;
  }
);

export const deletePayment = createAsyncThunk(
  'payment/deletePayment',
  async (id) => {
    const response = await PAYMENTAPI.deletePayment(id);
    return response.data;
  }
);
