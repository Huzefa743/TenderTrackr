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

<Container component="main" maxWidth="xl" style={{ height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <Grid container style={{ height: '100%' }}>
        {/* Background Image */}
        <Grid item xs={12} style={{ backgroundImage: `url(${backgroundLoginImage})`, backgroundSize: 'cover', height:'100vh', backgroundPosition: 'center' }}>
          <div style={{  height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Login Form */}
            <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
              <Typography variant="h5" component="h1" gutterBottom>
                Login
              </Typography>
              <form style={{ width: '100%', marginTop: '8px' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username or Email"
                  name="username"
                  autoComplete="username"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px', backgroundColor: '#21ad01' }}>
                  Login
                </Button>
              </form>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Container>

<Container component="main" maxWidth="xl">
      <CssBaseline />
      <Grid container>
        {/* Left Column - Login Form */}
        <Grid item xs={12} md={6} lg={6} component={Paper} elevation={3} style={{ padding: '40px', textAlign:'center' }}>
          {/* <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography> */}
          <p style={{fontSize:12, fontWeight:700, color:'#AEADAD', opacity:1, marginBottom:0}}>WELCOME TO</p>
                <img src={logo} style={{height:'80px', width:'auto'}}></img>
         
                  <Form style={{textAlign:'left', marginTop:'10%'}}>
                  <ThemeProvider theme={theme}>
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
                  </ThemeProvider>    
                     
                        {/* <NavLink><p style={{fontWeight:700, fontSize:12, textAlign:'right', color:'#21ad01', marginBottom:40}}>Forgotten Password ?</p></NavLink> */}
                        <Button   onClick={loginUser} style={{width:'100%', marginTop:50, backgroundColor:'#21ad01', fontWeight:700, height:'auto'}}>{spinnerVisible ? <CircularProgress size={25} style={{color:'white'}} />:<>Login</>}</Button>
                        {/* <ButtonPr width="100%" height={ 40} label="Login" fontSize={14} fontWeight={700} /></Link> */}
                  </Form>
                  <Divider/>
                   <div style={{ marginTop:20, display: 'flex', justifyContent: 'center' }}>
                   
                      <div style={{ margin: '0 10px' }}>
                             <IconButton aria-label="delete" >
                                  <FacebookIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <TwitterIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <LinkedInIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <InstagramIcon color="info" />
                              </IconButton>
                      </div>
                    
                  </div>
        </Grid>

        {/* Right Column - Background Image */}
        <Grid item xs={12} md={6} lg={6} style={{ height: '100vh', overflow: 'hidden' }}>
          <img
            src="https://via.placeholder.com/800x800" // Replace with your image URL
            alt="background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
    </Container>




  
<div className="d-none d-sm-block" style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
     
    
      
      {/* <div style={{width:'100%', height:'100%'}}>hellow world</div> */}
      <div className="row" style={{padding:0, margin:0, height:'auto', width:'100%', backgroundColor:''}}>
   
        <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', height:'100vh'  }}>
            <div style={{margin:'10%', background:'white', borderRadius:5, padding:'10%', paddingTop:'5%', textAlign:'center', marginTop:'8%', height:'auto'}}>
                <p style={{fontSize:12, fontWeight:700, color:'#AEADAD', opacity:1, marginBottom:0}}>WELCOME TO</p>
                <img src={logo} style={{height:'70%', width:'80%'}}></img>
         
                  <Form style={{textAlign:'left', marginTop:'10%'}}>
                  <ThemeProvider theme={theme}>
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
                  </ThemeProvider>    
                     
                        {/* <NavLink><p style={{fontWeight:700, fontSize:12, textAlign:'right', color:'#21ad01', marginBottom:40}}>Forgotten Password ?</p></NavLink> */}
                        <Button   onClick={loginUser} style={{width:'100%', marginTop:50, backgroundColor:'#21ad01', fontWeight:700, height:'auto'}}>{spinnerVisible ? <CircularProgress size={25} style={{color:'white'}} />:<>Login</>}</Button>
                        {/* <ButtonPr width="100%" height={ 40} label="Login" fontSize={14} fontWeight={700} /></Link> */}
                  </Form>
                  <Divider/>
                   <div style={{ marginTop:20, display: 'flex', justifyContent: 'center' }}>
                   
                      <div style={{ margin: '0 10px' }}>
                             <IconButton aria-label="delete" >
                                  <FacebookIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <TwitterIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <LinkedInIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <InstagramIcon color="info" />
                              </IconButton>
                      </div>
                    
                  </div>
            </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', }}>
            <div style={{color:'white', textAlign:'center', justifyContent:'center',backgroundColor:'', marginTop:'30%', padding:'5%'}}>
              <p style={{fontWeight:700, fontSize:20, marginBottom:'5%'}}>Kraftman Consultants</p>
              <p >Welcome to our consultancy firm, where we specialize in providing comprehensive solutions for all your house designing and building needs. With our expertise in 3D house design and construction management, we take complete ownership of your project from start to finish, ensuring a seamless and hassle-free experience for you.</p>
            </div>
        </div>
      </div>
    </div>
    <div className="d-block d-sm-none" style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
     
    <div className="row"  style={{padding:0, margin:0, height:'auto', width:'100%', backgroundColor:''}}>
   
        <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', height:'auto'  }}>
            <div style={{ background:'white', borderRadius:5, padding:'10%', paddingTop:'5%', textAlign:'center', marginTop:'3%'}}>
                <p style={{fontSize:12, fontWeight:700, color:'#AEADAD', opacity:1, marginBottom:0}}>WELCOME TO</p>
                <img src={logo} style={{height:'70%', width:'80%'}}></img>
         
                  <Form style={{textAlign:'left', marginTop:'20%'}}>
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
                        {/* <NavLink><p style={{fontWeight:700, fontSize:12, textAlign:'right', color:'#21ad01', marginBottom:40}}>Forgotten Password ?</p></NavLink> */}
                        <Button onClick={loginUser} style={{width:'100%', marginTop:50, backgroundColor:'#21ad01', fontWeight:700}}>{spinnerVisible ? <Loader/>:<><span className="history-heading">Login</span></>}</Button>
                        {/* <ButtonPr width="100%" height={ 40} label="Login" fontSize={14} fontWeight={700} /></Link> */}
                  </Form>
                  <Divider/>
                   <div style={{ marginTop:20, display: 'flex', justifyContent: 'center' }}>
                   
                      <div style={{ margin: '0 10px' }}>
                             <IconButton aria-label="delete" >
                                  <FacebookIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <TwitterIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <LinkedInIcon color="info" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <InstagramIcon color="info" />
                              </IconButton>
                      </div>
                    
                  </div>
                  
            </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12" style={{ background:'rgb(0, 89, 191,0.75)', }}>
            <div style={{color:'white', textAlign:'center', justifyContent:'center',backgroundColor:'', marginTop:'0%', padding:'5%', height:'400px', paddingTop:'20%'}}>
              <p style={{fontWeight:700, fontSize:20, marginBottom:'5%'}}>Kraftman Consultants</p>
              <p className="history-heading">Welcome to our consultancy firm, where we specialize in providing comprehensive solutions for all your house designing and building needs. With our expertise in 3D house design and construction management, we take complete ownership of your project from start to finish, ensuring a seamless and hassle-free experience for you.</p>
            </div>
        </div>
      </div>
      </div>
  </>
  );
};

export default Login;
