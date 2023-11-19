import React from 'react'
import { Box, Chip, IconButton, makeStyles, SpeedDial, Zoom } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import HandymanIcon from '@mui/icons-material/Handyman';

import PaidIcon from '@mui/icons-material/Paid';
import './speeddial.css';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { color, style } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function SpeedDialComponent() {

  const navigate = useNavigate()

  return (
    <div className='d-block d-sm-none'>
       <Box sx={{ height: 320, flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed',  bottom: 50, right: 16 ,}}
                icon={<SpeedDialIcon  style={{backgroundColor:'#21ad01'}}/>}
               
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
    </div>
  )
}

export default SpeedDialComponent
