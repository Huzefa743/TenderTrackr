import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { Formik } from "formik";
import {Image, Form, Button, NavLink} from 'react-bootstrap'
import bgImage from "../../logos/bg-image.jpg"
import logo from "../../logos/latest/main-logo1.png"
import backgroundLoginImage from "../../logos/latest/bg-login1.jpeg"
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
import * as API from "../../services/services";
import { CircularProgress, Container, CssBaseline, Divider, FormHelperText, Grid, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import Loader from "../../components/Loader/laoder";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';


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

 //theme provider
 const theme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: "red", // Change focus border color here
        },
      },
    },
  },
});
 

  return (
  <>

<div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
<div className="background-image"></div>


<div className="login-form" style={{ justifyContent:'center', maxWidth:'600px', background:'white', borderRadius:5,  paddingTop:'5%', textAlign:'center', marginTop:'8%', height:'auto'}}>
            
          <p className="login-heading">WELCOME TO</p>
                <img src={logo} className="login-head-logo" ></img>
         
                  <Form style={{textAlign:'left', marginTop:'10%'}}>
               
                  <TextField error={errorOccur} helperText={errorMessage} id="standard-basic" onChange={(e) => {setEmail(e.target.value)}} required label="Email or Username" variant="standard" style={{width:'100%', marginBottom:20}}
                   InputLabelProps={{
                    style: {
                      color: "#21ad01", // Change this to your desired label color
                      borderColor: "#21ad01",
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "black", // Change text color
                      borderColor: "#f798a1",
                    },
                    focused: {
                      borderColor: "#55766f", // Change focus border color
                      color: "#55766f", // Change text color
                      
                    },
                  }}
                  />
                   <TextField
  error={errorOccur}
  helperText={errorMessage}
  id="standard-basic"
  onChange={(e) => {setPassword(e.target.value)}}
  
  name="password"
  required
  label="Password"
  variant="standard"
  fullWidth
  type={showPassword ? 'text' : 'password'}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
    style: {
      color: 'black',
      borderColor: '#f798a1',
      '&.Mui-focused': {
        borderColor: '#55766f',
        color: '#55766f',
      },
    },
  }}
  InputLabelProps={{
    style: {
      color: '#21ad01',
      borderColor: '#21ad01',
    },
  }}
/>


                
                  {/* <FormControl sx={{ width: '100%', marginBottom:1 }} variant="standard" required>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input error={errorOccur} helperText={errorMessage} onChange={(e) => {setPassword(e.target.value)}} id="standard-adornment-password" type={showPassword ? 'text' : 'password'}
                              endAdornment={ <InputAdornment position="end"> <IconButton aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                            </InputAdornment>}/>
                            <FormHelperText id="standard-weight-helper-text" style={{color:'#d32f2f'}}>{errorMessage}</FormHelperText>
                   </FormControl> */}
                  {/* </ThemeProvider>     */}
                     
                        {/* <NavLink><p style={{fontWeight:700, fontSize:12, textAlign:'right', color:'#21ad01', marginBottom:40}}>Forgotten Password ?</p></NavLink> */}
                        <Button   onClick={loginUser} style={{width:'100%', marginTop:50, backgroundColor:'#21ad01', fontWeight:700, height:'auto'}}>{spinnerVisible ? <CircularProgress size={25} style={{color:'white'}} />:<>Login</>}</Button>
                        {/* <ButtonPr width="100%" height={ 40} label="Login" fontSize={14} fontWeight={700} /></Link> */}
                  </Form>
                  <Divider/>
                   <div style={{ marginTop:20, display: 'flex', justifyContent: 'center' }}>
                   
                      <div style={{ margin: '0 10px' }}>
                             <IconButton aria-label="delete" >
                                  <FacebookIcon style={{color:'#21ad01'}} />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <TwitterIcon style={{color:'#21ad01'}} />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <LinkedInIcon style={{color:'#21ad01'}} />
                              </IconButton>
                              <IconButton aria-label="delete" >
                                  <InstagramIcon style={{color:'#21ad01'}}/>
                              </IconButton>
                      </div>
                    
                  </div>
      </div>

      

    </div>




  </>
  );
};

export default Login;
