import React from 'react'
import { useNavigate } from 'react-router-dom';
import {IoHome } from "react-icons/io5";
import HistoryIcon from '@mui/icons-material/History';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import HandymanIcon from '@mui/icons-material/Handyman';
import PaidIcon from '@mui/icons-material/Paid';
import { FaPeopleGroup } from "react-icons/fa6";
import {BiLogOut} from "react-icons/bi";
import SpeedDialComponent from '../SpeedDial/SpeedDialComponent';


function SideBar() {

    const navigate = useNavigate()

function logOut(){
  console.log("log out is working...")
  window.localStorage.clear();
  navigate('/')
}

  return (
       <>
       <div
        onClick={() => navigate('/home')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/home' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <IoHome style={{ fontSize: 20, marginLeft: 10, color: window.location.pathname === '/home'? '#21ad01':'white', marginTop: -5 }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/home' ?'#21ad01':'white', marginLeft: 12 }}>Home</span>
      </div>
    {/* history */}
      <div
        onClick={() => navigate('/customer-list')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/customer-list' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <FaPeopleGroup style={{ marginLeft: 8, color: window.location.pathname === '/customer-list'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/customer-list'? '#21ad01':'white',  marginLeft: 10 }}>Customers</span>
      </div>
     {/* create customer */}
     <div
        onClick={() => navigate('/create-customer')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/create-customer' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <PersonAddIcon style={{ marginLeft: 8, color: window.location.pathname === '/create-customer'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/create-customer'? '#21ad01':'white',  marginLeft: 10 }}>Customer</span>
      </div>
       {/* create site */}
       <div
        onClick={() => navigate('/create-site')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/create-site' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <LocationOnIcon style={{ marginLeft: 8, color: window.location.pathname === '/create-site'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/create-site'? '#21ad01':'white',  marginLeft: 10 }}>Site</span>
      </div>
      {/* create work */}
      <div
        onClick={() => navigate('/create-work')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/create-work' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <EngineeringIcon style={{ marginLeft: 8, color: window.location.pathname === '/create-work'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/create-work'? '#21ad01':'white',  marginLeft: 10 }}>Work</span>
      </div>
      {/* create materila */}
      <div
        onClick={() => navigate('/create-material')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/create-material' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <HandymanIcon style={{ marginLeft: 8, color: window.location.pathname === '/create-material'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/create-material'? '#21ad01':'white',  marginLeft: 10 }}>Material</span>
      </div>
      {/* create labour */}
      <div
        onClick={() => navigate('/create-labour')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/create-labour' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <GroupsIcon style={{ marginLeft: 8, color: window.location.pathname === '/create-labour'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/create-labour'? '#21ad01':'white',  marginLeft: 10 }}>Labour</span>
      </div>
      {/* payment */}
      <div
        onClick={() => navigate('/create-payment')}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/create-payment' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginBottom: 10,
        }}
      >
        <PaidIcon style={{ marginLeft: 8, color: window.location.pathname === '/create-payment'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/create-payment'? '#21ad01':'white',  marginLeft: 10 }}>Payment</span>
      </div>

      <div
        onClick={() =>logOut()}
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: window.location.pathname === '/' ? 'white' : '',
          borderRadius: 5,
          height: '35px',
          lineHeight: '35px',
          marginTop:'50px',
          marginBottom: 10,
        }}
      >
        <BiLogOut style={{ marginLeft: 8, color: window.location.pathname === '/'? '#21ad01':'white',  }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: window.location.pathname === '/'? '#21ad01':'white',  marginLeft: 10 }}>Log Out</span>
      </div>

      <SpeedDialComponent/>




    
       </>
  )
}

export default SideBar


