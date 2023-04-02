import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import {  Form, Table } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import StepLabel from '@mui/material/StepLabel';
import ButtonSpinner from '../Spinner';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Radio, RadioGroup, Select, Switch, Toolbar } from '@mui/material';

import * as API from "../../../apiservice/Apiservice";
import { useForm } from "react-hook-form"
import { FaClosedCaptioning } from 'react-icons/fa';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import RemoveProductFromSopModal from './RemoveProductFromSopModal';
import SimpleBackdropCircular from '../SimpleBackdropCircular';

const steps = ['Receipt Register', 'Post Contract Review', 'Work Order Register'];

export default function SopForm() {


  const [expanded, setExpanded] = React.useState('');
  const[enquiryList, setEnquiryList] = useState([])
  const[productDetails, setProductDetails]=useState({})
  const[productIndex, setProductIndex] = useState(0)
  const[removeProductModalShow, setRemoveProductModalShow] = useState(false)
  const[productIdToBeRemove, setProductIdToBeRemove] = useState()
  const[sopListDetails, setSopListDetails]= useState([])
  const[loaderVisible, setLoaderVisible] = useState(false)
  const[productIdToBeAdd, setProductIdToBeAdd]=useState()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // product details dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [openProductDetails, setOpenProductDetails] = useState(false);

  async function fetchProductDetils(productId){
    API.getProductById(productId).then((res) => {
      setProductDetails(res.data.data);
      
       console.log("produt details  s ", productDetails)
     
    });
  }

  const handleClickOpenProductDetails = async (productId, index) => {
    await fetchProductDetils(productId)
    setProductIndex(index)
    setOpenProductDetails(true);
  };

  const handleCloseProductDetails = () => {
    setOpenProductDetails(false);

  };

  //product detials dialog end

  //add to sop dialog start
  const [openAddToSop, setOpenAddToSop] = useState(false);
  
  const handleClickOpenAddToSop = () => {
    setOpenAddToSop(true);
  };

  const handleCloseAddToSop = () => {
    setOpenAddToSop(false);
  };
  //add to sop dialog closes

  //Service for product add to SOP
  const[disableProductSopField, setdisableProductSopField] = useState(false)
  const [sopProductFormFields, setSopProductFormFileds] = useState({
    productId:'',
    sopNo:'New',
    sopQtyAlCons:'',
    qtyRecd:'',
    projSalesQty:'',
    balQty:'',
    sopRemarks:'',
    sopPeriodFrom:'2023/01/01',
    sopPeriodTo:'2023/01/01',

})

async function confirmationForRemoveProduct(productId){
   setProductIdToBeRemove(productId)
   setRemoveProductModalShow(true)
}
async function createSopFormVisible(productId){
 
  let data = {...sopProductFormFields}
  data["productId"] = productId
  setSopProductFormFileds(data);
  setOpenAddToSop(true)
}


// remove prodct from sop
async function removeProductFromSOP(){
    API.removeProductFromSOP(productIdToBeRemove)
    .then((res) => {
      if(res.status==200){
        fetchEnquiry()
        console.log("remove Product success", res)
        setRemoveProductModalShow(false)
      }
    
    })
    .catch((err) => {
      console.log("remove product from sop failed!! ", err)
  })
    
}

//end for remove product from sop


const handleSopProductFormChange= (event)=>{
    console.log( event.target.name)
    let data = {...sopProductFormFields}
        data[event.target.name] = event.target.value; 
    setSopProductFormFileds(data);
}

const takeSopPeriodFrom = (newValue) => {
  console.log("sop period from value", newValue)
  let date = new Date(newValue)
  let data = {...sopProductFormFields}
  data["sopPeriodFrom"] = moment(date).format("YYYY/MM/DD") 
  setSopProductFormFileds(data);
};
const takeSopPeriodTo = (newValue) => {
  console.log("sop period from value", newValue)
  let date = new Date(newValue)
  let data = {...sopProductFormFields}
  data["sopPeriodTo"] = moment(date).format("YYYY/MM/DD") 
  setSopProductFormFileds(data);
};

function fetchEnquiry(){
  API.getAllDeployedEnquiry(1, 5).then((res) => {
    setEnquiryList(res.data.data);
    
     console.log("enquiry list s ", enquiryList)
   
  });
}

function fetchSopList(){
  API.getAllPendingAndActiveSop().then((res) => {
    setSopListDetails(res.data.data);
     console.log("sop list details list s ", sopListDetails)
   
  });
}

const createOrUpdateSop=()=>{
    console.log("create or update sop is working...")
     console.log(sopProductFormFields)
     setLoaderVisible(true)
    API.createOrUpdateSop(sopProductFormFields)
    .then(async(res) => {
     console.log("here is create or update sop details ", res)
     if(res.status==200){
        
        setLoaderVisible(false)
       // setdisableProductSopField(true)
       let data = {...sopProductFormFields}
       data["productId"] = ''
       data["sopNo"] = 'New'
       data["sopQtyAlCons"] = ''
       data["qtyRecd"] = ''
       data["projSalesQty"] = ''
       data["balQty"] = ''
       data["sopRemarks"] = ''
       data["sopPeriodFrom"] = '2023/01/01'
       data["sopPeriodTo"] = '2023/01/01'
      
       setSopProductFormFileds(data);
       setOpenAddToSop(true)
        setOpenAddToSop(false)

        fetchEnquiry()
        fetchSopList()
     }
    
    })
    .catch((err) => {
        setTimeout(() => {  setLoaderVisible(false) }, 2000);
       
        alert("sop not able to create!!")
        console.log("here is the sop create failer stats!! ", err)
  })
    
 }


  useEffect(() => {
     fetchEnquiry()
     fetchSopList()

  }, []);

  return (
    <>

{loaderVisible? <SimpleBackdropCircular/>:<></>}

     {enquiryList.map((enquiryDetail)=>(

       <Accordion style={{ marginBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
       <AccordionSummary style={{ backgroundColor: '#bfbfbf', }}
         expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1a-content"
         id="panel1a-header">
         <Typography style={{ color: 'black', fontWeight: 600, width: '100%' }}>

           <div className='row' style={{ marginLeft: 0, width: '100%', backgroundColor: '', marginBottom: 0 }}>
             <div className='col-6'>
               <p style={{ color: 'gray', fontWeight: 500, margin: 'auto' }}> Enquiry No :  <span style={{ color: 'black' }}>{enquiryDetail.ttgl_enq_ref_no}</span></p>
             </div>
             <div className='col-6'>
               <p style={{ color: 'gray', fontWeight: 500, margin: 0 }}>Name : <span style={{ color: 'black' }}>{enquiryDetail.name}</span></p>
             </div>
           </div>

         </Typography>
       </AccordionSummary>
       <AccordionDetails>
         <Typography>
           {/* first */}
           <Accordion style={{ marginBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
             <AccordionSummary style={{ backgroundColor: '#f2f2f2', }}
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1a-content"
               id="panel1a-header">
               <Typography style={{ color: 'black', fontWeight: 600, color: 'gray', width: '100%' }}>
                 Enquiry Details
               </Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Typography style={{paddingBottom:20}}>


                 {/* Enquiry basic */}
                 <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Enquiry Basic Details :</p>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Enq Ref Date : </span><span style={{ color: 'gray' }}>{enquiryDetail.ttgl_enq_ref_date}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }} >Revision : </span><span style={{ color: 'gray' }}>{enquiryDetail.revision}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Delt By : </span><span style={{ color: 'gray' }}>{enquiryDetail.delt_by}</span>
                   </div>
                 </div>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Email : </span><span style={{ color: 'gray' }}>{enquiryDetail.email}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Mobile No. : </span><span style={{ color: 'gray' }}>{enquiryDetail.mobile}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>GST No. : </span><span style={{ color: 'gray' }}>{enquiryDetail.gst}</span>
                   </div>
                 </div>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Address : </span><span style={{ color: 'gray' }}>{enquiryDetail.address}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>

                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>

                   </div>
                 </div>
                 {/* payment terms */}
                 <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Payment Terms / Gurantee/ Warranty</p>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Payment Adv. : </span><span style={{ color: 'gray' }}>{enquiryDetail.payment_adv}%</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Bal Before Dispatch : </span><span style={{ color: 'gray' }}>{enquiryDetail.bal_before_dispatch}%</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>abg : </span><span style={{ color: 'gray' }}>{enquiryDetail.abg}%</span>
                   </div>
                 </div>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>pbg : </span><span style={{ color: 'gray' }}>{enquiryDetail.pbg}%</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Warranty : </span><span style={{ color: 'gray' }}>{enquiryDetail.warranty} Month</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>

                   </div>
                 </div>
                 {/* Testing Conditions */}
                 <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Testing Condition</p>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Short Circuit : </span><span style={{ color: 'gray' }}>{enquiryDetail.short_circuit}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Light Imp. : </span><span style={{ color: 'gray' }}>{enquiryDetail.light_imp}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Heat Run : </span><span style={{ color: 'gray' }}>{enquiryDetail.heat_run}</span>
                   </div>
                 </div>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Special Test : </span><span style={{ color: 'gray' }}>{enquiryDetail.special_test}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Routine Testing. : </span><span style={{ color: 'gray' }}>{enquiryDetail.routine_testing}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Remark : </span><span style={{ color: 'gray' }}>{enquiryDetail.remark}</span>
                   </div>
                 </div>
                 {/* Accomplish Info */}
                 <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Accomplish Information</p>
                 <div className='row' style={{ paddingLeft: 20 }}>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Cust PO No. : </span><span style={{ color: 'gray' }}>{enquiryDetail.cust_po_no}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Cust Po Date : </span><span style={{ color: 'gray' }}>{enquiryDetail.cust_po_date}</span>
                   </div>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                     <span style={{ color: 'gray' }}>Fright & Insurance : </span><span style={{ color: 'gray' }}>{enquiryDetail.frieght_and_insurance}</span>
                   </div>
                 </div>

               </Typography>
             </AccordionDetails>
           </Accordion>
           {/* second */}
          
           <Table responsive="xl" bordered hover style={{ width: '100%', padding: 0, fontSize: 12, marginTop: 10 }} size="sm">
             <thead style={{ backgroundColor: '#f2f2f2', verticalAlign: 'top', textAlign: 'center' }}>
               <tr>
                 <th>P. No.</th>
                 <th>Specification</th>
                 <th>Name of Item</th>
                 <th>Rating Kva</th>
                 <th>Level</th>
                 <th>Qty Received</th>
                 <th>Po Rate</th>
                 <th>Details</th>
                 <th>Add to SOP</th>
                 <th>SOP NO.</th>
               </tr>
             </thead>
             <tbody style={{ verticalAlign: 'top', textAlign: 'center' }}>
             {enquiryDetail.products.map((productDetails, index)=>(
                 <tr>
                 <td>{index+1}</td>
                 <td>{productDetails.specification}</td>
                 <td>{productDetails.name_of_item}</td>
                 <td>{productDetails.rating_kva}</td>
                 <td>{productDetails.level}</td>
                 <td>{productDetails.qty_received}</td>
                 <td>{productDetails.po_rate} INR</td>
                 <td style={{ cursor: 'pointer' }}><IconButton onClick={()=>handleClickOpenProductDetails(productDetails.product_id, index+1)} aria-label="delete" color="primary"><DescriptionIcon /></IconButton></td>
                 <td ><Switch checked={productDetails.sop_status=="allocated"} inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={productDetails.sop_status=="allocated"?()=>confirmationForRemoveProduct(productDetails.product_id)  :()=>createSopFormVisible(productDetails.product_id)} color="success" /></td>
                 <td>{productDetails.sop_no}</td>
               </tr>
            ))}
              
               {/* <tr>
                 <td>2</td>
                 <td>10% Extra Lubricant</td>
                 <td>Suitable for Outdoor</td>
                 <td>300 KVA</td>
                 <td>L3</td>
                 <td>2</td>
                 <td>25000.00 INR</td>
                 <td style={{ cursor: 'pointer' }}><IconButton onClick={handleClickOpenProductDetails} aria-label="delete" color="primary"><DescriptionIcon /></IconButton></td>
                 <td ><Switch value="active" inputProps={{ 'aria-label': 'secondary checkbox' }} color="success" /></td>
                 <td >Null</td>
               </tr> */}




             </tbody>
           </Table>
         </Typography>
       </AccordionDetails>
     </Accordion>

     ))}
     

      {/* product details dialog start*/}
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
       
      </div>
      {/* product Details dialog close */}
      {/* Product add to sop start */}
      <Dialog open={openAddToSop} onClose={handleCloseAddToSop}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill below details to add this prouct in SOP.
          </DialogContentText>
          <div className='row' style={{marginTop:20}}>
            <div className='col-12'>
            <TextField id="standard-select-currency" autoFocus name='sopNo'  disabled={disableProductSopField} onChange={event => handleSopProductFormChange(event)} value={sopProductFormFields.sopNo} select label="SOP No" variant="standard" fullWidth  
          //   SelectProps={{
          //   renderValue: (value) => value
          // }}
          >      
                  <MenuItem value="New">New</MenuItem>   
                 
                                                    
                  {sopListDetails.map((sopDetails)=>(
                      <MenuItem value={sopDetails.sop_no} >{sopDetails.sop_no} Period : {sopDetails.sop_period_from}-{sopDetails.sop_period_to}</MenuItem>   
                  ))}
                                    </TextField>
            </div>
          </div>
         
          <div className='row'>
            <div className='col-6'>
            <TextField margin="dense" name='sopQtyAlCons'  disabled={disableProductSopField} onChange={event => handleSopProductFormChange(event)} value={sopProductFormFields.sopQtyAlCons}id="name" label="SOP Qty Al Cons" type="number" fullWidth variant="standard"/>
            </div>
            <div className='col-6'>
            <TextField margin="dense" name='qtyRecd'  disabled={disableProductSopField} onChange={event => handleSopProductFormChange(event)} value={sopProductFormFields.qtyRecd} id="name" label="Qty Recd" type="number" fullWidth variant="standard"/>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
            <TextField  margin="dense" name='projSalesQty'  disabled={disableProductSopField} onChange={event => handleSopProductFormChange(event)} value={sopProductFormFields.projSalesQty} id="name" label="Proj Sale Qty" type="number" fullWidth variant="standard"/>
            </div>
            <div className='col-6'>
            <TextField  margin="dense" name='balQty'  disabled={disableProductSopField} onChange={event => handleSopProductFormChange(event)} value={sopProductFormFields.balQty} id="name" label="Bal Qty" type="number" fullWidth variant="standard"/>
            </div>
          </div>
         
          <div className='row' style={{marginTop:10}}>
            <div className='col-6'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                             <DesktopDatePicker 
                                               label="Sop Period From"
                                               inputFormat="YYYY/MM/DD"
                                               name='sopPeriodFrom'  disabled={disableProductSopField} onChange={takeSopPeriodFrom} value={sopProductFormFields.sopPeriodFrom}
                                                //  onChange={updateTtglEnqRefDate} id="standard-basic"
                                               renderInput={(params) => <TextField    variant="standard" required size='small' fullWidth id="standard-basic" {...params} />}
                             />
                       </LocalizationProvider>
            </div>
            <div className='col-6'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                             <DesktopDatePicker 
                                               label="Sop Period To"
                                               inputFormat="YYYY/MM/DD"
                                               name='sopPeriodFrom'  disabled={disableProductSopField} onChange={takeSopPeriodTo} value={sopProductFormFields.sopPeriodTo}
                                                //  onChange={updateTtglEnqRefDate} id="standard-basic"
                                               renderInput={(params) => <TextField    variant="standard" required size='small' fullWidth id="standard-basic" {...params} />}
                             />
                       </LocalizationProvider>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
            <TextField margin="dense" name='sopRemarks'  disabled={disableProductSopField} onChange={event => handleSopProductFormChange(event)} value={sopProductFormFields.sopRemarks} id="name" label="Remark" type="text" multiline fullWidth variant="standard"/>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleCloseAddToSop}>Cancel</Button>
          <Button  variant="contained" color="primary" onClick={()=>createOrUpdateSop()}>Add Product</Button>
        </DialogActions>
      </Dialog>
      {/* Product add to sop closed */}

      <RemoveProductFromSopModal show={removeProductModalShow} onHide={() =>{setRemoveProductModalShow(false)}} onAction={()=>{removeProductFromSOP()}}/>  
                  

      <Dialog
          fullScreen
          open={openProductDetails}
          onClose={handleCloseProductDetails}
          TransitionComponent={Transition}
        hidden={!openProductDetails}
        disableScrollLock
        >
          <AppBar sx={{ position: '' }}>
            <Toolbar>

              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Product Details : {productIndex}
              </Typography>
              {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseProductDetails}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ marginLeft: 40, paddingTop: 80 }}>


            <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Basic Details :</p>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Specification : </span><span style={{ color: 'gray' }}> {productDetails.specification}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Name of Item : </span><span style={{ color: 'gray' }}>{productDetails.nameOfItem}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Rating KVA : </span><span style={{ color: 'gray' }}> {productDetails.ratingKva} {productDetails.ratingKvaUnit}</span>
              </div>
            </div>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Voltage Rating Pr : </span><span style={{ color: 'gray' }}> {productDetails.voltageRatingPr} KV</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Voltage Rating Sec : </span><span style={{ color: 'gray' }}>{productDetails.voltageRatingSec} KV</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Level   : </span><span style={{ color: 'gray' }}> {productDetails.level}</span>
              </div>
            </div>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Qty Qtd : </span><span style={{ color: 'gray' }}> {productDetails.qtyQtd}</span>
              </div>
              {/* <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Quoted Estimate(INR) : </span><span style={{ color: 'gray' }}>{productDetails.quotedEstimate} INR</span>
              </div> */}
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              </div>
            </div>
            {/* load */}
            <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Load Details :</p>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Losses50 : </span><span style={{ color: 'gray' }}>{productDetails.losses50} {productDetails.losses50Unit}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Losses100 : </span><span style={{ color: 'gray' }}>{productDetails.losses100} {productDetails.losses100Unit}</span>
              </div>
            </div>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>No Load Losess : </span><span style={{ color: 'gray' }}>{productDetails.noLoadLosses} {productDetails.noLoadLossesUnit}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Load Losses : </span><span style={{ color: 'gray' }}>{productDetails.loadLosses} {productDetails.loadLossesUnit}</span>
              </div>
            </div>
            {/* Technical Information */}
            <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Technical Details :</p>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Winding Material : </span><span style={{ color: 'gray' }}>{productDetails.windingMaterial}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Temp Rise Oil : </span><span style={{ color: 'gray' }}>{productDetails.tempRiseOil}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Temp Rise Winding : </span><span style={{ color: 'gray' }}>{productDetails.tempRiseWinding}</span>
              </div>
            </div>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Impedance : </span><span style={{ color: 'gray' }}> {productDetails.impedance}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Tap Changer Type : </span><span style={{ color: 'gray' }}>{productDetails.tapChangerType} </span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Connection Phase : </span><span style={{ color: 'gray' }}> {productDetails.connectionPhase}</span>
              </div>
            </div>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Frequency : </span><span style={{ color: 'gray' }}>{productDetails.frequency}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Cooling : </span><span style={{ color: 'gray' }}>{productDetails.cooling}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Vector Group : </span><span style={{ color: 'gray' }}>{productDetails.vectorGroup}</span>
            
              </div>
            </div>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Delivery Time :</span><span style={{ color: 'gray' }}>{productDetails.deliveryTime}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>LV Termination : </span><span style={{ color: 'gray' }}>{productDetails.lvTermination}</span>
              </div>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>HV Termination : </span><span style={{ color: 'gray' }}>{productDetails.hvTermination}</span>
              </div>
            </div>
             {/* Quoted */}
            <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Quoted Details :</p>
            <div className='row' style={{ paddingLeft: 20 }}>
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Qty Received : </span><span style={{ color: 'gray' }}>{productDetails.qtyReceived}</span>
              </div>
              {/* <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>Po Rate : </span><span style={{ color: 'gray' }}>{productDetails.poRate} INR</span>
              </div> */}
              <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                <span style={{ color: '#333333' }}>TFS Code No : </span><span style={{ color: 'gray' }}>{productDetails.tfsCodeNo}</span>
              </div>
            </div>
          </div>
        </Dialog>


    </>
  );
}








