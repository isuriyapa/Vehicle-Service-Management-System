import React, { useEffect } from 'react';
import { useSuppliersContext } from '../hooks/useSuppliersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const SupplierDetails = ({ supplier }) => {
  const { dispatch } = useSuppliersContext();
  const { user } = useAuthContext();

  const handleClick = () => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_API + '/api/suppliers/' + supplier._id
      )
      .then((response) => {
        dispatch({ type: 'DELETE_SUPPLIER', payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='supplier-details'>
      <h4>{supplier.SuppllierName}</h4>
      <p>
        <strong>Suppllier Id :</strong>
        {supplier.SuppllieId}
      </p>
      <p>
        <strong>Address : </strong>
        {supplier.Address}
      </p>
      <p>
        <strong>Contact Number : </strong>
        {supplier.ContactNumber}
      </p>
      <p>
        <strong>Email : </strong>
        {supplier.Email}
      </p>
      <p>
        <strong>Item Id : </strong>
        {supplier.ItemId}
      </p>
      <p>
        <strong>Item Name : </strong>
        {supplier.ItemName}
      </p>
      <p>
        {formatDistanceToNow(new Date(supplier.createdAt), { addSuffix: true })}
      </p>
      <span className='material-symbols-outlined' onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default SupplierDetails;
