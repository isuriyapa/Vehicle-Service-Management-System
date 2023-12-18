import React from 'react';

export default function ServiceViewModal(props) {
  return (
    <div className='container'>
      <div>
        <h1>{props.modalTitle}</h1>
      </div>
      <hr />
      <p>{props.modalContent}</p>
    </div>
  );
}
