import React from 'react';
import Modal from 'react-modal';
import {
  deleteFAQ,
  getFAQById,
  publishFAQ,
} from '../../app/actions/faq.actions';
import { useDispatch } from 'react-redux';
import FAQEdit from '../FAQEdit';
import FAQView from '../FAQView';

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

function FAQTable({ dataArray }) {
  const dispatch = useDispatch();
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = React.useState(false);

  function openModal() {
    setEditModalIsOpen(true);
  }

  function closeModal() {
    setEditModalIsOpen(false);
  }

  function openViewModal() {
    setViewModalIsOpen(true);
  }

  function closeViewModal() {
    setViewModalIsOpen(false);
  }

  return (
    <div>
      <table className='table table-striped table-hover mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>

            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Issue</th>
            <th scope='col'>Status</th>
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
                  <td>{item.email}</td>
                  <td>{item.issue.substring(0, 15)}..</td>
                  <td>{item.isPublished ? 'PUBLISHED' : 'PENDING'}</td>
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
                            className='dropdown-item text-success'
                            onClick={() => {
                              const udateData = {
                                _id: item._id,
                                isPublished: true,
                              };
                              dispatch(publishFAQ(udateData));
                            }}
                          >
                            PUBLISH
                          </button>
                        </li>
                        <li>
                          <button
                            className='dropdown-item text-info'
                            onClick={() => {
                              dispatch(getFAQById(item._id));
                              openViewModal();
                            }}
                          >
                            VIEW
                          </button>
                        </li>
                        <li>
                          <button
                            className='dropdown-item text-warning'
                            onClick={() => {
                              dispatch(getFAQById(item._id));
                              openModal();
                            }}
                          >
                            EDIT
                          </button>
                        </li>
                        <li>
                          <button
                            className='dropdown-item text-danger'
                            onClick={() => dispatch(deleteFAQ(item._id))}
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
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>EDIT FAQ</h2>
        <div className='p-5'>
          <FAQEdit closeModal={closeModal} />
        </div>
      </Modal>

      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={closeViewModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>VIEW FAQ</h2>
        <div className='p-5'>
          <FAQView closeModal={closeViewModal} />
        </div>
      </Modal>
    </div>
  );
}

export default FAQTable;
