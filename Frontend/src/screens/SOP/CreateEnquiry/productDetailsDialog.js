import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import {  Form, Table } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import StepLabel from '@mui/material/StepLabel';
import ButtonSpinner from '../Spinner';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Radio, RadioGroup, Select, Switch, Toolbar } from '@mui/material';

import * as API from "../../../apiservice/Apiservice";
import { useForm } from "react-hook-form"
import { FaClosedCaptioning } from 'react-icons/fa';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import RemoveProductFromSopModal from './RemoveProductFromSopModal';
import SimpleBackdropCircular from '../SimpleBackdropCircular';

const steps = ['Receipt Register', 'Post Contract Review', 'Work Order Register'];

export default function ProductDetailsDialog(props) {


    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    return(
        <Dialog
        fullScreen
        open={props.show}
        onClose={props.onHide}
        TransitionComponent={Transition}
        hidden={!props.show}
     //   disableScrollLock={false}
        >
        <AppBar sx={{ position: '' }}>
          <Toolbar>
        
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Product Details : 
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button> */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onHide}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      
        </Dialog>
    )
}












