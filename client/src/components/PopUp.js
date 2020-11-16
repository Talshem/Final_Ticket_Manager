import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';

function PopUp(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const showAll = async () => {
      if (props.count !== count) {
        setIsOpen(true);
        setCount(props.count);
      }
    }; showAll();
  });

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        className="modal"
        isOpen={isOpen}
      >
        <h4>{props.title}</h4>
        <div>{props.content}</div>
        <br />
        <button onClick={() => handleClose()}>Close [x]</button>
      </Modal>
    </div>
  );
}

Modal.setAppElement('#root');

export default PopUp;
