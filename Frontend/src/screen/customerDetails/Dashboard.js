import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slide, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as API from "../../services/services";
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { styled } from '@mui/material/styles';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Loader from '../../components/Loader/laoder';
import DeleteDialog from '../../layouts/Dialog/DeleteDialog';


function Dashboard() {

    let {customerId} = useParams()
    const[customerDetails, setCustomerDetials]= useState({})
    const[siteList, setSiteList]= useState([])
    const[labourList, setLabourList]= useState([])
    const[materialList, setMaterialList]= useState([])
    const [receiptPreview, setreceiptPreview] = useState(false)
    const navigate = useNavigate()
    const [expanded, setExpanded] = React.useState(false);
    const [materialDetailsModalShow, setMaterialDetailsModalShow] = useState(false)
    const [selectedWorkType, setSelectedWorkType] = useState("")
    const [paymentList, setPaymentList] = useState([])
    const [customerTotalCreditPayment, setCustomerTotalCreditPayment] = useState(0)
    const [customerTotalDebitPayment, setCustomerTotalDebitPayment] = useState(0)
    const [customerTotalBalancePayment, setCustomerTotalBalancePayment] = useState(0)
    const [workUpdateDialogVisible, setWorkUpdateDialogVisible] = useState(false)
    const [labourUpdateDialogVisible, setLabourUpdateDialogVisible] = useState(false)
    const [materialUpdateDialogVisible, setMaterialUpdateDialogVisible] = useState(false)
    const[selectedWorkUpdateId, setSelectedWorkUpdateId] = useState("")
    const[selectedLabourId, setSelectedLabourId] = useState("")
    const[selectedMaterialId, setSelectedMaterialId] = useState("")
    const[deleteLabourDialogVisible, setDeleteLabourDialogVisible] = useState(false)

    // delete labour
    async function deleteLabour(labourId){
      API.deleteLabour(labourId).then((res) => {
        console.log("labour delete", res)
          if(res.status==200){
            setDeleteLabourDialogVisible(false)

            fetchLabourList(selectedWorkUpdateId)
          }
      });
  }

   // delete material
   async function deleteMaterial(materialId){




    API.deleteMaterial(materialId).then((res) => {
      console.log("material delete", res)
        if(res.status==200){
          

          fetchMaterialList(selectedWorkUpdateId)
        }
    });
}


    const handleCloseMaterialDetails = () => {
        setMaterialDetailsModalShow(false);
    
      };
      const handleCloseReceiptImagePreview = () => {
        setreceiptPreview(false);
    
      };

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


  // product details dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"  ref={ref} {...props} />;
  });
  
    async function fetchCustomerDetails(){
        API.getCustomerDetails(customerId).then((res) => {
            setCustomerDetials(res.data.data);
        });
    }
    const[paymentDetailsLoader, setPaymentDetailsLoader] = useState(false)

    async function fetchPaymentDetails(){
      setPaymentDetailsLoader(true)
        API.getPaymentListByCustId(customerId).then((res) => {
            setPaymentList(res.data.data);
            setCustomerTotalCreditPayment(res.data.totalCreditPayment)
            setCustomerTotalDebitPayment(res.data.totalDebitPayment)
            setCustomerTotalBalancePayment(res.data.totalBalancePayment)
            setPaymentDetailsLoader(false)
        });
    }
    const[siteDetailsLoader, setSiteDetailsLoader] = useState(false)
    async function fetchSiteList(){
         setSiteDetailsLoader(true)
        API.getSiteList(customerId).then((res) => {
            setSiteList(res.data.data);
            setSiteDetailsLoader(false)
        });
    }
    const[labourDetailsLoader, setLabourDetailsLoader] = useState(false)
    async function fetchLabourList(workId){
      setLabourDetailsLoader(true)
        API.getLabourList(workId).then((res) => {
            setLabourList(res.data.data);
            setLabourDetailsLoader(false)
        });
    }
    const[materialDetailsLoader, setMaterialDetailsLoader] = useState(false)
    async function fetchMaterialList(workId){
      setMaterialDetailsLoader(true)
        API.getMaterialList(workId).then((res) => {
            setMaterialList(res.data.data);
            setMaterialDetailsLoader(false)
        });
    }

    async function deletePayment(paymentId){
        API.deletePayment(paymentId).then((res) => {
            fetchPaymentDetails()
        });
    }

    async function deleteCustomer(customerId){
      API.deleteCustomer(customerId).then((res) => {
          fetchPaymentDetails()
          navigate('/home')
      });
  }

  //-------------work update----------------------------------------------------

    async function fetchWorkDetailsByWorkId(workId){
      API.getWorkDetailsByWorkId(workId).then((res) => {
        setCreateWorkFormFileds(res.data.data);
        console.log("here i update work", res.data.data)
        console.log("after update", createWorkFormFields)
      });
  }
    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreateWorkField, setDisableCreateWorkField] = useState(false)
    const [createWorkFormFields, setCreateWorkFormFileds] = useState({
        description:'',
        work_type:'',
        estimate_days:'',
        status:''
    })
  const handleCreateCustoemrFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createWorkFormFields}
        data[event.target.name] = event.target.value; 
        setCreateWorkFormFileds(data);
  }
  const updateWork=async()=>{
    console.log("update Work working...")
    
    console.log(createWorkFormFields)
     
    setLoaderVisilbe(true)

    API.updateWork(selectedWorkUpdateId, createWorkFormFields)
    .then(async(res) => {
     console.log("here is the response for create Work form ", res)
            if(res.status==200){
              fetchSiteList()
            // setDisableCreateWorkField(true)  
           
            setLoaderVisilbe(false)  
            setWorkUpdateDialogVisible(false)         
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Work Not update!!", err)
        console.log("here is the update Work error!! ", err)
  })
 }
 //---------------work update close------------------------------------------------
//----------------labour update--------------------------------------------------
async function fetchLabourDetailsByLabourId(labourId){
  API.getLabourDetailsByLabourId(labourId).then((res) => {
    setCreateLabourFormFileds(res.data.data);
    console.log("here i update work", res.data.data)
  });
}
const[disableCreateLabourField, setDisableCreateLabourField] = useState(false)
const [createLabourFormFields, setCreateLabourFormFileds] = useState({
    purpose:'',
    qty:'',
    from_date:'',
    to_date:'',
    price:'',
    mop:'',
    dealer_name:''
})

const buttonStyle = {
  backgroundColor: '#21ad01', // Your desired background color
  color: 'white', // Text color (optional, adjust as needed)
};

const handleUpdateLabourFormChange= (event)=>{
    console.log( event.target.name)
    let data = {...createLabourFormFields}
    data[event.target.name] = event.target.value; 
    setCreateLabourFormFileds(data);
}

const updateLabour=async()=>{
console.log("create Labour Labouring...")

console.log(createLabourFormFields)
 
setLoaderVisilbe(true)

API.updateLabour(selectedLabourId,  createLabourFormFields)
.then(async(res) => {
 console.log("here is the response for update Labour form ", res)
        if(res.status==200){
        
          fetchLabourList(selectedWorkUpdateId)
          setLoaderVisilbe(false)  
          setLabourUpdateDialogVisible(false)        
        }
})
.catch((err) => {
    setLoaderVisilbe(false) 
    alert("Labour Not updated!!", err)
    console.log("here is the create Labour error!! ", err)
})
}

//--------------- labour update close-------------------------------------------
//-----------------material update---------------------------------------
async function fetchMaterialDetailsByMaterialId(materialId){
  API.getMaterilDetailsByMaterialId(materialId).then((res) => {
    setCreateMaterialFormFileds(res.data.data);
    console.log("here i update material", res.data.data)
  });
}
    const[disableCreateMaterialField, setDisableCreateMaterialField] = useState(false)
    const [createMaterialFormFields, setCreateMaterialFormFileds] = useState({
        name:'',
        price:'',
        qty:'',
        date:'',
        mop:'',
        receipt:'',
        dealer_name:''
    })

  const handleUpdateMaterialFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createMaterialFormFields}
        if(event.target.name=="receipt"){
            console.log('here is reciept if', event.target.files[0])
            data[event.target.name]=event.target.files[0]
            setCreateMaterialFormFileds(data);
        }
        else{
            data[event.target.name] = event.target.value; 
            setCreateMaterialFormFileds(data);
        }
  }

  const updateMaterial=async()=>{
    console.log("update Material Materialing...")
    
    console.log(createMaterialFormFields)
     
    setLoaderVisilbe(true)

    API.updateMaterial(selectedMaterialId, createMaterialFormFields)
    .then(async(res) => {
     console.log("here is the response for create Material form ", res)
            if(res.status==200){
            
              fetchMaterialList(selectedWorkUpdateId)
              setLoaderVisilbe(false)  
              setMaterialUpdateDialogVisible(false)           
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Material Not created!!", err)
        console.log("here is the create Material error!! ", err)
  })
 }

//------------------material update close----------------------------------------
    useEffect(() => {
        fetchCustomerDetails()
        fetchSiteList()
        fetchPaymentDetails()
        }, []);
 
  return (

    <>
     
   <Accordion style={{marginBottom:10, paddingLeft:0, paddingRight:0, marginTop:10}}>
                            <AccordionSummary style={{backgroundColor:'lightgray',}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography style={{color:'black', fontWeight:600}}><span className='history-heading'>Customer Details</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:0}}>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}><span className='history-heading'>Customer Name : <span style={{color:'black'}}>{customerDetails.name}</span> </span></p>
                                </div>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}><span className='history-heading'>Mobile : <span style={{color:'black'}}>{customerDetails.mobile}</span></span></p>
                                </div>
                            </div>
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:0}}>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}><span className='history-heading'>Email ID :  <span style={{color:'black'}}>{customerDetails.email}</span></span></p>
                                </div>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}><span className='history-heading'>GST :  <span style={{color:'black'}}>{customerDetails.gst}</span></span></p>
                                </div>
                            </div>
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:0}}>
                               
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}><span className='history-heading'>Address : <span style={{color:'black'}}>{customerDetails.address}</span></span></p>
                                </div>
                                
                            </div>
                            <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        {/* <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton> */}
        {/* <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }} onClick={()=>deleteCustomer(customerDetails.cust_id)}><DeleteIcon color='error'/></IconButton>                      */}
     </div>
                          
                            </Typography>
                            
                            </AccordionDetails>
   </Accordion>

{/* --------payment details ---------------------- */}
<Accordion defaultExpanded={true} style={{marginBottom:10, paddingLeft:0, paddingRight:0, marginTop:10}}>
                            <AccordionSummary style={{backgroundColor:'lightgray',}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography style={{color:'black', fontWeight:600}}><span className='history-heading'>Payment Details</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{padding:0}}>
                            <Typography >
                                <div className='row' style={{padding:0, margin:0, marginTop:10}}>
                                    <p className='history-heading'>Total Credit Payment: { paymentDetailsLoader?<CircularProgress size={15} style={{color:'lightgray'}}/> :customerTotalCreditPayment}</p>
                                    <p className='history-heading'>Total Debit Payment: {paymentDetailsLoader?<CircularProgress size={15} style={{color:'lightgray'}}/> : customerTotalDebitPayment}</p>
                                    <p className='history-heading'>Total Balance Payment: {paymentDetailsLoader?<CircularProgress size={15} style={{color:'lightgray'}}/> : customerTotalBalancePayment}</p>
                                </div>
                            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell sx={{minWidth:140}} align='center'><span className='history-heading'>Amount</span></StyledTableCell>
            {/* <StyledTableCell >Action</StyledTableCell> */}
            <StyledTableCell sx={{minWidth:120}} align='center'><span className='history-heading'>MOP</span></StyledTableCell>
            <StyledTableCell >Remark</StyledTableCell>
            <StyledTableCell >Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        {paymentDetailsLoader?
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px', width:'100%', marginLeft:'50%' }}>
        <CircularProgress size={25} style={{color:'#FF8C00'}}/>
        </div>
        :
        <TableBody>
          {paymentList.map((paymentDetails) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              <span className='history-heading'>{paymentDetails.date}</span>
              </StyledTableCell>
              <StyledTableCell align='right'>
             {paymentDetails.action=="Credit"? <IconButton aria-label="delete" style={{display:'inline-block'}}>
                <TrendingDownIcon color='success'/>
              </IconButton>:
              <IconButton aria-label="delete" style={{display:'inline-block'}}>
              <TrendingUpIcon color='error'/>
            </IconButton>} <span className='history-heading'>{(paymentDetails.amount).toFixed(2)}</span></StyledTableCell>
              {/* <StyledTableCell>{paymentDetails.action}</StyledTableCell> */}
              <StyledTableCell><span className='history-heading'>{paymentDetails.mop}</span></StyledTableCell>
              <StyledTableCell><span className='history-heading'>{paymentDetails.remark}</span></StyledTableCell>
              <StyledTableCell>
                    <IconButton aria-label="delete" style={{display:'inline-block'}} onClick={()=>deletePayment(paymentDetails.payment_id)}>
                        <DeleteIcon color='error'/>
                    </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
}
      </Table>
    </TableContainer>
                          
                            </Typography>
                            
                            </AccordionDetails>
   </Accordion>
                           

{/* site details--------------------- */}

<Accordion defaultExpanded={true} style={{marginBottom:50, paddingLeft:0, paddingRight:0, marginTop:10}}>
                            <AccordionSummary style={{backgroundColor:'lightgray',}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography style={{color:'black', fontWeight:600}}><span className='history-heading'>Sites Details</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {siteDetailsLoader?
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px', width:'100%', marginLeft:'50%' }}>
        <CircularProgress size={25} style={{color:'#FF8C00'}}/>
        </div>
        :
                            <Typography>
                                {siteList.map((siteDetails, index)=>(
                                    <Accordion expanded={expanded === 'panel'+index+1} onChange={handleChange('panel'+index+1)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    <span className='history-heading'>{siteDetails.name}</span>
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}><span className='history-heading'>{siteDetails.address}</span></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                        {siteDetails.work.map(workDetails=>(
                                            <List sx={{ width: '100%', bgcolor: '#f1f3f4' }}>
                                            <ListItem >
                                                <ListItemAvatar onClick={()=>(fetchLabourList(workDetails.work_id), fetchMaterialList(workDetails.work_id), setSelectedWorkType(workDetails.work_type), setMaterialDetailsModalShow(true),setSelectedWorkUpdateId(workDetails.work_id) )}>
                                                <Avatar>
                                                    <WorkIcon style={{color:'#21ad01'}}/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary=<span className='history-heading'>{workDetails.work_type}</span> secondary=<span className='history-heading'>{"Status : "+workDetails.status}</span> onClick={()=>(fetchLabourList(workDetails.work_id), fetchMaterialList(workDetails.work_id), setSelectedWorkType(workDetails.work_type), setMaterialDetailsModalShow(true),setSelectedWorkUpdateId(workDetails.work_id) )}/>
                                                <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }} onClick={()=>(setWorkUpdateDialogVisible(true), fetchWorkDetailsByWorkId(workDetails.work_id), setSelectedWorkUpdateId(workDetails.work_id))}><EditIcon color='action'/></IconButton>
                                                {/* <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                      */}
   
                                            </ListItem>
                                            <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
         </div>
                                            </List>
                                        ))}
                                           
                                    </Typography>
                                    {/* <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                     
     </div> */}
                                    </AccordionDetails>
                                </Accordion>
                                ))}
                                    
                            </Typography>
}
                            </AccordionDetails>
   </Accordion>

{/* dilog for material and laour details */}

<Dialog
          fullScreen
          open={materialDetailsModalShow}
           onClose={handleCloseMaterialDetails}
          TransitionComponent={Transition}
         hidden={!materialDetailsModalShow}
        disableScrollLock
        >
          <AppBar sx={{ position: '' }} style={{backgroundColor:'#21ad01'}}>
            <Toolbar>

              <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
                {selectedWorkType}
              </Typography>
              {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
              <IconButton
                edge="start"
                color="inherit"
                 onClick={handleCloseMaterialDetails}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ marginLeft: 10,margin:10, paddingTop: 40 }}>
              {/* ------------labour details */}
                <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft:5, marginTop:20 }}>Labour Details :</p>
                {labourDetailsLoader?
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px', width:'100%', marginLeft:'50%' }}>
        <CircularProgress size={25} style={{color:'#FF8C00'}}/>
        </div>
        :
                
             <> 
                
                {labourList.map((labourDetails, index)=>(
                                    <Accordion >
                                    <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="paanel1bh-content"
                                    id="paanel1bh-header"
                                    >
                                    <Typography sx={{ width: '70%', flexShrink: 0 }} >
                                        {labourDetails.purpose}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{backgroundColor:'#f1f3f4'}}>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Number of Person : <span style={{color:'black'}}>{labourDetails.qty}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Price : <span style={{color:'black'}}>{labourDetails.price}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Dealer/Labour Name : <span style={{color:'black'}}>{labourDetails.dealer_name}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Date : <span style={{color:'black'}}>{labourDetails.from_date}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Mode of Payment : <span style={{color:'black'}}>{labourDetails.mop}</span>
                                    </Typography>
                                    <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }} onClick={()=>(setLabourUpdateDialogVisible(true), fetchLabourDetailsByLabourId(labourDetails.labour_id), setSelectedLabourId(labourDetails.labour_id))}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }} onClick={()=>(setSelectedLabourId(labourDetails.labour_id), deleteLabour(labourDetails.labour_id))}><DeleteIcon color='error'/></IconButton>                     
     </div>

                                    </AccordionDetails>
                                </Accordion>
                                ))}
                                </>}

         {/* --------material details */}
         <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft:5 , marginTop:20}}>Material Details :</p>
                
                {materialDetailsLoader?
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px', width:'100%', marginLeft:'50%' }}>
        <CircularProgress size={25} style={{color:'#FF8C00'}}/>
        </div>
        :
                
             <> 
              {materialList.map((materialDetails, index)=>(
                                    <Accordion >
                                    <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="paanel1bh-content"
                                    id="paanel1bh-header"
                                    >
                                    <Typography sx={{ width: '70%', flexShrink: 0 }} >
                                        {materialDetails.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>{materialDetails.price}.00</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{backgroundColor:'#f1f3f4'}}>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Dealer/Labour Name : <span style={{color:'black'}}>{materialDetails.dealer_name}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Date : <span style={{color:'black'}}>{materialDetails.date}</span>
                                    </Typography>
                                   
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Mode of Payment : <span style={{color:'black'}}>{materialDetails.mop}</span>
                                    </Typography>
                                   
                                    <img style={{marginTop:20, width:'auto', height:'auto', maxHeight:'100vh'}} onClick={()=>{setreceiptPreview(true)}} src={"https://tendertrackr.vercel.app/api/v1/material-receipt/"+materialDetails.material_id}></img>
                                     {/* image dilog box */}

                                     <Dialog
                                        open={receiptPreview}
                                        onClose={handleCloseReceiptImagePreview}
                                        hasCloseButton
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    >
                                        {/* <img
                                        style={{ width: 'auto', height: '100%' }}
                                        src="https://images.unsplash.com/photo-1565992441121-4367c2967103"
                                        alt="image"
                                        /> */}
                                        <img
                                        style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }}
                                        src={"https://tendertrackr.vercel.app/api/v1/material-receipt/"+materialDetails.material_id}
                                        alt="image"
                                        />
                                    </Dialog>
                                     {/* close image dialog */}
                                     <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }} onClick={()=>(setMaterialUpdateDialogVisible(true), fetchMaterialDetailsByMaterialId(materialDetails.material_id), setSelectedMaterialId(materialDetails.material_id))}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }} onClick={()=>(setSelectedMaterialId(materialDetails.material_id), deleteMaterial(materialDetails.material_id))}><DeleteIcon color='error'/></IconButton>                     
     </div>
                                    </AccordionDetails>
                                </Accordion>
                                ))}
                                     </>  }
          </div>
         

          <IconButton aria-label="delete"  color="primary"></IconButton>
          
        </Dialog>

{/* payment details--------------- */}

{/* --------dialog for update work details */}
<Dialog open={workUpdateDialogVisible} onClose={()=>setWorkUpdateDialogVisible(false)}>
        <DialogTitle>Update Work Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
         
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-12'>
                        <TextField  margin="dense"  name='description'  disabled={disableCreateWorkField} onChange={event => handleCreateCustoemrFormChange(event)} value={createWorkFormFields.description} label="Description" multiline placeholder='3 main window - 20*30cm in 5 mm, 2 side window - 40*50 in 9mm' type="text" fullWidth variant="standard"
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        />
                    </div>
                    <div className='col-12'>
                        <TextField  margin="dense"  name='work_type'  disabled={disableCreateWorkField} onChange={event => handleCreateCustoemrFormChange(event)} value={createWorkFormFields.work_type} label="Work Type" placeholder='Glass' type="text" fullWidth variant="standard"
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        />
                    </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-12'>
                        <TextField  margin="dense"  name='estimate_days'  disabled={disableCreateWorkField} onChange={event => handleCreateCustoemrFormChange(event)} value={createWorkFormFields.estimate_days} label="Estimate Days" placeholder='5' type="number" fullWidth variant="standard"
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        />
                    </div>
                    <div className='col-12'>
                        <TextField size='small' select name='status'  disabled={disableCreateWorkField} onChange={event => handleCreateCustoemrFormChange(event)} value={createWorkFormFields.status}  placeholder='Done'  label="Status" fullWidth variant="standard"  
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        >
                                <MenuItem value={"Not-Yet-Start"}>Not Yet Start</MenuItem>
                                <MenuItem  value={"Hold"}>Hold </MenuItem>
                                <MenuItem  value={"In-Progress"}>In-Progress</MenuItem>
                                <MenuItem  value={"Completed"}>Completed </MenuItem>
                        </TextField>
                    </div>
                </div>
        </DialogContent>
        <DialogActions>
       
          <Button style={{color:'gray'}} onClick={()=>setWorkUpdateDialogVisible(false)}>Cancel</Button>
          <Button style={buttonStyle} onClick={()=>{updateWork()}}>Update</Button>
        </DialogActions>
      </Dialog>

{/* -----------------close------------------ */}

{/* --------dialog for update labour details */}
<Dialog open={labourUpdateDialogVisible} onClose={()=>setLabourUpdateDialogVisible(false)}>
        <DialogTitle>Update Labour Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <div className='row' style={{marginLeft:0}}>
                
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='purpose'  disabled={disableCreateLabourField} onChange={event => handleUpdateLabourFormChange(event)} value={createLabourFormFields.purpose} label="Purpose" multiline placeholder='3 main window- 20*30' type="text" fullWidth variant="standard"
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='dealer_name'  disabled={disableCreateLabourField} onChange={event => handleUpdateLabourFormChange(event)} value={createLabourFormFields.dealer_name} label="Delaer/Labour Name" placeholder='5' type="text" fullWidth variant="standard"
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        />
                    </div>
                    
                </div>
               
                <div className='row' style={{marginLeft:0}}>
                   
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='price'  disabled={disableCreateLabourField} onChange={event => handleUpdateLabourFormChange(event)} value={createLabourFormFields.price} label="Price" placeholder='5' type="number" fullWidth variant="standard"
                    InputLabelProps={{
                      style: {
                        color: "#21ad01", // Change this to your desired label color
                        borderColor: "#21ad01",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "black", // Change text color
                        borderColor: "#f798a1",
                      },
                      focused: {
                        borderColor: "#55766f", // Change focus border color
                        color: "#55766f", // Change text color
                        
                      },
                    }}
                    />
                 
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                   
                        <TextField  margin="dense"  name='from_date'  disabled={disableCreateLabourField} onChange={event => handleUpdateLabourFormChange(event)} value={createLabourFormFields.from_date} label="From Date" type="datetime-local" fullWidth variant="standard"
                        InputLabelProps={{
                          style: {
                            color: "#21ad01", // Change this to your desired label color
                            borderColor: "#21ad01",
                          },
                        }}
                        InputProps={{
                          style: {
                            color: "black", // Change text color
                            borderColor: "#f798a1",
                          },
                          focused: {
                            borderColor: "#55766f", // Change focus border color
                            color: "#55766f", // Change text color
                            
                          },
                        }}
                        />
                    </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                    
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginTop:10}}>
                    <TextField size='small' select name='mop'  disabled={disableCreateLabourField} onChange={event => handleUpdateLabourFormChange(event)} value={createLabourFormFields.mop}  placeholder='Done'  label="Mode Of Payment" fullWidth variant="standard" 
                    InputLabelProps={{
                      style: {
                        color: "#21ad01", // Change this to your desired label color
                        borderColor: "#21ad01",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "black", // Change text color
                        borderColor: "#f798a1",
                      },
                      focused: {
                        borderColor: "#55766f", // Change focus border color
                        color: "#55766f", // Change text color
                        
                      },
                    }}
                    >
                                <MenuItem value={"Cash"}>Cash</MenuItem>
                                <MenuItem  value={"Phone-Pay"}>Phone Pay </MenuItem>
                                <MenuItem  value={"PayTM"}>PayTM </MenuItem>
                                <MenuItem  value={"Amazon-Pay"}>Amazon Pay</MenuItem>
                                <MenuItem  value={"Google-Pay"}>Google Pay</MenuItem>
                                <MenuItem  value={"Credit-Card"}>Credit Card</MenuItem>
                        </TextField>
                   
                    </div>
                </div>
               
               
        </DialogContent>
        <DialogActions>
          <Button style={{color:'gray'}} onClick={()=>setLabourUpdateDialogVisible(false)}>Cancel</Button>
          <Button style={buttonStyle} onClick={()=>{updateLabour()}}>Update</Button>
        </DialogActions>
      </Dialog>

{/* -----------------close------------------ */}

{/* --------dialog for update material details */}
<Dialog open={materialUpdateDialogVisible} onClose={()=>setMaterialUpdateDialogVisible(false)}>
        <DialogTitle>Update Material Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='name'  disabled={disableCreateMaterialField} onChange={event => handleUpdateMaterialFormChange(event)} value={createMaterialFormFields.name} label="Material Name" multiline placeholder='3 main window- 20*30' type="text" fullWidth variant="standard"
                    InputLabelProps={{
                      style: {
                        color: "#21ad01", // Change this to your desired label color
                        borderColor: "#21ad01",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "black", // Change text color
                        borderColor: "#f798a1",
                      },
                      focused: {
                        borderColor: "#55766f", // Change focus border color
                        color: "#55766f", // Change text color
                        
                      },
                    }}
                    />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='dealer_name'  disabled={disableCreateMaterialField} onChange={event => handleUpdateMaterialFormChange(event)} value={createMaterialFormFields.dealer_name} label="Labour/Dealer Name" placeholder='5' type="text" fullWidth variant="standard"
                    InputLabelProps={{
                      style: {
                        color: "#21ad01", // Change this to your desired label color
                        borderColor: "#21ad01",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "black", // Change text color
                        borderColor: "#f798a1",
                      },
                      focused: {
                        borderColor: "#55766f", // Change focus border color
                        color: "#55766f", // Change text color
                        
                      },
                    }}
                    />
                </div>
            </div>
           
            <div className='row' style={{marginLeft:0}}>
               
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <TextField  margin="dense"  name='price'  disabled={disableCreateMaterialField} onChange={event => handleUpdateMaterialFormChange(event)} value={createMaterialFormFields.price} label="Price" placeholder='5' type="number" fullWidth variant="standard"
                InputLabelProps={{
                  style: {
                    color: "#21ad01", // Change this to your desired label color
                    borderColor: "#21ad01",
                  },
                }}
                InputProps={{
                  style: {
                    color: "black", // Change text color
                    borderColor: "#f798a1",
                  },
                  focused: {
                    borderColor: "#55766f", // Change focus border color
                    color: "#55766f", // Change text color
                    
                  },
                }}
                />
             
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
               
               <TextField  margin="dense"  name='date'  disabled={disableCreateMaterialField} onChange={event => handleUpdateMaterialFormChange(event)} value={createMaterialFormFields.date} label="Date" type="datetime-local" fullWidth variant="standard"
               InputLabelProps={{
                style: {
                  color: "#21ad01", // Change this to your desired label color
                  borderColor: "#21ad01",
                },
              }}
              InputProps={{
                style: {
                  color: "black", // Change text color
                  borderColor: "#f798a1",
                },
                focused: {
                  borderColor: "#55766f", // Change focus border color
                  color: "#55766f", // Change text color
                  
                },
              }}
               />
           </div>
            </div>
            <div className='row' style={{marginLeft:0}}>
              
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField size='small' select name='mop'  disabled={disableCreateMaterialField} onChange={event => handleUpdateMaterialFormChange(event)} value={createMaterialFormFields.mop}  placeholder='Done'  label="Mode Of Payment" fullWidth variant="standard" 
                    InputLabelProps={{
                      style: {
                        color: "#21ad01", // Change this to your desired label color
                        borderColor: "#21ad01",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "black", // Change text color
                        borderColor: "#f798a1",
                      },
                      focused: {
                        borderColor: "#55766f", // Change focus border color
                        color: "#55766f", // Change text color
                        
                      },
                    }}
                    >
                                <MenuItem value={"Cash"}>Cash</MenuItem>
                                <MenuItem  value={"Phone-Pay"}>Phone Pay </MenuItem>
                                <MenuItem  value={"PayTM"}>PayTM </MenuItem>
                                <MenuItem  value={"Amazon-Pay"}>Amazon Pay</MenuItem>
                                <MenuItem  value={"Google-Pay"}>Google Pay</MenuItem>
                                <MenuItem  value={"Credit-Card"}>Credit Card</MenuItem>
                        </TextField>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <TextField  margin="dense"  name='receipt'  disabled={disableCreateMaterialField} onChange={event => handleUpdateMaterialFormChange(event)}  label="Receipt" type="file" fullWidth variant="standard"
                InputLabelProps={{
                  style: {
                    color: "#21ad01", // Change this to your desired label color
                    borderColor: "#21ad01",
                  },
                }}
                InputProps={{
                  style: {
                    color: "black", // Change text color
                    borderColor: "#f798a1",
                  },
                  focused: {
                    borderColor: "#55766f", // Change focus border color
                    color: "#55766f", // Change text color
                    
                  },
                }}
                />
             
                </div>
            </div>
           
               
        </DialogContent>
        <DialogActions>
          <Button style={{color:'gray'}} onClick={()=>setMaterialUpdateDialogVisible(false)}>Cancel</Button>
          <Button style={buttonStyle}  onClick={()=>{updateMaterial()}}>Update</Button>
        </DialogActions>
      </Dialog>

{/* -----------------close------------------ */}
      
{/* ----loader---------- */}
{loaderVisible ? <Loader/>:<></>}

{/* -------loader - close------ */}

{/* -----------delete dialog------- */}
<DeleteDialog open={deleteLabourDialogVisible}  onClose={() =>{setDeleteLabourDialogVisible(false)}} onAction={()=>{deleteLabour()}}/>  
          








          


       
    </>
  )
}

export default Dashboard


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'gray',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));