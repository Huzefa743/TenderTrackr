import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import logo from '../../logos/main-logo.png';
import userIcon from '../../logos/user.png'
import './Header.css';
import {IoHome } from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi"
import {SlNotebook} from "react-icons/sl"

const Header = () => {


  return (
    <>
      
        <Navbar key="sm" bg="light" expand="sm" className="mb-3" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', height:60, margin:0}}>
          <Container fluid style={{height:60,}}>
            <Navbar.Brand href="/kc/home">
              <img src={logo} style={{height:50, width:'270px', marginLeft:0}}></img>
              </Navbar.Brand>
            
           
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end" style={{backgroundColor:"#0059BF"}}
            >
              <Offcanvas.Header closeButton style={{color:'white'}}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}  style={{color:'white'}}>
                  Details
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 d-block d-sm-none">
                <div className=".d-block .d-sm-none" style={{width:'auto', backgroundColor:'', marginTop:40, marginRight:10, marginLeft:10}}>
                         <Link to="/home" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><IoHome style={{fontSize:20, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>Home</span></div></Link>
                         <Link to="/enquiry" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><FiEdit style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>Enquiry</span></div></Link>
                         <Link to="/sop" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><GiNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>SOP</span></div></Link>
                         <Link to="/bom" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><SlNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>BOM</span></div></Link>
                         <Link to="/login" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginTop:250,marginBottom:12, }}><BiLogOut style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12, marginTop:-20, }}>Log Out</span></div></Link>
                                 
                         </div>
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          
          <img className='d-none d-sm-block' src={userIcon} style={{height:30, width:30, float:'right', marginRight: 30}}></img>
           
        </Navbar>
      
    </>
  )
}

export default Header