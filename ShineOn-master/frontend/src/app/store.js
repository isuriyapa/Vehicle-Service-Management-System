import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/company.slice';
import appointmentReducer from './slices/appointment.slice';
import dailynoticeReducer from './slices/dailynotice.slice';
import jobnoticeReducer from './slices/jobnotice.slice';
import faqReducer from './slices/faq.slice';
import testimonialReducer from './slices/testimonial.slice';
import paymentReducer from './slices/payment.slice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    appointment: appointmentReducer,
    dailynotice: dailynoticeReducer,
    jobnotice: jobnoticeReducer,
    faq: faqReducer,
    testimonial: testimonialReducer,
    payment: paymentReducer,
  },
});
