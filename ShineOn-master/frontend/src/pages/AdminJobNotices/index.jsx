import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getJobNotices } from '../../app/actions/jobnotice.actions';
import JobNoticeAdd from '../../components/JobNoticeAdd';
import JobNoticeTable from '../../components/JobNoticeTable';
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

function AdminJobNotices() {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.jobnotice.notices);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    dispatch(getJobNotices());
  }, []);

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-4'>
          <h1>JOB NOTICES</h1>
        </div>
        <div className='col-6'>
          <button className='btn btn-warning' onClick={openModal}>
            ADD NOTICE
          </button>
        </div>
      </div>
      <JobNoticeTable dataArray={notices} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>EDIT NOTICE</h2>
        <div className='p-5'>
          <JobNoticeAdd closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default AdminJobNotices;
