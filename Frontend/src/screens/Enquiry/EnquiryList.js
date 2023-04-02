import React, { useEffect, useState } from 'react'
import { Container, Modal, Card, ListGroup, Button, Table, ButtonGroup, InputGroup, Dropdown, Form, DropdownButton, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {IoHome } from "react-icons/io5";
import './EnquiryList.css';
import {MdDownload} from 'react-icons/md'
import ButtonPr from './ButtonPr';
import WorkOrderRegisterModal from './WorkOrderRegisterModal';
import ButtonSpinner from './Spinner';
import * as API from "../../apiservice/Apiservice";
import fileDownload from "js-file-download";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { Stack, Switch } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { FaMonument } from 'react-icons/fa';
import moment from 'moment'


 function EnquiryList() {
  const [workOrderRegisterModalShow, setWorkOrderRegisterModalShow] = useState(false)
  const [DownloadSpinnerVisible, setDownloadSpinnerVisible] = useState(false)
  const [EnquiryList, setEqnuiryList] = useState([])
  const [totalEnquiryInDB, setTotalEnquiryInDB] = useState(0)
  const [totalEnquiry, setTotalEnquiry] = useState(0)
  // to download work order register
  const [fromDate , setFromDate ] = React.useState("2023/01/01")
  const [toDate, setToDate] = React.useState("2023/01/01")
  const [downloadErrorVisible, setDownloadErrorVisible] = useState(false)
  const[page, setPage] = useState(1)
  const[limit, setLimit] = useState(5)
 // const [enquiryDeployedStatus, setenquiryDeployedStatus] = useState(false)
  const [enquiryState, setEnquiryState] = useState(true)

  const nextPage=()=>{

  }
  const prevPage=()=>{

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
 
  const handleChange = async (event, value) => {
    console.log("vlaue in handl change for pagination", value)
    setPage(value)
    await fetchEnquiry(value)
};

  

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

     //Download workOrder
     const downloadWorkOrder = (ttglEnqRefNo) => {
      window.location.href = `http://localhost:8080/api/v1/download-enquiry-wo/${ttglEnqRefNo}`;
    };
    
     function workOrderRegisterDownload(){
      console.log(" function work order register is working...", fromDate, toDate)
      setDownloadErrorVisible(false)
      API.generateWorkOrderRegister(fromDate, toDate).then((res) => {
        if(res.status==200){
          console.log(" here is success")
          window.location.href = `http://localhost:8080/api/v1/download-enquiry-wo-register?fromDate=${fromDate}&toDate=${toDate}`;
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

    function fetchEnquiry(page){
      API.getAllEnquiry(page, 5).then((res) => {
        setEqnuiryList(res.data.data);
        setTotalEnquiryInDB(res.data.totalInDb)

         console.log("enquiry list s ", EnquiryList)
       
      });
    }
    async function makeEnquiryStatePending(enquiryId){
      console.log(" mak enquiry state pending is working...")
      API.updateNewEnquiry(enquiryId, {status:"processing"}).then((res)=>{
            console.log(" here is the response:", res)
            if(res.status==200){
                 fetchEnquiry(page)
            }
            
      })
      .catch((error)=>console.log("Here is the error", error))
}
async function makeEnquiryDeployed(enquiryId){
  console.log(" mak enquiry state pending is working...")
  API.updateNewEnquiry(enquiryId, {status:"deployed"}).then((res)=>{
        console.log(" here is the response:", res)
        if(res.status==200){
            fetchEnquiry(page)
        }
        
  })
  .catch((error)=>console.log("Here is the error", error))
}

async function paginationValue(x){
  let result = Number(x)/5
  console.log("here is result ", result)
  return result
}


    useEffect(() => {
      
        fetchEnquiry(page)
    }, []);

    
   
  return (
    <>
      
          <div className='row' style={{backgroundColor:'', marginTop:10, marginRight:10, marginLeft:10, paddingLeft:0, paddingRight:0}}>
            <div className='col-2' style={{backgroundColor:''}}>
                <div className='row'>
                  
                <span style={{fontSize:16, fontWeight:600, paddingLeft:0}}>Enquiry</span>
                </div>
                <div className='row'>
                <span style={{fontSize:10, fontWeight:600, color:'#AEADAD',paddingLeft:0}}>Total Count - {totalEnquiryInDB}</span>
                </div>
                
                
            </div>
            
            <div className='col-5 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:6}}>
            <InputGroup className="mb-2 " size='sm' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:5, height:30 }}>
                    <Form.Select aria-label="Default select example" style={{fontSize:12, fontWeight:600}}>
                        <option vlaue="enq no" selected>Enq no</option>
                        <option value="2">Name</option>
                        <option value="3">Enq Date</option>
                    </Form.Select>
                    <Form.Control placeholder='Search....' aria-label="Text input with dropdown button" style={{width:'60%' }}/>
                </InputGroup>
            </div>
            <div className='col-2 d-none d-sm-block d-sm-none d-md-block' style={{backgroundColor:'',marginTop:7, textAlign:'right', paddingRight:0}}>
            {/* <ButtonGroup aria-label="Basic example" className="mb-2" size='sm' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', height:30, borderRadius:3 }}>
                <Button variant="secondary" style={{fontSize:12, fontWeight:600}}>Today</Button>
                <Button variant="secondary" style={{fontSize:12, fontWeight:600}}>Week</Button>
                <Button variant="secondary" style={{fontSize:12, fontWeight:600}}>Month</Button>
            </ButtonGroup> */}
            <Link to="/pending-enquiry"><Button style={{marginRight:0  ,backgroundColor:'gray', height:30, width:130, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', marginRight:25, border:'0px'}}>Pending Enquiries</Button></Link>
               
            </div>
            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6' style={{backgroundColor:'', textAlign:'right', paddingRight:0, marginTop:7, }}>
              <div className='row' style={{textAlign:'right'}}>
                <div className="col-6" style={{backgroundColor:'', textAlign:'right',padding:0}}>
                 <Link to="/create-new-enquiry"><Button style={{marginRight:0  ,backgroundColor:'#0059BF', height:30, width:130, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>Create New Enquiry</Button></Link>
                
                {/* <Link to="/pending-enquiry" style={{textDecoration:'none'}}><ButtonPr width={90} height={30} label="Login" fontSize={12} fontWeight={700} /></Link>
               */}
                </div>
                <div className="col-6" style={{backgroundColor:'', textAlign:'right'}}>
                <Button onClick={downloadRegiser} style={{backgroundColor:'#28A745', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>{DownloadSpinnerVisible ? <ButtonSpinner/>:<>Download</>}</Button>
           
                </div>
              </div>
                
               
            </div>
            <hr style={{marginTop:5}}></hr>
          </div>
          <div className='row' style={{margin:10, marginTop:5, width:'100%'}}>
        
      <Table responsive="xl" bordered hover style={{width:'100%', padding:0, fontSize:12, marginLeft:-10}} size="sm">
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
          <th colSpan="2">Losses</th>
          <th rowSpan={2}>Qty qtd</th>
          <th rowSpan={2}>Quoted Estimated</th>
          <th rowSpan={2}>State</th>
          <th rowSpan={2}>Work Order Download</th>
          <th rowSpan={2}>Deployed</th>
        </tr>
        <tr>
          {/* <th>Pr</th> */}
          {/* <th>Sec</th> */}
          <th>50%</th>
          <th>100%</th>
        </tr>
      </thead>
      <tbody style={{ verticalAlign:'top', textAlign:'center'}}>
      {EnquiryList.map((enquiryDetails, index)=>(
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
                        <td>{enquiryDetails.products[index].losses_50}</td>
                        <td>{enquiryDetails.products[index].losses_100}</td>
                        <td>{enquiryDetails.products[index].qty_qtd}</td>
                        <td>{enquiryDetails.products[index].quoted_estimate}</td>
                        <td rowSpan={(enquiryDetails.products).length}> <Switch disabled={enquiryDetails.status=="deployed"} checked={enquiryState} onClick={() => makeEnquiryStatePending(enquiryDetails.ttgl_enq_ref_no)} value="active" inputProps={{ 'aria-label': 'secondary checkbox' }} /></td>
                        <td rowSpan={(enquiryDetails.products).length}><MdDownload onClick={()=>{downloadWorkOrder(enquiryDetails.ttgl_enq_ref_no)}} style={{fontSize:30, color:'green', cursor:'pointer'}}/></td>    
                        <td rowSpan={(enquiryDetails.products).length}> <Switch disabled={enquiryDetails.status=="deployed"} checked={enquiryDetails.status=="deployed"} onClick={() => makeEnquiryDeployed(enquiryDetails.ttgl_enq_ref_no)} value="active" inputProps={{ 'aria-label': 'secondary checkbox' }} color="success" /></td>
                      
                    </tr>
                    </>:<>
                    <tr>
                        {/* <td>{enquiryDetails.products[index].specification}</td> */}
                        {/* <td>{enquiryDetails.products[index].name_of_item}</td> */}
                        <td>{enquiryDetails.products[index].rating_kva}</td>
                        <td>{enquiryDetails.products[index].level}</td>
                        {/* <td>{enquiryDetails.products[index].voltage_rating_pr}</td> */}
                        {/* <td>{enquiryDetails.products[index].voltage_rating_sec}</td> */}
                        <td>{enquiryDetails.products[index].losses_50}</td>
                        <td>{enquiryDetails.products[index].losses_100}</td>
                        <td>{enquiryDetails.products[index].qty_qtd}</td>
                        <td>{enquiryDetails.products[index].quoted_estimate}</td>
                        
                        
                        
                    </tr>
                    </>}
                      </>
                    ))}
                   </>
      ))}
                 
       
       
        
      </tbody>
    </Table>
  
          </div>
          <div className='row' style={{margin:10, float:'right', marginRight:0}}>
                           <Stack spacing={0}>
                              <Pagination count={(totalEnquiry/5)+1} page={page} onChange={handleChange} color="primary" />
                           </Stack>

    <Modal
        show={workOrderRegisterModalShow}
        backdrop="static"
        keyboard={false} style={{border:'none'}}
      >
        <Modal.Header style={{height:40, border:'none', backgroundColor:' #0059BF', color:'white',}}>
          <Modal.Title style={{ fontSize:16, fontWeight:500}}>Download Work-Order Register</Modal.Title>
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
             {downloadErrorVisible ? <p style={{marginTop:10, color:'red', weight:700, fontSize:12}}>Work Order Not available for particular intervals!!</p> :<></>}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setWorkOrderRegisterModalShow(false)} style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Cancel</Button>
          <Button onClick={()=>{workOrderRegisterDownload()}} style={{backgroundColor:'green', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Download</Button>
                     
         
        </Modal.Footer>
      </Modal>

    {/* <WorkOrderRegisterModal show={workOrderRegisterModalShow} onClick={()=>{workOrderRegisterDownload()}}  onHide={() => setWorkOrderRegisterModalShow(false)}/> */}
      
          </div>
      
    </>
  )
}

export default EnquiryList






{/* <Table responsive="xl" bordered hover style={{width:'100%', padding:0, fontSize:12, marginLeft:-10}} size="sm">
<thead style={{backgroundColor:'#BAB6B6', verticalAlign:'top', textAlign:'center' }}>
  <tr>
    <th rowSpan={2}>ttgl Enq Ref No</th>
    <th rowSpan={2}>Rev</th>
    <th rowSpan={2}>ttgl Enq Ref Date</th>
    <th rowSpan={2}>Name</th>
    <th rowSpan={2}>Delt By</th>
    <th rowSpan={2}>Cust Enq Ref No</th>
    <th rowSpan={2}>Specification</th>
    <th rowSpan={2}>Name of Item</th>
    <th rowSpan={2}>Rating Kva</th>
    <th rowSpan={2}>Level</th>
    <th colSpan="2">Voltage Rating</th>
    <th colSpan="2">Losses</th>
    <th rowSpan={2}>Qty qtd</th>
    <th rowSpan={2}>Quoted Estimated</th>
    <th rowSpan={2}>Work Order Download</th>
  </tr>
  <tr>
    <th>Pr</th>
    <th>Sec</th>
    <th>50%</th>
    <th>100%</th>
  </tr>
</thead>
<tbody style={{ verticalAlign:'top', textAlign:'center'}}>
{EnquiryList.map((enquiryDetails)=>(
               <tr>
               <td>{enquiryDetails.ttgl_enq_ref_no}</td>
               <td>{enquiryDetails.revision}</td>
               <td>{enquiryDetails.ttgl_enq_ref_date}</td>
               <td>{enquiryDetails.name}</td>
               <td>{enquiryDetails.delt_by}</td>
               <td>{enquiryDetails.cust_enq_ref_no}</td>
               <td>{enquiryDetails.specification}</td>
               <td>{enquiryDetails.name_of_item}</td>
               <td>{enquiryDetails.rating_kva}</td>
               <td>{enquiryDetails.level}</td>
               <td>{enquiryDetails.voltage_rating_pr}</td>
               <td>{enquiryDetails.voltage_rating_sec}</td>
               <td>{enquiryDetails.losses_50}</td>
               <td>{enquiryDetails.losses_100}</td>
               <td>{enquiryDetails.qty_qtd}</td>
               <td>{enquiryDetails.quoted_estimate}</td>
               <td ><MdDownload onClick={()=>{downloadWorkOrder(enquiryDetails.enquiry_id)}} style={{fontSize:30, color:'green', cursor:'pointer'}}/></td>
             </tr>
              ))}
 
 
  
</tbody>
</Table> */}
