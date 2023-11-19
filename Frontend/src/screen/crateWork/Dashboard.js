import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, DialogActions, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
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

    const[siteList, setSiteList] = useState([])
    const[siteId, setSiteId] = useState("")

    const[siteFieldDisable, setSiteFieldDisable]= useState(false)

    

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

   

    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableCreateWorkField, setDisableCreateWorkField] = useState(false)
    const [createWorkFormFields, setCreateWorkFormFileds] = useState({
        description:'',
        work_type:'',
        estimate_days:'',
        status:'Not-Yet-Start'
    })

  const handleCreateCustoemrFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createWorkFormFields}
        data[event.target.name] = event.target.value; 
        setCreateWorkFormFileds(data);
  }

  const createWork=async()=>{
    console.log("create Work working...")
    
    console.log(createWorkFormFields)
     
    setLoaderVisilbe(true)

    API.createWork(customerId, siteId, createWorkFormFields)
    .then(async(res) => {
     console.log("here is the response for create Work form ", res)
            if(res.status==200){
            
            setDisableCreateWorkField(true)  
            navigate('/home') 
            setLoaderVisilbe(false)           
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("Work Not created!!", err)
        console.log("here is the create Work error!! ", err)
  })
 }


    useEffect(() => {
        fetchCustomerListDetails()
        
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}
    <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5, border:'1px solid lightgray', padding:0, margin:0, padding:10, marginBottom:20, marginTop:0, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:10}}>Create Work :</p>
                
            
                <div className='row' style={{marginLeft:0}}>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                                    <TextField id="standard-select-currency" name='ttglEnqRefNo'  disabled={disableCreateWorkField} onChange={(event) => ( fetchCustomerSiteListDetails(event.target.value), setCustomerId(event.target.value))} value={customerId} select label="Customer" defaultValue="" variant="standard" fullWidth
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
                                                {customerList.map((customerDetails)=>(
                                                    <MenuItem value={customerDetails.cust_id} >{customerDetails.name}</MenuItem>   
                                                ))}
                                    </TextField>
                                </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginRight:0, marginTop:10}}>
                        <TextField id="standard-select-currency" name='siteId'  disabled={disableCreateWorkField || siteFieldDisable} onChange={(event) => setSiteId(event.target.value)} value={siteId} select label="Site" defaultValue="" variant="standard" fullWidth 
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
                                    {siteList.map((siteDetails)=>(
                                        <MenuItem value={siteDetails.site_id} >{siteDetails.name}</MenuItem>   
                                    ))}
                        </TextField>
                    </div>
                    
                </div>
                <div className='row' style={{marginLeft:0}}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <TextField  margin="dense" name='description'  disabled={disableCreateWorkField} onChange={event => handleCreateCustoemrFormChange(event)} value={createWorkFormFields.description} label="Description" placeholder='3 main window - 20*30cm in 5 mm' type="text" fullWidth variant="standard"
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
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
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
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{marginTop:10}}>
                        <TextField size='small' select name='status'  disabled={disableCreateWorkField} onChange={event => handleCreateCustoemrFormChange(event)} value={createWorkFormFields.status}  placeholder='Done'  label="Status" defaultValue="Not yet Start" fullWidth variant="standard" 
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
                          }} >
                        <MenuItem value={"Not-Yet-Start"}>Not Yet Start</MenuItem>
                                <MenuItem  value={"Hold"}>Hold </MenuItem>
                                <MenuItem  value={"In-Progress"}>In-Progress</MenuItem>
                                <MenuItem  value={"Completed"}>Completed </MenuItem>
                        </TextField>
                    </div>
                </div>
                
                {/* <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20}}>
                    <Button onClick={()=>navigate('/home')} disabled={disableCreateWorkField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={()=>{createWork()} } style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableCreateWorkField || customerId=="" ||siteId==""  || createWorkFormFields.descrition=="" || createWorkFormFields.work_type=="" || createWorkFormFields.estimate_days=="" || createWorkFormFields.status==""  }>Create</Button>               
                </div>   */}

                <DialogActions style={{marginTop:50}}>
                <Button style={{color:'gray'}} 
                onClick={()=>navigate('/home')}
                >Cancel</Button>

                <Button style={{
                    color:'white',
                    backgroundColor:(disableCreateWorkField || customerId=="" ||siteId==""  || createWorkFormFields.descrition=="" || createWorkFormFields.work_type=="" || createWorkFormFields.estimate_days=="" || createWorkFormFields.status=="" )? 'lightgray': '#21ad01'
                }} 
                onClick={()=>{createWork()} }
                disabled={disableCreateWorkField || customerId=="" ||siteId==""  || createWorkFormFields.descrition=="" || createWorkFormFields.work_type=="" || createWorkFormFields.estimate_days=="" || createWorkFormFields.status=="" }
                >Create</Button>
        </DialogActions>
          
    </div>
          
    </>
  )
}

export default Dashboard