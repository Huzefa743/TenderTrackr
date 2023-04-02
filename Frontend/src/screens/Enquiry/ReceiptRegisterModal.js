import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'

function ReceiptRegisterModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   //Download workOrder
   const downloadReceiptRegister = (enquiryId) => {
    window.location.href = `http://localhost:8080/api/v1/download-enquiry-wo/${enquiryId}`;
  };

  return (
    <>
     

      <Modal
        {...props}
        backdrop="static"
        keyboard={false} style={{border:'none'}}
      >
        <Modal.Header style={{height:40, border:'none', backgroundColor:' #0059BF', color:'white',}}>
          <Modal.Title style={{ fontSize:16, fontWeight:500}}>Download Receipt-Register</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'', fontSize:14, padding:30}}>
         Would you like to download the Receipt-Register details or continue with Post-Contract Order register creation.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} style={{backgroundColor:'green', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Download</Button>
          <Button onClick={props.onHide} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Continue</Button>
                    
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReceiptRegisterModal