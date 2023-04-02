import React, { useState, useEffect } from 'react'
import { Container, Modal, Card, ListGroup, Button, Table, ButtonGroup, InputGroup, Dropdown, Form, DropdownButton } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {IoHome } from "react-icons/io5";
import {MdDownload, MdOutlineEdit} from 'react-icons/md';
import Footer from '../../../layouts/footer/Footer'
import Header from '../../../layouts/header/Header';
import {FiEdit} from "react-icons/fi";
import {GiNotebook} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi";
import {SlNotebook} from "react-icons/sl";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSOPModal from './DeleteSOPModal';
import * as API from "../../../apiservice/Apiservice";
import DeleteProductModal from './DeleteProductModal';
import ButtonSpinner from '../../Enquiry/Spinner' 
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { IconButton, Pagination, Stack, Switch } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import ReceiptLongSharp from '@mui/icons-material/ReceiptLongSharp';


 function PendingSOP() {
 
    const[deleteSOPModalShow, setDeleteSOPModalShow] = useState(false)
    const[deleteProductShow, setDeleteProductModalShow] = useState(false)
    const navigate = useNavigate();
    const [SopPendingList, setSopPendingList] = useState([])
    const [totalSopPending, setTotalSopPending] = useState(0)
    const [sopNoTobeDelete, setSopNoTobeDelete] = useState("")
    const [productIdTobeDelete, setProductIdTobeDelete] = useState("")
    const [workOrderRegisterModalShow, setWorkOrderRegisterModalShow] = useState(false)
  const [DownloadSpinnerVisible, setDownloadSpinnerVisible] = useState(false)
  const [downloadErrorVisible, setDownloadErrorVisible] = useState(false)
  const [fromDate , setFromDate ] = React.useState("2023/01/01")
  const [toDate, setToDate] = React.useState("2023/01/01")
  const [page, setPage] = useState(1)
  const [searchSopNotFound, setSearchSopNotfound]=useState(false)
  const[productDeleteSwitch, setProductDeleteSwitch] = useState(false)


    function logOut(){
      console.log("log out is working...")
      window.localStorage.clear();
      navigate('/login')
    }

     //Download workOrder
     const downloadPostContract = (enquiryId, productId) => {
        window.location.href = `http://localhost:8080/api/v1/download-post-contract-review/${enquiryId}/${productId}`;
      };

    async function deletePendingSop(){
        API.deletePendingSop(sopNoTobeDelete)
        .then((res) => {
            fetchPendingSop(page)
         console.log("Delete Pending sop success", res)
         setDeleteSOPModalShow(false)
    
        })
        .catch((err) => {
          console.log("delete pending enquiry failed ", err)
      })
        
    }

    async function deleteProduct(){
      //   API.deleteProduct(productIdTobeDelete)
      //   .then((res) => {
      //       fetchPendingEnquiry()
      //    console.log("Delete Product success", res)
      //    setDeleteProductModalShow(false)
    
      //   })
      //   .catch((err) => {
      //     console.log("delete pending enquiry failed ", err)
      // })
        
    }

    function deleteSOpHandler(sopNo){
          setSopNoTobeDelete(sopNo)
          setDeleteSOPModalShow(true)
    }
    function deleteProductHandler(productId){
        setProductDeleteSwitch(true)
        setProductIdTobeDelete(productId)
        setDeleteProductModalShow(true)
  }
  function cancelDeleteProductConfirmation(){
    setProductDeleteSwitch(false)
    setDeleteProductModalShow(false)
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
    function editProductHandler(ttglEnqRefNo, productId, productStatus){
      navigate('/update-product/'+productId)
  }

    async function fetchPendingSop(page){
        API.getAllPendingSop(page, 5).then((res) => {
            setSopPendingList(res.data.data);
            setTotalSopPending(res.data.totalInDb)
  
           console.log("sop list s ", )
         
        });
    }

    async function removeProductFromSOP(){
      API.removeProductFromSOP(productIdTobeDelete)
      .then((res) => {
        if(res.status==200){
          fetchPendingSop(page)
          console.log("remove Product success", res)
          setDeleteProductModalShow(false)
        }
      
      })
      .catch((err) => {
        console.log("remove product from sop failed!! ", err)
    })
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
                         <Link to="/quotation" style={{ textDecoration: 'none' }}><div style={{ backgroundColor:'',  borderRadius:5, height:'35px', lineHeight:'35px', marginBottom:5 }}><ReceiptLongSharp style={{fontSize:24, marginLeft:10, color:'white', marginTop:-5}}/><span style={{fontWeight:600, fontSize:12, color:'white', marginLeft:10,}}>Quotation</span></div></Link>
                                     
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
                        <div className='col-1' style={{backgroundColor:''}}>

                        </div>

                        
                        <div className='col-5 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:6}}>
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
                            <Button onClick={downloadRegiser} style={{backgroundColor:'#28A745', height:30, width:140, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>{DownloadSpinnerVisible ? <ButtonSpinner/>:<>Receipt Register</>}</Button>
                        </div>
                        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
                            <Link to="/create-new-sop"><Button style={{backgroundColor:'#0059BF', height:30, width:140, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>Add Products</Button></Link>
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
                                    <th style={{width:70}} >Sop Qty</th>
                                    <th style={{width:70}}>Qty Recd</th>
                                    <th style={{width:70}}>Proj Sales Qty</th>
                                    <th style={{width:70}}>Bal Qty</th>
                                    <th style={{width:150}}>Remarks</th>
                                    <th style={{width:70}}>Product No</th>
                                    <th >Remove Product</th>
                                    <th >Edit SOP</th>
                                    <th >Delete SOP</th>
                                    </tr>
                                </thead>
                                {searchSopNotFound?  <tbody>No match found</tbody>:
                                <tbody style={{ verticalAlign:'top', textAlign:'center'}}>
                                {SopPendingList.map((sopDetails, index)=>(
                    <>
                    {(sopDetails.products).length==0? 
                    <>
                       <tr>
                          <td >{sopDetails.sop_no}</td>
                          <td >{sopDetails.sop_date}</td>
                          <td >{sopDetails.sop_period_from} - {sopDetails.sop_period_to}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td ></td>
                       <td  ></td>
                       <td ></td>
                       <td></td>
                       {/* <td style={{cursor:'pointer'}} onClick={()=>{deleteProductHandler(sopDetails.products[index].product_id)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td> */}
                         {/* <td><Switch checked={productDeleteSwitch} inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={()=>deleteProductHandler(sopDetails.products[index].product_id)} color="success" /></td> */}
                       <td style={{cursor:'pointer'}} onClick={()=>{editSopHandler(sopDetails.sop_no)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td>
                       <td style={{cursor:'pointer'}} onClick={()=>{deleteSOpHandler(sopDetails.sop_no)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td>
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
                          <td>{sopDetails.products[index].sop_qty_al_cons}</td>
                          <td>{sopDetails.products[index].qty_recd}</td>
                          <td>{sopDetails.products[index].proj_sales_qty}</td>
                          <td>{sopDetails.products[index].bal_qty}</td>
                          <td>{sopDetails.products[index].sop_remarks}</td>
                          <td>{sopDetails.products[index].batch_no}</td>
                          {/* <td style={{cursor:'pointer'}} onClick={()=>{deleteProductHandler(sopDetails.products[index].product_id)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td> */}
                          <td><Switch checked={false} inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={()=>deleteProductHandler(sopDetails.products[index].product_id)} color="error" /></td>
                          <td rowSpan={(sopDetails.products).length}style={{cursor:'pointer'}} onClick={()=>{editSopHandler(sopDetails.sop_no)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td>
                       
                          {/* <td style={{cursor:'pointer'}} onClick={()=>{editProductHandler(sopDetails.products[index].ttgl_enq_ref_no, sopDetails.products[index].product_id, sopDetails.products[index].product_status)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td> */}
                          <td rowSpan={(sopDetails.products).length} style={{cursor:'pointer'}} onClick={()=>{deleteSOpHandler(sopDetails.sop_no)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td>
                         </tr>
                      </>:<>
                      <tr> 
                      <td style={{textAlign:'left', paddingLeft:5}}>{sopDetails.products[index].ttgl_enq_ref_no} <br/> {sopDetails.products[index].cust_po_date} <br/> {sopDetails.products[index].specification}<br/> {sopDetails.products[index].name}</td>
                          <td>{sopDetails.products[index].sop_qty_al_cons}</td>
                          <td>{sopDetails.products[index].qty_recd}</td>
                          <td>{sopDetails.products[index].proj_sales_qty}</td>
                          <td>{sopDetails.products[index].bal_qty}</td>
                          <td>{sopDetails.products[index].sop_remarks}</td>
                          <td>{sopDetails.products[index].batch_no}</td>
                          {/* <td style={{cursor:'pointer'}} onClick={()=>{deleteProductHandler(sopDetails.products[index].product_id)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td> */}
                          <td><Switch checked={false} inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={()=>deleteProductHandler(sopDetails.products[index].product_id)} color="error" /></td>
                       
                          {/* <td style={{cursor:'pointer'}} onClick={()=>{editProductHandler(sopDetails.products[index].ttgl_enq_ref_no, sopDetails.products[index].product_id, sopDetails.products[index].product_status)}}><IconButton aria-label="delete"  color="primary"><SettingsIcon /></IconButton></td> */}
                          {/* <td  style={{cursor:'pointer'}} onClick={()=>{deleteSOpHandler(sopDetails.products[index].product_id)}}><IconButton aria-label="delete"  color="error"><DeleteIcon /></IconButton></td> */}
                         
                          
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
                  <DeleteSOPModal show={deleteSOPModalShow} onHide={() =>{setDeleteSOPModalShow(false)}} onAction={()=>{deletePendingSop()}}/>  
                  <DeleteProductModal show={deleteProductShow} productId={productIdTobeDelete} onHide={() =>{cancelDeleteProductConfirmation()}} onAction={()=>{removeProductFromSOP()}}/>  
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

export default PendingSOP