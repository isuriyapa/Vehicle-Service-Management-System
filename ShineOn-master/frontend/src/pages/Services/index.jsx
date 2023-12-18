import React from 'react';
import FullServiceImage from '../../assets/fullservice.webp';
import OilChangeImage from '../../assets/oilchange.webp';
import TireReplacementImage from '../../assets/tirereplacement.webp';
import BodyWashImage from '../../assets/bodywash.webp';
import ServiceViewModal from '../../components/ServiceViewModal';
import Modal from 'react-modal';
Modal.setAppElement('div');

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

function Services() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalTitle, setModelTitle] = React.useState('');
  const [modalContent, setModelContent] = React.useState('');

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className='container mt-5 mb-5'>
      <h1>Our Services</h1>
      <hr />
      <div class='container'>
        <div class='row mb-4'>
          <div class='col-md-6 col-lg-6'>
            <div
              class='position-relative'
              onClick={() => {
                setModelTitle('Body Wash');
                setModelContent(
                  'Our vehicle body wash service is designed to be convenient and affordable, with flexible scheduling options and competitive pricing. We also use eco-friendly cleaning products and techniques to minimize our environmental impact.'
                );
                openModal();
              }}
            >
              <img src={BodyWashImage} class='img-fluid square-img' alt='...' />
              <div class='position-absolute top-50 start-50 translate-middle text-center'>
                <span class='text-white fs-3 fw-bold'>BODY WASH</span>
              </div>
            </div>
          </div>
          <div class='col-md-6 col-lg-6'>
            <div
              class='position-relative'
              onClick={() => {
                setModelTitle('Full Service');
                setModelContent(
                  'Our interior services involve thoroughly cleaning, vacuuming, and dusting all surfaces, from the dashboard and steering wheel to the seats and floor mats.Our exterior services range from paint corrections to advanced acid rain removal, ensuring that your vehicle is spotless, sparkles, and shines.'
                );
                openModal();
              }}
            >
              <img
                src={FullServiceImage}
                class='img-fluid square-img'
                alt='...'
              />
              <div class='position-absolute top-50 start-50 translate-middle text-center'>
                <span class='text-white fs-3 fw-bold'>FULL SERVICE</span>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-6 col-lg-6'>
            <div
              class='position-relative'
              onClick={() => {
                setModelTitle('Oil Change');
                setModelContent(
                  'To protect your gear box and ensure its smooth operation you have to change the gear oil with the right gear oil type, at the right time.'
                );
                openModal();
              }}
            >
              <img
                src={OilChangeImage}
                class='img-fluid square-img'
                alt='...'
              />
              <div class='position-absolute top-50 start-50 translate-middle text-center'>
                <span class='text-white fs-3 fw-bold'>OIL CHANGE</span>
              </div>
            </div>
          </div>
          <div class='col-md-6 col-lg-6'>
            <div
              class='position-relative'
              onClick={() => {
                setModelTitle('Tire Replacement');
                setModelContent(
                  'Auto Miraj also offers Roadside Assistance for peace of mind and also offer a wide range of high-quality and affordable Tyres available for purchasing and fitting on-site for your total convenience.'
                );
                openModal();
              }}
            >
              <img
                src={TireReplacementImage}
                class='img-fluid square-img'
                alt='...'
              />
              <div class='position-absolute top-50 start-50 translate-middle text-center'>
                <span class='text-white fs-3 fw-bold'>TIRE REPLACEMENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='container'>
          <ServiceViewModal
            closeModal={closeModal}
            modalContent={modalContent}
            modalTitle={modalTitle}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Services;
