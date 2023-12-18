import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import AddCompany from './pages/AddCompany';
import AdminCompanyDashboard from './pages/AdminCompanyDashboard';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './components/Footer';

//Appointments
import AddAppointment from './pages/AddAppointment';
import AppointmentList from './pages/AppointmentList';
import AppointmentListReport from './pages/AppointmentListReport';
import Services from './pages/Services';

//Notices
import AdminDailyNotices from './pages/AdminDailyNotices';
import AdminFAQ from './pages/AdminFAQ';
import AdminJobNotices from './pages/AdminJobNotices';
import AdminNotices from './pages/AdminNotices';
import AdminTestimonials from './pages/AdminTestimonials';
import DailyNotices from './pages/DailyNotices';
import FAQ from './pages/FAQ';
import JobNotices from './pages/JobNotices';
import Notices from './pages/Notices';
import TestimonialAddForm from './pages/TestimonialAddForm';
import Testimonials from './pages/Testimonials';

//Stocks
import StockList from './pages/StockList';
import UpdateStock from './pages/UpdateComponent';
import StockForm from './pages/StockForm';
import GrnForm from './pages/GrnForm';
import GrnList from './pages/GrnList';
import UpdateGrn from './pages/UpdateGrn';
import StockDownload from './pages/StockDownload';

//Admin
import AdminHome from './pages/home/index.jsx';
import AdminDashboard from './pages/admin-dashboard';
import StaffDashboard from './pages/staff-dashboard';
import AdminLogin from './pages/admin-login';
import StaffLogin from './pages/staff-login';

//Supplier
import SupplierHome from './pages/SupplierHome';
import RequestSupplierForm from './pages/RequestSupplierForm';
import SupplierLogin from "./pages/Supplier/Login"

//Expense Tracker
import ExpenseTracker from './pages/ExpenseTracker';
import SupplierNewHome from './pages/Supplier/SupplierNewHome';
import RequestForm from './pages/Supplier/RequestForm';
import CompanyForm from './pages/Supplier/CompanyForm';
import SupplierSignup from './pages/Supplier/SupplierSignup';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Services />} />

            {/* User Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />

            {/* Company Routes */}
            <Route path='/registercompany' element={<AddCompany />} />
            <Route path='/admin/company' element={<AdminCompanyDashboard />} />

            {/* Appointments Routes */}
            <Route path='/services' element={<Services />} />
            <Route path='/appointments' element={<AppointmentList />} />
            <Route path='/booknow' element={<AddAppointment />} />
            <Route
              path='/appointmentreport'
              element={<AppointmentListReport />}
            />
            {/* Notices Routes */}
            <Route path='/notices' element={<Notices />} />
            <Route path='/adminnotices' element={<AdminNotices />} />
            <Route path='/dailynotices' element={<DailyNotices />} />
            <Route path='/admindailynotices' element={<AdminDailyNotices />} />
            <Route path='/jobs' element={<JobNotices />} />
            <Route path='/adminjobs' element={<AdminJobNotices />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route path='/addtestimonial' element={<TestimonialAddForm />} />
            <Route path='/admintestimonials' element={<AdminTestimonials />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/adminfaq' element={<AdminFAQ />} />

            {/* Stock Routes */}
            <Route path='/StockList' element={<StockList />} />
            <Route path='/GrnList' element={<GrnList />} />
            <Route path='/Update/:id' element={<UpdateStock />} />
            <Route path='/UpdateGrn/:id' element={<UpdateGrn />} />
            <Route path='/StockForm' element={<StockForm />} />
            <Route path='/GrnForm' element={<GrnForm />} />
            <Route path='/StockDownload' element={<StockDownload />} />

            {/* Admin Routes */}
            <Route path='/adminhome' element={<AdminHome />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/adminlogin' element={<AdminLogin />} />

            {/* Staff Routes */}
            <Route path='/staff' element={<StaffDashboard />} />
            <Route path='/stafflogin' element={<StaffLogin />} />

            {/* Supplier Routes */}
            <Route path='/suppliers' element={<SupplierHome />} />
            <Route path='/requestsuppliers' element={<RequestSupplierForm />} />
            <Route path='/supplierLogin' element={<SupplierLogin />} />
            <Route path='/supplierSignup' element={<SupplierSignup />} />
            <Route path='/supplier/home' element={<SupplierNewHome />} />
            <Route path='/supplier/companyForm' element={<CompanyForm />} />
            <Route path='/supplier/requestForm' element={<RequestForm />} />

            {/* Expense tracker Routes */}
            <Route path='/finance' element={<ExpenseTracker />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}

export default App;
