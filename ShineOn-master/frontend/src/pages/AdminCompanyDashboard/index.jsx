import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../../app/actions/company.actions';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CompanyTable from '../../components/CompanyTable';

function AdminCompanyDashboard() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  useEffect(() => {
    if (companies) {
      setCompanyList(companies);
    }
  }, [companies]);

  const filterData = (searchWord) => {
    let newArray = companies.filter(function (el) {
      return el.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setCompanyList(newArray);
  };

  function generatePDF(data) {
    const doc = new jsPDF();
  
    const tableColumn = [    'Name',    'Address',    'Contact',    'Email',    'Vehicle Numbers',  ];
    const tableRows = [];
  
    data.forEach((item) => {
      const rowData = [      item.name,      item.address,      item.contactNumber,      item.email,      item.vehicleNumbers,    ];
      tableRows.push(rowData);
    });
  
    // Add header text at the top of the page
    doc.setFontSize(18);
    doc.text('Shine On Car Service', 14, 15);
  
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('company-table.pdf');
  }
  

  return (
    <div className='card container mt-5 mb-5 p-5'>
      <div className='row'>
        <div className='col-4'>
          <h3>ADMIN | COMPANY DETAILS</h3>
        </div>
        <div className='col-4'>
          <button
            className='btn btn-info'
            onClick={() => {
              generatePDF(companyList);
            }}
          >
            PRINT
          </button>
        </div>
        <div className='col-4'>
          <input
            type='text'
            onChange={(e) => filterData(e.target.value)}
            name='search'
            placeholder='search...'
            className='form-control'
          />
        </div>
      </div>
      <CompanyTable dataArray={companyList} />
    </div>
  );
}

export default AdminCompanyDashboard;
