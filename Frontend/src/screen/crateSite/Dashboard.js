import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
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

    const[customerList, setCustomerList] = useState([])
    const[customerId, setCustomerId] = useState("")

    async function fetchCustomerListDetails(){
        API.getAllCustomer().then((res) => {
            setCustomerList(res.data.data);
        }).catch((error)=>{
            alert("Not able to fetch customer details")
        })
    }

   

    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreateSiteField, setDisableCreateSiteField] = useState(false)
    const [createSiteFormFields, setCreateSiteFormFileds] = useState({
        name:'',
        address:''
    })

  const handleCreateCustoemrFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createSiteFormFields}
        data[event.target.name] = event.target.value; 
        setCreateSiteFormFileds(data);
  }

  const createSite=async()=>{
    console.log("create Site working...")
    
    console.log(createSiteFormFields)
     
    setLoaderVisilbe(true)

    API.createSite(customerId, createSiteFormFields)
    .then(async(res) => {
     console.log("here is the response for create Site form ", res)
            if(res.status==200){
            setLoaderVisilbe(false)
            setDisableCreateSiteField(true)  
            navigate('/home')            
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Site Not created!!", err)
        console.log("here is the create Site error!! ", err)
  })
 }


    useEffect(() => {
        fetchCustomerListDetails()
        
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Create Site :</p>
                
            
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0}}>
                                    <TextField id="standard-select-currency" name='ttglEnqRefNo'  disabled={disableCreateSiteField} onChange={(event) => setCustomerId(event.target.value)} value={customerId} select label="Customer" defaultValue="" variant="standard" style={{fontSize:12, width:'98%'}}>      
                                                {customerList.map((customerDetails)=>(
                                                    <MenuItem value={customerDetails.cust_id} >{customerDetails.name}</MenuItem>   
                                                ))}
                                    </TextField>
                                </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='name'  disabled={disableCreateSiteField} onChange={event => handleCreateCustoemrFormChange(event)} value={createSiteFormFields.name} label="Site Name" placeholder='Shymla Hills' type="text" fullWidth variant="standard"/>
                    </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='address'  disabled={disableCreateSiteField} onChange={event => handleCreateCustoemrFormChange(event)} value={createSiteFormFields.address} label="Address" placeholder='H-5002, area-69 Shymla Hills Bhopla-462010' type="text" fullWidth variant="standard"/>
                    </div>
                    
                </div>
                
                <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20}}>
                <Button onClick={()=>navigate('/home')} disabled={disableCreateSiteField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={()=>{createSite()} } style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableCreateSiteField || createSiteFormFields.name=="" || createSiteFormFields.address==""  }>Create</Button>
                                   
                </div>  
          
    </div>
          
    </>
  )
}

export default Dashboard