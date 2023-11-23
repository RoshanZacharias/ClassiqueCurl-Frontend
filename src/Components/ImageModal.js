import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element to handle accessibility

const ImageModal = ({ src, alt }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <img
        src={src}
        alt={alt}
        style={{ maxWidth: '100px', cursor: 'pointer' }}
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enlarged Image"
      >
        <img src={src} alt={alt} style={{ width: '30%' }} />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ImageModal;
