require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const customerRoutes = require('./routes/customers');
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company.route');
const stockRoutes = require('./routes/stock');
const grnRoutes = require('./routes/grn');
const supplierRoutes = require('./routes/suppliers');
const supplierRequestRoutes = require('./routes/supplierRequestRoutes');
const companyRequestRoutes = require('./routes/companyRequestRoutes');

// express app
const app = express();
app.use(cors());
//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/uploads', express.static('uploads'));

//routs

//Customer routes
app.use('/api/customers', customerRoutes);

//User routes
app.use('/api/user', userRoutes);

//Company routes
app.use('/api/companies', companyRoutes);

//Appointment routes
app.use('/api/appointments', require('./routes/Appointment.route'));

//Notices routes
app.use('/api/job/notices', require('./routes/JobNotice.route'));
app.use('/api/daily/notices', require('./routes/DailyNotice.route'));
app.use('/api/faqs', require('./routes/FAQ.route'));
app.use('/api/testimonials', require('./routes/Testimonials.route'));

//Employee Management routes
app.use('/api/admin', require('./routes/Admin.route'));
app.use('/api/staff', require('./routes/Staff.route'));
app.use('/api/leave', require('./routes/Leave.route'));
app.use('/api/attendance', require('./routes/Attendance.route'));

//Stocks routes
app.use('/api/stock', stockRoutes);
app.use('/api/grn', grnRoutes);

//Supplier routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/supplier/requests', supplierRequestRoutes);
app.use('/api/company/requests', companyRequestRoutes);

app.use('/api/v1', require('./routes/transaction'));

app.use('/api/payments', require('./routes/payment.route'));
//connect to db
mongoose
  .connect('mongodb+srv://kavishka:1234@carservice.gifmrzv.mongodb.net/test1')
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port ', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
