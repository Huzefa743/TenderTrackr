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
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Switch, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import SimpleBackdropCircular from "../SimpleBackdropCircular";
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as API from "../../../apiservice/Apiservice";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GiHammerBreak } from "react-icons/gi";


const DetailSopForm = (props) => {
      let {sopno} = useParams()
      console.log(" here is the sopno", sopno)
  
  const navigate = useNavigate();
  const [loaderVisible, setLoaderVisilbe] = useState(false)
  const[sopDetails, setSopDetails] = useState({})
  const[productList, setProductList]  = useState([])
  const[sopActiveStatus, setSopActiveStatus]=useState(false)
  
    const [handlerButtonDisable, setHandlerButtondisable] =useState(false)


    async function makeSopStateReady(){
      console.log(" mak sop state ready is working...")
      let today = new Date()
      API.updateSopById(sopno, {status:"active", sop_date:today.toLocaleDateString()}).then((res)=>{
            console.log(" here is the response:", res)
            if(res.status==200){
                  setSopActiveStatus(true)
                  navigate('/sop')
            }
            
      })
      .catch((error)=>console.log("Here is the error", error))
}


      const[disableProductSopField, setdisableProductSopField] = useState(false)
  const [sopProductFormFields, setSopProductFormFileds] = useState({
    sopPeriodFrom:'2023/01/01',
    sopPeriodTo:'2023/01/01',

})

const handleSopProductFormChange= (event)=>{
      console.log( event.target.name)
      let data = {...sopProductFormFields}
          data[event.target.name] = event.target.value; 
      setSopProductFormFileds(data);
  }
  const handleSopProductFieldFormChange= (event, index)=>{
      console.log( event.target.name)
      let data = [...productList]
       data[index][event.target.name] = event.target.value;
       setProductList(data)
       console.log(" here is product list", productList)
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

    async function getSopDetails(){
      API.getSopById(sopno).then((res) => {
            console.log("sop details", res)
            if(res.status==200){
                  setSopProductFormFileds(res.data.data)
                  setSopDetails(res.data.data)
                  setProductList(res.data.data.products)

            }
            console.log("ge new enquiry is working..")
        //    setNewTtglEnqRefNo(res.data.newttglEnqRefNo);
            console.log(res.data.newttglEnqRefNo)
           })
           .catch((err) => {
             console.log("fetch new ttglenqref no got error", err)
         })
    }
      
    
           useEffect(() => {
              getSopDetails()
          }, []);    
          
      async function updateHandler(){
            setLoaderVisilbe(true)
            API.updateSopById(sopno, sopProductFormFields)
            .then(async(res) => {
             console.log("here is create or update sop details ", res)
             if(res.status==200){
                  if(productList){
                        for(let i=0; i<productList.length; i++){
                              API.updateProduct(productList[i].product_id, productList[i]).then(async(res) => {
                                    console.log("here is create or update sop details ", res)
                                    if(res.status==200){
            
                                    }
                              }).catch((err) => {
                                    
                                    setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                                    
                                    alert("sop not able to create!!")
                                    console.log("here is the sop create failer stats!! ", err)
                              })
                              
                        }
                  }
           
          
                  setLoaderVisilbe(false)
                  setdisableProductSopField(true)
                  navigate('/pending-sop')
           

             }
            
            })
            .catch((err) => {
                setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
               
                alert("sop not able to create!!")
                console.log("here is the sop create failer stats!! ", err)
          })
            
         }
      
              
        
        
      


  return (
  <>
      <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
     
     {loaderVisible? <SimpleBackdropCircular/>:<></>}

     <div style={{margin:20}}>

     

     {/* <p style={{fontSize:24, fontWeight:700,}}>Update SOP</p> */}
     <div className="row">
         <div className="col-11">
         <p style={{fontSize:24, fontWeight:700,}}>Update SOP</p>
         </div>
         <div className="col-1">
         <Switch disabled={!productList.length} checked={sopActiveStatus} onClick={() => makeSopStateReady()} value="active" inputProps={{ 'aria-label': 'secondary checkbox' }} />
         </div>
     </div>
      {/* Receipt register form */}
      <div className='row' style={{height:'auto', width:'100%', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:10, marginLeft:0, marginRight:0, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20, paddingBottom:20}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>SOP Basic Details :</p>
          
            <div className='row' style={{marginTop:10, marginBottom:10}}>
                 
            <div className='col-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                             <DesktopDatePicker 
                                               label="Sop Period From"
                                               inputFormat="YYYY/MM/DD"
                                               name='sopPeriodFrom'  disabled={disableProductSopField} onChange={takeSopPeriodFrom} value={sopProductFormFields.sopPeriodFrom}
                                                //  onChange={updateTtglEnqRefDate} id="standard-basic"
                                               renderInput={(params) => <TextField    variant="standard" required size='small' style={{width:'95%'}} id="standard-basic" {...params} />}
                             />
                       </LocalizationProvider>
            </div>
            <div className='col-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                             <DesktopDatePicker 
                                               label="Sop Period To"
                                               inputFormat="YYYY/MM/DD"
                                               name='sopPeriodFrom'  disabled={disableProductSopField} onChange={takeSopPeriodTo} value={sopProductFormFields.sopPeriodTo}
                                                //  onChange={updateTtglEnqRefDate} id="standard-basic"
                                               renderInput={(params) => <TextField    variant="standard" required size='small' style={{width:'95%'}} id="standard-basic" {...params} />}
                             />
                       </LocalizationProvider>
            </div>
          
                  
            </div>

            {productList.map((productDetails, index)=>(
                         <Accordion style={{ marginBottom: 0, paddingLeft: 0, paddingRight: 0, width:'94%', marginLeft:20 }}>
                         <AccordionSummary style={{ backgroundColor: '#f2f2f2', }}
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1a-content"
                           id="panel1a-header">
                           <Typography style={{ color: 'black', fontWeight: 600, color: 'gray', width: '100%' }}>
                             Product No - {index+1}
                           </Typography>
                         </AccordionSummary>
                         <AccordionDetails>
                           <Typography style={{paddingBottom:20}}>
                           <div className='row'>
                                    <div className='col-4'>
                                    <TextField margin="dense" name='sop_qty_al_cons'  disabled={disableProductSopField} onChange={event => handleSopProductFieldFormChange(event, index)} value={productDetails.sop_qty_al_cons}id="name" label="SOP Qty Al Cons" type="number"  style={{width:'95%'}} variant="standard"/>
                                    </div>
                                    <div className='col-4'>
                                    <TextField margin="dense" name='qty_recd'  disabled={disableProductSopField} onChange={event => handleSopProductFieldFormChange(event, index)} value={productDetails.qty_recd} id="name" label="Qty Recd" type="number" style={{width:'95%'}} variant="standard"/>
                                    </div>
                                    <div className='col-4'>
                                    <TextField  margin="dense" name='proj_sales_qty'  disabled={disableProductSopField} onChange={event => handleSopProductFieldFormChange(event, index)} value={productDetails.proj_sales_qty} id="name" label="Proj Sale Qty" type="number" style={{width:'95%'}} variant="standard"/>
                                    </div>
                              </div>
                              <div className='row'>
                                   
                                    <div className='col-4'>
                                    <TextField  margin="dense" name='bal_qty'  disabled={disableProductSopField} onChange={event => handleSopProductFieldFormChange(event, index)} value={productDetails.bal_qty} id="name" label="Bal Qty" type="number" style={{width:'95%'}} variant="standard"/>
                                    </div>
                                    <div className='col-4'>
                                    <TextField margin="dense" name='sop_remarks'  disabled={disableProductSopField} onChange={event => handleSopProductFieldFormChange(event, index)} value={productDetails.sop_remarks} id="name" label="Remark" type="text" multiline style={{width:'95%'}} variant="standard"/>
                                    </div>
                              </div>
         
         
                              <div className='row'>
                                    
                              </div>
            
            
                           </Typography>
                         </AccordionDetails>
                       </Accordion>
            ))}

            {/* accordian start */}
          

            {/* accordian closed */}
         
         
             
             
            
            
   </div>
 
     

     <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
     <Button disabled={handlerButtonDisable} onClick={()=>{navigate('/pending-sop')}}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
     <Button disabled={handlerButtonDisable} onClick={()=>updateHandler()} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Update</Button>
                          
     </div>

     </div>
    
 </Box>
  </>
  );
};

export default DetailSopForm;
