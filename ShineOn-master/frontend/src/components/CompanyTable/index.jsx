import React from 'react';
import Modal from 'react-modal';
import {
  deleteCompany,
  getCompanyById,
} from '../../app/actions/company.actions';
import { useDispatch } from 'react-redux';
import CompanyEdit from '../CompanyEdit';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('div');

function CompanyTable({ dataArray }) {
  const dispatch = useDispatch();
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);

  function openModal() {
    setEditModalIsOpen(true);
  }

  function closeModal() {
    setEditModalIsOpen(false);
  }

  return (
    <div>
      <table className='table table-striped table-hover mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Address</th>
            <th scope='col'>Contact</th>
            <th scope='col'>Email</th>
            <th scope='col'>Vehicle Numbers</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataArray &&
            dataArray.map((item, key) => {
              return (
                <tr key={item._id}>
                  <th scope='row'>{++key}</th>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.vehicleNumbers.map((vehicleNumber) => {
                      return <p>{vehicleNumber}</p>;
                    })}
                  </td>
                  <td>
                    <div className='dropdown'>
                      <button
                        className='btn btn-secondary dropdown-toggle'
                        type='button'
                        id='dropdownMenuButton1'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        Action
                      </button>
                      <ul
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuButton1'
                      >
                        <li>
                          <button
                            className='dropdown-item btn btn-primary'
                            onClick={() => {
                              dispatch(getCompanyById(item._id));
                              openModal();
                            }}
                          >
                            EDIT
                          </button>
                        </li>
                        <li>
                          <button
                            className='dropdown-item btn btn-danger'
                            onClick={() => dispatch(deleteCompany(item._id))}
                          >
                            DELETE
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='p-5'>
          <CompanyEdit closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default CompanyTable;
