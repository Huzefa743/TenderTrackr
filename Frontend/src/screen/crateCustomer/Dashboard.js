import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, Slide, TextField, Toolbar, Typography } from '@mui/material';
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
import Loader from '../../components/Loader/laoder';


function Dashboard() {

    const navigate = useNavigate();
  
    // async function fetchCustomerDetails(){
    //     API.getCustomerDetails(customerId).then((res) => {
    //         setCustomerDetials(res.data.data);
    //     });
    // }

    // async function fetchSiteList(){
    //     API.getSiteList(customerId).then((res) => {
    //         setSiteList(res.data.data);
    //     });
    // }

    // async function fetchLabourList(workId){
    //     API.getLabourList(workId).then((res) => {
    //         setLabourList(res.data.data);
    //     });
    // }

    // async function fetchMaterialList(workId){
    //     API.getMaterialList(workId).then((res) => {
    //         setMaterialList(res.data.data);
    //     });
    // }

    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreateCustomerField, setDisableCreateCustomerField] = useState(false)
    const [createCustomerFormFields, setCreateCustomerFormFileds] = useState({
        name:'',
        mobile:'',
        email:'',
        address:''
    })

  const handleCreateCustoemrFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createCustomerFormFields}
        data[event.target.name] = event.target.value; 
        setCreateCustomerFormFileds(data);
  }

  const createCustomer=async()=>{
    console.log("create customer working...")
    
    console.log(createCustomerFormFields)
     
    setLoaderVisilbe(true)

    API.createCustomer(createCustomerFormFields)
    .then(async(res) => {
     console.log("here is the response for create customer form ", res)
            if(res.status==200){
            setLoaderVisilbe(false)
            setDisableCreateCustomerField(true)  
            navigate('/home')            
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Quotation Not created!!", err)
        console.log("here is the create customer error!! ", err)
  })
 }


    useEffect(() => {
       // fetchCustomerDetails()
        //fetchSiteList()
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0}}>Create Client :</p>
                
            
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='name'  disabled={disableCreateCustomerField} onChange={event => handleCreateCustoemrFormChange(event)} value={createCustomerFormFields.name} label="Client Name" placeholder='John Parker' type="text" fullWidth variant="standard"/>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='mobile'  disabled={disableCreateCustomerField} onChange={event => handleCreateCustoemrFormChange(event)} value={createCustomerFormFields.mobile} label="Mobile" placeholder='8819990000' type="number" fullWidth variant="standard"/>
                    </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='email'  disabled={disableCreateCustomerField} onChange={event => handleCreateCustoemrFormChange(event)} value={createCustomerFormFields.email} label="Email" placeholder='johnparker@xxxx.xxx' type="email" fullWidth variant="standard"/>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='address'  disabled={disableCreateCustomerField} onChange={event => handleCreateCustoemrFormChange(event)} value={createCustomerFormFields.address} label="Address" placeholder='27/2, Sector-5 New Road, Bhopal-462010' type="text" fullWidth variant="standard"/>
                    </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='gst'  disabled={disableCreateCustomerField} onChange={event => handleCreateCustoemrFormChange(event)} value={createCustomerFormFields.gst} label="GST" placeholder='12345-PPNM-9876' type="text" fullWidth variant="standard"/>
                    </div>
                    
                </div>
                <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20}}>
                <Button onClick={()=>navigate('/home')} disabled={disableCreateCustomerField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={()=>{createCustomer()} } style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableCreateCustomerField || createCustomerFormFields.name==""  }>Create</Button>
                                   
                </div>  
          
    </div>
          
    </>
  )
}

export default Dashboard