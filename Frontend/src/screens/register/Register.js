import React, { useContext, useState, useEffect } from "react";
import "./Register.css";
import { Formik } from "formik";
import {Image, Form, Button, NavLink} from 'react-bootstrap'
import bgImage from "../../logos/bg.jpg"
import logo from "../../logos/logos.png"
import { color } from "@mui/system";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import ButtonPr from "../../screens/Enquiry/ButtonPr";
import { MenuItem } from "@mui/material";

import * as API from "../../apiservice/Apiservice";

const Register = () => {
 
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loaderVisible, setLoaderVisible] = useState(false)
  const [disableRegisterFormFields, setDisableRegisterFormFields] = useState(false)
  const [registerFormFields, setRegisterFormFileds] = useState({
    firstName:'',
    lastName:'',
    emailId:'',
    password:'',
    userType:'',
    userAvatar:'',
    designation:'',
    mobileNumber:'',
    nickName:''
})


const handleRegisterFormChange= (event)=>{

    console.log( event.target.name)
    let data = {...registerFormFields}
        data[event.target.name] = event.target.value; 
    setRegisterFormFileds(data);
}

const registerUser=(e)=>{
    console.log("register user is working...")
   // e.preventDefault();
     console.log(registerFormFields)
     setLoaderVisible(true)
    API.register(registerFormFields)
    .then(async(res) => {
     console.log("here is create user response ", res)
     if(res.status==200){
        
        setLoaderVisible(false)
        setDisableRegisterFormFields(true)
                     
     }
    
    })
    .catch((err) => {
        setTimeout(() => {  setLoaderVisible(false) }, 2000);
        
        alert("Product Not created!!", err.response.message)
        console.log("here is the post contract product error!! ", err)
  })
    
 }



  

  return (
  <>
  
    <div style={{backgroundImage:`url(${bgImage})`,  backgroundRepeat:'no-repeat', backgroundAttachment:'fixed', backgroundSize:'cover', height:'615px'}}>
    
    
      
      {/* <div style={{width:'100%', height:'100%'}}>hellow world</div> */}
      <div className="row" style={{padding:0, margin:0, height:'100%', width:'100%', backgroundColor:'',}}>
      <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', }}>
            <div style={{color:'white', textAlign:'center', justifyContent:'center',backgroundColor:'', marginTop:'30%', padding:'5%'}}>
              <p style={{fontWeight:700, fontSize:20, marginBottom:'5%'}}>TESLA TRANSFORMERS (GLOBAL) PRIVATE LIMITED</p>
              <p>Tesla Transformers Global Pvt Ltd is a multi-poduct and service organization engaged in manufacturing, suplying, erecting, testing and commissioning of Power and Distribution Transformers in India.</p>
            </div>
        </div>
        <div className="col-xl-8 col-lg-8 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', height:'100%'  }}>
            <div style={{margin:'5%', height:'540px', background:'white', borderRadius:5, padding:'5%', textAlign:'center', marginLeft:50}}>
                <p style={{fontSize:12, fontWeight:700, color:'#AEADAD', opacity:1, textAlign:'left', marginBottom:0}}></p>
                 <p style={{fontSize:28, fontWeight:800, textAlign:'left', fontFamily:'sans-serif', }}>Create Account</p>


                 {/* Form creation */}
                  <div className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:0, marginRight:10, paddingTop:10, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', paddingBottom:30}}>
                      
                      <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:5}}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                                  <TextField size='small'  placeholder='John' id="standard-basic" label="First Name" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                  <TextField size='small' placeholder='Smith' id="standard-basic" label="Last Name" variant="standard" style={{fontSize:12, width:'90%'}}/>
                            </div>
                        </div>

                        <div className='row' style={{backgroundColor:'', margin:0, padding:0 , marginBottom:5}}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                  <TextField size='small'  placeholder='+91 9876543210' id="standard-basic" label="Email Id" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                            <TextField id="standard-select-currency" style={{width:'90%'}} select label="User Type" variant="standard">
                                    <MenuItem key={"L1"} value={"L1"}>Admin</MenuItem>
                                    <MenuItem key={"L2"} value={"L2"}>Market</MenuItem>
                                    <MenuItem key={"L3"} value={"L3"}>SOP</MenuItem>
                                  </TextField>
                             </div>
                        </div>
                        <div className='row' style={{backgroundColor:'', margin:0, padding:0 , marginBottom:5}}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                  <TextField size='small'  placeholder='Sales Executive' id="standard-basic" label="Designation" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                            <TextField size='small'  placeholder='MZS' id="standard-basic" label="Nick Name" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                            </div>
                       
                        </div>

                        <div className='row' style={{backgroundColor:'', margin:0, padding:0 , marginBottom:5}}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <TextField
                                id="standard-basic"
                                label="Profile Image"
                                variant="standard"
                                type="file"
                                inputProps={{
                                  multiple: true
                                }}
                                style={{width: '95%'}}
                              />
                                 
                             </div>
                             <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                             <TextField size='small'  placeholder='+91 9876543210' id="standard-basic" label="Mobile Number" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                         
                                 
                             </div>
                           
                        </div>
                         {/* password and confirm password */}
                         <div className='row' style={{backgroundColor:'', margin:0, padding:0 , marginBottom:5 }}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                    <FormControl sx={{ width: '90%', marginBottom:1 }} variant="standard" required>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                            <Input  id="standard-adornment-password" type={showPassword ? 'text' : 'password'}
                                              endAdornment={ <InputAdornment position="end"> <IconButton aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                                            </InputAdornment>}/>
                                    </FormControl>
                                  </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                    <FormControl sx={{ width: '90%', marginBottom:1 }} variant="standard" required>
                                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                            <Input  id="standard-adornment-password" type={showPassword ? 'text' : 'password'}
                                              endAdornment={ <InputAdornment position="end"> <IconButton aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                                            </InputAdornment>}/>
                                    </FormControl>
                             </div>
                          </div>
                          {/* buttons */}
                          <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginTop:30 }}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                            {/* <Link to="/login" style={{textDecoration:'none'}}><ButtonPr width="95%" height={ 40} label="Login" fontSize={14} fontWeight={700} /></Link> */}
                            <Link to="/login" style={{textDecoration:'none'}}><Button style={{width:'95%', backgroundColor:'#5F5E5E', height:40, fontSize:14, fontWeight:700, outline:'none' }}>LOGIN</Button></Link>

                                  </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                            <Link to="/register" style={{textDecoration:'none'}}><ButtonPr width="95%" height={ 40} label="Regiter" fontSize={14} fontWeight={700} /></Link>
              

                             </div>
                          </div>

                  </div>

                  


                 

                  {/* <Form style={{textAlign:'left', marginTop:'10%'}}> */}
                 
                  
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{fontWeight:600, color:"#5F5E5E"}}>Username</Form.Label>
                          <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{fontWeight:600, color:"#5F5E5E"}}>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group> */}
                        {/* <NavLink><p style={{fontWeight:700, fontSize:12, textAlign:'right', color:'#0059BF', marginBottom:40}}>Forgotten Password ?</p></NavLink> */}
                        {/* <Link to="/home"><Button style={{width:'100%', backgroundColor:'#0059BF', fontWeight:700}}>Login</Button></Link> */}
                           {/* </Form> */}
            </div>
        </div>
       
      </div>
    </div>
  </>
  );
};

export default Register;
