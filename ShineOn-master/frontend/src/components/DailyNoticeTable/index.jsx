import React from 'react';
import Modal from 'react-modal';
import {
  deleteDailyNotice,
  getDailyNoticeById,
  publishDailyNotice,
} from '../../app/actions/dailynotice.actions';
// import AppointmentEditModal from "../AppointmentEditModal";
import { useDispatch } from 'react-redux';
import DailyNoticeEdit from '../DailyNoticeEdit';
import moment from 'moment';
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

function DailyNoticeTable({ dataArray }) {
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

            <th scope='col'>Created At</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
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

                  <td>
                    {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
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
                              dispatch(publishDailyNotice(udateData));
                            }}
                          >
                            PUBLISH
                          </button>
                        </li>
                        <li>
                          <button
                            className='dropdown-item text-secondary'
                            onClick={() => {
                              dispatch(getDailyNoticeById(item._id));
                              openModal();
                            }}
                          >
                            EDIT
                          </button>
                        </li>
                        <li>
                          <button
                            className='dropdown-item text-danger'
                            onClick={() =>
                              dispatch(deleteDailyNotice(item._id))
                            }
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
        <h2 className='text-center'>EDIT NOTICE</h2>
        <div className='p-5'>
          <DailyNoticeEdit closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default DailyNoticeTable;
