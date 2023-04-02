import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
import { useNavigate } from 'react-router-dom';
import * as API from "../../apiservice/Apiservice";



function DeleteEnquiryModal(props) {
  
  const [visible, setVisible ] = useState(false)
  const navigate = useNavigate();

  function finishOrder() {
    navigate("/enquiry");
  }

 

  return (
    <>
     

      <Modal
       
        {...props}
        
        backdrop="static"
        keyboard={false} style={{border:'none'}}
      >
        <Modal.Header style={{height:40, border:'none', backgroundColor:'#dc3545', color:'white',}}>
          <Modal.Title style={{ fontSize:16, fontWeight:500}}>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'', fontSize:14, padding:30}}>
         Are you sure you want to delete ?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Cancel</Button>
          <Button onClick={props.onAction} style={{backgroundColor:'#dc3545', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Delete</Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteEnquiryModal