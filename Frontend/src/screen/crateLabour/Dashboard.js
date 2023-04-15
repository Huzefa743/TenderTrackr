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
    let data = {...createLabourFormFields}
    data["from_date"] = moment(date).format("YYYY/MM/DD") 

    setCreateLabourFormFileds(data);
  };

    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreateLabourField, setDisableCreateLabourField] = useState(false)
    const [createLabourFormFields, setCreateLabourFormFileds] = useState({
        purpose:'',
        qty:'1',
        from_date:'2023/01/01',
        price:'',
        mop:'Cash',
        dealer_name:''
    })

  const handleCreateCustoemrFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createLabourFormFields}
        data[event.target.name] = event.target.value; 
        setCreateLabourFormFileds(data);
  }

  const createLabour=async()=>{
    console.log("create Labour Labouring...")
    
    console.log(createLabourFormFields)
     
    setLoaderVisilbe(true)

    API.createLabour(customerId, siteId, workId, createLabourFormFields)
    .then(async(res) => {
     console.log("here is the response for create Labour form ", res)
            if(res.status==200){
            
            setDisableCreateLabourField(true)  
            navigate('/home') 
            setLoaderVisilbe(false)           
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Labour Not created!!", err)
        console.log("here is the create Labour error!! ", err)
  })
 }


    useEffect(() => {
        fetchCustomerListDetails()
        
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0}}>Create Labour :</p>
                
            
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                                    <TextField id="standard-select-currency" name='ttglEnqRefNo'  disabled={disableCreateLabourField} onChange={(event) => ( fetchCustomerSiteListDetails(event.target.value), setCustomerId(event.target.value))} value={customerId} select label="Customer" defaultValue="" variant="standard" fullWidth>      
                                                {customerList.map((customerDetails)=>(
                                                    <MenuItem value={customerDetails.cust_id} >{customerDetails.name}</MenuItem>   
                                                ))}
                                    </TextField>
                                </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                        <TextField id="standard-select-currency" name='siteId'  disabled={disableCreateLabourField || siteFieldDisable} onChange={(event) => (fetchCustomerSiteWorkListDetails(event.target.value), setSiteId(event.target.value))} value={siteId} select label="Site" defaultValue="" fullWidth variant="standard" >      
                                    {siteList.map((siteDetails)=>(
                                        <MenuItem value={siteDetails.site_id} >{siteDetails.name}</MenuItem>   
                                    ))}
                        </TextField>
                    </div>
                    
                </div>
                <div className='row' style={{marginLeft:0}}>
                
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                        <TextField id="standard-select-currency" name='workId'  disabled={disableCreateLabourField || workFieldDisable} onChange={(event) => setWorkId(event.target.value)} value={workId} select label="Work" defaultValue="" variant="standard" fullWidth>      
                                    {workList.map((workDetails)=>(
                                        <MenuItem value={workDetails.work_id} >{workDetails.work_type}</MenuItem>   
                                    ))}
                        </TextField>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='purpose'  disabled={disableCreateLabourField} onChange={event => handleCreateCustoemrFormChange(event)} value={createLabourFormFields.purpose} label="Purpose" multiline placeholder='3 main window- 20*30' type="text" fullWidth variant="standard"/>
                    </div>
                    
                </div>
               
                <div className='row' style={{marginLeft:0}}>
                    {/* <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='qty'  disabled={disableCreateLabourField} onChange={event => handleCreateCustoemrFormChange(event)} value={createLabourFormFields.qty} label="Quantity" placeholder='5' type="number" fullWidth variant="standard"/>
                    </div> */}
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='price'  disabled={disableCreateLabourField} onChange={event => handleCreateCustoemrFormChange(event)} value={createLabourFormFields.price} label="Price" placeholder='5' type="number" fullWidth variant="standard"/>
                 
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                   
                        <TextField  margin="dense"  name='from_date'  disabled={disableCreateLabourField} onChange={event => handleCreateCustoemrFormChange(event)} value={createLabourFormFields.from_date} label="Date" type="datetime-local" fullWidth variant="standard"/>
                    </div>
                </div>
                <div className='row' style={{marginLeft:0}}>
                    
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <TextField  margin="dense"  name='dealer_name'  disabled={disableCreateLabourField} onChange={event => handleCreateCustoemrFormChange(event)} value={createLabourFormFields.dealer_name} label="Labour/Dealer Name" type="text" fullWidth variant="standard"/>
                   
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginTop:10}}>
                    <TextField size='small' select name='mop'  disabled={disableCreateLabourField} onChange={event => handleCreateCustoemrFormChange(event)} value={createLabourFormFields.mop}  placeholder='Done'  label="Mode Of Payment" defaultValue="Cash" fullWidth variant="standard"  >
                                <MenuItem value={"Cash"}>Cash</MenuItem>
                                <MenuItem  value={"Phone-Pay"}>Phone Pay </MenuItem>
                                <MenuItem  value={"PayTM"}>PayTM </MenuItem>
                                <MenuItem  value={"Amazon-Pay"}>Amazon Pay</MenuItem>
                                <MenuItem  value={"Google-Pay"}>Google Pay</MenuItem>
                                <MenuItem  value={"Credit-Card"}>Credit Card</MenuItem>
                        </TextField>
                    </div>
                </div>
                
                
                <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20}}>
                    <Button onClick={()=>navigate('/home')} disabled={disableCreateLabourField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={()=>{createLabour()} } style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableCreateLabourField || customerId=="" ||siteId=="" ||workId==""  || createLabourFormFields.purpose=="" || createLabourFormFields.mop=="" || createLabourFormFields.from_date=="" || createLabourFormFields.to_date=="" || createLabourFormFields.qty==""|| createLabourFormFields.price==""  }>Create</Button>               
                </div>  
          
    </div>
          
    </>
  )
}

export default Dashboard