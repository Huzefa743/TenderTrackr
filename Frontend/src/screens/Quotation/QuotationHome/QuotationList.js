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
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Dialog, IconButton, MenuItem, Pagination, Slide, Stack, Switch, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongSharp from '@mui/icons-material/ReceiptLongSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteQuotationModal from './DeleteQuotationModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';






 function QuotationList() {
 
    const navigate = useNavigate();
    const [quotationList, setQuotationList] = useState([])
    const [totalQuotationInDb, setTotalQuotationInDb] = useState(0)
    const [workOrderRegisterModalShow, setWorkOrderRegisterModalShow] = useState(false)
  const [DownloadSpinnerVisible, setDownloadSpinnerVisible] = useState(false)
  const [downloadErrorVisible, setDownloadErrorVisible] = useState(false)
  const [fromDate , setFromDate ] = React.useState("2023/01/01")
  const [toDate, setToDate] = React.useState("2023/01/01")
  const [page, setPage] = useState(1)
  const [searchSopNotFound, setSearchSopNotfound]=useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [quotationIdTobeAction, setQuotationIdToBeAction] = useState(0)
  const open = Boolean(anchorEl);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [quotationDetilsModalVisible, setQuotationDetailsModalVisible] = useState(false)
  const [quotationDetails, setQuotationDetails] = useState({})
  const [userDetails, setUserDetails] = useState({})
  const [productDetails, setProductDetails] = useState([])

  const onAction = (event, quotationId) => {
    setAnchorEl(event.currentTarget);
    setQuotationIdToBeAction(quotationId)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



    function logOut(){
      console.log("log out is working...")
      window.localStorage.clear();
      navigate('/login')
    }



    async function makeSopStatePending(sopNo){
      console.log(" mak sop state pending is working...")
      let today = new Date()
      API.updateSopById(sopNo, {status:"processing"}).then((res)=>{
            console.log(" here is the response:", res)
            if(res.status==200){
              fetchQuotationList(page)
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
          fetchQuotationList(page)
        }
        
  })
  .catch((error)=>console.log("Here is the error", error))
}



  async function deleteQuotation(){
        API.deleteQuotation(quotationIdTobeAction)
        .then((res) => {
            fetchQuotationList(page)
         console.log("Delete quotation  success", res)
         setDeleteModalVisible(false)
    
        })
        .catch((err) => {
          console.log("delete pending enquiry failed ", err)
      })
        
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
        navigate('/update-sop/'+sopNo)
    }
   

    async function fetchQuotationList(page){
        API.getAllQuotaton(page, 5).then((res) => {
            setQuotationList(res.data.data);
            setTotalQuotationInDb(res.data.totalInDb)
  
           console.log("quotation list is ", )
         
        });
    }

 

    async function serachSop(searchQuery){
      setSearchSopNotfound(false)
      if(searchQuery==""){
        console.log("here condition true")
        fetchQuotationList(page)
      }
      API.getSopBySearch("processing", searchQuery).then((res) => {
        if(res.status==200){
          // setSopPendingList(res.data.data);
          // setTotalSopPending(res.data.total)

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
   
   //Download workOrder
   const downloadQuotation = () => {
    window.location.href = `http://localhost:8080/api/v1/download-quotation/${quotationIdTobeAction}`;
  };


    const handleChange = async (event, value) => {
      console.log("vlaue in handl change for pagination", value)
      setPage(value)
      await fetchQuotationList(value)
  };


  //fetch quotation details
  async function fetchQuotationDetails(){
    API.getQuotationById(quotationIdTobeAction).then((res) => {
      setQuotationDetails(res.data.data);
      console.log(quotationDetails)
      if(res.data.data.user){
        setUserDetails(res.data.data.user)
      }
      if(res.data.data.products){
        setProductDetails(res.data.data.products)
      }
    });
  }


  // quotation details modal
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

 

 

    useEffect(() => {
      
      fetchQuotationList(page)
      }, []);
   
  return (
    <>
      <Header />
      <div className='row' style={{backgroundColor:'blue', height:'100%', padding:0, margin:0, marginTop:-12}}>
                 <div className='col-xl-2 col-lg-2 col-sm-2 d-none d-sm-block' style={{backgroundColor:'#0059BF', height:'auto+20', margin:0, padding:0, marginTop:-5}}>
                         <div style={{width:'auto', backgroundColor:'', marginTop:40, marginRight:10, marginLeft:10}}>
                         <Link to="/home" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><IoHome style={{fontSize:20, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>Home</span></div></Link>
                         <Link to="/enquiry" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><FiEdit style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>Enquiry</span></div></Link>
                         <Link to="/sop" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><GiNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>SOP</span></div></Link>
                         <Link to="/bom" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><SlNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>BOM</span></div></Link>
                         <Link to="/quotation" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'white',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><ReceiptLongSharp style={{fontSize:24, marginLeft:10, color:'#0059BF', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'#0059BF', marginLeft:9,}}>Quotation</span></div></Link>
                                  
                                 {/* //logout */}
                                 <div onClick={logOut} style={{ backgroundColor:'', cursor:'pointer',  borderRadius:5, height:'35px', lineHeight:'35px', marginTop:250,marginBottom:12, }}><BiLogOut style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12, marginTop:-20, }}>Log Out</span></div>
                                 
                         </div>

                  </div>
                  <div className='col-xl-10 col-lg-10 col-sm-10 col-xs-12' style={{backgroundColor:'white'}}>
                            <div className='row' style={{backgroundColor:'', marginTop:10, marginRight:10, marginLeft:10, paddingLeft:0, paddingRight:0}}>
                        <div className='col-2' style={{backgroundColor:''}}>
                            <div className='row'>
                            <span style={{fontSize:16, fontWeight:600, paddingLeft:0}}>Quotations</span>
                            </div>
                            <div className='row'>
                            <span style={{fontSize:10, fontWeight:600, color:'#AEADAD',paddingLeft:0}}>Total Count - {totalQuotationInDb}</span>
                            </div>
                        </div>
                        

                        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
                        </div>
                        <div className='col-6 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:6}}>
                       {/* <div className='row'>
                            <div className='col-4' style={{marginRight:0, paddingRight:0}}>

                            <TextField size='small' select name='ratingKvaUnit'  placeholder='250' id="demo-simple-select-autowidth" label="" defaultValue="Name" variant="standard" style={{ fontSize:5, width:'100%',  }} >
                                    <MenuItem value={"Name"}>Quotation Name </MenuItem>
                                    <MenuItem  value={"ID"}>Quotation ID </MenuItem>
                            </TextField>

                            </div>
                       
                            <div className='col-8' style={{marginRight:0, paddingLeft:0}}>
                                        <TextField size='small' name='ratingKva'   placeholder='Search Quotation....' id="standard-basic" label="" variant="standard" style={{ fontSize:12, width:'100%', paddingRight:0 }} />
                                </div>
                            
                            </div> */}
                       
                        <InputGroup className="mb-2 " size='sm' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:5, height:30 }}>
                                <Form.Select aria-label="Default select example" style={{fontSize:12, fontWeight:600}}>
                                    <option vlaue="enq no" >Quo. Ref.</option>
                                    <option value="2" selected>Date</option>
                                    <option value="3">Name</option>
                                </Form.Select>
                                <Form.Control onChange={(e)=>serachSop(e.target.value)} placeholder='Search....' aria-label="Text input with dropdown button" style={{width:'60%' }}/>
                            </InputGroup> 
                        </div>
                        {/* <div className='col-2 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:7, textAlign:'right', paddingRight:0}}> */}
                        {/* <Link to="/pending-sop"><Button style={{marginRight:0  ,backgroundColor:'gray', height:30, width:130, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', marginRight:25, border:'0px'}}>Quotations</Button></Link> */}
             
                            {/* {/* </div> */}
                       
                        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
                               <Link to="/create-quotation"><Button style={{backgroundColor:'#0059BF', height:30, width:140, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>Create Quotation</Button></Link>
                           
                              </div>
                        <hr style={{marginTop:5}}></hr>
                                    </div>
                        <div className='row' style={{margin:10, marginTop:5, width:'100%'}}>
                            <Table responsive bordered hover style={{width:'100%', padding:0, fontSize:12, marginLeft:-10}} size="sm">
                                <thead style={{backgroundColor:'#BAB6B6', verticalAlign:'top', textAlign:'center' }}>
                                    <tr>
                                    <th>Quotation Ref</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <th>Contact Person</th>
                                    <th>Actions</th>
                                    {/* <th>Edit</th>
                                    <th>Delete</th> */}
                                    </tr>
                                </thead>
                               
                                <tbody style={{ verticalAlign: 'top', textAlign: 'center' }}>
                                  {quotationList.map((quotationDetails, index)=>(
                                       <tr>
                                       <td >TTGPL/AK/S/{quotationDetails.year}/{quotationDetails.quotation_id}</td>
                                       <td >{quotationDetails.enquiry_date}</td>
                                       <td >{quotationDetails.name}</td>
                                       <td>{quotationDetails.contact_number}</td>
                                       <td>{quotationDetails.address}</td>
                                       <td>{quotationDetails.contact_person_name}</td>
                                       <td> 
                                       <IconButton
                                           aria-label="more"
                                           id="long-button"
                                           aria-controls={open ? 'long-menu' : undefined}
                                           aria-expanded={open ? 'true' : undefined}
                                           aria-haspopup="true"
                                           onClick={(e)=>onAction(e,quotationDetails.quotation_id)}
                                       >
                                           <MoreVertIcon />
                                       </IconButton>
                                           
                                         </td>
                                   </tr>  
                                  ))}
                                        
                                        
                                </tbody>
 
                            </Table>
                            
                        </div>

                        <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                               
                            <MenuItem onClick={()=>(fetchQuotationDetails(), setQuotationDetailsModalVisible(true), handleClose())} >
                            <DescriptionIcon color="primary" />
                            Details
                            </MenuItem>
                            <MenuItem  onClick={()=>(handleClose(), navigate('/update-quotation/'+quotationIdTobeAction))}>
                            <EditIcon color="info" />
                            Edit
                            </MenuItem>
                            <MenuItem  onClick={()=>(downloadQuotation(), handleClose())}>
                            <DownloadIcon color="success" />
                            Download
                            </MenuItem>
                            <MenuItem onClick={()=>(setDeleteModalVisible(true), handleClose())} >
                            <DeleteIcon color='error' />
                            Delete
                            </MenuItem>
                          
                        </StyledMenu>
                                    <div className='row' style={{margin:20,  backgroundColor:'', float:'right', marginRight:0}}>
                            <Stack spacing={0}>
                              {console.log( "here is the pagination: ", Math.floor(11/5))}
                                   <Pagination count={(Number((totalQuotationInDb/5).toFixed(0))+1)} page={page} onChange={handleChange} color="primary" />
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

           {/*delete Modal calling */}
           <DeleteQuotationModal show={deleteModalVisible}  onHide={() =>{setDeleteModalVisible(false)}} onAction={()=>{deleteQuotation()}}/>  
          
           {/*show quotation details  */}
           <Dialog
          fullScreen
          open={quotationDetilsModalVisible}
          onClose={()=>setQuotationDetailsModalVisible(false)}
          TransitionComponent={Transition}
        hidden={!quotationDetilsModalVisible}
        disableScrollLock
        >
          <AppBar sx={{ position: '' }}>
            <Toolbar>

              <Typography sx={{ ml: 2, mr:2, flex: 1 }} variant="h6" component="div">
                Quotation Details - TTGPL/AK/{quotationDetails.creatorNickName}/{quotationDetails.year}/{quotationDetails.quotationId}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={()=>setQuotationDetailsModalVisible(false)}
                aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ marginLeft: 40, marginRight:40, paddingTop: 80, paddingBottom:50 }}>

           {/* quotation details */}
          <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Quotation Basic Details :</p>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Enquiry Date : </span><span style={{ color: 'gray' }}> {quotationDetails.enquiryDate}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Name : </span><span style={{ color: 'gray' }}>{quotationDetails.name}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Contact Person : </span><span style={{ color: 'gray' }}> {quotationDetails.contactPersonName}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Contact Number : </span><span style={{ color: 'gray' }}> {quotationDetails.contactNumber}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Address : </span><span style={{ color: 'gray' }}>{quotationDetails.address}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Subject   : </span><span style={{ color: 'gray' }}> {quotationDetails.subject}</span>
            </div>
          </div>
          
          {/* Annexure A details */}
          <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Annexure-'A' Price Schedule :</p>
         
         {productDetails.map((productDetail, index)=>(
                    <Accordion style={{ marginBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                    <AccordionSummary style={{ backgroundColor: '#f2f2f2', }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header">
                      <Typography style={{ color: 'black', fontWeight: 600, color: 'gray', width: '100%' }}>
                        Unit - {index+1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{paddingBottom:20}}>

                      <div className='row' style={{ paddingLeft: 20 }}>
                        <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                          <span style={{ color: '#333333' }}>Description : </span><span style={{ color: 'gray' }}> {productDetail.description}</span>
                        </div>
                        <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                          <span style={{ color: '#333333' }}>Qty : </span><span style={{ color: 'gray' }}>{productDetail.qty}</span>
                        </div>
                        <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                          <span style={{ color: '#333333' }}>Unit Ex Works Price : </span><span style={{ color: 'gray' }}> {productDetail.unit_ex_works_price}</span>
                        </div>
                      </div>
                      <div className='row' style={{ paddingLeft: 20 }}>
                        <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                          <span style={{ color: '#333333' }}>IGST@18% : </span><span style={{ color: 'gray' }}> {productDetail.igst18}</span>
                        </div>
                        <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                          <span style={{ color: '#333333' }}>F & I : </span><span style={{ color: 'gray' }}>{productDetail.f_and_i}</span>
                        </div>
                        <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
                          <span style={{ color: '#333333' }}>Grand Total : </span><span style={{ color: 'gray' }}> {productDetail.grand_total}</span>
                        </div>
                      </div>
       
                     
                       
                        
       
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
         ))}
          
          
             {/* Annexure B details */}
          <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Annexure-'B' Terms & Conditions :</p>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Price Quoted Base : </span><span style={{ color: 'gray' }}> {quotationDetails.priceQuoteBase}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Offer Vlidity : </span><span style={{ color: 'gray' }}>{quotationDetails.offerValidity}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Advance Payment : </span><span style={{ color: 'gray' }}> {quotationDetails.advancePayment}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Balance Payment : </span><span style={{ color: 'gray' }}> {quotationDetails.balancePayment}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Liquidated Damages : </span><span style={{ color: 'gray' }}>{quotationDetails.liquidatedDamages}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Delivery Time   : </span><span style={{ color: 'gray' }}> {quotationDetails.deliveryTime}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Warranty Dispatch : </span><span style={{ color: 'gray' }}> {quotationDetails.warrantyAfterDispatch}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Warranty Commissioning : </span><span style={{ color: 'gray' }}>{quotationDetails.warrantyAfterCommissioning}</span>
            </div>
           
          </div>

            {/* Annexure C details */}
            <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Annexure -'C' Guranteed Technical Particulars :</p>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Rating KVA : </span><span style={{ color: 'gray' }}> {quotationDetails.ratingKva}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Numer of Phases : </span><span style={{ color: 'gray' }}>{quotationDetails.noOfPhases}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Primary Voltage : </span><span style={{ color: 'gray' }}> {quotationDetails.primaryVoltage}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Secondary Voltage : </span><span style={{ color: 'gray' }}> {quotationDetails.secondaryVoltage}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Vector Group : </span><span style={{ color: 'gray' }}>{quotationDetails.vectorGroup}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Tapping On Primary   : </span><span style={{ color: 'gray' }}> {quotationDetails.tapingOnPrimary}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Cooling : </span><span style={{ color: 'gray' }}> {quotationDetails.cooling}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Frequency : </span><span style={{ color: 'gray' }}>{quotationDetails.frequency}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>In Oil By Thermometer : </span><span style={{ color: 'gray' }}> {quotationDetails.tempInWindingByThermometer}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
           
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>In Winding by Resistance : </span><span style={{ color: 'gray' }}>{quotationDetails.tempInWindingByResistance}</span>
            </div>
            {quotationDetails.loadSelect=="first"?
            <>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Losses 50   : </span><span style={{ color: 'gray' }}> {quotationDetails.losses50} {quotationDetails.losses50Unit}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Losess 100   : </span><span style={{ color: 'gray' }}> {quotationDetails.losses100} {quotationDetails.losses100Unit}</span>
            </div>
            </>:
            <>
                   <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>No Load Losses   : </span><span style={{ color: 'gray' }}> {quotationDetails.noLoadLosses} {quotationDetails.noLoadLossesUnit}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Load Losess   : </span><span style={{ color: 'gray' }}> {quotationDetails.loadLosses} {quotationDetails.loadLossesUnit}</span>
            </div>
          
            </>}
          
            </div>

             {/* Annexure D details */}
             <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Annexure-'D' Standard list of fitting and accessories :</p>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Rating KVA : </span><span style={{ color: 'gray' }}> {quotationDetails.ratingKvaListOfFitting} {quotationDetails.ratingKvaUnit}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>HV Terminations : </span><span style={{ color: 'gray' }}>{quotationDetails.hvTermination}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>LV Terminations : </span><span style={{ color: 'gray' }}> {quotationDetails.lvTermination}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Buchholz Relay : </span><span style={{ color: 'gray' }}> {quotationDetails.buchholzRelay}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Rating & Diagram Plate : </span><span style={{ color: 'gray' }}>{quotationDetails.ratingAndDiagramPlate}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Earthing Terminals   : </span><span style={{ color: 'gray' }}> {quotationDetails.earthingTerminals}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Lifting Lugs : </span><span style={{ color: 'gray' }}> {quotationDetails.liftingLugs}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Thermometer Pockets : </span><span style={{ color: 'gray' }}>{quotationDetails.thermometerPockets}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Air Release Hole with Plug   : </span><span style={{ color: 'gray' }}> {quotationDetails.airReleaseHoleWithPlug}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Explosion Double Diaphragm : </span><span style={{ color: 'gray' }}> {quotationDetails.explosionDiaphragm}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Drain Cum Bottom Filter Valve : </span><span style={{ color: 'gray' }}>{quotationDetails.drainCumBottomFilterValve}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Top Filter Valve with Plug   : </span><span style={{ color: 'gray' }}> {quotationDetails.topFilterValveWithPlug}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Oil Conservator with Drain Plug : </span><span style={{ color: 'gray' }}> {quotationDetails.oilConservatorWithDrainPlug}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Silica Gel Breather : </span><span style={{ color: 'gray' }}>{quotationDetails.silicaGelBreather}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Cooling radiators   : </span><span style={{ color: 'gray' }}> {quotationDetails.coolingRadiators}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>OTI : </span><span style={{ color: 'gray' }}> {quotationDetails.oti}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>WTI : </span><span style={{ color: 'gray' }}>{quotationDetails.wti}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Marshalling Box : </span><span style={{ color: 'gray' }}> {quotationDetails.marshallingBox}</span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Off Load Tap Changer : </span><span style={{ color: 'gray' }}> {quotationDetails.offLoadTapChanger}</span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>On Load Tap Changer : </span><span style={{ color: 'gray' }}> {quotationDetails.onLoadTapChanger}</span>
            </div>
           
          </div>
         
          {/* Creaor Details */}
          <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft: 0 }}>Creator Details :</p>
          <div className='row' style={{ paddingLeft: 20 }}>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Creator Name : </span><span style={{ color: 'gray' }}>{userDetails.first_name} {userDetails.last_name} </span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Designation : </span><span style={{ color: 'gray' }}>{userDetails.designation} </span>
            </div>
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Mobile Number : </span><span style={{ color: 'gray' }}>{userDetails.mobile_number} </span>
            </div>
          </div>
          <div className='row' style={{ paddingLeft: 20 }}>
            
            <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 col-xs-12'>
              <span style={{ color: '#333333' }}>Nick Name : </span><span style={{ color: 'gray' }}>{userDetails.nick_name} </span>
            </div>
          </div>
          
          </div>
          
        </Dialog>

           
      <Footer/>
          
      
    </>
  )
}

export default QuotationList


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: "#0059BF",
          color:'white'
        },
      },
    },
  }));