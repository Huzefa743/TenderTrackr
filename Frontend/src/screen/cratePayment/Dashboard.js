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

    const[siteList, setSiteList] = useState([])
    const[siteId, setSiteId] = useState("")
    const[siteFieldDisable, setSiteFieldDisable]= useState(false)

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

    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreatePaymentField, setDisableCreatePaymentField] = useState(false)
    const [createPaymentFormFields, setCreatePaymentFormFileds] = useState({
        cust_id:customerId,
        amount:'',
        date:'12/04/23',
        action:'Credit',
        mop:'Cash',
        remark:'',
        dealer_name:'From Client',
        site_id:''
    })

  const handleCreateCustoemrFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createPaymentFormFields}
        data[event.target.name] = event.target.value; 
        setCreatePaymentFormFileds(data);
  }

  const createPayment=async()=>{
    console.log("create Payment working...")
    
    console.log(createPaymentFormFields)
     
    setLoaderVisilbe(true)

    API.createPayment( createPaymentFormFields)
    .then(async(res) => {
     console.log("here is the response for create Payment form ", res)
            if(res.status==200){
            setLoaderVisilbe(false)
            setDisableCreatePaymentField(true)  
            navigate('/home')            
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Payment Not created!!", err)
        console.log("here is the create Payment error!! ", err)
  })
 }


    useEffect(() => {
        fetchCustomerListDetails()
        
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Create Payment :</p>
                
            
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0}}>
                                    <TextField id="standard-select-currency" name='cust_id'  disabled={disableCreatePaymentField} onChange={event => (fetchCustomerSiteListDetails(event.target.value),handleCreateCustoemrFormChange(event))} value={createPaymentFormFields.cust_id} select label="Customer" defaultValue="" variant="standard"  fullWidth>      
                                                {customerList.map((customerDetails)=>(
                                                    <MenuItem value={customerDetails.cust_id} >{customerDetails.name}</MenuItem>   
                                                ))}
                                    </TextField>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:0}}>
                        <TextField id="standard-select-currency" name='site_id'  disabled={disableCreatePaymentField || siteFieldDisable} onChange={(event) =>handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.site_id} select label="Site" defaultValue="" fullWidth variant="standard" >      
                                    {siteList.map((siteDetails)=>(
                                        <MenuItem value={siteDetails.site_id} >{siteDetails.name}</MenuItem>   
                                    ))}
                        </TextField>
                    </div>
                   
                </div>
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='amount'  disabled={disableCreatePaymentField} onChange={event => handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.amount} label="Amount" placeholder='120000.00' type="number" fullWidth variant="standard"/>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginTop:10}}>
                    <TextField size='small' select name='action'  disabled={disableCreatePaymentField} onChange={event => handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.action}  placeholder='Done'  label="Action" defaultValue="Credit" fullWidth variant="standard"  >
                                <MenuItem value={"Credit"}>Credit</MenuItem>
                                <MenuItem  value={"Debit"}>Debit </MenuItem>
                        </TextField>
                    </div>
                    </div>

                    <div className='row' style={{marginLeft:0}}>
                    <div hidden={createPaymentFormFields.action=="Credit"} className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='dealer_name'  disabled={disableCreatePaymentField} onChange={event => handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.dealer_name} label="Dealer/Labour Name" placeholder='Mr John Cena' type="text" fullWidth variant="standard"/>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginTop:10}}>
                    <TextField size='small' select name='mop'  disabled={disableCreatePaymentField} onChange={event => handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.mop}  placeholder='Done'  label="Mode Of Payment" defaultValue="Cash" fullWidth variant="standard"  >
                                <MenuItem value={"Cash"}>Cash</MenuItem>
                                <MenuItem  value={"Phone Pay"}>Phone Pay </MenuItem>
                                <MenuItem  value={"PayTM"}>PayTM </MenuItem>
                                <MenuItem  value={"Amazon-Pay"}>Amazon Pay</MenuItem>
                                <MenuItem  value={"Google-Pay"}>Google Pay</MenuItem>
                                <MenuItem  value={"Credit-Card"}>Credit Card</MenuItem>
                        </TextField>
                    </div>
                    
                </div>
                
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginTop:0}}>
                        <TextField  margin="dense"  name='date'  disabled={disableCreatePaymentField} onChange={event => handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.date} label="Date" type="datetime-local" fullWidth variant="standard"/>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense"  name='remark'  disabled={disableCreatePaymentField} onChange={event => handleCreateCustoemrFormChange(event)} value={createPaymentFormFields.remark} label="Remark" multiline row={2} type="text" fullWidth variant="standard"/>
                    </div>
                    
                </div>
                
                <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20}}>
                <Button onClick={()=>navigate('/home')} disabled={disableCreatePaymentField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={()=>{createPayment()} } style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableCreatePaymentField || createPaymentFormFields.cust_id=="" || createPaymentFormFields.amount=="" || createPaymentFormFields.action=="" || createPaymentFormFields.date=="" || createPaymentFormFields.mop==""  }>Create</Button>
                                   
                </div>  
          
    </div>
          
    </>
  )
}

export default Dashboard