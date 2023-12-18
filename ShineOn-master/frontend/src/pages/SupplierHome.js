import React, { useEffect } from 'react';
import { useSuppliersContext } from '../hooks/useSuppliersContext';

// components
import SupplierDetails from '../components/SupplierDetails';
import SuppllierForm from '../components/SuppllierForm';

const SupplierHome = () => {
  const { suppliers, dispatch } = useSuppliersContext();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_API + '/api/suppliers',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        console.log(response);
        dispatch({ type: 'SET_SUPPLIERS', payload: json });
      }
    };

    fetchSuppliers();
  }, [dispatch]);

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-8'>
          {suppliers &&
            suppliers.map((supplier) => (
              <SupplierDetails supplier={supplier} key={supplier._id} />
            ))}
        </div>
        <div className='col-4'>
          <SuppllierForm />
        </div>
      </div>
    </div>
  );
};

export default SupplierHome;
