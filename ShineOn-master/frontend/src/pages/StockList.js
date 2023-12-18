import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFile } from 'react-icons/fa';

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    let result = await fetch(process.env.REACT_APP_BACKEND_API + '/api/stock/');
    result = await result.json();
    setStocks(result);
  };

  const deleteStock = async (id) => {
    console.warn(id);
    let result = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/stock/${id}`,
      {
        method: 'Delete',
      }
    );
    result = await result.json();
    if (result) {
      getStocks();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        process.env.REACT_APP_BACKEND_API + `/api/stock/search/${key}`
      );
      result = await result.json();
      if (result) {
        setStocks(result);
      }
    } else getStocks();
  };

  return (
    <div className='container mt-5 mb-5'>
      <h1>Stock List</h1>
      <div>
        <Link to={'/StockForm'}>
          <button className='btn btn-primary me-2'>Add New Stock</button>
        </Link>
        <Link to={'/GrnList'}>
          <button className='btn btn-primary me-2'>GRN List</button>
        </Link>
        <Link to={'/StockDownload'}>
          <button className='btn btn-danger'>
            <FaFile /> 
            Report
          </button>
        </Link>
      </div>
      <input
        type=''
        className='stock-searchbar'
        placeholder='search here..'
        onChange={searchHandle}
      />
      
      <div className='stock-list'>
        <ul>
          <li>S. No.</li>
          <li>Name</li>
          <li>Type</li>
          <li>Quantity</li>
          <li>Buying</li>
          <li>Selling</li>
          <li>Supplier Name</li>
          <li>Operation</li>
        </ul>
        {stocks.map((item, index) => (
          <ul key={item._id} className="mt-2 mb-2">
            <li>{index + 1}.</li>
            <li>{item.name}</li>
            <li>{item.type}</li>
            <li>{item.quantity}</li>
            <li>{item.buying}</li>
            <li>{item.selling}</li>
            <li>{item.supplierName}</li>
            <li>
              <div className='row'>
                <div className='col-6'>
                  <Link to={'/update/' + item._id}>
                    <button className='btn btn-sm btn-warning'>Update</button>
                  </Link>
                </div>
                <div className='col-6'>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => deleteStock(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default StockList;
