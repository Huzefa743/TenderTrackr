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
import { Zoom } from '@mui/material';
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


function Dashboard() {
    const[buttonVisible, setButtonVisible] = useState(false)
    const[customerList, setCustomerList] = useState([])

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
    
    function stringAvatar(name) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }

    //exit


  
    async function fetchAllCustomer(page){
        API.getAllCustomer(page, 100).then((res) => {
            setCustomerList(res.data.data);
  
         
        });
    }

    useEffect(() => {
      
      
        fetchAllCustomer(1)
        }, []);
 
  return (

    <>

         {/* Dashboard list for shows the list of clints */}

         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {customerList.map(customerDetails=>(
                <>
                
                <ListItem alignItems="flex-start" onClick={()=>{navigate('/customer-details/'+customerDetails.cust_id)}}>
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
          <Fab variant="extended" color="primary" size='small' hidden={!buttonVisible} style={{position:'absolute', bottom:300, right:16}}>
                <PersonAddIcon sx={{ mr: 1 }} />
                Client
          </Fab>
          <Fab variant="extended" color="primary" size='small' hidden={!buttonVisible} style={{position:'absolute', bottom:250, right:16}}>
                <LocationOnIcon sx={{ mr: 1 }} />
                Site
          </Fab>
          <Fab variant="extended" color="primary" size='small' hidden={!buttonVisible} style={{position:'absolute', bottom:200, right:16}}>
                <EngineeringIcon sx={{ mr: 1 }} />
                Work
          </Fab>
          <Fab variant="extended" color="primary" size='small' hidden={!buttonVisible} style={{position:'absolute', bottom:150, right:16}}>
                <GroupsIcon sx={{ mr: 1 }} />
                Labour
          </Fab>
          <Fab variant="extended" color="primary" size='small' hidden={!buttonVisible} style={{position:'absolute', bottom:100, right:16}}>
                <HandymanIcon sx={{ mr: 1 }} />
                Material
          </Fab>
         
         
         
          
           {/* -----------action button */}
           
          <Fab size="small" color="primary" hidden={buttonVisible} style={{transitionDelay: 'initial', transition:'0.3s', position:'absolute', bottom:50, right:16}} aria-label="add" onClick={()=>setButtonVisible(true)}>
            <AddIcon />
          </Fab>
          <Fab size="small"  color="inherit" hidden={!buttonVisible} style={{position:'absolute', bottom:50, right:16,transition:'0.3s'}} aria-label="add" onClick={()=>setButtonVisible(false)}>
            <RemoveIcon />
          </Fab>
         
          
    </>
  )
}

export default Dashboard