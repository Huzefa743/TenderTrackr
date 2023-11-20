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
import SpeedDialComponent from '../../layouts/SpeedDial/SpeedDialComponent';
import { Pagination, Stack } from '@mui/material';
import avatarImage from '../../logos/latest/avatar.jpeg'

// const useStyles = makeStyles((theme) => ({
//   staticTooltipLabel: {
//     backgroundColor: "red"
//   },
//   tooltip: {
//     backgroundColor: "yellow"
//   }
// }));



function Dashboard() {
    const[customerList, setCustomerList] = useState([])
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
    const [page, setPage] = useState(1)
    const [customerCount, setCustomerCount] = useState(0)
    const paginationHandle = async (event, value) => {
      console.log("vlaue in handl change for pagination", value)
      setLoaderVisilbe(true)
      setPage(value)
      await fetchAllCustomer(value)
      setLoaderVisilbe(false)
  };

  
    async function fetchAllCustomer(page){
      setLoaderVisilbe(true)
        API.getAllCustomerList(page).then((res) => {
          console.log("List of customre", res)
            setCustomerList(res.data.data);
            setCustomerCount(res?.data?.totalInDb)
             setLoaderVisilbe(false)
         
        });
    }
   

    useEffect(() => {
      
      
        fetchAllCustomer(page)
      
        }, []);
 
  return (

    <>
    {loaderVisible ? <Loader/>:<></>}

        
         <List sx={{ width: '100%', minHeight:'80vh', marginBottom:5, bgcolor: 'background.paper' }}>
         {customerList.length === 0 ? (
      
           <div style={{ padding: '20px', textAlign: 'center' }}>
              Customer not Available
           </div>
        
     ) : (
            customerList.map(customerDetails=>(
                <>
                
       <ListItem style={{width:'100%', cursor:'pointer'}} onClick={()=>{navigate('/customer-details/'+customerDetails.cust_id)}}>
        <ListItemAvatar>
       
        <Avatar sx={{ width: 60, height: 60,  }}  src={avatarImage} />
          {/* <Avatar alt={customerDetails.name} sx={{ bgcolor: deepPurple[500] }} src="/static/images/avatar/1.jpg" /> */}
        </ListItemAvatar>
        <ListItemText style={{marginLeft:10}}
          primary=<span className='history-heading'>{customerDetails.name}</span>
          secondary={
            <>
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
               <span className='history-heading'> Mobile : {customerDetails.mobile}</span>
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
            <span className='history-heading'>  Last Update : {new Date(customerDetails.updatedAt).toLocaleDateString()}</span>
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
            )))}
     
      
    </List>
    <div className='row' style={{margin:20, marginBottom:70, backgroundColor:'', float:'center', marginRight:0}}>
<Stack spacing={0} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
  <Pagination count={Math.ceil(customerCount / 10)} page={page} onChange={paginationHandle}  />
</Stack>




                            </div>
    <SpeedDialComponent/>
    
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
      


          {/* ------------------close------------------------------------ */}
         
          
    </>
  )
}

export default Dashboard