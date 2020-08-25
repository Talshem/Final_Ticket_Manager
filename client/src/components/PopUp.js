import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

function PopUp(props){
  const [IsOpen,setIsOpen] = useState(false);

function handleClose(){
  setIsOpen(false)
}



    return (


      <div>
        <Modal className="modal"
          animation='true'
          isOpen={IsOpen}
        >
          <h4>Congratulations winner!</h4>
          <div>Place your name in the records list!</div>
          <br/>
            <button onClick={() => handleClose()}>Cancel</button>
        </Modal>
      </div>
    );
}

Modal.setAppElement('#root')

export default PopUp;