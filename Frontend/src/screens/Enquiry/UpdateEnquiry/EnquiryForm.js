import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import {Image, Form, Button, NavLink} from 'react-bootstrap'


import { color } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { MenuItem, Switch } from "@mui/material";
import Box from '@mui/material/Box';
import SimpleBackdropCircular from "../SimpleBackdropCircular";
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as API from "../../../apiservice/Apiservice";
import { useNavigate } from "react-router-dom";
import moment from 'moment';


const EnquiryForm = (props) => {

let {enquiryid} = useParams()
  
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
  const [currentttglEnqRefNo, setCurrentTtglEnqRefNo] = useState(0)
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
    const [enquiryDetails, setEnquiryDetails] = useState([])
    const [customerDetails, setCustomerDetails] = useState([])
    const [updateButtonDisable, setUpdateButtonDisable] = useState(false)
    const [enquiryDeployedStatus, setenquiryDeployedStatus] = useState(false)
    const[isEnquiryProductsNull, setIsEnquiyProductsNull] = useState(false)
    function handler(e){
       setName(e.target.value)
    }

    const updateTtglEnqRefDate = (newValue) => {
      console.log("new value", newValue)
      let date = new Date(newValue)
      setEnquiryDetails({...enquiryDetails, ttgl_enq_ref_date:moment(date).format("YYYY/MM/DD")})
    // setttglEnqRefDate(moment(date).format("YYYY/MM/DD"));
    };

   

      // async function SubmitHandler(){
      //       console.log("submit handler is working...")
      //       setValidationApplyNewEnquiry(true)
      //       await createCustomer()
            

      // }
      
      async function createNewEnquiry(){
            console.log("create new enquiry is running...")
           
             console.log( revision, ttglEnqRefDate, name, deltBy, custEnqRefNo, customerId)
            if( enquiryDetails.revision==="" || enquiryDetails.ttglEnqRefDate==="" || enquiryDetails.name==="" || enquiryDetails.deltBy==="" || enquiryDetails.custEnqRefNo==="" ){
               console.log("error in create new enquiry null null values")  
           }
           else{
            console.log(enquiryDetails)
            if( !enquiryDetails.ttgl_enq_ref_date.match("^([0-9])+([.][0-9]+)?$") &&
             String(enquiryDetails.revision).match("^([0-9])+([.][0-9]+)?$") &&
              !enquiryDetails.name.match("^([0-9])+([.][0-9]+)?$") &&
               !enquiryDetails.delt_by.match("^([0-9])+([.][0-9]+)?$") &&
                String(enquiryDetails.cust_enq_ref_no).match("^([0-9])+([.][0-9]+)?$")){
                  setLoaderVisilbe(true)
                  API.createNewEnquiry( revision, ttglEnqRefDate, name, deltBy, custEnqRefNo)
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
            else{
                  console.log("error in create new enquiry regex values") 
                 
            }
           
           }
           }

      async function updateHandler(){
            console.log("update handler is working....")
            setValidationApply(true)
            setValidationApplyNewEnquiry(true)
            updateEnquiry()
            
      }

      async function cancelHandler(){
            console.log("cancel handler is working....")
            navigate('/pending-enquiry')
            
      }


      async function FetchDetails(){
            API.getEnquiryById(enquiryid).then((res) => {
                 
                if(res.status==200){
                 setUpdateEnquiryFormFileds(res.data.data);
                  console.log("get enquiry details", res)
                  if((res.data.data.products).length==0)
                  setIsEnquiyProductsNull(true)
                }

                 })
                 .catch((err) => {
                   console.log("get enquiry details got failed", err)
                  alert("Got error while loading enquiry details!!")
               })
      }

      async function updateEnquiry(){
            console.log("create customer is running...")
            if(enquiryDetails.revision==="" || enquiryDetails.ttglEnqRefDate==="" || enquiryDetails.name==="" || enquiryDetails.deltBy==="" || enquiryDetails.custEnqRefNo==="" || customerDetails.name==="" || customerDetails.email==="" || customerDetails.mobile==="" || customerDetails.address==="" || customerDetails.gst===""){
                  console.log("create customer has null")
                
            }
            else{
                  if(!customerDetails.name.match("^([0-9])+([.][0-9]+)?$") && customerDetails.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                  && !customerDetails.address.match("^([0-9])+([.][0-9]+)?$") && String(customerDetails.mobile).match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
                  && !customerDetails.gst.match("^([0-9])+([.][0-9]+)?$") &&!enquiryDetails.ttgl_enq_ref_date.match("^([0-9])+([.][0-9]+)?$") &&
                  String(enquiryDetails.revision).match("^([0-9])+([.][0-9]+)?$") &&
                   !enquiryDetails.name.match("^([0-9])+([.][0-9]+)?$") &&
                    !enquiryDetails.delt_by.match("^([0-9])+([.][0-9]+)?$") &&
                     String(enquiryDetails.cust_enq_ref_no).match("^([0-9])+([.][0-9]+)?$")){
                        setLoaderVisilbe(true)
                        API.updateCustomer(customerDetails.customer_id, customerDetails)
                        .then( async (res) => {
                         console.log("updateCustomer success", res)
                           
                             setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                             setTimeout(() => {  setDisableNewEnquiryField(true) }, 100);
                             setValidationApplyNewEnquiry(false)
                             if(res.status==200){
                              API.updateNewEnquiry(enquiryid, enquiryDetails)
                              .then( async (res) => {
                               console.log("update enquiry success", res)
                                 
                                   setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                                   setTimeout(() => {  setDisableNewEnquiryField(true) }, 100);
                                   setValidationApplyNewEnquiry(false)
                                   if(res.status==200){
                                    setUpdateButtonDisable(true)
                                    setTimeout(() => {  navigate('/pending-enquiry') }, 3000);
                                   }
                                   
                                   
                              })
                              .catch((err) => {
                                 alert("Update New customer error!!")
                                console.log("Update customer has error", err)
                                setDisableNewEnquiryField(false)
                            })
                             }
                             
                        })
                        .catch((err) => {
                           alert("Update New customer error!!")
                          console.log("Update customer has error", err)
                          setDisableNewEnquiryField(false)
                      })
                        
                  }
                  else{
                        console.log("create customer has error for regex")
                       
                  }       
            }
      }

      async function makeEnquiryStateReady(){
            console.log(" mak enquiry state ready is working...")
            let today = new Date()
            API.updateNewEnquiry(enquiryid, {status:"active", work_order_issue_date:today.toLocaleDateString()}).then((res)=>{
                  console.log(" here is the response:", res)
                  if(res.status==200){
                        setenquiryDeployedStatus(true)
                  }
                  
            })
            .catch((error)=>console.log("Here is the error", error))
      }
      
useEffect( () => {
    
         FetchDetails()
        
    }, []);    
              
        
    //  -------------------------------------------------------------------------------------
    const takeCustPoDateValue = (newValue) => {
        console.log("new value", newValue)
        let date = new Date(newValue)
        let data = {...updateEnquiyFormFields}
          data["custPoDate"] = moment(date).format("YYYY/MM/DD") 
          setUpdateEnquiryFormFileds(data);
      };
      const takeTtglEnqRefDateValue = (newValue) => {
        console.log("new value", newValue)
        let date = new Date(newValue)
        let data = {...updateEnquiyFormFields}
          data["ttglEnqRefDate"] = moment(date).format("YYYY/MM/DD") 
          setUpdateEnquiryFormFileds(data);
      };
    const[disableUpdateEnquiryField, setDisableUpdateEnquiryField] = useState(false)
    const[updateEnquiyFormFields, setUpdateEnquiryFormFileds] = useState({
        revision:'',
        ttglEnqRefDate:'2023/01/01',
        ttglEnqRefNo:'',
        deltBy:'',
        name:'',
        mobile:'',
        email:'',
        address:'',
        gst:'',
        paymentAdv:'',
        balBeforeDispatch:'',
        abg:'',
        pbg:'',
        warranty:'',
        shortCircuit:'No',
        lightImp:'No',
        heatRun:'No',
        specialTest:'No',
        routineTesting:'No',
        remark:'',
        custPoNo:'',
        custPoDate:'2023/01/01',
        frieghtAndInsurance:''
    })
    const handleUpdateEnquiryFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...updateEnquiyFormFields}
            data[event.target.name] = event.target.value; 
        setUpdateEnquiryFormFileds(data);
    } 

    const HandleUpdateEnquiry=()=>{
        console.log("update enquiry is working.....")
        API.updateNewEnquiry(enquiryid, updateEnquiyFormFields)
                              .then( async (res) => {
                               console.log("update enquiry success", res)
                                 
                                   setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                                   setTimeout(() => {  setDisableNewEnquiryField(true) }, 100);
                                   setValidationApplyNewEnquiry(false)
                                   if(res.status==200){
                                    setUpdateButtonDisable(true)
                                    setTimeout(() => {  navigate('/pending-enquiry') }, 1000);
                                   }
                              })
                              .catch((err) => {
                                 alert("Update New customer error!!")
                                console.log("Update customer has error", err)
                                setDisableNewEnquiryField(false)
                            })
    }



  return (
  <>
      <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
     
     {loaderVisible? <SimpleBackdropCircular/>:<></>}

     <div style={{margin:20}}>

     
     {/* <Switch {...label} /> */}
     <div className="row">
         <div className="col-11">
         <p style={{fontSize:24, fontWeight:700,}}>Update Enquiry</p>
         </div>
         <div className="col-1">
         <Switch disabled={isEnquiryProductsNull} checked={enquiryDeployedStatus} onClick={() => makeEnquiryStateReady()} value="active" inputProps={{ 'aria-label': 'secondary checkbox' }} />
         </div>
     </div>
      {/* -----------------------------form will be start from here------------------------ */}
         <div className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:10, marginLeft:0, marginRight:0, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20, paddingBottom:20}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Enquiry Basic Details :</p>
      
              {/* first row */}
             <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                       <TextField size='small' name='ttglEnqRefNo'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.ttglEnqRefNo} required  placeholder='120675' id="standard-read-only-input" defaultValue="127867" InputProps={{readOnly: true,}} label="ttgl Enq Ref No" variant="standard" style={{ fontSize:12, width:'90%', }} />
                 </div>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                       <TextField  size="small" name='revision'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.revision}   required placeholder='00' id="standard-basic" label="Revision" variant="standard" style={{fontSize:12, width:'90%'}}/>
                 </div>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{backgroundColor:'', paddingTop:0, marginBottom:-20}}>
                       <LocalizationProvider dateAdapter={AdapterDayjs} >
                             <DesktopDatePicker 
                                               label="Enq Ref Date"
                                               inputFormat="YYYY/MM/DD"
                                               name='ttglEnqRefDate'  disabled={disableUpdateEnquiryField} onChange={takeTtglEnqRefDateValue} value={updateEnquiyFormFields.ttglEnqRefDate}
                                                //  onChange={updateTtglEnqRefDate} id="standard-basic"
                                               renderInput={(params) => <TextField    variant="standard" required size='small' style={{width:'90%', fontSize:12}} id="standard-basic" {...params} />}
                             />
                       </LocalizationProvider>
                 </div>
             </div>
             {/* second row */}
             <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                 <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12' style={{marginRight:0}}>
                       <TextField size='small' name='name'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.name}  required  placeholder='LEENA POWERTECH ENGINEERS PVT. LTD.' id="standard-basic" label="Name" variant="standard" style={{ fontSize:12, width:'95%', }} />
                 </div>
                 <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                       <TextField size='small' name='deltBy'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.deltBy}  required placeholder='RS' id="standard-basic" label="Delt by" variant="standard" style={{fontSize:12, width:'92%'}}/>
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
                       <TextField size='small' name='email'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.email}  placeholder='name123@xxx.com' id="standard-basic" label="Email" variant="standard" style={{fontSize:12, width:'90%'}} />
                     
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                 <TextField size='small'  name='mobile'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.mobile}   placeholder='+91 9876543210' id="standard-basic" label="Mobile Number" variant="standard" style={{ fontSize:12, width:'95%', fontWeight:700}} />
                      
                 </div>
             </div>
             <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                 <TextField size='small' name='gst'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.gst}  placeholder='e.g. 1234-4567-0909' id="standard-basic" label="GST Number" variant="standard" style={{fontSize:12, width:'90%'}}/>
                    
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                 <TextField size='small' name='address'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.address}  placeholder='e.g. 27/2, Area, City' multiline id="standard-basic" label="Enter the Address" variant="standard" style={{ fontSize:12, width:'95%', fontWeight:700}} />
                   
                 </div>
             </div>
         </div>
     {/* -------------------------------enquiry finalized form------------------------------ */}
     <div  className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20}}>
            <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:0}}>Payment Terms / Guarantee / Warranty :</p>
                {/*First Row*/}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                        <FormControl variant="standard" sx={{  mt: 3 }}>
                            <InputLabel id="demo-select-small">Advanced Payment</InputLabel>
                                <Input 
                                    id="standard-adornment-weight"
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="standard-weight-helper-text"
                                    name='paymentAdv'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.paymentAdv}
                                    inputProps={{
                                    'aria-label': 'Advanced Payment',
                                    }} placeholder='50'/>
                        </FormControl>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                            <InputLabel id="demo-select-small">Balance Before Dispatch</InputLabel>
                              <Input 
                                id="standard-adornment-weight"
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                aria-describedby="standard-weight-helper-text"
                                name='balBeforeDispatch'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.balBeforeDispatch}
                                inputProps={{
                                'aria-label': 'Balance Before Dispatch',
                                }} placeholder='40'
                                 />
                        </FormControl>
                        
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <InputLabel id="demo-select-small">ABG</InputLabel>
                        <Input 
                            id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            name='abg' disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.abg}
                                    
                            inputProps={{
                            'aria-label': 'ABG',
                            }} placeholder='24'
                        />
                        </FormControl>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <InputLabel id="demo-select-small">PBG</InputLabel>
                        <Input 
                            id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            name='pbg' disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.pbg}
                                    
                            inputProps={{
                            'aria-label': 'PBG',
                            }} placeholder='50'
                        />
                        </FormControl>
                
                    </div>
                </div>
                {/*Second row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }} >
                    <InputLabel id="demo-select-small">Warantee</InputLabel>
                        <Input
                            id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">Monthly</InputAdornment>}
                            name='warranty'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.warranty}
                                    
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                            'aria-label': 'Warantee',
                            }} placeholder='36'
                        />
                        </FormControl>   
                    </div>
                </div>

            <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:20}}>Testing Conditions :</p>
                {/*Third row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-select-currency" name='shortCircuit'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.shortCircuit}
                                     select label="Short Circuit:" defaultValue="No" variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                                
                            </TextField>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                            <TextField id="standard-select-currency" name='lightImp'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.lightImp}
                                      select label="Light Imp." defaultValue="No"  variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                            </TextField>   
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-select-currency" name='heatRun'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.heatRun}
                                     select label="Heat Run" defaultValue="No"  variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                            </TextField>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                            <TextField id="standard-select-currency"  name='specialTest'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.specialTest}
                                     select label="Sepcial Test" defaultValue="No"  variant="standard">
                            <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                            </TextField>
                    </div>
                </div>
                {/* Fourth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-select-currency" name='routineTesting'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.routineTesting}
                                     select label="Routine Testing" defaultValue="No"  variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                                
                            </TextField>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginTop:3}}>
                    <TextField size='small' name='remark'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.remark}
                                     placeholder='Cable Box' id="standard-basic" label="Remark" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                    
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        
                    </div>
                </div>  

            <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:0}}>Accomplish Information :</p>
                {/* Fifth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                        <TextField size='small' name='custPoNo'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.custPoNo}
                                      required placeholder='PO/TS/XER/127' id="standard-basic" label="Customer PO Number" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker 
                                            label="Customer PO Date"
                                            inputFormat="YYYY/MM/DD"
                                            disabled={disableUpdateEnquiryField}
                                            value={updateEnquiyFormFields.custPoDate}
                                            onChange={takeCustPoDateValue} id="standard-basic"
                                            renderInput={(params) => <TextField variant='standard' required size='small' style={{width:'90%'}} id="standard-basic" {...params} />}
                            />
                           </LocalizationProvider>
                    </div>
                    
                </div>
                {/* Sixth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:40  }}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                        <TextField size='small' name='frieghtAndInsurance'  disabled={disableUpdateEnquiryField} onChange={event => handleUpdateEnquiryFormChange(event)} value={updateEnquiyFormFields.frieghtAndInsurance}
                                     placeholder='Acceptable' id="standard-basic" label="Frieght & Insurance" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                   
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        
                    </div>
                    
                </div>

       </div>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
       {/*  old will start---------------------  */}
     {/* <div className='row' style={{height:300, float:'right', backgroundColor:'', margin:0, padding:0, marginTop:10,marginLeft:0, marginRight:0, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20}}>
     <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Customer Basic Details :</p>
      
            <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                      
                    
                       <TextField size='small'  value={customerDetails.name} onChange={(e)=>{setCustomerDetails({...customerDetails, name:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (customerDetails.name === "" || customerDetails.name.match("^([0-9])+([.][0-9]+)?$") ) : '' } helperText={validationApplyNewEnquiry ? (customerDetails.name === "" ? 'Customer Name Cannot be Empty!' : ' ' && !customerDetails.name.match("^[0-9]+([.][0-9]+)?$") ? '':'Customer Name Should not be Number!'):''} placeholder='Mr. John Smith' id="standard-basic" label="Customer Name" variant="standard" defaultValue="d" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                       <TextField size='small' value={customerDetails.email} onChange={(e)=>{setCustomerDetails({...customerDetails, email:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (customerDetails.email === "" || !customerDetails.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) : '' } helperText={validationApplyNewEnquiry ? (customerDetails.email === "" ? 'Email Cannot be Empty!' : ' ' && !customerDetails.email.match("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/") ? '':'Email Should not be Number!'):''}  placeholder='name123@xxx.com' id="standard-basic" label="Email" defaultValue="d" variant="standard" style={{fontSize:12, width:'90%'}} />
                 </div>
             </div>
             <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                       <TextField size='small' value={customerDetails.mobile}   onChange={(e)=>{setCustomerDetails({...customerDetails, mobile:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (customerDetails.mobile === "" || !String(customerDetails.mobile).match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) : '' } helperText={validationApplyNewEnquiry ? (customerDetails.mobile === "" ? 'Mobile Cannot be Empty!' : ' ' && String(customerDetails.mobile).match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '':'Mobile Should be 10 digit!'):''}  placeholder='+91 9876543210' id="standard-basic" label="Mobile Number" variant="standard" defaultValue="d" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                       <TextField size='small' value={customerDetails.gst}  onChange={(e)=>{setCustomerDetails({...customerDetails, gst:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (customerDetails.gst === "" || gst.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (customerDetails.gst === "" ? 'GST Cannot be Empty!' : ' ' && !customerDetails.gst.match("^[0-9]+([.][0-9]+)?$") ? '':'GST Should be Number!'):''} placeholder='e.g. 1234-4567-0909' id="standard-basic" label="GST Number" variant="standard" defaultValue="d" style={{fontSize:12, width:'90%'}}/>
                 </div>
             </div>

             <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                       <TextField size='small' value={customerDetails.address} onChange={(e)=>{setCustomerDetails({...customerDetails, address:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (customerDetails.address === "" || customerDetails.address.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (customerDetails.address === "" ? 'Address Cannot be Empty!' : ' ' && !customerDetails.address.match("^[0-9]+([.][0-9]+)?$") ? '':'Address Should not be Number!'):''}  placeholder='e.g. 27/2, Area, City' multiline id="standard-basic" label="Enter the Address" variant="standard" defaultValue="d" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                 </div>
                 <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                       <TextField size='small' placeholder='Enter the name' id="standard-basic" label="Email" variant="standard" style={{fontSize:12, width:'100%'}}/>
                 
                 </div>
             </div>
     </div>
     <div className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:10, marginLeft:0, marginRight:0, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20, paddingBottom:20}}>
            
              <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Enquiry Basic Details :</p>
        
             
               <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                   <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                         <TextField size='small'  value={enquiryDetails.ttgl_enq_ref_no} onChange={(e)=>{setEnquiryDetails({...enquiryDetails, ttgl_enq_ref_no:e.target.value})}} disabled={disableNewEnquiryField}  required  placeholder='120675' id="standard-read-only-input" defaultValue="127867" InputProps={{readOnly: true,}} label="ttgl Enq Ref No" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                   </div>
                   <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                         <TextField  size="small" value={enquiryDetails.revision} onChange={(e)=>{setEnquiryDetails({...enquiryDetails, revision:e.target.value})}} disabled={disableNewEnquiryField}  error={validationApplyNewEnquiry ? (enquiryDetails.revision === "" || !String(enquiryDetails.revision).match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApply ? (enquiryDetails.revision === "" ? 'Revision Cannot be Empty!' : ' ' && String(enquiryDetails.revision).match("^[0-9]+([.][0-9]+)?$") ? '':'Revision Should be Number!'):''} required placeholder='00' defaultValue="hello" id="standard-basic" label="Revision" variant="standard" style={{fontSize:12, width:'90%'}}/>
                   </div>
                   <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{backgroundColor:'', paddingTop:0}}>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                               <DesktopDatePicker 
                                                 label="Enq Ref Date"
                                                 inputFormat="YYYY/MM/DD"
                                                 disabled={disableNewEnquiryField}
                                                 value={enquiryDetails.ttgl_enq_ref_date}
                                                 onChange={updateTtglEnqRefDate} id="standard-basic"
                                                 renderInput={(params) => <TextField   error={validationApplyNewEnquiry ? ttglEnqRefDate === "" : ""} helperText={validationApplyNewEnquiry ? ttglEnqRefDate === "" ? 'Enq Ref Date Cannot be Empty!' : ' ' : " "} variant="standard" required size='small' style={{width:'90%'}}  id="standard-basic" {...params} />}
                               />
                         </LocalizationProvider>
                   </div>
               </div>
               <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                   <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12' style={{marginRight:0}}>
                         <TextField size='small' value={enquiryDetails.name} onChange={(e)=>{setEnquiryDetails({...enquiryDetails, name:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (enquiryDetails.name === "" || enquiryDetails.name.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (enquiryDetails.name === "" ? 'Name Cannot be Empty!' : ' ' && !enquiryDetails.name.match("^[0-9]+([.][0-9]+)?$") ? '':'Name Should not be number!'):''} required  placeholder='LEENA POWERTECH ENGINEERS PVT. LTD.' id="standard-basic" label="Name" variant="standard" defaultValue="d" style={{ fontSize:12, width:'95%', }} />
                   </div>
                   <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                         <TextField size='small' value={enquiryDetails.delt_by} onChange={(e)=>{setEnquiryDetails({...enquiryDetails, delt_by:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (enquiryDetails.delt_by === "" || enquiryDetails.delt_by.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (enquiryDetails.delt_by === "" ? 'Delt By Cannot be Empty!' : ' ' && !enquiryDetails.delt_by.match("^[0-9]+([.][0-9]+)?$") ? '':'Delt By Should not be number!'):''} required placeholder='RS' id="standard-basic" label="Delt by" variant="standard" defaultValue="d" style={{fontSize:12, width:'92%'}}/>
                   </div>
                   
               </div>
              
               <div className='row' style={{backgroundColor:'', margin:0, padding:0, }}>
                  
                   <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                         <TextField size='small' value={enquiryDetails.cust_enq_ref_no} onChange={(e)=>{setEnquiryDetails({...enquiryDetails, cust_enq_ref_no:e.target.value})}} disabled={disableNewEnquiryField} error={validationApplyNewEnquiry ? (enquiryDetails.cust_enq_ref_no === "" || !String(enquiryDetails.cust_enq_ref_no).match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApplyNewEnquiry ? (enquiryDetails.cust_enq_ref_no === "" ? 'Cannot be Empty!' : ' ' && String(enquiryDetails.cust_enq_ref_no).match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!'):''}  required placeholder='128976' id="standard-basic" label="Cust Enq Ref No" defaultValue="d" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                   </div>
               </div>
               
               
              
              
     </div> */}


     <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
     <Button disabled={updateButtonDisable} onClick={()=>cancelHandler()} style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
     <Button disabled={updateButtonDisable} onClick={()=>HandleUpdateEnquiry()} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Update</Button>
                          
     </div>

     </div>
    
 </Box>
  </>
  );
};

export default EnquiryForm;
