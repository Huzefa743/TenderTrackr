import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import {Image, Form, Button, NavLink} from 'react-bootstrap'


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
import { MenuItem } from "@mui/material";
import Box from '@mui/material/Box';
import SimpleBackdropCircular from "../SimpleBackdropCircular";
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as API from "../../../apiservice/Apiservice";
import { useNavigate } from "react-router-dom";
import moment from 'moment';


const CreateNewEnquiry = () => {
  
      const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loaderVisible, setLoaderVisilbe] = useState(false)
  //   Customer details input feilds
  const [customerName, setCustomerName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [mobile, setMobile] = useState("")
  const [gst, setGST] = useState("")
  const [disableNewEnquiryField, setDisableNewEnquiryField] = useState(false)
  const [validationApplyNewEnquiry, setValidationApplyNewEnquiry] = useState(false)
  const [newTtglEnqRefNo, setNewTtglEnqRefNo] = useState(0)
    //receipt register input fields
    const [ttglEnqRefNo, setttglEnqRefNo] = useState(2)
    const [revision, setrevision] = useState("")
    const [ttglEnqRefDate, setttglEnqRefDate] = useState("2023/01/01")
    const [customerId, setCustomerId] = useState("")
    const [deltBy, setdeltBy] = useState("")
    const [name, setName] = useState("")
    const [custEnqRefNo, setcustEnqRefNo] = useState("")
    const [specification, setspecification] = useState("")
    const [nameOfItem, setnameOfItem] = useState("")
    const [ratingKva, setratingKva] = useState("")
    const [level, setlevel] = useState("L1")
    const [voltageRatingPr, setvoltageRatingPr] = useState("")
    const [voltageRatingSec, setvoltageRatingSec] = useState("")
    const [losses100, setlosses100] = useState("")
    const [losses50, setlosses50] = useState("")
    const [loadLosses, setLoadLosses] = useState("")
    const [noLoadLosses, setNoLoadLosses] = useState("")
    const [loadSelect, setLoadSelect] = useState("first")
    const [notSelectDisable, setNotSelectDisable] = useState(false)
    const [qtyQtd, setqtyQtd] = useState("")
    const [quotedEstimate, setquotedEstimate] = useState("")
    const [validationApply, setValidationApply] = useState(false)
    const [disableReceiptField, setDisableReceiptField] = useState(false)
    const [handlerButtonDisable, setHandlerButtondisable] =useState(false)


    const takeTtglEnqRefDateValue = (newValue) => {
      console.log("new value", newValue)
      let date = new Date(newValue)
     setttglEnqRefDate(moment(date).format("YYYY/MM/DD"));
    };

     async function createCustomer(){
            console.log("create customer is running...")
            
                        setLoaderVisilbe(true)
                        API.createCustomer(customerName, email, address, mobile, gst)
                        .then( async (res) => {
                         console.log("here is response for customer", res)
                           
                             setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                             setTimeout(() => {  setDisableNewEnquiryField(true) }, 100);
                             setValidationApplyNewEnquiry(false)
                             setCustomerId(res.data.data.customer_id)
                             console.log("here custgomer id",res.data.data.customer_id)
                             await createNewEnquiry(res.data.data.customer_id)
                        })
                        .catch((err) => {
                           alert("Create New enquiy error!!")
                          console.log("ehre is cutomer error", err)
                          setDisableNewEnquiryField(false)
                      })
                        
                       
            
      }

      async function SubmitHandler(){
            console.log("submit handler is working...")
            setValidationApplyNewEnquiry(true)
            await createNewEnquiry()
            

      }
      
      async function createNewEnquiry(){
            console.log("create new enquiry is running...")
           
             console.log(newTtglEnqRefNo, email, mobile, address, gst,  revision, ttglEnqRefDate, name, deltBy, custEnqRefNo, customerId)
            if(newTtglEnqRefNo==="")  {
                  console.log("Error in ttgl_enq_ref_no, it null !!")
                  alert("Enq no can't be null!!")
           }
           else{
                setLoaderVisilbe(true)
                  API.createNewEnquiry(newTtglEnqRefNo, email, mobile, address, gst, revision, ttglEnqRefDate, name, deltBy, custEnqRefNo)
                  .then((res) => {
                   console.log("here is response for create new enquriy", res)
                  
                   setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                   setTimeout(() => {  setDisableNewEnquiryField(true) }, 100);
                   setValidationApplyNewEnquiry(false)
                   setHandlerButtondisable(true)
                   setTimeout(() => {  navigate('/pending-enquiry') }, 3000);
                   
                   
                  })
                  .catch((err) => {
                     
                      console.log("ehre is new enqyriy error", err)
                })
            
           
           
           }
           }
      
           useEffect(() => {
            API.getNewTtglEnqRefNo().then((res) => {
                  console.log("ge new enquiry is working..")
                  setNewTtglEnqRefNo(res.data.newttglEnqRefNo);
                  console.log(res.data.newttglEnqRefNo)
                 })
                 .catch((err) => {
                   console.log("fetch new ttglenqref no got error", err)
               })
          
          }, []);         
              
        
        
      


  return (
  <>
      <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
     
     {loaderVisible? <SimpleBackdropCircular/>:<></>}

     <div style={{margin:20}}>

     

     <p style={{fontSize:24, fontWeight:700,}}>Create New Enquiry</p>
      {/* Receipt register form */}
      <div className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:10, marginLeft:0, marginRight:0, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20, paddingBottom:20}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Enquiry Basic Details :</p>
      
              {/* first row */}
             <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                       <TextField size='small' value={newTtglEnqRefNo} onChange={(e) => {setttglEnqRefNo(e.target.value)}} disabled={disableNewEnquiryField}  required  placeholder='120675' id="standard-read-only-input" defaultValue="127867" InputProps={{readOnly: true,}} label="ttgl Enq Ref No" variant="standard" style={{ fontSize:12, width:'90%', }} />
                 </div>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                       <TextField  size="small" onChange={(e) => {setrevision(e.target.value) } } disabled={disableNewEnquiryField}  error={validationApplyNewEnquiry ? (revision === "" || !revision.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApply ? (revision === "" ? 'Revision Cannot be Empty!' : ' ' && revision.match("^[0-9]+([.][0-9]+)?$") ? '':'Revision Should be Number!'):''} required placeholder='00' id="standard-basic" label="Revision" variant="standard" style={{fontSize:12, width:'90%'}}/>
                 </div>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{backgroundColor:'', paddingTop:0, marginBottom:-20}}>
                       <LocalizationProvider dateAdapter={AdapterDayjs} >
                             <DesktopDatePicker 
                                               label="Enq Ref Date"
                                               inputFormat="YYYY/MM/DD"
                                               disabled={disableNewEnquiryField}
                                               value={ttglEnqRefDate}
                                               onChange={takeTtglEnqRefDateValue} id="standard-basic"
                                               renderInput={(params) => <TextField   error={validationApplyNewEnquiry ? ttglEnqRefDate === "" : ""} helperText={validationApplyNewEnquiry ? ttglEnqRefDate === "" ? 'Enq Ref Date Cannot be Empty!' : ' ' : " "} variant="standard" required size='small' style={{width:'90%', fontSize:12}} id="standard-basic" {...params} />}
                             />
                       </LocalizationProvider>
                 </div>
             </div>
             {/* second row */}
             <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                 <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12' style={{marginRight:0}}>
                       <TextField size='small' onChange={(e) => {setName(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (name === "" || name.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (name === "" ? 'Name Cannot be Empty!' : ' ' && !name.match("^[0-9]+([.][0-9]+)?$") ? '':'Name Should not be number!'):''} required  placeholder='LEENA POWERTECH ENGINEERS PVT. LTD.' id="standard-basic" label="Name" variant="standard" style={{ fontSize:12, width:'95%', }} />
                 </div>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                       <TextField size='small' onChange={(e) => {setdeltBy(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (deltBy === "" || deltBy.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (deltBy === "" ? 'Delt By Cannot be Empty!' : ' ' && !deltBy.match("^[0-9]+([.][0-9]+)?$") ? '':'Delt By Should not be number!'):''} required placeholder='RS' id="standard-basic" label="Delt by" variant="standard" style={{fontSize:12, width:'92%'}}/>
                 </div>
                 
             </div>
            
             {/* third row */}
             <div className='row' style={{backgroundColor:'', margin:0, padding:0, }}>
                
                 <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                       {/* <TextField size='small' onChange={(e) => {setcustEnqRefNo(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (custEnqRefNo === "" || !custEnqRefNo.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (custEnqRefNo === "" ? 'Cannot be Empty!' : ' ' && custEnqRefNo.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!'):''}  required placeholder='128976' id="standard-basic" label="Cust Enq Ref No" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} /> */}
                 </div>
             </div>
             <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                       {/* <TextField size='small'  autoComplete="email" autoFocus onChange={(e) => {setCustomerName(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (customerName === "" || customerName.match("^([0-9])+([.][0-9]+)?$") ) : '' } helperText={validationApplyNewEnquiry ? (customerName === "" ? 'Customer Name Cannot be Empty!' : ' ' && !customerName.match("^[0-9]+([.][0-9]+)?$") ? '':'Customer Name Should not be Number!'):''} placeholder='Mr. John Smith' id="standard-basic" label="Customer Name" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} /> */}
                       <TextField size='small' onChange={(e) => {setEmail(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (email === "" || !email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) : '' } helperText={validationApplyNewEnquiry ? (email === "" ? 'Email Cannot be Empty!' : ' ' && !email.match("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/") ? '':'Email Should not be Number!'):''}  placeholder='name123@xxx.com' id="standard-basic" label="Email" variant="standard" style={{fontSize:12, width:'90%'}} />
                     
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                 <TextField size='small'   onChange={(e) => {setMobile(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (mobile === "" || !mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) : '' } helperText={validationApplyNewEnquiry ? (mobile === "" ? 'Mobile Cannot be Empty!' : ' ' && mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '':'Mobile Should be Number!'):''}  placeholder='+91 9876543210' id="standard-basic" label="Mobile Number" variant="standard" style={{ fontSize:12, width:'95%', fontWeight:700}} />
                      
                 </div>
             </div>
             <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                 <TextField size='small'  onChange={(e) => {setGST(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (gst === "" || gst.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (gst === "" ? 'GST Cannot be Empty!' : ' ' && !gst.match("^[0-9]+([.][0-9]+)?$") ? '':'GST Should be Number!'):''} placeholder='e.g. 1234-4567-0909' id="standard-basic" label="GST Number" variant="standard" style={{fontSize:12, width:'90%'}}/>
                    
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                 <TextField size='small' onChange={(e) => {setAddress(e.target.value)}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (address === "" || address.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (address === "" ? 'Address Cannot be Empty!' : ' ' && !address.match("^[0-9]+([.][0-9]+)?$") ? '':'Address Should not be Number!'):''}  placeholder='e.g. 27/2, Area, City' multiline id="standard-basic" label="Enter the Address" variant="standard" style={{ fontSize:12, width:'95%', fontWeight:700}} />
                   
                 </div>
             </div>
             
             
            
            
   </div>
 
     

     <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
     <Button disabled={handlerButtonDisable}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
     <Button disabled={handlerButtonDisable} onClick={()=>SubmitHandler()} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Create</Button>
                          
     </div>

     </div>
    
 </Box>
  </>
  );
};

export default CreateNewEnquiry;
