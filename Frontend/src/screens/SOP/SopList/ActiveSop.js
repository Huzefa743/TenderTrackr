import React, { useState, useEffect } from 'react'
import { Container, Modal, Card, ListGroup, Button, Table, ButtonGroup, InputGroup, Dropdown, Form, DropdownButton } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {IoHome } from "react-icons/io5";
import Footer from '../../../layouts/footer/Footer'
import Header from '../../../layouts/header/Header';
import {FiEdit} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi";
import {SlNotebook} from "react-icons/sl";
import * as API from "../../../apiservice/Apiservice";
import ButtonSpinner from '../../Enquiry/Spinner' 
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Dialog, IconButton, Pagination, Slide, Stack, Switch, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongSharp from '@mui/icons-material/ReceiptLongSharp';
import DescriptionIcon from '@mui/icons-material/Description';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';


 function ActiveSop() {
 
    const navigate = useNavigate();
    const [SopPendingList, setSopPendingList] = useState([])
    const [totalSopPending, setTotalSopPending] = useState(0)
    const [workOrderRegisterModalShow, setWorkOrderRegisterModalShow] = useState(false)
  const [DownloadSpinnerVisible, setDownloadSpinnerVisible] = useState(false)
  const [downloadErrorVisible, setDownloadErrorVisible] = useState(false)
  const [fromDate , setFromDate ] = React.useState("2023/01/01")
  const [toDate, setToDate] = React.useState("2023/01/01")
  const [page, setPage] = useState(1)
  const [searchSopNotFound, setSearchSopNotfound]=useState(false)
  const [sopDetailsModalVisible, setSopDetailsModalVisile] = useState(false)
  const [sopDetails, setSopDetails] = useState({})
  const [productDetail, setProductDetail] = useState([])


    function logOut(){
      console.log("log out is working...")
      window.localStorage.clear();
      navigate('/login')
    }

    // quotation details modal
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


    async function makeSopStatePending(sopNo){
      console.log(" mak sop state pending is working...")
      let today = new Date()
      API.updateSopById(sopNo, {status:"processing"}).then((res)=>{
            console.log(" here is the response:", res)
            if(res.status==200){
                  fetchPendingSop(page)
            }
            
      })
      .catch((error)=>console.log("Here is the error", error))
}

async function makeSopStateDeploy(sopNo){
  console.log(" mak sop state deploy is working...")
  let today = new Date()
  API.updateSopById(sopNo, {status:"deployed"}).then((res)=>{
        console.log(" here is the response:", res)
        if(res.status==200){
              fetchPendingSop(page)
        }
        
  })
  .catch((error)=>console.log("Here is the error", error))
}

    

 
  function workOrderRegisterDownload(){
    console.log(" function work order register is working...", fromDate, toDate)
    setDownloadErrorVisible(false)
    API.generateReceiptRegister(fromDate, toDate).then((res) => {
      if(res.status==200){
        console.log(" here is success")
        window.location.href = `http://localhost:8080/api/v1/download-receipt-registration-register?fromDate=${fromDate}&toDate=${toDate}`;
        setWorkOrderRegisterModalShow(false)
      }
      else{
        console.log(" not success")
      }
      
     console.log("here is response for work Order Register ", res.data )
    }).catch((err) => {
      
    console.log("Got eror in work order download", err.response.status)
    if(err.response.status==400){
         setDownloadErrorVisible(true)
    }
})
   
  }

  function downloadRegiser(){
     
    setDownloadSpinnerVisible(true)
    setDownloadErrorVisible(false)
    setTimeout(() => { operationOnDownload()}, 200);
  }
  function operationOnDownload(){
    console.log("donwload registe ris running")
    setWorkOrderRegisterModalShow(true)
     setDownloadSpinnerVisible(false)
  }
  const takeFromDateValue = (newValue) => {
    console.log("new value", newValue)
    let date = new Date(newValue)
   setFromDate(moment(date).format("YYYY/MM/DD"));
  };

  const takeToDateValue = (newValue) => {
    let date = new Date(newValue)
    setToDate(moment(date).format("YYYY/MM/DD"));
  };

    function editSopHandler(sopNo, enquiryStatus){
        navigate('/detail-sop/'+sopNo)
    }
   

    async function fetchPendingSop(page){
        API.getAllActiveSop(page, 5).then((res) => {
            setSopPendingList(res.data.data);
            setTotalSopPending(res.data.totalInDb)
  
           console.log("sop list s ", )
         
        });
    }

 

    async function serachSop(searchQuery){
      setSearchSopNotfound(false)
      if(searchQuery==""){
        console.log("here condition true")
        fetchPendingSop(page)
      }
      API.getSopBySearch("processing", searchQuery).then((res) => {
        if(res.status==200){
          setSopPendingList(res.data.data);
          setTotalSopPending(res.data.total)

         console.log("enquiry list s ", )
        }
       
      }).catch((error)=>{
        console.log("here is the error", error)
        if(error.response.status==400){
        if(error.response.data.total==0){
             setSearchSopNotfound(true)
        }
      }
      })
  }



    const handleChange = async (event, value) => {
      console.log("vlaue in handl change for pagination", value)
      setPage(value)
      await fetchPendingSop(value)
  };

   //fetch sop details
   async function fetchSopDetails(sopNo){
    API.getSopById(sopNo).then((res) => {
      setSopDetails(res.data.data);
      console.log(sopDetails)
      if(res.data.data.products){
        setProductDetail(res.data.data.products)
      }
    }).catch((error)=>{
      console.log("got error", error)
      alert("Not able to fetch the SOP Details")
    })
  }

 

    useEffect(() => {
      
      
      fetchPendingSop(page)
      }, []);
   
  return (
    <>
      <Header />
      <div className='row' style={{backgroundColor:'blue', height:'100%', padding:0, margin:0, marginTop:-12}}>
                 <div className='col-xl-2 col-lg-2 col-sm-2 d-none d-sm-block' style={{backgroundColor:'#0059BF', height:'auto+20', margin:0, padding:0, marginTop:-5}}>
                         <div style={{width:'auto', backgroundColor:'', marginTop:40, marginRight:10, marginLeft:10}}>
                         <Link to="/home" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><IoHome style={{fontSize:20, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>Home</span></div></Link>
                         <Link to="/enquiry" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><FiEdit style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>Enquiry</span></div></Link>
                         <Link to="/sop" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'white',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><GiNotebook style={{fontSize:20, marginLeft:12, color:'#0059BF', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'#0059BF', marginLeft:12,}}>SOP</span></div></Link>
                         <Link to="/bom" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><SlNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>BOM</span></div></Link>
                         <Link to="/quotation" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><ReceiptLongSharp style={{fontSize:24, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:9,}}>Quotation</span></div></Link>
                                  
                                 {/* //logout */}
                                 <div onClick={logOut} style={{ backgroundColor:'', cursor:'pointer',  borderRadius:5, height:'35px', lineHeight:'35px', marginTop:250,marginBottom:12, }}><BiLogOut style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12, marginTop:-20, }}>Log Out</span></div>
                                 
                         </div>

                  </div>
                  <div className='col-xl-10 col-lg-10 col-sm-10 col-xs-12' style={{backgroundColor:'white'}}>
                            <div className='row' style={{backgroundColor:'', marginTop:10, marginRight:10, marginLeft:10, paddingLeft:0, paddingRight:0}}>
                        <div className='col-2' style={{backgroundColor:''}}>
                            <div className='row'>
                            <span style={{fontSize:16, fontWeight:600, paddingLeft:0}}>Pending SOP</span>
                            </div>
                            <div className='row'>
                            <span style={{fontSize:10, fontWeight:600, color:'#AEADAD',paddingLeft:0}}>Total Count - {totalSopPending}</span>
                            </div>
                        </div>
                        

                        
                        <div className='col-4 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:6}}>
                        <InputGroup className="mb-2 " size='sm' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:5, height:30 }}>
                                <Form.Select aria-label="Default select example" style={{fontSize:12, fontWeight:600}}>
                                    <option vlaue="enq no" >Enq no</option>
                                    <option value="2" selected>Name</option>
                                    <option value="3">Enq Date</option>
                                </Form.Select>
                                <Form.Control onChange={(e)=>serachSop(e.target.value)} placeholder='Search....' aria-label="Text input with dropdown button" style={{width:'60%' }}/>
                            </InputGroup>
                        </div>
                        <div className='col-2 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:7, textAlign:'right', paddingRight:0}}>
                        <Link to="/pending-sop"><Button style={{marginRight:0  ,backgroundColor:'gray', height:30, width:130, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', marginRight:25, border:'0px'}}>Pending SOP</Button></Link>
             
                            </div>
                        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
                            <Link to="/create-new-sop"><Button style={{backgroundColor:'#0059BF', height:30, width:140, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>Create SOP</Button></Link>
                        </div>
                        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
                            <Button onClick={()=>downloadRegiser()} style={{backgroundColor:'green', height:30, width:100, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>{DownloadSpinnerVisible ? <ButtonSpinner/>:<>Register</>}</Button>
                        </div>
                        <hr style={{marginTop:5}}></hr>
                                    </div>
                            <div className='row' style={{margin:10, marginTop:5, width:'100%'}}>
                                    <Table responsive bordered hover style={{width:'100%', padding:0, fontSize:12, marginLeft:-10}} size="sm">
                                <thead style={{backgroundColor:'#BAB6B6', verticalAlign:'top', textAlign:'center' }}>
                                    <tr>
                                    <th >Sop No </th>
                                    <th >Sop Date</th>
                                    <th >Sop Period</th>
                                    <th style={{width:200}}>Ttgl Enq Ref No / Cust Po Date / Specification / Name </th>
                                    <th style={{width:70}}>Product No</th>
                                    <th>Design Id</th>
                                    <th style={{width:40}} >Sop Qty</th>
                                    <th style={{width:40}}>Qty Recd</th>
                                    <th style={{width:40}}>Proj Sales Qty</th>
                                    <th style={{width:40}}>Bal Qty</th>
                                    <th style={{width:150}}>Remarks</th>
                                    
                                    <th >State</th>
                                    <th >SOP Details</th>
                                    
                                    <th >SOP Deploy</th>
                                    
                                    </tr>
                                </thead>
                                {searchSopNotFound?  <tbody>No match found</tbody>:
                                <tbody style={{ verticalAlign:'top', textAlign:'center'}}>
                                {SopPendingList.map((sopDetails, index)=>(
                    <>
                    {(sopDetails.products).length==0? 
                    <>
                       <tr>
                          <td>{sopDetails.sop_no}</td>
                          <td>{sopDetails.sop_date}</td>
                          <td>{sopDetails.sop_period_from} - {sopDetails.sop_period_to}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        <td style={{cursor:'pointer'}} onClick={()=>(fetchSopDetails(sopDetails.sop_no), setSopDetailsModalVisile(true))}><IconButton aria-label="delete"  color="primary">< DescriptionIcon/></IconButton></td>
                       {/* <td style={{cursor:'pointer'}} onClick={()=>{deleteSOpHandler(sopDetails.sop_no)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td> */}
                     </tr>
                    </>
                    :
                   <>
                    {sopDetails.products.map((productDetails,index)=>(
                        <>
                        {index==0?<>
                        <tr>
                          <td rowSpan={(sopDetails.products).length}>{sopDetails.sop_no}</td>
                          <td rowSpan={(sopDetails.products).length}>{sopDetails.sop_date}</td>
                          <td rowSpan={(sopDetails.products).length}>{sopDetails.sop_period_from} - {sopDetails.sop_period_to}</td>
                          <td style={{textAlign:'left', paddingLeft:5}}>{sopDetails.products[index].ttgl_enq_ref_no} <br/> {sopDetails.products[index].cust_po_date} <br/> {sopDetails.products[index].specification}<br/> {sopDetails.products[index].name}</td>
                          <td>{sopDetails.products[index].batch_no}</td>
                          {sopDetails.products[index].design_id ? <td>sopDetails.products[index].design_id</td>:<td style={{color:'red', fontWeight:600}}>Pending</td>}
                          <td>{sopDetails.products[index].sop_qty_al_cons}</td>
                          <td>{sopDetails.products[index].qty_recd}</td>
                          <td>{sopDetails.products[index].proj_sales_qty}</td>
                          <td>{sopDetails.products[index].bal_qty}</td>
                          <td>{sopDetails.products[index].sop_remarks}</td>
                           <td rowSpan={(sopDetails.products).length}><Switch checked={true} inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={()=>makeSopStatePending(sopDetails.sop_no)} color="primary" /></td>
                          <td rowSpan={(sopDetails.products).length}style={{cursor:'pointer'}} onClick={()=>(fetchSopDetails(sopDetails.sop_no), setSopDetailsModalVisile(true))}><IconButton aria-label="delete"  color="primary"><DescriptionIcon /></IconButton></td>
                          <td rowSpan={(sopDetails.products).length}><Switch disabled checked={sopDetails.status=="deployed"} inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={()=>makeSopStateDeploy(sopDetails.sop_no)} color="success" /></td>
                         </tr>
                      </>:<>
                      <tr> 
                      <td style={{textAlign:'left', paddingLeft:5}}>{sopDetails.products[index].ttgl_enq_ref_no} <br/> {sopDetails.products[index].cust_po_date} <br/> {sopDetails.products[index].specification}<br/> {sopDetails.products[index].name}</td>
                      <td>{sopDetails.products[index].batch_no}</td>
                          {sopDetails.products[index].design_id ? <td>sopDetails.products[index].design_id</td>:<td style={{color:'red', fontWeight:600}}>Pending</td>}
                          <td>{sopDetails.products[index].sop_qty_al_cons}</td>
                          <td>{sopDetails.products[index].qty_recd}</td>
                          <td>{sopDetails.products[index].proj_sales_qty}</td>
                          <td>{sopDetails.products[index].bal_qty}</td>
                          <td>{sopDetails.products[index].sop_remarks}</td>
                         
                      </tr>
                      </>}
                        </>
                      ))} 
                      </>
                    }
                    
                   </>
      ))}
                                    
                                    
                                </tbody>
 }
                                </Table>
                            
                                    </div>
                                    <div className='row' style={{margin:20,  backgroundColor:'', float:'right', marginRight:0}}>
                            <Stack spacing={0}>
                              {console.log( "here is the pagination: ", Math.floor(11/5))}
                                   <Pagination count={(Number((totalSopPending/5).toFixed(0))+1)} page={page} onChange={handleChange} color="primary" />
                            </Stack>
                            </div>
                            
                  </div>
                  <Modal
        show={workOrderRegisterModalShow}
        backdrop="static"
        keyboard={false} style={{border:'none'}}
      >
        <Modal.Header style={{height:40, border:'none', backgroundColor:' #0059BF', color:'white',}}>
          <Modal.Title style={{ fontSize:16, fontWeight:500}}>Download SOP Register</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'', fontSize:14, padding:30}}>
         
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker label="From Date" value={fromDate} inputFormat="YYYY/MM/DD"
                  onChange={takeFromDateValue} id="standard-basic"
                  renderInput={(params) => <TextField required size='small' style={{width:'90%', marginBottom:30}} variant="standard" id="standard-basic" {...params} />}
                />
            </LocalizationProvider>
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker label="To Date" inputFormat="YYYY/MM/DD" value={toDate}
                  onChange={takeToDateValue} id="standard-basic" 
                  renderInput={(params) => <TextField required size='small' style={{width:'90%'}} variant="standard" id="standard-basic" {...params} />}
                />
            </LocalizationProvider>
             {downloadErrorVisible ? <p style={{marginTop:10, color:'red', weight:700, fontSize:12}}>SOP Register Not available for particular intervals!!</p> :<></>}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setWorkOrderRegisterModalShow(false)} style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Cancel</Button>
          <Button onClick={()=>{workOrderRegisterDownload()}} style={{backgroundColor:'green', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Download</Button>
                     
         
        </Modal.Footer>
      </Modal>
           </div>
           
      <Footer/>

          {/* sop details dialog  */}
          <Dialog
          fullScreen
          open={sopDetailsModalVisible}
          onClose={()=>setSopDetailsModalVisile(false)}
          TransitionComponent={Transition}
        hidden={!sopDetailsModalVisible}
        disableScrollLock
        >
          <AppBar sx={{ position: '' }}>
            <Toolbar>

              <Typography sx={{ ml: 2, mr:2, flex: 1 }} variant="h6" component="div">
                SOP No. - {sopDetails.sopNo}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={()=>setSopDetailsModalVisile(false)}
                aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ marginLeft: 40, marginRight:40, paddingTop: 80, paddingBottom:50 }}>

           {/* quotation details */}
          <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>SOP Details :</p>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>SOP Date : </span><span style={{ color: 'gray' }}> {sopDetails.sopDate}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>SOP Period From : </span><span style={{ color: 'gray' }}>{sopDetails.sopPeriodFrom}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>SOP Period To : </span><span style={{ color: 'gray' }}> {sopDetails.sopPeriodTo}</span>
            </div>
          </div>
       
          
          {/* Annexure A details */}
          <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Products Details :</p>
         
         {productDetail.map((productDetails, index)=>(
                    <Accordion style={{ marginBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                    <AccordionSummary style={{ backgroundColor: '#f2f2f2', }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header">
                      <Typography style={{ color: 'black', fontWeight: 600, color: 'gray', width: '100%' }}>
                        Product - {index+1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{paddingBottom:20}}>

                      <div style={{ marginLeft: 40, paddingTop: 10 }}>


<p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Basic Details :</p>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Specification : </span><span style={{ color: 'gray' }}> {productDetails.specification}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Name of Item : </span><span style={{ color: 'gray' }}>{productDetails.name_of_item}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Rating KVA : </span><span style={{ color: 'gray' }}> {productDetails.rating_kva} {productDetails.rating_kva_unit}</span>
  </div>
</div>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Voltage Rating Pr : </span><span style={{ color: 'gray' }}> {productDetails.voltage_rating_pr} KV</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Voltage Rating Sec : </span><span style={{ color: 'gray' }}>{productDetails.voltage_rating_sec} KV</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Level   : </span><span style={{ color: 'gray' }}> {productDetails.level}</span>
  </div>
</div>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Qty Qtd : </span><span style={{ color: 'gray' }}> {productDetails.qty_qtd}</span>
  </div>
  {/* <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Quoted Estimate(INR) : </span><span style={{ color: 'gray' }}>{productDetails.quoted_estimate} INR</span>
  </div> */}
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
  </div>
</div>
{/* load */}
<p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Load Details :</p>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Losses50 : </span><span style={{ color: 'gray' }}>{productDetails.losses50} {productDetails.losses50_unit}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Losses100 : </span><span style={{ color: 'gray' }}>{productDetails.losses100} {productDetails.losses100_unit}</span>
  </div>
</div>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>No Load Losess : </span><span style={{ color: 'gray' }}>{productDetails.no_load_losses} {productDetails.no_load_losses_unit}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Load Losses : </span><span style={{ color: 'gray' }}>{productDetails.load_losses} {productDetails.load_losses_unit}</span>
  </div>
</div>
{/* Technical Information */}
<p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Technical Details :</p>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Winding Material : </span><span style={{ color: 'gray' }}>{productDetails.winding_material}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Temp Rise Oil : </span><span style={{ color: 'gray' }}>{productDetails.temp_rise_oil}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Temp Rise Winding : </span><span style={{ color: 'gray' }}>{productDetails.temp_rise_winding}</span>
  </div>
</div>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Impedance : </span><span style={{ color: 'gray' }}> {productDetails.impedance}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Tap Changer Type : </span><span style={{ color: 'gray' }}>{productDetails.tap_changer_type} </span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Connection Phase : </span><span style={{ color: 'gray' }}> {productDetails.connection_phase}</span>
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
  <span style={{ color: '#333333' }}>Vector Group : </span><span style={{ color: 'gray' }}>{productDetails.vector_group}</span>

  </div>
</div>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Delivery Time :</span><span style={{ color: 'gray' }}>{productDetails.delivery_time}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>LV Termination : </span><span style={{ color: 'gray' }}>{productDetails.lv_termination}</span>
  </div>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
  <span style={{ color: '#333333' }}>HV Termination : </span><span style={{ color: 'gray' }}>{productDetails.hv_termination}</span>
  </div>
</div>
 {/* Quoted */}
<p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Quoted Details :</p>
<div className='row' style={{ paddingLeft: 20 }}>
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Qty Received : </span><span style={{ color: 'gray' }}>{productDetails.qty_received}</span>
  </div>
  {/* <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>Po Rate : </span><span style={{ color: 'gray' }}>{productDetails.poRate} INR</span>
  </div> */}
  <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
    <span style={{ color: '#333333' }}>TFS Code No : </span><span style={{ color: 'gray' }}>{productDetails.tfs_code_no}</span>
  </div>
</div>
</div>
       
                     
                       
                        
       
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
         ))}
          
          
          
          
          </div>
          
        </Dialog>
    </>
  )
}

export default ActiveSop