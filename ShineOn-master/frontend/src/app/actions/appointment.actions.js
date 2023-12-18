import { createAsyncThunk } from '@reduxjs/toolkit';
import { APPOINTMENTAPI } from '../apis/appointment.api';

export const saveAppointment = createAsyncThunk(
  'appointment/saveAppointment',
  async (appointment) => {
    const response = await APPOINTMENTAPI.saveAppointment(appointment);
    return response.data;
  }
);

export const getAppointments = createAsyncThunk(
  'appointment/getAppointments',
  async () => {
    const response = await APPOINTMENTAPI.getAppointments();
    return response.data;
  }
);

export const getAppointmentsByEmail = createAsyncThunk(
  'appointment/getAppointmentsByEmail',
  async (data) => {
    const response = await APPOINTMENTAPI.getAppointmentsByEmail(data);
    return response.data;
  }
);

export const getAppointmentById = createAsyncThunk(
  'appointment/getAppointmentById',
  async (appointmentId) => {
    const response = await APPOINTMENTAPI.getAppointmentById(appointmentId);
    return response.data;
  }
);

export const updateAppointment = createAsyncThunk(
  'appointment/updateAppointment',
  async (updateAppointment) => {
    const response = await APPOINTMENTAPI.updateAppointment(
      updateAppointment._id,
      updateAppointment
    );
    return response.data;
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointment/deleteAppointment',
  async (appointmentId) => {
    const response = await APPOINTMENTAPI.deleteAppointment(appointmentId);
    return response.data;
  }
);
