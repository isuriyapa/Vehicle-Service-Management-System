import React from 'react';
import { useState } from 'react';

const RequestSupplierForm = () => {
  const [chooseItem, setChooseItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [typeOfNeedService, setTypeOfNeedService] = useState('');
  const [addingAcomment, setAddingAcomment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(chooseItem, quantity, typeOfNeedService, addingAcomment);

    // Set submitted to true to show confirmation message
    setSubmitted(true);
  };

  return (
    <div className='container mt-5 mb-5'>
      <form className='req' onSubmit={handleSubmit}>
        <h2>Request Order Form</h2>

        <label>Choose Item </label>
        <select
          value={chooseItem}
          onChange={(e) => setChooseItem(e.target.value)}
        >
          <option value=''>--Select--</option>
          <option value='Item 1'>Item 1</option>
          <option value='Item 2'>Item 2</option>
          <option value='Item 3'>Item 3</option>
        </select>
        <label>Quantity </label>
        <input
          type='number'
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <label>Type Of Need Service </label>
        <select
          value={typeOfNeedService}
          onChange={(e) => setTypeOfNeedService(e.target.value)}
        >
          <option value=''>--Select--</option>
          <option value='Service 1'>Service 1</option>
          <option value='Service 2'>Service 2</option>
          <option value='Service 3'>Service 3</option>
        </select>

        <label>Adding a Comment </label>
        <input
          type='textarea'
          onChange={(e) => setAddingAcomment(e.target.value)}
          value={addingAcomment}
        />
        <button> SUBMIT </button>
      </form>

      {/* Conditionally render confirmation message */}
      {submitted && <p>Thank you for your order!</p>}
    </div>
  );
};

export default RequestSupplierForm;
