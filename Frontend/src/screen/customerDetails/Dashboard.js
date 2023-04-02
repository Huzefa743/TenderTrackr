import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, Slide, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
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


function Dashboard() {

    let {customerId} = useParams()
    const[customerDetails, setCustomerDetials]= useState({})
    const[siteList, setSiteList]= useState([])
    const[labourList, setLabourList]= useState([])
    const[materialList, setMaterialList]= useState([])
    const [receiptPreview, setreceiptPreview] = useState(false)
  
    const [expanded, setExpanded] = React.useState(false);
    const [materialDetailsModalShow, setMaterialDetailsModalShow] = useState(false)
    const [selectedWorkType, setSelectedWorkType] = useState("")

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

    async function fetchSiteList(){
        API.getSiteList(customerId).then((res) => {
            setSiteList(res.data.data);
        });
    }

    async function fetchLabourList(workId){
        API.getLabourList(workId).then((res) => {
            setLabourList(res.data.data);
        });
    }

    async function fetchMaterialList(workId){
        API.getMaterialList(workId).then((res) => {
            setMaterialList(res.data.data);
        });
    }

    useEffect(() => {
      
      
        fetchCustomerDetails()
        fetchSiteList()
        }, []);
 
  return (

    <>
     
   <Accordion style={{marginBottom:20, paddingLeft:0, paddingRight:0, marginTop:10}}>
                            <AccordionSummary style={{backgroundColor:'lightgray',}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography style={{color:'black', fontWeight:600}}>Customer Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:0}}>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>Customer Name : <span style={{color:'black'}}>{customerDetails.name} </span></p>
                                </div>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>Mobile : <span style={{color:'black'}}>{customerDetails.mobile}</span></p>
                                </div>
                            </div>
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:0}}>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>Email ID :  <span style={{color:'black'}}>{customerDetails.email}</span></p>
                                </div>
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>GST :  <span style={{color:'black'}}>{customerDetails.gst}</span></p>
                                </div>
                            </div>
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:0}}>
                               
                                <div className='col-lg-6 col-sm-12 col-xs-12'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>Address : <span style={{color:'black'}}>{customerDetails.address}</span></p>
                                </div>
                                
                            </div>
                            </Typography>
                            <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                     
     </div>
                            </AccordionDetails>
   </Accordion>

{/* site details--------------------- */}

<Accordion style={{marginBottom:20, paddingLeft:0, paddingRight:0, marginTop:10}}>
                            <AccordionSummary style={{backgroundColor:'lightgray',}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography style={{color:'black', fontWeight:600}}>Sites Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                {siteList.map((siteDetails, index)=>(
                                    <Accordion expanded={expanded === 'panel'+index+1} onChange={handleChange('panel'+index+1)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {siteDetails.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>{siteDetails.address}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                        {siteDetails.work.map(workDetails=>(
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#f1f3f4' }}>
                                            <ListItem >
                                                <ListItemAvatar onClick={()=>(fetchLabourList(workDetails.work_id), fetchMaterialList(workDetails.work_id), setSelectedWorkType(workDetails.work_type), setMaterialDetailsModalShow(true) )}>
                                                <Avatar>
                                                    <WorkIcon color='info'/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={workDetails.work_type} secondary={"Status : "+workDetails.status} onClick={()=>(fetchLabourList(workDetails.work_id), fetchMaterialList(workDetails.work_id), setSelectedWorkType(workDetails.work_type), setMaterialDetailsModalShow(true) )}/>
                                                <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
                                                <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                     
   
                                            </ListItem>
                                            <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
         </div>
                                            </List>
                                        ))}
                                           
                                    </Typography>
                                    <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                     
     </div>
                                    </AccordionDetails>
                                </Accordion>
                                ))}
                                    
                            </Typography>
                           
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
          <AppBar sx={{ position: '' }}>
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
                                    <Typography sx={{ color: 'text.secondary' }}>{labourDetails.from_date}-{labourDetails.to_date}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{backgroundColor:'#f1f3f4'}}>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Number of Person : <span style={{color:'black'}}>{labourDetails.qty}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Price : <span style={{color:'black'}}>{labourDetails.price}</span>
                                    </Typography>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Mode of Payment : <span style={{color:'black'}}>{labourDetails.mop}</span>
                                    </Typography>
                                    <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                     
     </div>

                                    </AccordionDetails>
                                </Accordion>
                                ))}

         {/* --------material details */}
         <p style={{ fontWeight: 700, color: '', margin: 10, marginLeft:5 , marginTop:20}}>Material Details :</p>
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
                                        Quantity : <span style={{color:'black'}}>{materialDetails.qty}</span>
                                    </Typography>
                                   
                                    <Typography sx={{ width: '100%', flexShrink: 0 }} style={{color:'gray'}}>
                                        Mode of Payment : <span style={{color:'black'}}>{materialDetails.mop}</span>
                                    </Typography>
                                   
                                    <img style={{marginTop:20, width:'100%', height:'auto'}} onClick={()=>{setreceiptPreview(true)}} src={"http://localhost:8080/api/v1/material-receipt/"+materialDetails.material_id}></img>
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
                                        src={"http://localhost:8080/api/v1/material-receipt/"+materialDetails.material_id}
                                        alt="image"
                                        />
                                    </Dialog>
                                     {/* close image dialog */}
                                     <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0}}>
        <IconButton aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
        <IconButton  aria-label="delete"  color="primary"  style={{  width:40, textAlign:'right', }}><DeleteIcon color='error'/></IconButton>                     
     </div>
                                    </AccordionDetails>
                                </Accordion>
                                ))}
          </div>
         

          <IconButton aria-label="delete"  color="primary"></IconButton>
          
        </Dialog>


      









          


       
    </>
  )
}

export default Dashboard