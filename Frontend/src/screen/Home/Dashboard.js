import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Chip, CircularProgress, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Pagination, Paper, Slide, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect, useTransition}from 'react'
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
import SpeedDialComponent from '../../layouts/SpeedDial/SpeedDialComponent';
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
    const [paymentDetailsLoader, setPaymentDetailsLoader] = useState(false)

    async function fetchCustomerDetails(){
      setPaymentDetailsLoader(true)
        API.getAllPaymentDetails().then((res) => {
          
          setCustomerTotalCreditPayment(res.data.totalCreditPayment)
          setCustomerTotalDebitPayment(res.data.totalDebitPayment)
          setCustomerTotalBalancePayment(res.data.totalBalancePayment)
          setPaymentDetailsLoader(false)
        });
    }

    const[creditPaymentLoader, setCreditPaymentLoader] = useState(false)
    const[creditPage, setCreditPage] = useState(1)
    const[totalCreditCount, setTotalCreditCount] = useState(1)
    const creditPaginationHandle = async (event, value) => {
      console.log("vlaue in handl change for pagination", value)
      setCreditPaymentLoader(true)
      setCreditPage(value)
      await fetchAllCreditPayment(value)
      setCreditPaymentLoader(false)
  };
    async function fetchAllCreditPayment(page){
      setCreditPaymentLoader(true)
      API.getAllCreditPaymentDetails(page).then((res) => {
        console.log("here is the credit payment details", res)
        setCreditPaymentList(res.data.data)
        setTotalCredit(res.data.totalCreditPayment)
        setTotalCreditCount(res?.data?.totalEntries)
        setCreditPaymentLoader(false)
      });
  }

  const[debitPaymentLoader, setDebitPaymentLoader] = useState(false)
  const[debitPage, setDebitPage] = useState(1)
  const[totalDebitCount, setTotalDebitCount] = useState(1)
  const debitPaginationHandle = async (event, value) => {
    console.log("vlaue in handl change for pagination", value)
    setDebitPaymentLoader(true)
    setDebitPage(value)
    await fetchAllDebitPayment(value)
    setDebitPaymentLoader(false)
};
  async function fetchAllDebitPayment(page){
    setDebitPaymentLoader(true)
    API.getAllDebitPaymentDetails(page).then((res) => {
      setDebitPaymentList(res.data.data)
      setTotalDebit(res.data.totalDebitPayment)
      setTotalDebitCount(res?.data?.totalEntries)
      setDebitPaymentLoader(false)
      
    });
}
  

    useEffect(() => {
        fetchCustomerDetails()
        fetchAllCreditPayment(creditPage)
        fetchAllDebitPayment(debitPage)

      
        }, []);

       
 
  return (
    <>
     {loaderVisible? <Loader/>:<></>}

   

         {/* Dashboard list for shows the list of clints */}
         <div className='row' style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}>
  <div className='col-6 mb-3' style={{ padding: 0 }}>
    <div style={{ height: 'auto', width: 'auto', borderRadius: 0, backgroundColor: '', textAlign: 'center', whiteSpace: 'nowrap', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
      <p style={{ padding: 0, margin: 0, display: 'inline-block', color: '', fontSize: 12, fontWeight: 600 }}>
        <span className="history-heading">Credit: </span>
      </p>
      <IconButton aria-label="delete" style={{ display: 'inline-block' }}>
        <TrendingDownIcon color='warning' />
      </IconButton>
      <p style={{ padding: 0, margin: 0, display: 'inline-block', color: '#FF8C00', fontSize: 12, fontWeight: 600 }}>
        <span className="history-heading">{paymentDetailsLoader?<CircularProgress size={25} style={{color:'#FF8C00'}}/> : customerTotalCreditPayment}</span>
      </p>
    </div>
  </div>
  <div className='col-6 mb-3' style={{ padding: 0 }}>
    <div style={{ height: 'auto', width: 'auto', borderRadius: 0, backgroundColor: '', textAlign: 'center', whiteSpace: 'nowrap', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
      <p style={{ padding: 0, margin: 0, display: 'inline-block', color: '', fontSize: 12, fontWeight: 600 }}>
        <span className="history-heading">Debit: </span>
      </p>
      <IconButton aria-label="delete" style={{ display: 'inline-block' }}>
        <TrendingUpIcon color='error' />
      </IconButton>
      <p style={{ padding: 0, margin: 0, display: 'inline-block', color: '#d32f2f', fontSize: 12, fontWeight: 600 }}>
        <span className="history-heading">{paymentDetailsLoader?<CircularProgress size={25} style={{color:'#d32f2f'}}/> :customerTotalDebitPayment}</span>
      </p>
    </div>
  </div>
</div>

         <div className='row' style={{margin:0, padding:0, marginTop:10, marginBottom:10,  paddingTop:0}}>
            <div className='col-12' style={{padding:0, paddingTop:0}}>
            <div style={{ disabled:'flex',height: 'auto', width: 'auto', borderRadius: 0, backgroundColor: '', textAlign: 'center', whiteSpace: 'nowrap', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <p style={{ padding: 0, margin: 0, display: 'inline-block', color: '', fontSize: 12, fontWeight: 600 }}>
    <span className="history-heading">Total Profit: </span>
  </p>
  <IconButton aria-label="delete" >
    <AccountBalanceWalletIcon color='success' fontSize='500px' />
  </IconButton>
  <p style={{ padding: 0, margin: 0, display: 'inline-block', color: 'green', fontSize: 12, fontWeight: 600 }}>
    <span className="history-heading" style={{color:'darkgreen'}}>{paymentDetailsLoader?<CircularProgress size={25} style={{color:'green'}}/> :customerTotalBalancePayment}</span>
  </p>
</div>
              </div>
         </div>
         
         {/* <div style={{padding:0, margin:0, textAlign:'center'}}>
         <Chip icon={<CalendarMonthIcon />} label="Year-2023" variant="outlined" />
         </div> */}
         
         <Divider variant="middle" style={{marginTop:10}}/>
         {/* credit and debit details...... */}

         {/* --------Credit details ---------------------- */}
        <Accordion defaultExpanded={true} style={{marginBottom:10, paddingLeft:0, paddingRight:0, marginTop:10}}>
            <AccordionSummary style={{backgroundColor:'lightgray',}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography style={{color:'black', fontWeight:600}}><span className="history-heading">Credit Logs</span></Typography>
            </AccordionSummary>
            <AccordionDetails style={{padding:0}}>
            <Typography >
                <div className='row' style={{padding:5, margin:0, marginTop:10}}> 
                      <div className='col-10'>
                      <p style={{textAlign:'left'}} className="history-heading">Total Credit Payment: {creditPaymentLoader?<CircularProgress size={15} style={{color:'lightgray'}}/> :totalCredit}</p>
                      </div>
                     
                      <div className='col-2' style={{textAlign:'right'}}>
                        {console.log("here is the payment list", creditPaymentList.length)}
                      <IconButton disabled={creditPaymentList.length==0} aria-label="delete" style={{marginTop:-7}} onClick={()=>{window.location.href = `https://tendertrackr.up.railway.app/api/v1/download-income-details`}}>
                      {creditPaymentLoader?<CircularProgress size={15} style={{color:'green'}}/> :<SimCardDownloadIcon color={creditPaymentList.length==0 ? 'disabled':'success'}/>}
                    </IconButton>
                    
                      </div>
                  
                  
                    
                  
                      
                </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr.</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell sx={{minWidth:160}} ><span className="history-heading"> Client Name</span></StyledTableCell>
                    <StyledTableCell sx={{minWidth:140}} ><span className="history-heading">MOP</span></StyledTableCell>
                    <StyledTableCell sx={{minWidth:180}}><span className="history-heading">Remark</span></StyledTableCell>
                    <StyledTableCell ><span className="history-heading">Amount</span></StyledTableCell>
                  </TableRow>
                </TableHead>
                {creditPaymentLoader?
                <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px', width:'100%', marginLeft:'50%' }}>
                <CircularProgress size={25} style={{color:'gray',}}/></div> :
                <TableBody>
                  {creditPaymentList.map((paymentDetails, index) => (
                    
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">
                      <span className="history-heading">{index+1}</span>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                      <span className="history-heading">{paymentDetails.date}</span>
                      </StyledTableCell>
                      <StyledTableCell >
                      <span className="history-heading">{paymentDetails.customer_name}</span>
                      </StyledTableCell>
                      
                      <StyledTableCell><span className="history-heading">{paymentDetails.mop}</span></StyledTableCell>
                      <StyledTableCell><span className="history-heading">{paymentDetails.remark}</span></StyledTableCell>
                      <StyledTableCell><span className="history-heading">{(paymentDetails.amount).toFixed(2)}</span></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
}
              </Table>
            </TableContainer>
            <div className='row' style={{margin:20, marginBottom:70, backgroundColor:'', float:'center', marginRight:0}}>
<Stack spacing={0} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
  <Pagination count={Math.ceil(totalCreditCount / 5)} page={creditPage} onChange={creditPaginationHandle}  />
</Stack>  </div>
            </Typography>
            </AccordionDetails>
        </Accordion>
        {/* --------------credit close--------------------- */}
        {/* --------Debit details ---------------------- */}
        <Accordion defaultExpanded={true} style={{marginBottom:50, paddingLeft:0, paddingRight:0, marginTop:10}}>
            <AccordionSummary style={{backgroundColor:'lightgray',}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography style={{color:'black', fontWeight:600}}><span className="history-heading">Debit Logs</span></Typography>
            </AccordionSummary>
            <AccordionDetails style={{padding:0}}>
            <Typography >
            <div className='row' style={{padding:5, margin:0, marginTop:10}}> 
                      <div className='col-10'>
                      <p style={{textAlign:'left'}}> <span className="history-heading">Total Credit Payment: {debitPaymentLoader?<CircularProgress size={15} style={{color:'gray'}}/> : totalDebit}</span></p>
                      </div>
                     
                      <div className='col-2' style={{textAlign:'right'}}>
                      <IconButton disabled={debitPaymentList.length==0} aria-label="delete" style={{marginTop:-7}} onClick={()=>{window.location.href = `https://tendertrackr.up.railway.app/api/v1/download-expense-details`}}>
                      {debitPaymentLoader?<CircularProgress size={15} style={{color:'green'}}/> :
                      <SimCardDownloadIcon color={debitPaymentList.length==0 ? 'disabled':'success'}/>}
                    </IconButton>
                    
                      </div>
                  
                  
                    
                  
                      
                </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr.</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell sx={{minWidth:160}}> <span className="history-heading">Client Name</span></StyledTableCell>
                    <StyledTableCell sx={{minWidth:160}}> <span className="history-heading">Dealer Name</span></StyledTableCell>
                    <StyledTableCell style={{whiteSpace:'nowrap'}}> <span className="history-heading">Site Address</span></StyledTableCell>
                    <StyledTableCell sx={{minWidth:180}}> <span className="history-heading">Materials</span></StyledTableCell>
                    <StyledTableCell sx={{minWidth:140}}> <span className="history-heading">MOP</span></StyledTableCell>
                    <StyledTableCell style={{whiteSpace:'nowrap'}}> <span className="history-heading">Work Type</span></StyledTableCell>
                    <StyledTableCell> <span className="history-heading">Amount</span></StyledTableCell>
                  </TableRow>
                </TableHead>
                {debitPaymentLoader?
                <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px', width:'100%', marginLeft:'50%' }}>
                <CircularProgress size={25} style={{color:'gray',}}/></div>:
                <TableBody>
                  {debitPaymentList.map((paymentDetails, index) => (
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">
                      <span className="history-heading">{index+1}</span>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                      <span className="history-heading">{paymentDetails.date}</span>
                      </StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{paymentDetails.customer_name}</span></StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{paymentDetails.dealer_name}</span></StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{paymentDetails.site_name}</span></StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{paymentDetails.remark}</span></StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{paymentDetails.mop}</span></StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{paymentDetails.work_type}</span></StyledTableCell>
                      <StyledTableCell> <span className="history-heading">{(paymentDetails.amount).toFixed(2)}</span></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
}
              </Table>
            </TableContainer>
            <div className='row' style={{margin:20, marginBottom:70, backgroundColor:'', float:'center', marginRight:0}}>
<Stack spacing={0} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
  <Pagination count={Math.ceil(totalDebitCount / 5)} page={debitPage} onChange={debitPaginationHandle}  />
</Stack>




                            </div>
            </Typography>
            </AccordionDetails>
        </Accordion>
        {/* --------------credit close--------------------- */}
      <SpeedDialComponent/>
    </>
  )
}

export default Dashboard


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'gray',
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