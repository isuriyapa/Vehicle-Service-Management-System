import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyNotices } from '../../app/actions/dailynotice.actions';
import DailyNoticeAdd from '../../components/DailyNoticeAdd';
import DailyNoticeTable from '../../components/DailyNoticeTable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

function AdminDailyNotices() {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.dailynotice.notices);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [noticeList, setNoticeList] = useState([]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    dispatch(getDailyNotices());
  }, []);

  useEffect(() => {
    if (notices) {
      setNoticeList(notices);
    }
  }, [notices]);

  const filterData = (searchWord) => {
    let newArray = notices.filter(function (el) {
      return (
        el.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        el.description.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    setNoticeList(newArray);
  };

  function generatePDF(data) {
    const doc = new jsPDF();
    const tableColumn = ['Title', 'Description', 'Status', 'Date', 'Time'];
    const tableRows = [];

    data.forEach((item) => {
      const rowData = [
        item.title,
        item.description,
        item.isPublished ? 'Published' : 'Pending',
        item.createdAt.substring(0, 10),
        item.createdAt.substring(11, 19),
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('notice-table.pdf');
  }

  return (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-3'>
          <h1>DAILY NOTICES</h1>
        </div>
        <div className='col-3'>
          <button className='btn btn-warning' onClick={openModal}>
            ADD NOTICE
          </button>
        </div>
        <div className='col-3'>
          <button
            className='btn btn-info'
            onClick={() => {
              generatePDF(noticeList);
            }}
          >
            PRINT
          </button>
        </div>
        <div className='col-3'>
          <input
            type='text'
            onChange={(e) => filterData(e.target.value)}
            name='search'
            placeholder='search...'
            className='form-control'
          />
        </div>
      </div>
      <DailyNoticeTable dataArray={noticeList} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 className='text-center'>ADD NOTICE</h2>
        <div className='p-5'>
          <DailyNoticeAdd closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default AdminDailyNotices;
