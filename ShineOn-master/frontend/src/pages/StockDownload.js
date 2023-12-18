import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileDownload } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const StockDownload = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    let result = await fetch(process.env.REACT_APP_BACKEND_API + '/api/stock/');
    result = await result.json();
    setStocks(result);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'StockReport',
  });

  return (
    <div>
      <div className='stock-download-buttons'>
        <Link to={'/StockList'}>
          <button className='btn btn-primary me-2'>Stock List</button>
        </Link>
        <button className='btn btn-danger' onClick={handlePrint}>
          <FaFileDownload />
          Download
        </button>
      </div>
      <div ref={componentRef}>
        <h1>Shine on car service center</h1>
        <h2>Stock Report</h2>
        <div className='st-dwn-btn'>
          <input type='date' className='stock-download-date'/>
        </div>        
        <div className='stock-list'>
          <ul>            
            <li>Name</li>
            <li>Type</li>
            <li>Quantity</li>
            <li>Buying</li>
            <li>Selling</li>
            <li>Supplier Name</li>
          </ul>
          {stocks.map((item) => (
            <ul key={item._id}>
              <li>{item.name}</li>
              <li>{item.type}</li>
              <li>{item.quantity}</li>
              <li>{item.buying}</li>
              <li>{item.selling}</li>
              <li>{item.supplierName}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDownload;
