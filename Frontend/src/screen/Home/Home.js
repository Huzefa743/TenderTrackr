import React from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import Footer from '../../layouts/footer/Footer'
import Header from '../../layouts/header/Header'
import { Link } from 'react-router-dom';
import {IoHome } from "react-icons/io5";
import {FiEdit} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi";
import {SlNotebook} from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongSharp from '@mui/icons-material/ReceiptLongSharp';
import Dashboard from './Dashboard';
import HistoryIcon from '@mui/icons-material/History';

function Home() {

  const navigate = useNavigate();

  function logOut(){
    console.log("log out is working...")
    window.localStorage.clear();
    navigate('/login')
  }

  return (
    <>
      <Header />
      <div className='row' style={{backgroundColor:'blue', height:'100%', padding:0, margin:0, marginTop:-12}}>
                 <div className='col-xl-2 col-lg-2 col-sm-2 d-none d-sm-block' style={{backgroundColor:'#0059BF', height:'auto+20', margin:0, padding:0, marginTop:-5}}>
                         <div style={{width:'auto', backgroundColor:'', marginTop:40, marginRight:10, marginLeft:10}}>
                         <Link to="/home" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'white',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><IoHome style={{fontSize:20, marginLeft:10, color:'#0059BF', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'#0059BF', marginLeft:12,}}>Home</span></div></Link>
                         <Link to="/history" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><HistoryIcon style={{ marginLeft:8, color:'white'}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>History</span></div></Link>
                        
                         <div onClick={logOut} style={{ backgroundColor:'', cursor:'pointer',  borderRadius:5, height:'35px', lineHeight:'35px', marginTop:250,marginBottom:12, }}><BiLogOut style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12, marginTop:-20, }}>Log Out</span></div>
                                 
                         </div>

                  </div>
                  <div className='col-xl-10 col-lg-10 col-sm-10 col-xs-12' style={{backgroundColor:'white'}}>
                      <Dashboard/>
                  </div>
                 
           </div>
      <Footer/>
    </>
  )
}

export default Home