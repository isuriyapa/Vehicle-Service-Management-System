import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  saveAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByEmail,
} from '../actions/appointment.actions';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    selectedAppointment: null,
    appointments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveAppointment.fulfilled, (state, action) => {
      state.appointments = [...state.appointments, action.payload];
      toast.success('Appointment Added Successfull');
    });
    builder.addCase(saveAppointment.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getAppointmentById.fulfilled, (state, action) => {
      state.selectedAppointment = action.payload;
    });
    builder.addCase(getAppointmentById.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(getAppointmentsByEmail.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });
    builder.addCase(getAppointmentsByEmail.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(updateAppointment.fulfilled, (state, action) => {
      state.appointments = state.appointments.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
      toast.success('Appointment Edited Successfull');
    });
    builder.addCase(updateAppointment.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      state.appointments = state.appointments.filter(
        (x) => x._id !== action.payload._id
      );
      toast.success('Appointment Removed Successfull');
    });
    builder.addCase(deleteAppointment.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export default appointmentSlice.reducer;
