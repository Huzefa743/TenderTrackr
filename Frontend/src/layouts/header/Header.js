import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../logos/latest/main-logo1.png';
import userIcon from '../../logos/user.png'
import './Header.css';
import {IoHome } from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi"
import {SlNotebook} from "react-icons/sl"

import HistoryIcon from '@mui/icons-material/History';

const Header = (props) => {
   console.log("here is theader value", props.headerValue)
   let currentPage=props.headerValue

  const navigate = useNavigate();

  function logOut(){
    console.log("log out is working...")
    window.localStorage.clear();
    navigate('/')
  }

  return (
    <>
      
        <Navbar key="sm" bg="light" expand="sm"  style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', height:60, margin:0, zIndex:1000}}>
          <Container fluid style={{height:60,}}>
            <Navbar.Brand >
              <img onClick={()=>navigate('/home')} src={logo} className='logo-image'></img>
              
              </Navbar.Brand>
            
           
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end" style={{backgroundColor:"#21ad01"}}
            >
              <Offcanvas.Header closeButton style={{color:'white'}}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}  style={{color:'white'}}>
                  Details
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 d-block d-sm-none">
                <div className=".d-block .d-sm-none" style={{width:'auto', backgroundColor:'', marginTop:40, marginRight:10, marginLeft:10}}>
                      {/* <Link to="/home" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'white',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><IoHome style={{fontSize:20, marginLeft:10, color:'#21ad01', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'#21ad01', marginLeft:12,}}>Home</span></div></Link> */}
                    
                      <div onClick={()=>navigate('/home')} style={{ backgroundColor: window.location.pathname === '/home'? 'white':'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}>
                          <IoHome style={{fontSize:20, marginLeft:10, color: window.location.pathname === '/home'? '#21ad01':'white', marginTop:-5}  }/>
                          <span  style={{fontWeight:600, fontSize:12, color: window.location.pathname === '/home'? '#21ad01':'white', marginLeft:10,}}>
                            Home</span>
                        </div>

                        <div onClick={()=>navigate('/customer-list')} style={{ backgroundColor: window.location.pathname === '/customer-list'? 'white':'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}>
                          <HistoryIcon style={{fontSize:20, marginLeft:10, color: window.location.pathname === '/customer-list'? '#21ad01':'white', marginTop:-5}  }/>
                          <span  style={{fontWeight:600, fontSize:12,  color: window.location.pathname === '/customer-list'? '#21ad01':'white', marginLeft:10,}}>
                            Customers</span>
                        </div>
                        
                        
                         
                          {/* <div style={currentPage!="customer-list"? { backgroundColor:'white',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }:{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}>
                            <HistoryIcon style={currentPage!="customer-list"?{fontSize:20, marginLeft:10, color:'#21ad01', marginTop:-5}:{ marginLeft:8, color:'white'}  }/>
                            <span  style={currentPage!="customer-list"?{fontWeight:600, fontSize:12, color:'#21ad01', marginLeft:12,}:{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>
                              Customers</span></div> */}
                        


                         <div onClick={logOut} style={{ backgroundColor:'', cursor:'pointer',  borderRadius:5, height:'35px', lineHeight:'35px', marginTop:250,marginBottom:12, }}><BiLogOut style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12, marginTop:-20, }}>Log Out</span></div>
                                 
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