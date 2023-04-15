import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as API from "../../services/services";
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../components/Loader/laoder';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';


function Dashboard() {

    const navigate = useNavigate();

    const[customerList, setCustomerList] = useState([])
    const[customerId, setCustomerId] = useState("")

    const[siteList, setSiteList] = useState([])
    const[siteId, setSiteId] = useState("")

    const[siteFieldDisable, setSiteFieldDisable]= useState(false)

    const[workList, setWorkList] = useState([])
    const[workId, setWorkId] = useState("")

    const[workFieldDisable, setWorkFieldDisable]= useState(false)

    

    async function fetchCustomerListDetails(){
        API.getAllCustomer().then((res) => {
            setCustomerList(res.data.data);
        }).catch((error)=>{
            alert("Not able to fetch customer details")
        })
    }

    async function fetchCustomerSiteListDetails(custId){
        console.log(" here is the customer id", custId)
        API.getSiteList(custId).then((res) => {
            console.log("here is the site list", res)
            console.log(" length", (res.data.data).length)
            if((res.data.data).length==0){
                setSiteFieldDisable(true)
                setSiteList([])
            }
            else{
                setSiteFieldDisable(false)
                setSiteList(res.data.data);
            }
            
        }).catch((error)=>{
            alert("Not able to fetch site details", error)
        })
    }

    async function fetchCustomerSiteWorkListDetails(siteId){
        console.log(" here is the customer id", siteId)
        API.getWorkList( siteId).then((res) => {
            console.log("here is the site list", res)
            console.log(" length", (res.data.data).length)
            if((res.data.data).length==0){
                setWorkFieldDisable(true)
                setWorkList([])
            }
            else{
                setWorkFieldDisable(false)
                setWorkList(res.data.data);
            }
            
        }).catch((error)=>{
            alert("Not able to fetch site details", error)
        })
    }

   //date controller
   const takeFromDateValue = (newValue) => {
    console.log("new value", newValue)
    let date = new Date(newValue)
    let data = {...createMaterialFormFields}
    data["from_date"] = moment(date).format("YYYY/MM/DD") 

    setCreateMaterialFormFileds(data);
  };

    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreateMaterialField, setDisableCreateMaterialField] = useState(false)
    const [createMaterialFormFields, setCreateMaterialFormFileds] = useState({
        name:'',
        price:'',
        qty:'1',
        date:'2023/01/01',
        mop:'Cash',
        receipt:null,
        dealer_name:''
    })

  const handleCreateCustoemrFormChange= (event)=>{
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

  const createMaterial=async()=>{
    console.log("create Material Materialing...")
    
    console.log(createMaterialFormFields)
     
    setLoaderVisilbe(true)

    API.createMaterial(customerId, siteId, workId, createMaterialFormFields)
    .then(async(res) => {
     console.log("here is the response for create Material form ", res)
            if(res.status==200){
            
            setDisableCreateMaterialField(true)  
            navigate('/home') 
            setLoaderVisilbe(false)           
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Material Not created!!", err)
        console.log("here is the create Material error!! ", err)
  })
 }


    useEffect(() => {
        fetchCustomerListDetails()
        
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0}}>Create Material :</p>
                
            
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                                    <TextField id="standard-select-currency" name='ttglEnqRefNo'  disabled={disableCreateMaterialField} onChange={(event) => ( fetchCustomerSiteListDetails(event.target.value), setCustomerId(event.target.value))} value={customerId} select label="Customer" defaultValue="" variant="standard" fullWidth>      
                                                {customerList.map((customerDetails)=>(
                                                    <MenuItem value={customerDetails.cust_id} >{customerDetails.name}</MenuItem>   
                                                ))}
                                    </TextField>
                                </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                        <TextField id="standard-select-currency" name='siteId'  disabled={disableCreateMaterialField || siteFieldDisable} onChange={(event) => (fetchCustomerSiteWorkListDetails(event.target.value), setSiteId(event.target.value))} value={siteId} select label="Site" defaultValue="" fullWidth variant="standard" >      
                                    {siteList.map((siteDetails)=>(
                                        <MenuItem value={siteDetails.site_id} >{siteDetails.name}</MenuItem>   
                                    ))}
                        </TextField>
                    </div>
                    
                </div>
                <div className='row' style={{marginLeft:0}}>
                
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                        <TextField id="standard-select-currency" name='workId'  disabled={disableCreateMaterialField || workFieldDisable} onChange={(event) => setWorkId(event.target.value)} value={workId} select label="Work" defaultValue="" variant="standard" fullWidth>      
                                    {workList.map((workDetails)=>(
                                        <MenuItem value={workDetails.work_id} >{workDetails.work_type}</MenuItem>   
                                    ))}
                        </TextField>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='name'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)} value={createMaterialFormFields.name} label="Material Name" multiline placeholder='3 main window- 20*30' type="text" fullWidth variant="standard"/>
                    </div>
                    
                </div>
               
                <div className='row' style={{marginLeft:0}}>
                    {/* <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='qty'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)} value={createMaterialFormFields.qty} label="Quantity" placeholder='5' type="number" fullWidth variant="standard"/>
                    </div> */}
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='price'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)} value={createMaterialFormFields.price} label="Price" placeholder='5' type="number" fullWidth variant="standard"/>
                 
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                   
                   <TextField  margin="dense"  name='date'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)} value={createMaterialFormFields.date} label="Date" type="datetime-local" fullWidth variant="standard"/>
               </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                   
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField size='small' select name='mop'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)} value={createMaterialFormFields.mop}  placeholder='Done'  label="Mode Of Payment" defaultValue="Cash" fullWidth variant="standard"  >
                                    <MenuItem value={"Cash"}>Cash</MenuItem>
                                    <MenuItem  value={"Phone Pay"}>Phone Pay </MenuItem>
                                    <MenuItem  value={"PayTM"}>PayTM </MenuItem>
                                    <MenuItem  value={"Amazon-Pay"}>Amazon Pay</MenuItem>
                                    <MenuItem  value={"Google-Pay"}>Google Pay</MenuItem>
                                    <MenuItem  value={"Credit-Card"}>Credit Card</MenuItem>
                            </TextField>
                    </div>
                     <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='dealer_name'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)} value={createMaterialFormFields.dealer_name} label="Dealer/Laour Name" type="text" fullWidth variant="standard"/>
                   
                    </div>
                   
                </div>
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='receipt'  disabled={disableCreateMaterialField} onChange={event => handleCreateCustoemrFormChange(event)}  label="Receipt" type="file" fullWidth variant="standard"/>
                 
                    </div>
                   
                   
                </div>
                
                <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20}}>
                    <Button onClick={()=>navigate('/home')} disabled={disableCreateMaterialField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={()=>{createMaterial()} } style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableCreateMaterialField || createMaterialFormFields.date=="" || createMaterialFormFields.mop=="" ||createMaterialFormFields.name=="" ||createMaterialFormFields.price=="" ||createMaterialFormFields.qty=="" ||createMaterialFormFields.receipt=="" ||customerId=="" ||siteId==""|| workId=="" || createMaterialFormFields.date=="" }>Create</Button>               
                </div>  
          
    </div>
          
    </>
  )
}

export default Dashboard