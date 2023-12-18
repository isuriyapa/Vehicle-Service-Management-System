import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GrnList = () => {
  const [grns, setGrns] = useState([]);

  useEffect(() => {
    getGrns();
  }, []);

  const getGrns = async () => {
    let result = await fetch(process.env.REACT_APP_BACKEND_API + '/api/grn/');
    result = await result.json();
    setGrns(result);
  };

  const deleteGrn = async (id) => {
    console.warn(id);
    let result = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/grn/${id}`,
      {
        method: 'Delete',
      }
    );
    result = await result.json();
    if (result) {
      getGrns();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        process.env.REACT_APP_BACKEND_API + `/api/grn/search/${key}`
      );
      result = await result.json();
      if (result) {
        setGrns(result);
      }
    } else getGrns();
  };

  return (
    <div className='container mt-5 mb-5'>
      <h1>GRN List</h1>
      <div>
        <Link to={'/GrnForm'}>
          <button className='btn btn-primary me-2'>Add New GRN</button>
        </Link>
        <Link to={'/StockList'}>
          <button className='btn btn-primary me-2'>Stock List</button>
        </Link>        
      </div>
      <input
        type=''
        className='stock-searchbar'
        placeholder='search here..'
        onChange={searchHandle}
      />
      <div className='grn-list'>
        <ul>
          <li>S. No.</li>
          <li>Date</li>
          <li>supplier </li>
          <li>Product</li>
          <li>Quantity</li>
          <li>Buying</li>
          <li>Selling.</li>
          <li>Operation</li>
        </ul>
        {grns.map((grn, index) => (
          <ul key={grn._id}>
            <li>{index + 1}</li>
            <li>{grn.date}</li>
            <li>{grn.supplier}</li>
            <li>{grn.product}</li>
            <li>{grn.quantity}</li>
            <li>{grn.buying}</li>
            <li>{grn.selling}</li>
            <li>
              <div className='row'>
                <div className='col-6'>
                  <Link to={'/updateGrn/' + grn._id}>
                    <button className='btn btn-sm btn-warning'>Update</button>
                  </Link>
                </div>
                <div className='col-6'>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => deleteGrn(grn._id)}
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

export default GrnList;
