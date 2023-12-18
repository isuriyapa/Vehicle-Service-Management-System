import React, { useEffect, useState } from 'react';
import AppointmentsTableReport from '../../components/AppointmentTableReport';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../app/actions/appointment.actions';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AppointmentListReport() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [appointmentslist, setAppointmentsList] = useState([]);

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  useEffect(() => {
    if (appointments) {
      setAppointmentsList(appointments);
    }
  }, [appointments]);

  const filterAppointment = (searchDate, dateType) => {
    let filteredAppointments = [];
    if (dateType === 'START') {
      filteredAppointments = appointments.filter(
        (appointment) =>
          moment(appointment.date).format('YYYY-MM-DD') >= searchDate &&
          moment(appointment.date).format('YYYY-MM-DD') <= endDate
      );
    } else {
      filteredAppointments = appointments.filter(
        (appointment) =>
          moment(appointment.date).format('YYYY-MM-DD') >= startDate &&
          moment(appointment.date).format('YYYY-MM-DD') <= searchDate
      );
    }
    setAppointmentsList(filteredAppointments);
  };

  function generatePDF(data) {
    const doc = new jsPDF();
    const tableColumn = [
      'Client',
      'Email',
      'Service Date',
      'Status',
      'Service',
    ];
    const tableRows = [];

    data.forEach((item) => {
      const rowData = [
        item.firstName + ' ' + item.lastName,
        item.email,
        item.date,
        item.status,
        item.service,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('appointments-table.pdf');
  }

  return (
    <div className='container mt-5'>
      <div className='text-center'>
        <h1>Vehicle Service Management System</h1>
        <h2>Appointment Report</h2>
        <h5>
          Date Between {startDate} to {endDate}
        </h5>
      </div>
      <div className='row mt-5'>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <input
                type='date'
                className='form-control'
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  filterAppointment(e.target.value, 'START');
                }}
              />
            </div>
            <div className='col-6'>
              <input
                type='date'
                className='form-control'
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  filterAppointment(e.target.value, 'END');
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-6'>
          <button
            className='btn btn-warning'
            onClick={() => {
              generatePDF(appointmentslist);
            }}
          >
            PRINT
          </button>
        </div>
      </div>
      {appointments && (
        <AppointmentsTableReport appointments={appointmentslist} />
      )}
    </div>
  );
}

export default AppointmentListReport;
