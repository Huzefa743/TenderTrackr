import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Chip, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Slide, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
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

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';


function Dashboard() {

    const navigate = useNavigate();
    const[customerList, setCustomerList] = useState([])
    const [customerTotalCreditPayment, setCustomerTotalCreditPayment] = useState(0)
    const [customerTotalDebitPayment, setCustomerTotalDebitPayment] = useState(0)
    const [customerTotalBalancePayment, setCustomerTotalBalancePayment] = useState(0)
    const [loaderVisible, setLoaderVisilbe] = useState(false)
    const [creditPaymentList, setCreditPaymentList] = useState([])
    const [debitPaymentList, setDebitPaymentList] = useState([])
    const [totalCredit, setTotalCredit] = useState()
    const [totalDebit, setTotalDebit] = useState()

    async function fetchCustomerDetails(){
        API.getAllPaymentDetails().then((res) => {
          setCustomerTotalCreditPayment(res.data.totalCreditPayment)
          setCustomerTotalDebitPayment(res.data.totalDebitPayment)
          setCustomerTotalBalancePayment(res.data.totalBalancePayment)
        });
    }
    async function fetchAllCreditPayment(){
      API.getAllCreditPaymentDetails().then((res) => {
        setCreditPaymentList(res.data.data)
        setTotalCredit(res.data.totalCreditPayment)
        
      });
  }
  async function fetchAllDebitPayment(){
    API.getAllDebitPaymentDetails().then((res) => {
      setDebitPaymentList(res.data.data)
      setTotalDebit(res.data.totalDebitPayment)
      
    });
}
  

    useEffect(() => {
        fetchCustomerDetails()
        fetchAllCreditPayment()
        fetchAllDebitPayment()

      
        }, []);
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}

         {/* Dashboard list for shows the list of clints */}
         <div className='row' style={{width:'100%', height:'auto',margin:0, padding:0 }}>
          
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
         
         <Divider variant="middle" style={{marginTop:10}}/>
         {/* credit and debit details...... */}

         {/* --------Credit details ---------------------- */}
        <Accordion style={{marginBottom:10, paddingLeft:0, paddingRight:0, marginTop:10}}>
            <AccordionSummary style={{backgroundColor:'lightgray',}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography style={{color:'black', fontWeight:600}}>Credit Logs</Typography>
            </AccordionSummary>
            <AccordionDetails style={{padding:0}}>
            <Typography >
                <div className='row' style={{padding:5, margin:0, marginTop:10}}> 
                      <div className='col-10'>
                      <p style={{textAlign:'left'}}>Total Credit Payment: {totalCredit}</p>
                      </div>
                     
                      <div className='col-2' style={{textAlign:'right'}}>
                      <IconButton aria-label="delete" style={{marginTop:-7}} onClick={()=>{window.location.href = `https://kraftman-consultant.onrender.com/api/v1/download-income-details`}}>
                      <SimCardDownloadIcon color='success'/>
                    </IconButton>
                    
                      </div>
                  
                  
                    
                  
                      
                </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr.</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell sx={{minWidth:160}} >Client Name</StyledTableCell>
                    <StyledTableCell sx={{minWidth:140}} >MOP</StyledTableCell>
                    <StyledTableCell sx={{minWidth:180}}>Remark</StyledTableCell>
                    <StyledTableCell >Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creditPaymentList.map((paymentDetails, index) => (
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">
                        {index+1}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {paymentDetails.date}
                      </StyledTableCell>
                      <StyledTableCell >
                        {paymentDetails.customer_name}
                      </StyledTableCell>
                      
                      <StyledTableCell>{paymentDetails.mop}</StyledTableCell>
                      <StyledTableCell>{paymentDetails.remark}</StyledTableCell>
                      <StyledTableCell>{(paymentDetails.amount).toFixed(2)}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Typography>
            </AccordionDetails>
        </Accordion>
        {/* --------------credit close--------------------- */}
        {/* --------Debit details ---------------------- */}
        <Accordion style={{marginBottom:50, paddingLeft:0, paddingRight:0, marginTop:10}}>
            <AccordionSummary style={{backgroundColor:'lightgray',}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography style={{color:'black', fontWeight:600}}>Debit Logs</Typography>
            </AccordionSummary>
            <AccordionDetails style={{padding:0}}>
            <Typography >
            <div className='row' style={{padding:5, margin:0, marginTop:10}}> 
                      <div className='col-10'>
                      <p style={{textAlign:'left'}}>Total Credit Payment: {totalDebit}</p>
                      </div>
                     
                      <div className='col-2' style={{textAlign:'right'}}>
                      <IconButton aria-label="delete" style={{marginTop:-7}} onClick={()=>{window.location.href = `https://kraftman-consultant.onrender.com/api/v1/download-expense-details`}}>
                      <SimCardDownloadIcon color='success'/>
                    </IconButton>
                    
                      </div>
                  
                  
                    
                  
                      
                </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr.</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell sx={{minWidth:160}}>Client Name</StyledTableCell>
                    <StyledTableCell sx={{minWidth:160}}>Dealer Name</StyledTableCell>
                    <StyledTableCell style={{whiteSpace:'nowrap'}}>Site Address</StyledTableCell>
                    <StyledTableCell sx={{minWidth:180}}>Materials</StyledTableCell>
                    <StyledTableCell sx={{minWidth:140}}>MOP</StyledTableCell>
                    <StyledTableCell style={{whiteSpace:'nowrap'}}>Work Type</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {debitPaymentList.map((paymentDetails, index) => (
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">
                        {index+1}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {paymentDetails.date}
                      </StyledTableCell>
                      <StyledTableCell>{paymentDetails.customer_name}</StyledTableCell>
                      <StyledTableCell>{paymentDetails.dealer_name}</StyledTableCell>
                      <StyledTableCell>{paymentDetails.site_name}</StyledTableCell>
                      <StyledTableCell>{paymentDetails.remark}</StyledTableCell>
                      <StyledTableCell>{paymentDetails.mop}</StyledTableCell>
                      <StyledTableCell>{paymentDetails.work_type}</StyledTableCell>
                      <StyledTableCell>{(paymentDetails.amount).toFixed(2)}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Typography>
            </AccordionDetails>
        </Accordion>
        {/* --------------credit close--------------------- */}
    
    </>
  )
}

export default Dashboard


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0059BF',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));