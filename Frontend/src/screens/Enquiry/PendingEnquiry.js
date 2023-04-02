import React, { useState, useEffect } from 'react'
import { Container, Modal, Card, ListGroup, Button, Table, ButtonGroup, InputGroup, Dropdown, Form, DropdownButton } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {IoHome } from "react-icons/io5";
import './EnquiryList.css';
import {MdDownload, MdOutlineEdit} from 'react-icons/md';
import Footer from '../../layouts/footer/Footer'
import Header from '../../layouts/header/Header';
import {FiEdit} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi";
import {SlNotebook} from "react-icons/sl";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteEnquiryModal from './DeleteEnquiryModal';
import * as API from "../../apiservice/Apiservice";
import DeleteProductModal from './DeleteProductModal';
import ButtonSpinner from './Spinner';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { IconButton, Pagination, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongSharp from '@mui/icons-material/ReceiptLongSharp';


 function PendingEnquiry() {
 
    const[deleteEnquiryModalShow, setDeleteEnquiryModalShow] = useState(false)
    const[deleteProductShow, setDeleteProductModalShow] = useState(false)
    const navigate = useNavigate();
    const [EnquiryPendingList, setEqnuiryPendingList] = useState([])
    const [totalEnquiryPending, setTotalEnquiryPending] = useState(0)
    const [enquiryIdTobeDelete, setEnquiryIdTobeDelete] = useState("")
    const [productIdTobeDelete, setProductIdTobeDelete] = useState("")
    const [workOrderRegisterModalShow, setWorkOrderRegisterModalShow] = useState(false)
  const [DownloadSpinnerVisible, setDownloadSpinnerVisible] = useState(false)
  const [downloadErrorVisible, setDownloadErrorVisible] = useState(false)
  const [fromDate , setFromDate ] = React.useState("2023/01/01")
  const [toDate, setToDate] = React.useState("2023/01/01")
  const [page, setPage] = useState(1)
  const [searchEnquiryNotFound, setSearchEnquriyNotfound]=useState(false)


    function logOut(){
      console.log("log out is working...")
      window.localStorage.clear();
      navigate('/login')
    }

     //Download workOrder
     const downloadPostContract = (enquiryId, productId) => {
        window.location.href = `http://localhost:8080/api/v1/download-post-contract-review/${enquiryId}/${productId}`;
      };

    async function deletePendingEnquiry(){
        API.deletePendingEnquiry(enquiryIdTobeDelete)
        .then((res) => {
            fetchPendingEnquiry()
         console.log("Delete Pending enquiry success", res)
         setDeleteEnquiryModalShow(false)
    
        })
        .catch((err) => {
          console.log("delete pending enquiry failed ", err)
      })
        
    }

    async function deleteProduct(){
        API.deleteProduct(productIdTobeDelete)
        .then((res) => {
            fetchPendingEnquiry()
         console.log("Delete Product success", res)
         setDeleteProductModalShow(false)
    
        })
        .catch((err) => {
          console.log("delete pending enquiry failed ", err)
      })
        
    }

    function deleteEnquiryHandler(enquiryId){
          setEnquiryIdTobeDelete(enquiryId)
          setDeleteEnquiryModalShow(true)
    }
    function deleteProductHandler(productId){
        setProductIdTobeDelete(productId)
        setDeleteProductModalShow(true)
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

    function editEnquiryHandler(enquiryId, enquiryStatus){
        navigate('/update-enquiry/'+enquiryId)
    }
    function editProductHandler(ttglEnqRefNo, productId, productStatus){
      navigate('/update-product/'+productId)
  }

    async function fetchPendingEnquiry(page){
        API.getAllPendingEnquiry(page, 5).then((res) => {
            setEqnuiryPendingList(res.data.data);
            setTotalEnquiryPending(res.data.totalInDb)
  
           console.log("enquiry list s ", )
         
        });
    }

    async function serachEnquiry(searchQuery){
      setSearchEnquriyNotfound(false)
      if(searchQuery==""){
        console.log("here condition true")
        fetchPendingEnquiry(page)
      }
      API.getEnquiryBySearch("processing", searchQuery).then((res) => {
        if(res.status==200){
          setEqnuiryPendingList(res.data.data);
          setTotalEnquiryPending(res.data.total)

         console.log("enquiry list s ", )
        }
       
      }).catch((error)=>{
        console.log("here is the error", error)
        if(error.response.status==400){
        if(error.response.data.total==0){
             setSearchEnquriyNotfound(true)
        }
      }
      })
  }



    const handleChange = async (event, value) => {
      console.log("vlaue in handl change for pagination", value)
      setPage(value)
      await fetchPendingEnquiry(value)
  };

 

    useEffect(() => {
      
        fetchPendingEnquiry(page)
      }, []);
   
  return (
    <>
      <Header />
      <div className='row' style={{backgroundColor:'blue', height:'100%', padding:0, margin:0, marginTop:-12}}>
                 <div className='col-xl-2 col-lg-2 col-sm-2 d-none d-sm-block' style={{backgroundColor:'#0059BF', height:'auto+20', margin:0, padding:0, marginTop:-5}}>
                         <div style={{width:'auto', backgroundColor:'', marginTop:40, marginRight:10, marginLeft:10}}>
                         <Link to="/home" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><IoHome style={{fontSize:20, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>Home</span></div></Link>
                         <Link to="/enquiry" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'white',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><FiEdit style={{fontSize:20, marginLeft:12, color:'#0059BF', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'#0059bf', marginLeft:10,}}>Enquiry</span></div></Link>
                         <Link to="/sop" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><GiNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>SOP</span></div></Link>
                         <Link to="/bom" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><SlNotebook style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12,}}>BOM</span></div></Link>
                         <Link to="/quotation" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><ReceiptLongSharp style={{fontSize:24, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>Quotation</span></div></Link>
                                 
                                 {/* //logout */}
                                 <div onClick={logOut} style={{ backgroundColor:'', cursor:'pointer',  borderRadius:5, height:'35px', lineHeight:'35px', marginTop:250,marginBottom:12, }}><BiLogOut style={{fontSize:20, marginLeft:12, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:12, marginTop:-20, }}>Log Out</span></div>
                                 
                         </div>

                  </div>
                  <div className='col-xl-10 col-lg-10 col-sm-10 col-xs-12' style={{backgroundColor:'white'}}>
                            <div className='row' style={{backgroundColor:'', marginTop:10, marginRight:10, marginLeft:10, paddingLeft:0, paddingRight:0}}>
                        <div className='col-2' style={{backgroundColor:''}}>
                            <div className='row'>
                            <span style={{fontSize:16, fontWeight:600, paddingLeft:0}}>Pending Enquiry</span>
                            </div>
                            <div className='row'>
                            <span style={{fontSize:10, fontWeight:600, color:'#AEADAD',paddingLeft:0}}>Total Count - {totalEnquiryPending}</span>
                            </div>
                            
                            
                        </div>
                        <div className='col-1' style={{backgroundColor:''}}>

                        </div>

                        
                        <div className='col-5 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:6}}>
                        <InputGroup className="mb-2 " size='sm' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:5, height:30 }}>
                                <Form.Select aria-label="Default select example" style={{fontSize:12, fontWeight:600}}>
                                    <option vlaue="enq no" >Enq no</option>
                                    <option value="2" selected>Name</option>
                                    <option value="3">Enq Date</option>
                                </Form.Select>
                                <Form.Control onChange={(e)=>serachEnquiry(e.target.value)} placeholder='Search....' aria-label="Text input with dropdown button" style={{width:'60%' }}/>
                            </InputGroup>
                        </div>
                        <div className='col-2 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:7, textAlign:'right', paddingRight:0}}>
                        {/* <ButtonGroup aria-label="Basic example" className="mb-2" size='sm' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', height:30, borderRadius:3 }}>
                            <Button variant="secondary" style={{fontSize:12, fontWeight:600}}>Today</Button>
                            <Button variant="secondary" style={{fontSize:12, fontWeight:600}}>Week</Button>
                            <Button variant="secondary" style={{fontSize:12, fontWeight:600}}>Month</Button>
                        </ButtonGroup> */}
                        <Button onClick={downloadRegiser} style={{backgroundColor:'#28A745', height:30, width:140, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>{DownloadSpinnerVisible ? <ButtonSpinner/>:<>Receipt Register</>}</Button>
           
                        </div>
                        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
                         
                            <Link to="/create-enquiry"><Button style={{backgroundColor:'#0059BF', height:30, width:140, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>Add Products</Button></Link>
                    
                           
                            
                        
                        </div>
                        <hr style={{marginTop:5}}></hr>
                                    </div>
                            <div className='row' style={{margin:10, marginTop:5, width:'100%'}}>
                                    <Table responsive bordered hover style={{width:'100%', padding:0, fontSize:12, marginLeft:-10}} size="sm">
                                <thead style={{backgroundColor:'#BAB6B6', verticalAlign:'top', textAlign:'center' }}>
                                    <tr>
                                    <th rowSpan={2}>ttgl Enq Ref No</th>
                                    {/* <th rowSpan={2}>Rev</th> */}
                                    <th rowSpan={2}>ttgl Enq Ref Date</th>
                                    <th rowSpan={2}>Name</th>
                                    {/* <th rowSpan={2}>Delt By</th> */}
                                    {/* <th rowSpan={2}>Cust Enq Ref No</th> */}
                                    {/* <th rowSpan={2}>Specification</th> */}
                                    {/* <th rowSpan={2}>Name of Item</th> */}
                                    <th rowSpan={2}>Rating Kva</th>
                                    <th rowSpan={2}>Level</th>
                                    {/* <th colSpan="2">Voltage Rating</th> */}
                                    {/* <th colSpan="2">Losses</th> */}
                                    <th rowSpan={2}>Qty qtd</th>
                                    <th rowSpan={2}>Quoted Estimated</th>
                                    {/* <th rowSpan={2}>Product Status</th> */}
                                    <th rowSpan={2}>Edit Product</th>
                                    <th rowSpan={2}>Delete Product</th>
                                    <th rowSpan={2}>Post-Contract Download</th>
                                    <th rowSpan={2}>Edit Enquiry</th>
                                    <th rowSpan={2}>Delete Enquiry</th>
                                    </tr>
                                    <tr>
                                    {/* <th>Pr</th> */}
                                    {/* <th>Sec</th> */}
                                    {/* <th>50%</th> */}
                                    {/* <th>100%</th> */}
                                    </tr>
                                </thead>
                                {searchEnquiryNotFound?  <tbody>No match found</tbody>:
                                <tbody style={{ verticalAlign:'top', textAlign:'center'}}>
                                {EnquiryPendingList.map((enquiryDetails, index)=>(
                    <>
                    {(enquiryDetails.products).length==0? 
                    <>
                       <tr>
                          <td >{enquiryDetails.ttgl_enq_ref_no}</td>
                          {/* <td >{enquiryDetails.revision}</td> */}
                          <td >{enquiryDetails.ttgl_enq_ref_date}</td>
                          <td >{enquiryDetails.name}</td>
                          {/* <td >{enquiryDetails.delt_by}</td> */}
                          {/* <td >{enquiryDetails.cust_enq_ref_no}</td> */}
                          {/* <td></td> */}
                          {/* <td></td> */}
                          <td></td>
                          <td></td>
                          {/* <td></td> */}
                          {/* <td></td> */}
                          <td></td>
                          <td></td>
                          {/* <td style={{color:'red'}}>{enquiryDetails.enquiry_status==3?'Pending Work Order Generation':'' || enquiryDetails.enquiry_status==2?'Pendinng Post Contract':''}</td> */}
                       <td ></td>
                       <td  ></td>
                       <td ></td>
                       <td style={{cursor:'pointer'}} onClick={()=>{editEnquiryHandler(enquiryDetails.ttgl_enq_ref_no, enquiryDetails.enquiry_status)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td>
                       
                       <td style={{cursor:'pointer'}} onClick={()=>{deleteEnquiryHandler(enquiryDetails.ttgl_enq_ref_no)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td>
                       
                     </tr>
                    </>
                    :
                   <>
                    {enquiryDetails.products.map((productDetails,index)=>(
                        <>
                        {index==0?<>
                        <tr>
                          <td rowSpan={(enquiryDetails.products).length}>{enquiryDetails.ttgl_enq_ref_no}</td>
                          {/* <td rowSpan={(enquiryDetails.products).length}>{enquiryDetails.revision}</td> */}
                          <td rowSpan={(enquiryDetails.products).length}>{enquiryDetails.ttgl_enq_ref_date}</td>
                          <td rowSpan={(enquiryDetails.products).length}>{enquiryDetails.name}</td>
                          {/* <td rowSpan={(enquiryDetails.products).length}>{enquiryDetails.delt_by}</td> */}
                          {/* <td rowSpan={(enquiryDetails.products).length}>{enquiryDetails.cust_enq_ref_no}</td> */}
                     
                          {/* <td>{enquiryDetails.products[index].specification}</td> */}
                          {/* <td>{enquiryDetails.products[index].name_of_item}</td> */}
                          <td>{enquiryDetails.products[index].rating_kva}</td>
                          <td>{enquiryDetails.products[index].level}</td>
                          {/* <td>{enquiryDetails.products[index].voltage_rating_pr}</td> */}
                          {/* <td>{enquiryDetails.products[index].voltage_rating_sec}</td> */}
                          {/* <td>{enquiryDetails.products[index].losses_50}</td> */}
                          {/* <td>{enquiryDetails.products[index].losses_100}</td> */}
                          <td>{enquiryDetails.products[index].qty_qtd}</td>
                          <td>{enquiryDetails.products[index].quoted_estimate}</td>
                          {/* {enquiryDetails.products[index].product_status==1?<td style={{color:'red'}}>Registered</td>:'' || enquiryDetails.products[index].product_status==2?<td style={{color:'blue'}}>Post Contract</td>:'' || enquiryDetails.products[index].product_status==3?<td style={{color:'green'}}>Ready</td>:''} */}
                       <td style={{cursor:'pointer'}} onClick={()=>{editProductHandler(enquiryDetails.products[index].ttgl_enq_ref_no, enquiryDetails.products[index].product_id, enquiryDetails.products[index].product_status)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td>
                       {/* <td style={{cursor:'pointer'}} onClick={()=>{deleteProductHandler(enquiryDetails.products[index].product_id)}}><DeleteIcon style={{fontSize:30, color:'#dc3545'}}/></td> */}
                       <td style={{cursor:'pointer'}} onClick={()=>{deleteProductHandler(enquiryDetails.products[index].product_id)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td>
                       
                       <td >{enquiryDetails.products[index].product_status==2?<IconButton aria-label="delete"  color="success" onClick={()=>{downloadPostContract(enquiryDetails.products[index].ttgl_enq_ref_no, enquiryDetails.products[index].product_id)}} style={{ cursor:'pointer'}}><DownloadIcon /></IconButton>:<IconButton aria-label="delete" disabled ><DownloadIcon /></IconButton>}</td>
                      
                       <td rowSpan={(enquiryDetails.products).length}style={{cursor:'pointer'}} onClick={()=>{editEnquiryHandler(enquiryDetails.ttgl_enq_ref_no, enquiryDetails.enquiry_status)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td>
                       
                       <td rowSpan={(enquiryDetails.products).length}style={{cursor:'pointer'}} onClick={()=>{deleteEnquiryHandler(enquiryDetails.ttgl_enq_ref_no)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td>
                       
                      </tr>
                      </>:<>
                      <tr>
                          {/* <td>{enquiryDetails.products[index].specification}</td> */}
                          {/* <td>{enquiryDetails.products[index].name_of_item}</td> */}
                          <td>{enquiryDetails.products[index].rating_kva}</td>
                          <td>{enquiryDetails.products[index].level}</td>
                          {/* <td>{enquiryDetails.products[index].voltage_rating_pr}</td> */}
                          {/* <td>{enquiryDetails.products[index].voltage_rating_sec}</td> */}
                          {/* <td>{enquiryDetails.products[index].losses_50}</td> */}
                          {/* <td>{enquiryDetails.products[index].losses_100}</td> */}
                          <td>{enquiryDetails.products[index].qty_qtd}</td>
                          <td>{enquiryDetails.products[index].quoted_estimate}</td>
                          {/* {enquiryDetails.products[index].product_status==1?<td style={{color:'red'}}>Registered</td>:'' || enquiryDetails.products[index].product_status==2?<td style={{color:'blue'}}>Post Contract</td>:'' || enquiryDetails.products[index].product_status==3?<td style={{color:'green'}}>Ready</td>:''} */}
                     <td style={{cursor:'pointer'}} onClick={()=>{editProductHandler(enquiryDetails.products[index].ttgl_enq_ref_no, enquiryDetails.products[index].product_id, enquiryDetails.products[index].product_status)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td>
                       <td style={{cursor:'pointer'}} onClick={()=>{deleteProductHandler(enquiryDetails.products[index].product_id)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td>
                       <td >{enquiryDetails.products[index].product_status==2?<IconButton aria-label="delete"  color="success" onClick={()=>{downloadPostContract(enquiryDetails.products[index].ttgl_enq_ref_no, enquiryDetails.products[index].product_id)}} style={{ cursor:'pointer'}}><DownloadIcon /></IconButton>:<IconButton aria-label="delete" disabled ><DownloadIcon /></IconButton>}</td>
                      
                          
                          
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
                                   <Pagination count={(Number((totalEnquiryPending/5).toFixed(0))+1)} page={page} onChange={handleChange} color="primary" />
                            </Stack>
                            </div>
                            
                  </div>
                  <DeleteEnquiryModal show={deleteEnquiryModalShow} enquiryId={enquiryIdTobeDelete} onHide={() =>{setDeleteEnquiryModalShow(false)}} onAction={()=>{deletePendingEnquiry()}}/>  
                  <DeleteProductModal show={deleteProductShow} productId={productIdTobeDelete} onHide={() =>{setDeleteProductModalShow(false)}} onAction={()=>{deleteProduct()}}/>  
                  <Modal
        show={workOrderRegisterModalShow}
        backdrop="static"
        keyboard={false} style={{border:'none'}}
      >
        <Modal.Header style={{height:40, border:'none', backgroundColor:' #0059BF', color:'white',}}>
          <Modal.Title style={{ fontSize:16, fontWeight:500}}>Download Receipt Register</Modal.Title>
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
             {downloadErrorVisible ? <p style={{marginTop:10, color:'red', weight:700, fontSize:12}}>Receipt Register Not available for particular intervals!!</p> :<></>}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setWorkOrderRegisterModalShow(false)} style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Cancel</Button>
          <Button onClick={()=>{workOrderRegisterDownload()}} style={{backgroundColor:'green', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Download</Button>
                     
         
        </Modal.Footer>
      </Modal>
           </div>
           
      <Footer/>
          
      
    </>
  )
}

export default PendingEnquiry