import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Box, Chip, IconButton, makeStyles, SpeedDial, Zoom } from '@mui/material';
import { blue } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as API from "../../services/services";
import { useNavigate } from 'react-router-dom';
import { deepOrange, deepPurple } from '@mui/material/colors';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Loader from '../../components/Loader/laoder';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { color, style } from '@mui/system';

// const useStyles = makeStyles((theme) => ({
//   staticTooltipLabel: {
//     backgroundColor: "red"
//   },
//   tooltip: {
//     backgroundColor: "yellow"
//   }
// }));



function Dashboard() {
    const[buttonVisible, setButtonVisible] = useState(false)
    const[customerList, setCustomerList] = useState([])
    const [customerTotalCreditPayment, setCustomerTotalCreditPayment] = useState(0)
    const [customerTotalDebitPayment, setCustomerTotalDebitPayment] = useState(0)
    const [customerTotalBalancePayment, setCustomerTotalBalancePayment] = useState(0)
    const [loaderVisible, setLoaderVisilbe] = useState(false)
  //  const classes = useStyles();

    const navigate = useNavigate();

    // avatar random color
    function stringToColor(string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }

    function hasWhiteSpace(s) {
      return /\s/g.test(s);
    }
    
    function stringAvatar(name) {
      if(hasWhiteSpace(name)){
       
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      else{
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split()[0][0]}`,
        };
      }
      
    }

    //exit


  
    async function fetchAllCustomer(page){
      setLoaderVisilbe(true)
        API.getAllCustomer(page, 100).then((res) => {
            setCustomerList(res.data.data);
             setLoaderVisilbe(false)
         
        });
    }
    async function fetchCustomerDetails(){
      API.getAllPaymentDetails().then((res) => {
        setCustomerTotalCreditPayment(res.data.totalCreditPayment)
        setCustomerTotalDebitPayment(res.data.totalDebitPayment)
        setCustomerTotalBalancePayment(res.data.totalBalancePayment)
      });
  }

    useEffect(() => {
      
      
        fetchAllCustomer(1)
        fetchCustomerDetails()
        }, []);
 
  return (

    <>
    {loaderVisible ? <Loader/>:<></>}

         {/* Dashboard list for shows the list of clints */}
         {/* <div className='row' style={{width:'100%', height:'auto',margin:0, padding:0 }}>
          
          <div className='col-6' style={{padding:10}}>
            <div style={{height:'auto', width:'auto', borderRadius:50, backgroundColor:'#d4eea5', textAlign:'center', whiteSpace:'nowrap'}}>
              <IconButton aria-label="delete" style={{display:'inline-block'}}>
                <TrendingDownIcon color='success'/>
              </IconButton>
              <p style={{padding:0, margin:0, display:'inline-block', color:'#2e7d32', fontSize:12, fontWeight:600}}>{customerTotalCreditPayment}</p>
              </div>
          </div>
          <div className='col-6' style={{padding:10,}}>
            <div style={{height:'auto', width:'auto', borderRadius:50, backgroundColor:'#eca7a7', textAlign:'center', whiteSpace:'nowrap'}}>
              <IconButton aria-label="delete" style={{display:'inline-block'}}>
                <TrendingUpIcon color='error'/>
              </IconButton>
              <p style={{padding:0, margin:0, display:'inline-block', color:'#d32f2f', fontSize:12, fontWeight:600}}>{customerTotalDebitPayment}</p>
              </div>
          </div>

         </div>
         <div className='row' style={{margin:0, padding:10, paddingTop:0}}>
            <div className='col-12' style={{padding:0, paddingTop:0}}>
                <div style={{height:'auto', width:'auto', borderRadius:50, backgroundColor:'#cacaca', textAlign:'center', whiteSpace:'nowrap'}}>
                  <IconButton aria-label="delete" style={{display:'inline-block'}}>
                    <AccountBalanceWalletIcon color='inherit' fontSize='500px'/>
                  </IconButton>
                  <p style={{padding:0, margin:0, display:'inline-block', color:'#353535', fontSize:12, fontWeight:600}}>{customerTotalBalancePayment}</p>
                  </div>
              </div>
         </div>
         
         <div style={{padding:0, margin:0, textAlign:'center'}}>
         <Chip icon={<CalendarMonthIcon />} label="Year-2023" variant="outlined" />
         </div>
         
         <Divider variant="middle" style={{marginTop:10}}/> */}
         <List sx={{ width: '100%', marginBottom:5, bgcolor: 'background.paper' }}>
            {customerList.map(customerDetails=>(
                <>
                
       <ListItem style={{width:'100%', cursor:'pointer'}} onClick={()=>{navigate('/customer-details/'+customerDetails.cust_id)}}>
        <ListItemAvatar>
       
        <Avatar  {...stringAvatar(customerDetails.name)} src="/static/images/avatar/1.jpg" />
          {/* <Avatar alt={customerDetails.name} sx={{ bgcolor: deepPurple[500] }} src="/static/images/avatar/1.jpg" /> */}
        </ListItemAvatar>
        <ListItemText
          primary={customerDetails.name}
          secondary={
            <>
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                Mobile : {customerDetails.mobile}
              </Typography>
              {/* {" — I'll be in your neighborhood doing errands this…"} */}
            </React.Fragment>
            <br></br>
            <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              Last Update : {new Date(customerDetails.updatedAt).toLocaleDateString()}
            </Typography>
            {/* {" — I'll be in your neighborhood doing errands this…"} */}
          </React.Fragment>
          </>
          }
          
        >
           
        </ListItemText>
      </ListItem>
      

      <Divider variant="inset" component="li" /> 
                </>
            ))}
     
      
    </List>

    {/* --------------------------exit-------------------------------------------- */}


















          


          {/* three action to be performed */}
          {/* <Fab variant="extended" onClick={()=>(setButtonVisible(false), navigate('/create-payment'))} color="primary" size='small' hidden={!buttonVisible} style={{position:'fixed', bottom:350, right:16}}>
                <PaidIcon sx={{ mr: 1 }} />
                Payment
          </Fab>
          <Fab variant="extended" onClick={()=>(setButtonVisible(false), navigate('/create-customer'))} color="secondary" size='small' hidden={!buttonVisible} style={{position:'fixed', bottom:300, right:16}}>
                <PersonAddIcon sx={{ mr: 1 }} />
                Client
          </Fab>
          <Fab variant="extended" onClick={()=>(setButtonVisible(false), navigate('/create-site'))} color="success" size='small' hidden={!buttonVisible} style={{position:'fixed', bottom:250, right:16}}>
                <LocationOnIcon sx={{ mr: 1 }} />
                Site
          </Fab>
          <Fab variant="extended" onClick={()=>(setButtonVisible(false), navigate('/create-work'))} color="warning" size='small' hidden={!buttonVisible} style={{position:'fixed', bottom:200, right:16}}>
                <EngineeringIcon sx={{ mr: 1 }} />
                Work
          </Fab>
          <Fab variant="extended" onClick={()=>(setButtonVisible(false), navigate('/create-labour'))} color="info" size='small' hidden={!buttonVisible} style={{position:'fixed', bottom:150, right:16}}>
                <GroupsIcon sx={{ mr: 1 }} />
                Labour
          </Fab>
          <Fab variant="extended" onClick={()=>(setButtonVisible(false), navigate('/create-material'))} color="error" size='small' hidden={!buttonVisible} style={{position:'fixed', bottom:100, right:16}}>
                <HandymanIcon sx={{ mr: 1 }} />
                Material
          </Fab> */}
         
         
         
          
           {/* -----------action button */}
           
          {/* <Fab size="small" color="primary" hidden={buttonVisible} style={{transitionDelay: 'initial', transition:'0.3s', position:'fixed', bottom:50, right:16}} aria-label="add" onClick={()=>setButtonVisible(true)}>
            <AddIcon />
          </Fab>
          <Fab size="small"  color="inherit" hidden={!buttonVisible} style={{position:'fixed', bottom:50, right:16,transition:'0.3s'}} aria-label="add" onClick={()=>setButtonVisible(false)}>
            <RemoveIcon />
          </Fab> */}

          {/* ---------------speed dial button--------------------------- */}

          <Box sx={{ height: 320, flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 50, right: 16 }}
                icon={<SpeedDialIcon />}
                // className={classes.speedDial}
              >
               <SpeedDialAction onClick={()=> navigate('/create-material')}
                    key="Create Material"
                    icon={<HandymanIcon color="info" />}
                    tooltipTitle="Material"

                    // tooltipOpen={true}
                  />
                  <SpeedDialAction onClick={()=> navigate('/create-labour')}
                    key="Create Labour"
                    icon={<GroupsIcon  color='success' />}
                    tooltipTitle="Labour"
                    // tooltipOpen={true}
                  />
                  
                   <SpeedDialAction onClick={()=> navigate('/create-work')}
                    key="Create Work"
                    icon={<EngineeringIcon color='error' />}  
                    tooltipTitle="Work"
                    
                    // tooltipOpen={true}
                  ></SpeedDialAction>
                   <SpeedDialAction onClick={()=> navigate('/create-site')}
                    key="Create site"
                    icon={<LocationOnIcon color='primary'/>}
                    tooltipTitle="Site"
                    // tooltipOpen={true}
                  />
                   <SpeedDialAction onClick={()=> navigate('/create-customer')}
                    key="Create customer"
                    icon={<PersonAddIcon color='secondary' />}
                    tooltipTitle="Client"
                    
                  />
                  <SpeedDialAction  onClick={()=> navigate('/create-payment')}
                    key="Create Payment"
                    icon={<PaidIcon  color='warning'/>}
                    tooltipTitle="Payment"
                    // tooltipOpen={true}
                  />
                 
                  
                 
                  
                  
              
              </SpeedDial>
          </Box>


          {/* ------------------close------------------------------------ */}
         
          
    </>
  )
}

export default Dashboard