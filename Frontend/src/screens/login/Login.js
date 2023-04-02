import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { Formik } from "formik";
import {Image, Form, Button, NavLink} from 'react-bootstrap'
import bgImage from "../../logos/bg-image.jpg"
import logo from "../../logos/main-logo.png"
import { color } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import ButtonPr from "../Enquiry/ButtonPr";
import * as API from "../../apiservice/Apiservice";
import { FormHelperText } from "@mui/material";
import ButtonSpinner from "../Enquiry/Spinner";


const Login = () => {
 
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [password, setPassword ] = useState("")
  const [email, setEmail] = useState("")
  const [errorOccur, setErrorOccur] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 function loginUser(){
  console.log("login user is running...")
  setSpinnerVisible(true)
    
  API.login(email, password)
  .then((res) => {
    window.localStorage.clear();
    console.log(res);
    localStorage.setItem("accesstoken", res.data.token);
    localStorage.setItem("username", res.data.userName);
    localStorage.setItem("auth", true);
    setTimeout(() => {  setSpinnerVisible(false) }, 300);
    console.log("Logging in",);
    navigate("/home");
  })
  .catch((err) => {
    setSpinnerVisible(true)
  setTimeout(() => {  setSpinnerVisible(false) }, 300);
   setErrorOccur(true)
   setErrorMessage("Incorrect Entry")
    setTimeout(() => {
      
    }, 4000);
    
    console.log(err)
   // console.log(err.response.data.message);
    // navigate("/errorpage");
  });
 }
 

  return (
  <>
  
    <div style={{backgroundImage:`url(${bgImage})`,  backgroundRepeat:'no-repeat', backgroundAttachment:'fixed', backgroundSize:'cover', height:'200%'}}>
    
    
      
      {/* <div style={{width:'100%', height:'100%'}}>hellow world</div> */}
      <div className="row" style={{padding:0, margin:0, height:'20%', width:'100%', backgroundColor:''}}>
   
        <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', height:'1000px'  }}>
            <div style={{margin:'10%', background:'white', borderRadius:5, padding:'10%', paddingTop:'5%', textAlign:'center', marginTop:'8%'}}>
                <p style={{fontSize:18, fontWeight:700, color:'#AEADAD', opacity:1}}>WELCOME TO</p>
                <img src={logo} style={{height:'80%', width:'80%'}}></img>
         
                  <Form style={{textAlign:'left', marginTop:'10%'}}>
                  <TextField error={errorOccur} helperText={errorMessage} id="standard-basic" onChange={(e) => {setEmail(e.target.value)}} required label="Email or Username" variant="standard" style={{width:'100%', marginBottom:20}}/>
                
                  <FormControl sx={{ width: '100%', marginBottom:1 }} variant="standard" required>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input error={errorOccur} helperText={errorMessage} onChange={(e) => {setPassword(e.target.value)}} id="standard-adornment-password" type={showPassword ? 'text' : 'password'}
                              endAdornment={ <InputAdornment position="end"> <IconButton aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                            </InputAdornment>}/>
                            <FormHelperText id="standard-weight-helper-text" style={{color:'#d32f2f'}}>{errorMessage}</FormHelperText>
                   </FormControl>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{fontWeight:600, color:"#5F5E5E"}}>Username</Form.Label>
                          <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{fontWeight:600, color:"#5F5E5E"}}>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group> */}
                        <NavLink><p style={{fontWeight:700, fontSize:12, textAlign:'right', color:'#0059BF', marginBottom:40}}>Forgotten Password ?</p></NavLink>
                        <Button onClick={loginUser} style={{width:'100%', backgroundColor:'#0059BF', fontWeight:700}}>{spinnerVisible ? <ButtonSpinner/>:<>Login</>}</Button>
                        {/* <ButtonPr width="100%" height={ 40} label="Login" fontSize={14} fontWeight={700} /></Link> */}
                  </Form>
            </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', }}>
            <div style={{color:'white', textAlign:'center', justifyContent:'center',backgroundColor:'', marginTop:'30%', padding:'5%'}}>
              <p style={{fontWeight:700, fontSize:20, marginBottom:'5%'}}>KRAFTMAN CONSULTANTS LLP.</p>
              <p>We are here to help determine the look and feel of a client's home by selecting and placing decorative elements such as paint, textiles, and furniture.</p>
            </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Login;
