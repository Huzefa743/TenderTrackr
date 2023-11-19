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
import SideBar from '../../layouts/SideBar/SideBar';

function CreateSite() {

  const navigate = useNavigate();

  function logOut(){
    console.log("log out is working...")
    window.localStorage.clear();
    navigate('/')
  }

  return (
    <>
      <Header />
      <div className='row' style={{backgroundColor:'#21ad01', height:'100vh', padding:0, margin:0}}>
      <div className='col-xl-2 col-lg-2 col-sm-2 d-none d-sm-block' style={{backgroundColor:'#21ad01', height:'100%', margin:0, padding:0, paddingTop:50, paddingRight:10, paddingLeft:10}}>
                       <SideBar/>
                  </div>
                  <div className='col-xl-10 col-lg-10 col-sm-10 col-xs-12 dashboard-container' >
                      <Dashboard/>
                  </div>
                 
           </div>
      <Footer/>
    </>
  )
}

export default CreateSite