import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button, Form } from 'react-bootstrap';
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
import {NumericFormat} from 'react-number-format';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, InputLabel, Radio, RadioGroup, Select } from '@mui/material';

import * as API from "../../../apiservice/Apiservice";
import SimpleBackdropCircular from '../SimpleBackdropCircular';
import {useForm} from "react-hook-form"
import { FaClosedCaptioning } from 'react-icons/fa';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const steps = ['Receipt Register', 'Post Contract Review', 'Work Order Register'];

export default function QuotationForm() {

  const navigate = useNavigate();

  const takeEnquiryDate = (newValue) => {
    console.log("take enquiry date value", newValue)
    let date = new Date(newValue)
    let data = {...quotationFormFields}
    data["enquiryDate"] = moment(date).format("YYYY/MM/DD") 
    setQuotationFormFileds(data);
  };
   
  

  const[loadSelect, setLoadSelect]=useState('first')
  const[loaderVisible, setLoaderVisible] = useState(false)
  const[disableQuotationField, setDisableQuotationField] = useState(false)
  const [quotationFormFields, setQuotationFormFileds] = useState({
    name:'',
    address:'',
    contactNumber:'',
    contactPersonName:'',
    subject:'',
    enquiryDate:'2023/01/01',
    priceQuoteBase:'FIRM',
    offerValidity:'15',
    advancePayment:'30',
    balancePayment:'70',
    deliveryTime:'45',
    liquidatedDamages:'Applicable',
    warrantyAfterDispatch:'18',
    warrantyAfterCommissioning:'12',
    ratingKva:'4000 KVA, 11kv/0.433kV, EEL-2 outdoor type, Alu Winding, Distribution Transformer as per IS:1180',
    noOfPhases:'Three',
    primaryVoltage:'11',
    secondaryVoltage:'0.433',
    vectorGroup:'Dyn11',
    tapingOnPrimary:'+5% to -5% in steps of 2.5% through Off Load Tap Changer',
    cooling:'ONAN',
    frequency:'50',
    tempInOilByThermometer:'40',
    tempInWindingByResistance:'45',
    losses50:'50',
    losses50Unit:'kW',
    losses100:'250',
    losses100Unit:'kW',
    noLoadLosses:'',
    noLoadLossesUnit:'kW',
    loadLosses:'',
    loadLossesUnit:'kW',
    loadSelect:'first',
    impedance:'4.5%(IS Tol)',
    ratingKvaListOfFitting:'',
    ratingKvaUnit:'KVA',
    hvTermination:'Cable Box',
    lvTermination:'Bare Bushing',
    ratingAndDiagramPlate:'Provided',
    earthingTerminals:'Provided',
    liftingLugs:'Provided',
    thermometerPockets:'Provided',
    airReleaseHoleWithPlug:'Provided',
    explosionDiaphragm:'Provided',
    drainCumBottomFilterValve:'Provided',
    topFilterValveWithPlug:'Provided',
    oilConservatorWithDrainPlug:'Provided',
    silicaGelBreather:'Provided',
    coolingRadiators:'Provided',
    oti:'Provided',
    wti:'Provided',
    marshallingBox:'Provided',
    buchholzRelay:'Provided',
    products: [],
    offLoadTapChanger:'Provided',
    onLoadTapChanger:'Provided'

  })

  const handleQuotationFormChange= (event)=>{
    console.log( event.target.name)

        let data = {...quotationFormFields}
        data[event.target.name] = event.target.value; 
        setQuotationFormFileds(data);
  }


  // ANNEXURE -A PRICE SCHEDULE
  const[annexureAField, setAnnexureField] = useState(false)
  const [annexureAFormFields, setAnnexureAFormFileds] = useState([
    {
      description:'',
      qty:'',
      unitExWorksPrice:'',
      igst18:'',
      fAndI:'',
      grandTotal:'' 
  },
  ])
  

  
  const handleAnnexureAFormChange= (event, index)=>{
      console.log(index, event.target.name)
          let data = [...annexureAFormFields]
          data[index][event.target.name] = event.target.value;
          setAnnexureAFormFileds(data);

          let dataQ = {...quotationFormFields}
          dataQ["products"] = annexureAFormFields ; 
        setQuotationFormFileds(dataQ);
       
  }
  
  const addAnnexureAForm =() =>{
      let object ={
        description:'',
        qty:'',
        unitExWorksPrice:'',
        igst18:'',
        fAndI:'',
        grandTotal:'' 
      }
      setAnnexureAFormFileds([...annexureAFormFields, object])
   }
  
   const removeAnnexureAForm =(index)=>{
      console.log(" index", index)
     let data = [...annexureAFormFields]
     data.splice(index, 1)
     setAnnexureAFormFileds(data)
  }

  async function addProducts(){
        console.log("start")
        
  }
 
  const createQuotation=async()=>{
        console.log("create quotaton orderis working...")
        
        await addProducts()
       

        console.log("annexure products details", annexureAFormFields)
         console.log(quotationFormFields)
         
         setLoaderVisible(true)
        API.createQuotation(quotationFormFields)
        .then(async(res) => {
         console.log("here is the response for create quotation form ", res)
                if(res.status==200){
                setLoaderVisible(false)
                setDisableQuotationField(true)  
                navigate('/quotation')            
                }
        })
        .catch((err) => {
            setLoaderVisible(false) 
            alert("Quotation Not created!!", err)
            console.log("here is the create quotation error!! ", err)
      })
        
     }



  return (
   <div>
         {loaderVisible? <SimpleBackdropCircular/>:<></>}
    <p style={{fontSize:24, fontWeight:700, margin:0, padding:0, marginBottom:10}}>Create Quotation</p>
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, paddingBottom:30}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0}}>Quotation Basic Details :</p>
          
            
                <div className='row' style={{marginLeft:0}}>
                  <div className='col-3'>
                  <TextField  margin="dense"  name='name'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.name} id="name" label="Company Name" placeholder='Vardhman Group' type="text" fullWidth variant="standard"/>

                  </div>
                <div className='col-3'>
                     <TextField  margin="dense" name='contactPersonName'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.contactPersonName} id="name" label="Contact Person Name" placeholder='Mr. Lalit Chaudhary' type="text" fullWidth variant="standard"/>
                </div>
                <div className='col-3'>
                     <TextField  margin="dense" name='contactNumber'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.contactNumber} id="name" label="Contact Number" placeholder='9799399333' type="number" fullWidth variant="standard"/>
                </div>
                <div className='col-3' style={{paddingTop:10}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DesktopDatePicker 
                        label="Enquiry Date"
                        inputFormat="YYYY/MM/DD"
                        name='sopPeriodFrom'  disabled={disableQuotationField} onChange={takeEnquiryDate} value={quotationFormFields.enquiryDate}
                        renderInput={(params) => <TextField    variant="standard" required size='small' fullWidth id="standard-basic" {...params} />}
                      />
                    </LocalizationProvider>
                </div>
            </div>
            <div className='row' style={{marginLeft:0}}>
                  <div className='col-12'>
                  <TextField  margin="dense" name='address'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.address} id="name" label="Address" placeholder='S-21, Western Heights, Ground Floor, Shyam Nagar, Jaipur (Raj)' type="text" multiline fullWidth variant="standard"/>

                  </div>
            </div>
            <div className='row' style={{marginLeft:0}}>
                  <div className='col-12'>
                      <TextField  margin="dense" name='subject'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.subject} id="subject" label="Subject" placeholder='Offer for supply 400KVA, 11/0.433KV EEL-2 Confirming to IS: 1180.' type="text" multiline fullWidth variant="standard"/>
                  </div>
            </div>



                {/* section A */}

                <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:30, marginBottom:0}}>ANNEXURE-'A' PRICE SCHEDULE</p>
          
          {annexureAFormFields.map((annexureAFields, index)=>(
            < div style={{border:'1px solid lightgray', width:'96%', borderRadius:5, padding:10, backgroundColor:'#FAFAFA', marginTop:20, marginLeft:20, marginRight:20, paddingBottom:30}}>
                    <div className='row' style={{marginLeft:0}}>
                    <div className='col-9'>
                    <TextField  margin="dense" name='description'  disabled={disableQuotationField} onChange={event => handleAnnexureAFormChange(event, index)} value={annexureAFields.description} id="name" label="Description" placeholder='400 KVA< 11kV/0.433kV, EEl-2, ONAN, Dyn11, Outdoor Type, Alu wound, Distribution Transformer' type="text" multiline fullWidth variant="standard"/>
    
                    </div>
                    <div className='col-3' >
                    {index===0?
                                <Button disabled={disableQuotationField}  onClick={addAnnexureAForm} style={{backgroundColor:'green', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:0, marginTop:10, float:'right'}}>Add Product</Button>
                            :
                            <Button disabled={disableQuotationField} onClick={()=>removeAnnexureAForm(index)}  style={{backgroundColor:'#dc3545', height:30, width:120, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:0, marginTop:10, float:'right'}}>Remove Product</Button>
    
                            }
                    </div>
              </div>
              <div className='row' style={{marginLeft:0}}>
                    
                  <div className='col-3'>
                       <TextField  margin="dense" name='qty'  disabled={disableQuotationField} onChange={event => handleAnnexureAFormChange(event, index)} value={annexureAFields.qty} id="name" label="Qty" placeholder='1' type="number" fullWidth variant="standard"/>
                  </div>
                  <div className='col-3'>
                       <TextField  margin="dense" name='unitExWorksPrice'  disabled={disableQuotationField} onChange={event => handleAnnexureAFormChange(event, index)} value={annexureAFields.unitExWorksPrice} id="name" label="Unit Ex-Works Price" placeholder='680000' type="number" fullWidth variant="standard"/>
                  </div>
                  <div className='col-3' >
                     <TextField  margin="dense" name='igst18'  disabled={disableQuotationField} onChange={event => handleAnnexureAFormChange(event, index)} value={annexureAFields.igst18} id="name" label="IGST@18%" placeholder='122400' type="number" fullWidth variant="standard"/>
             
                  </div>
              </div>
              <div className='row' style={{marginLeft:0}}>
                    <div className='col-3'>
                    <TextField  margin="dense" name='fAndI'  disabled={disableQuotationField} onChange={event => handleAnnexureAFormChange(event, index)} value={annexureAFields.fAndI} id="name" label="F & I" placeholder='Extra' type="text" multiline  fullWidth variant="standard"/>
    
                    </div>
                  <div className='col-3'>
                       <TextField  margin="dense" name='grandTotal'  disabled={disableQuotationField} onChange={event => handleAnnexureAFormChange(event, index)} value={annexureAFields.grandTotal} id="name" label="Grand Total" placeholder='802400' type="number" fullWidth variant="standard"/>
                  </div>
                  </div>
                  
                  </div>
                 

          ))}


          {/* ANNEXURE -B */}

          <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, marginTop:20}}>ANNEXURE-'B' TERMS & CONDITION</p>
          
            
          <div className='row' style={{marginLeft:0, marginTop:10}}>
            <div className='col-3' style={{marginTop:11}}>
                  <TextField size='small' select name='priceQuoteBase'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.priceQuoteBase}  id="demo-simple-select-autowidth" label="Price Quoted Base" defaultValue="KVA" variant="standard" fullWidth >
                                        <MenuItem value={"FIRM"}>FIRM</MenuItem>
                                        <MenuItem  value={"VARIABLE"}>VARIABLE</MenuItem>
                  </TextField>
            </div>
          <div className='col-3'>
          <FormControl variant="standard" style={{marginTop:8, }} fullWidth>
                        <InputLabel id="demo-select-small">Offer Validity</InputLabel>
                          <Input disabled={disableQuotationField} id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">Days</InputAdornment>} aria-describedby="standard-weight-helper-text"
                            name='offerValidity' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.offerValidity}
                            inputProps={{'aria-label': 'Warantee' }} placeholder='15' />
                    </FormControl>  
          </div>
          <div className='col-3' style={{paddingTop:2}}>
              <FormControl variant="standard" style={{marginTop:5}} fullWidth>
                   <InputLabel id="demo-select-small">Advance Payment</InputLabel>
                     <Input disabled={disableQuotationField} id="standard-adornment-weight"
                       endAdornment={<InputAdornment position="end">%</InputAdornment>} aria-describedby="standard-weight-helper-text"
                       name='advancePayment' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.advancePayment}
                       inputProps={{'aria-label': 'Warantee' }} placeholder='50' />
              </FormControl>  
          </div>
          <div className='col-3' style={{paddingTop:2}}>
                <FormControl variant="standard" style={{marginTop:5}} fullWidth>
                        <InputLabel id="demo-select-small">Balance Payment</InputLabel>
                          <Input disabled={disableQuotationField} id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>} aria-describedby="standard-weight-helper-text"
                            name='balancePayment' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.balancePayment}
                            inputProps={{'aria-label': 'Warantee' }} placeholder='50' />
                    </FormControl>  
          </div>
          </div>

          <div className='row' style={{marginLeft:0, marginTop:10}}>
         
            <div className='col-3' style={{marginTop:11}}>
                  <TextField size='small' select name='liquidatedDamages'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.liquidatedDamages}  id="demo-simple-select-autowidth" label="Liquidated Damages" defaultValue="Applicable" variant="standard" fullWidth >
                                        <MenuItem value={"Applicable"}>Applicable</MenuItem>
                                        <MenuItem  value={"Not Applicable"}>Not Applicable</MenuItem>
                  </TextField>
            </div>
            <div className='col-3'>
          <FormControl variant="standard" style={{marginTop:8, }} fullWidth>
                        <InputLabel id="demo-select-small">Delivery Time</InputLabel>
                          <Input disabled={disableQuotationField} id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">Days</InputAdornment>} aria-describedby="standard-weight-helper-text"
                            name='deliveryTime' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.deliveryTime}
                            inputProps={{'aria-label': 'Warantee' }} placeholder='45' />
                    </FormControl>  
            </div>
        
          <div className='col-3' style={{paddingTop:2}}>
              <FormControl variant="standard" style={{marginTop:5, }} fullWidth>
                   <InputLabel id="demo-select-small">Warranty Dispatch</InputLabel>
                     <Input disabled={disableQuotationField} id="standard-adornment-weight"
                       endAdornment={<InputAdornment position="end">Months</InputAdornment>} aria-describedby="standard-weight-helper-text"
                       name='warrantyAfterDispatch' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.warrantyAfterDispatch}
                       inputProps={{'aria-label': 'Warantee' }} placeholder='12' />
              </FormControl>  
          </div>
          <div className='col-3' style={{paddingTop:2}}>
                <FormControl variant="standard" style={{marginTop:5, }} fullWidth>
                        <InputLabel id="demo-select-small">Warranty Comm.</InputLabel>
                          <Input disabled={disableQuotationField} id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">Months</InputAdornment>} aria-describedby="standard-weight-helper-text"
                            name='warrantyAfterCommissioning' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.warrantyAfterCommissioning}
                            inputProps={{'aria-label': 'Warantee' }} placeholder='18' />
                    </FormControl>  
          </div>
          </div>

           {/* ANNEXURE -C */}

           <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, marginTop:40}}>ANNEXURE-'C' GUARANTEED TECHNICAL PARTICULARS</p>
          
           <div className='row' style={{marginLeft:0}}>
                  <div className='col-12'>
                     <TextField  margin="dense" name='ratingKva'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.ratingKva} id="name" label="Rating KVA" placeholder='4000 KVA, 11kv/0.433kV, EEL-2 outdoor type, Alu Winding, Distribution Transformer as per IS:1180' type="text" multiline fullWidth variant="standard"/>
                  </div>
           </div>

          <div className='row' style={{marginLeft:0, }}>
            <div className='col-3' >
            <TextField  margin="dense" name='noOfPhases'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.noOfPhases} id="name" label="Number Of Phases" placeholder='Three' type="text" fullWidth variant="standard"/>

            </div>
          <div className='col-3'>
          <FormControl variant="standard" style={{marginTop:8, }} fullWidth>
                        <InputLabel id="demo-select-small">Primary Voltage</InputLabel>
                          <Input disabled={disableQuotationField} id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">KV</InputAdornment>} aria-describedby="standard-weight-helper-text"
                            name='primaryVoltage' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.primaryVoltage}
                            inputProps={{'aria-label': 'Warantee' }} placeholder='11' />
                    </FormControl>  
          </div>
          <div className='col-3' style={{paddingTop:2}}>
              <FormControl variant="standard" style={{marginTop:5, }} fullWidth>
                   <InputLabel id="demo-select-small">Secondary Voltage</InputLabel>
                     <Input disabled={disableQuotationField} id="standard-adornment-weight"
                       endAdornment={<InputAdornment position="end">KV</InputAdornment>} aria-describedby="standard-weight-helper-text"
                       name='secondaryVoltage' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.secondaryVoltage}
                       inputProps={{'aria-label': 'Warantee' }} placeholder='0.433' />
              </FormControl>  
          </div>
          <div className='col-3' >
              <TextField  margin="dense" name='vectorGroup'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.vectorGroup} id="name" label="Vector Group" placeholder='Dyn11' type="text" fullWidth variant="standard"/>

          </div>
          </div>

          <div className='row' style={{marginLeft:0}}>
         
            <div className='col-6' >
            <TextField  margin="dense" name='tapingOnPrimary'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.tapingOnPrimary} id="name" label="Taping on Primary" placeholder='+5% to -5% in steps of 2.5% through Off Load Tap Changer' type="text" fullWidth variant="standard"/>

            </div>
            <div className='col-3' >
            <TextField  margin="dense"  name='cooling'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.cooling} id="name" label="Cooling" placeholder='ONAN' type="text" fullWidth variant="standard"/>

            </div>
            <div className='col-3'>
          <FormControl variant="standard" style={{marginTop:8}} fullWidth>
                        <InputLabel id="demo-select-small">Frequency</InputLabel>
                          <Input disabled={disableQuotationField} id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">Hz</InputAdornment>} aria-describedby="standard-weight-helper-text"
                            name='frequency' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.frequency}
                            inputProps={{'aria-label': 'Warantee' }} placeholder='50' />
                    </FormControl>  
            </div>
          </div>
          <div className='row' style={{marginLeft:0, marginTop:0}}>
            
        
            <div className='col-3' >
            <TextField  margin="dense" name='impedance'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.impedance} id="name" label="Impedance" placeholder='4.5%(IS Tol)' type="text" fullWidth variant="standard"/>

            </div>
            </div>


          <p style={{fontWeight:700, color:'lightgray', paddingLeft:22, marginTop:20, marginBottom:0}}>Temp. Rise @ 50 Deg.C Ambient</p>


          <div className='row' style={{marginLeft:0, marginTop:0}}>
            
        
            <div className='col-6' >
                <FormControl variant="standard" style={{marginTop:5, }} fullWidth>
                    <InputLabel id="demo-select-small">In Oil By Thermometer</InputLabel>
                      <Input disabled={disableQuotationField} id="standard-adornment-weight"
                        endAdornment={<InputAdornment position="end">Deg.C</InputAdornment>} aria-describedby="standard-weight-helper-text"
                        name='tempInOilByThermometer' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.tempInOilByThermometer}
                        inputProps={{'aria-label': 'Warantee' }} placeholder='40' />
                </FormControl>  
            </div>
            <div className='col-6' >
            <FormControl variant="standard" style={{marginTop:5, }} fullWidth>
                    <InputLabel id="demo-select-small">In Winding By Resistance</InputLabel>
                      <Input disabled={disableQuotationField} id="standard-adornment-weight"
                        endAdornment={<InputAdornment position="end">Deg.C</InputAdornment>} aria-describedby="standard-weight-helper-text"
                        name='tempInWindingByResistance' type='number' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.tempInWindingByResistance}
                        inputProps={{'aria-label': 'Warantee' }} placeholder='45' />
                </FormControl> 
            </div>
          </div>
          
          <p style={{fontWeight:700, color:'lightgray', paddingLeft:22, marginTop:20, marginBottom:0}}>Select the Load</p>
                            
                            <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                            
                            <RadioGroup
                                row style={{backgroundColor:'', marginLeft:20}}
                                aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="first"
                                name="row-radio-buttons-group" onChange={(e)=>{setLoadSelect(e.target.value)}}
                                >
                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0, backgroundColor:''}}>
                                <FormControlLabel disabled={disableQuotationField}  value="first" control={<Radio />}  label={
                                <>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small'  name='losses50'   onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.losses50} disabled={disableQuotationField? true:loadSelect==="second"} placeholder='50' id="standard-basic" label="Losses50 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                            
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='losses50Unit'  disabled={disableQuotationField? true:loadSelect==="second"} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.losses50Unit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small' name='losses100'   onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.losses100} disabled={disableQuotationField? true:loadSelect==="second"} placeholder='50' id="standard-basic" label="Losses100 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                                            
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='losses100Unit' disabled={disableQuotationField? true:loadSelect==="second"}  onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.losses100Unit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>

                                
                                </>} />
                                </div>
                                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12'>

                                </div>
                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <FormControlLabel disabled={disableQuotationField} value="second" control={<Radio />} label={ 
                                <>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small' name='noLoadLosses' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.noLoadLosses} disabled={disableQuotationField? true:loadSelect==="first"} placeholder='50' id="standard-basic" label="No Load Losess (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                                            
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='noLoadLossesUnit' disabled={disableQuotationField? true:loadSelect==="first"}  onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.noLoadLossesUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small' name='loadLosses' onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.loadLosses} disabled={disableQuotationField? true:loadSelect==="first"} placeholder='50' id="standard-basic" label="Load Losses (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='loadLossesUnit' disabled={disableQuotationField? true:loadSelect==="first"}  onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.loadLossesUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>
                                
                                
                                
                                
                                </>} />
                                </div>
                                
                                
                                
                                
                            </RadioGroup>

                        </div>
  
          {/* ANNEXURE-D */}

          <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, marginTop:40}}>ANNEXURE-'D'  STANDARD LIST OF FITTING AND ACCESSORIES</p>
          
          <div className='row' style={{marginLeft:0, marginTop:40}}>
                            <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12' style={{marginRight:0, paddingRight:0}}>
                                    <TextField size='small' name='ratingKvaListOfFitting'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.ratingKvaListOfFitting} placeholder='400' id="standard-basic" label="Rating" variant="standard" fullWidth/>
                            </div>
                            <div className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12' style={{marginRight:0, paddingLeft:0}}>

                                <TextField size='small' select name='ratingKvaUnit'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.ratingKvaUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="KVA" variant="standard" fullWidth >
                                        <MenuItem value={"KVA"}>KVA </MenuItem>
                                        <MenuItem  value={"MVA"}>MVA </MenuItem>
                                </TextField>

                            </div>
                           
                            <div className='col-3'>
                                      <TextField size='small' select name='hvTermination'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.hvTermination}  placeholder='250' id="demo-simple-select-autowidth" label="HV Termination" defaultValue="Cable Box" variant="standard" fullWidth >
                                              <MenuItem value={"Cable Box"}>Cable Box</MenuItem>
                                              <MenuItem  value={"Bare Bushing"}>Bare Bushing</MenuItem>
                                      </TextField>
                            </div>
                            <div className='col-3'>
                                      <TextField size='small' select name='lvTermination'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.lvTermination}  placeholder='250' id="demo-simple-select-autowidth" label="LV Termination" defaultValue="Bare Bushing" variant="standard" fullWidth >
                                              <MenuItem value={"Bare Bushing"}>Bare Bushing</MenuItem>
                                              <MenuItem  value={"Cable Box"}>Cable Box</MenuItem>
                                      </TextField>
                            </div>
                            <div className='col-3'>
                                     <TextField size='small' select name='buchholzRelay'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.buchholzRelay}  placeholder='250' id="demo-simple-select-autowidth" label="Buchholz Relay" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
          </div>
          
          <div className='row' style={{marginLeft:0, marginTop:20}}>
                           
                  <div className='col-3'>
                            <TextField size='small' select name='ratingAndDiagramPlate'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.ratingAndDiagramPlate}  placeholder='250' id="demo-simple-select-autowidth" label="Rating & Diagram Plate" defaultValue="Provided" variant="standard" fullWidth >
                                    <MenuItem value={"Provided"}>Provided</MenuItem>
                                    <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                            </TextField>
                  </div>
                  <div className='col-3'>
                            <TextField size='small' select name='earthingTerminals'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.earthingTerminals}  placeholder='250' id="demo-simple-select-autowidth" label="Earthing Terminals" defaultValue="Provided" variant="standard" fullWidth >
                                    <MenuItem value={"Provided"}>Provided</MenuItem>
                                    <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                            </TextField>
                  </div>
                  <div className='col-3'>
                            <TextField size='small' select name='liftingLugs'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.liftingLugs}  placeholder='250' id="demo-simple-select-autowidth" label="Lifting Lugs" defaultValue="Provided" variant="standard" fullWidth >
                                    <MenuItem value={"Provided"}>Provided</MenuItem>
                                    <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                            </TextField>
                  </div>
                  <div className='col-3'>
                            <TextField size='small' select name='thermometerPockets'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.thermometerPockets}  placeholder='250' id="demo-simple-select-autowidth" label="Thermometer Pockets" defaultValue="Provided" variant="standard" fullWidth >
                                    <MenuItem value={"Provided"}>Provided</MenuItem>
                                    <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                            </TextField>
                  </div>
            </div>
            <div className='row' style={{marginLeft:0, marginTop:20}}>
                           
                           <div className='col-3'>
                                     <TextField size='small' select name='airReleaseHoleWithPlug'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.airReleaseHoleWithPlug}  placeholder='250' id="demo-simple-select-autowidth" label="Air Release Hole With Plug" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='explosionDiaphragm'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.explosionDiaphragm}  placeholder='250' id="demo-simple-select-autowidth" label="Explosion Double Diaphragm" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='drainCumBottomFilterValve'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.drainCumBottomFilterValve}  placeholder='250' id="demo-simple-select-autowidth" label="Drain Cum Bottom Filter valve" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='topFilterValveWithPlug'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.topFilterValveWithPlug}  placeholder='250' id="demo-simple-select-autowidth" label="Top Filter Valve With Plug" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
            </div>

            <div className='row' style={{marginLeft:0, marginTop:20}}>
                           
                           <div className='col-3'>
                                     <TextField size='small' select name='oilConservatorWithDrainPlug'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.oilConservatorWithDrainPlug}  placeholder='250' id="demo-simple-select-autowidth" label="Oil Conservator With Drain Plug" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='silicaGelBreather'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.silicaGelBreather}  placeholder='250' id="demo-simple-select-autowidth" label="Silica Gel Breather" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='coolingRadiators'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.coolingRadiators}  placeholder='250' id="demo-simple-select-autowidth" label="Cooling Radiators" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='oti'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.oti}  placeholder='250' id="demo-simple-select-autowidth" label="OTI" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
            </div>
            <div className='row' style={{marginLeft:0, marginTop:20}}>
                           
                           <div className='col-3'>
                                     <TextField size='small' select name='wti'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.wti}  placeholder='250' id="demo-simple-select-autowidth" label="WTI" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='marshallingBox'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.marshallingBox}  placeholder='250' id="demo-simple-select-autowidth" label="Marshalling Box" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='offLoadTapChanger'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.offLoadTapChanger}  placeholder='250' id="demo-simple-select-autowidth" label="Off Load Tap Changer" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           <div className='col-3'>
                                     <TextField size='small' select name='onLoadTapChanger'  disabled={disableQuotationField} onChange={event => handleQuotationFormChange(event)} value={quotationFormFields.onLoadTapChanger}  placeholder='250' id="demo-simple-select-autowidth" label="On Load Tap Changer" defaultValue="Provided" variant="standard" fullWidth >
                                             <MenuItem value={"Provided"}>Provided</MenuItem>
                                             <MenuItem  value={"Not Provided"}>Not Provided</MenuItem>
                                     </TextField>
                           </div>
                           
            </div>
          
          
    </div>

    

      
    <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginBottom:20}}>
     <Button onClick={()=>navigate('/quotation')} disabled={disableQuotationField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
     <Button  onClick={()=>createQuotation()} disabled={disableQuotationField} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Create</Button>
                          
     </div>    
              
          
   
   
   </div>
  );
}









const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="INR "
    />
  );
});
