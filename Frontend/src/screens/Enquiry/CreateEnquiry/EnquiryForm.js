import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button, Form } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import StepLabel from '@mui/material/StepLabel';
import ButtonPr from '../ButtonPr';
import ButtonSpinner from '../Spinner';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import '../Horizontal.css'
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, InputLabel, Radio, RadioGroup, Select } from '@mui/material';
import ProductContractModal from '../productContractModal';
import ReceiptRegisterModal from '../ReceiptRegisterModal';
import FinishEnquiryCreation from '../FinishEnquiryCreationModal';
import * as API from "../../../apiservice/Apiservice";
import SimpleBackdropCircular from '../SimpleBackdropCircular';
import SimpleBackdropSign from '../SimpleBackdropSign';
import {useForm} from "react-hook-form"
import { FaClosedCaptioning } from 'react-icons/fa';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const steps = ['Receipt Register', 'Post Contract Review', 'Work Order Register'];

export default function CreateEnquiryStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [customerFormHidden, setCustomerFormHidden] = React.useState(true)
  const [receiptRegisterHidden, setReceiptRegisterHidden] = React.useState(false)
  const [postContractHidden, setPostContractHidden] = React.useState(true)
  const [workOrderRegisterHidden, setWorkOrderRegisterHidden] = React.useState(true)
  const [nextButtonDisable, setNextButtonDisable] = React.useState(true)
  const [saveButtonDisable, setSaveButtonDisable] = React.useState(false)
  const [spinnerVisible, setSpinnerVisible] = React.useState(false)
  
  const [refDateValue, setRefDsateValue] = React.useState(dayjs('2023-01-01'));
  

  const [productContractModalShow, setProductContractModalShow] = React.useState(false)
  const [receiptRegisterModalShow, setReceiptRegisterModalShow] = React.useState(false)
  const [finishProcessModalShow, setFinishProcessModalShow] = React.useState(false)
//   Customer details input feilds
  const [customerName, setCustomerName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [mobile, setMobile] = useState("")
  const [gst, setGST] = useState("")
  const [disableCustomerField, setDisableCustomerField] = useState(false)
  const [validationApplyCustomer, setValidationApplyCustomer] = useState(false)

  
  
  //receipt register input fields
//   const [ttglEnqRefNo, setttglEnqRefNo] = useState("")
  const [revision, setrevision] = useState("")
  const [ttglEnqRefDate, setttglEnqRefDate] = useState("01-01-23")
  const [customerId, setCustomerId] = useState("")
  const [deltBy, setdeltBy] = useState("")
  const [name, setName] = useState("")
  const [custEnqRefNo, setcustEnqRefNo] = useState("")
  const [specification, setspecification] = useState("")
  const [nameOfItem, setnameOfItem] = useState("")
  const [ratingKva, setratingKva] = useState("")
  const [level, setlevel] = useState("L1")
  const [voltageRatingPr, setvoltageRatingPr] = useState("")
  const [voltageRatingSec, setvoltageRatingSec] = useState("")
  const [losses100, setlosses100] = useState("")
  const [losses50, setlosses50] = useState("")
  const [loadLosses, setLoadLosses] = useState("")
  const [noLoadLosses, setNoLoadLosses] = useState("")
  const [loadSelect, setLoadSelect] = useState("first")
  const [notSelectDisable, setNotSelectDisable] = useState(false)
  const [qtyQtd, setqtyQtd] = useState("")
  const [quotedEstimate, setquotedEstimate] = useState("")
  const [newttglEnqRefNo, setNewttglEnqRefNo] = useState(0)
  const [validationApply, setValidationApply] = useState(false)
  const [loaderVisible, setLoaderVisilbe] = useState(false)
  const [disableReceiptField, setDisableReceiptField] = useState(false)

  //post contract input field
  const [validationApplyPostContract, setValidationApplyPostContract] = useState(false)
  const [disablePostContractField, setDisablePostContractField] = useState(false)
  const [windingMaterial, setwindingMaterial] = useState("")
  const [tempRiseOil, settempRiseOil] = useState("")
  const [tempRiseWinding, settempRiseWinding] = useState("")
  const [eff, seteff] = useState("")
  const [tapChangerType, settapChangerType] = useState("")
  const [impedance, setimpedance] = useState("")
  const [connectionPhase, setconnectionPhase] = useState("")
  const [frequency, setfrequency] = useState("")
  const [cooling, setcooling] = useState("")
  const [vectorGroup, setvectorGroup] = useState("")
  const [paymentAdv, setpaymentAdv] = useState("")
  const [balBeforeDispatch, setbalBeforeDispatch] = useState("")
  const [guarantee, setguarantee] = useState("")
  const [warranty, setwarranty] = useState("")
  const [abg, setabg] = useState("")
  const [pbg, setpbg] = useState("")
  const [qtyReceived, setqtyReceived] = useState("")
  const [poRate, setpoRate] = useState("")
  const [totalAmountPlusGST, settotalAmountPlusGST] = useState("")
  const [deliveryType, setdeliveryType] = useState("")
  const [shortCircuit, setshortCircuit] = useState("No")
  const [lightImp, setlightImp] = useState("No")
  const [heatRun, setheatRun] = useState("No")
  const [specialTest, setSpecialTest] = useState("No")
  const [routineTesting, setroutineTesting] = useState("No")
  const [remark, setremark] = useState("")
  const [hvTermination, sethvTermination] = useState("")
  const [lvTermination, setlvTermination] = useState("")
  const [enquiryId, setEnquiryId] = useState("ENQ4973")
  
  //Work Order Register
  const [validationApplyWorkOrder, setValidationApplyWorkOrder] = useState(false)
  const [disableWorkOrderField, setDisableWorkOrderField] = useState(false)
  const [custPoNo, setcustPoNo] = useState("")
  const [custPoDate, setcustPoDate] = useState("2023/01/01")
  const [tfsCodeNo, settfsCodeNo] = useState("")

  //new attributes
  const [pendingEnquiryList, setPendingEnquiryList] = useState([])
  const [productId, setProductId] = useState("")
  // finish function call
  const navigate = useNavigate();

  function finishOrder() {
    navigate("/pending-enquiry");
  }

  const takeRefDateValue = (newValue) => {
    setRefDsateValue(newValue);
    let date = new Date(newValue)
    setttglEnqRefDate(date.toLocaleDateString())
  };
  const custPoDateRef = (newValue) => {
       let date = new Date(newValue)
      setcustPoDate(date.toLocaleDateString())
    };

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const takeCustPoDateValue = (newValue) => {
      console.log("new value", newValue)
      let date = new Date(newValue)
      let data = {...workOrderRegisterFormFields}
    
   
        data["custPoDate"] = moment(date).format("YYYY/MM/DD") 

    setWorkOrderRegisterFormFileds(data);
    // setcustPoDate(moment(date).format("YYYY/MM/DD"));
    };

  function saveDetails(){
    setSpinnerVisible(false)
    setTimeout(() => {  setSpinnerVisible(false) }, 500);
    
    if(activeStep==0){
    //   console.log("here is load status", loadSelect)
    //   setValidationApply(true)
    //   createReceiptRegister()
    createProductReceiptRegister()
    }
    if(activeStep==1){
    //   console.log("active state", activeStep)
    //   setValidationApplyPostContract(true)
    //   createPostContract()
    createPostContractRegister()
    }
    if(activeStep==2){
      console.log("active state", activeStep)
    //   setValidationApplyWorkOrder(true)
    //   createWorkOrder()
    createWorkOrderRegister()
    }
  }

  function nextOrder(){
    console.log("next order working", activeStep)
//     if(activeStep==0){
//       setCustomerFormHidden(true)
//       setReceiptRegisterHidden(false)
//       setActiveStep(1)
//       setNextButtonDisable(true)
//       setSaveButtonDisable(false)
//     }
     if(activeStep==0){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(false)
      setActiveStep(1)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)
    }
    else if(activeStep==1){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(true)
      setWorkOrderRegisterHidden(false)
      setActiveStep(2)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)

    }
    else if(activeStep==2){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(true)
      setWorkOrderRegisterHidden(false)
      setActiveStep(3)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)

    }
    
    
    
  }
  
  function backOrder(){
    console.log("next order working", activeStep)
     if(activeStep==1){
      setCustomerFormHidden(false)
      setReceiptRegisterHidden(true)
      setPostContractHidden(true)
      setWorkOrderRegisterHidden(true)
      setActiveStep(0)
      setNextButtonDisable(false)
      setSaveButtonDisable(true)
    }
    else if(activeStep==2){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(false)
      setPostContractHidden(true)
      setWorkOrderRegisterHidden(true)
      setActiveStep(1)
      setNextButtonDisable(false)
      setSaveButtonDisable(true)
    } 
    else if(activeStep==3){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(false)
      setWorkOrderRegisterHidden(true)
      setActiveStep(2)
      setNextButtonDisable(false)
      setSaveButtonDisable(true)
    }   
  }
 

  function createCustomer(){
      console.log("create customer is running...")
      if(customerName==="" || email==="" || address==="" || mobile==="" || gst===""){
            console.log("create customer has null")
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
      }
      else{
            if(!name.match("^([0-9])+([.][0-9]+)?$") && email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            && !address.match("^([0-9])+([.][0-9]+)?$") && mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            && !gst.match("^([0-9])+([.][0-9]+)?$")){
                  API.createCustomer(customerName, email, address, mobile, gst)
                  .then((res) => {
                   console.log("here is response for customer", res)
                      setLoaderVisilbe(true)
                       setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                       setTimeout(() => {  setDisableCustomerField(true) }, 100);
                       setValidationApplyCustomer(false)
                       setNextButtonDisable(false)
                       setSaveButtonDisable(true)
                       setCustomerId(res.data.data.customer_id)
                
                  })
                  .catch((err) => {
                      setNextButtonDisable(true)
                      setSaveButtonDisable(false)
                    console.log("ehre is cutomer error", err)
                })
                  
            }
            else{
                  console.log("create customer has error for regex")
                  setNextButtonDisable(true)
                  setSaveButtonDisable(false)
            }       
      }
}

function createReceiptRegister(){
      console.log("create receipt Register is running...")
      let loadStatusValid = false
     if(loadSelect==="first"){
      console.log("inside first condition")
      if(!losses50=="" && !losses100==""){
            console.log("second step")
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
        if(losses100.match("^([0-9])+([.][0-9]+)?$") && losses50.match("^([0-9])+([.][0-9]+)?$")){
                  loadStatusValid=true
        }
      }
      
     }
     else if(loadSelect==="second"){
      console.log("inside second condition")
      if(!loadLosses=="" && !noLoadLosses==""){
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
             if(loadLosses.match("^([0-9])+([.][0-9]+)?$") && noLoadLosses.match("^([0-9])+([.][0-9]+)?$")){
                  loadStatusValid=true
        }
      }
      
     }
      console.log(" here is status", loadStatusValid)
     if(loadStatusValid){
      if(ttglEnqRefNo==="" || specification==="" || nameOfItem==="" || ratingKva==="" || level==="" || voltageRatingPr==="" || voltageRatingSec==="" ||
       qtyQtd==="" || quotedEstimate===""){
         console.log("error in create receitp register null values") 
         setNextButtonDisable(true)
         setSaveButtonDisable(false)
        
     }
     else{
      if( !specification.match("^([0-9])+([.][0-9]+)?$")
      && !nameOfItem.match("^([0-9])+([.][0-9]+)?$") && ratingKva.match("^([0-9])+([.][0-9]+)?$") && !level.match("^([0-9])+([.][0-9]+)?$") && voltageRatingPr.match("^([0-9])+([.][0-9]+)?$") && voltageRatingSec.match("^([0-9])+([.][0-9]+)?$") &&
       qtyQtd.match("^([0-9])+([.][0-9]+)?$") && quotedEstimate.match("^([0-9])+([.][0-9]+)?$")){
            API.createProductFirstStep(ttglEnqRefNo, specification, nameOfItem, ratingKva, level, voltageRatingPr, voltageRatingSec, losses100, losses50, loadLosses, noLoadLosses, qtyQtd, quotedEstimate)
            .then((res) => {
             console.log("here is response for create receipt register", res)
             setLoaderVisilbe(true)
             setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
             setTimeout(() => {  setDisableReceiptField(true) }, 100);
             setValidationApply(false)
              console.log("here is the statu before for buttons", nextButtonDisable, saveButtonDisable)
            
             console.log("here is the statu for after buttons", nextButtonDisable, saveButtonDisable)
             setEnquiryId(res.data.data.enquiry_id)
             setNextButtonDisable(false)
             setSaveButtonDisable(true)
             setProductId(res.data.data.product_id)
            })
            .catch((err) => {
                setNextButtonDisable(true)
                setSaveButtonDisable(false)
                console.log("ehre is cutomer error", err)
          })
      }
      else{
            console.log("error in create receitp register regex values") 
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
      }
     
     }
     }

    
        
  
  
}

function createPostContract(){
      console.log("create post contract is running...", productId, windingMaterial, tempRiseOil, tempRiseWinding, eff, tapChangerType, impedance, connectionPhase, frequency, cooling, vectorGroup, paymentAdv, balBeforeDispatch, guarantee, warranty, abg, pbg, qtyReceived,poRate, totalAmountPlusGST, deliveryType, shortCircuit, lightImp, heatRun, specialTest, routineTesting, remark, hvTermination, lvTermination)
      if(windingMaterial===""|| tempRiseOil===""|| tempRiseWinding==="" || eff==="" || tapChangerType===""|| impedance==="" || connectionPhase===""|| frequency===""|| cooling==="" || vectorGroup==="" || paymentAdv==="" || balBeforeDispatch==="" || guarantee==="" || warranty==="" || abg==="" || pbg==="" || qtyReceived==="" || poRate==="" || totalAmountPlusGST==="" || deliveryType==="" || shortCircuit==="" || lightImp==="" ||  heatRun==="" || specialTest==="" || routineTesting===""|| remark==="" || hvTermination===""|| lvTermination===""){
            console.log("create post contract has null")
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
      }
      else{
            console.log(productId!="", !windingMaterial.match("^([0-9])+([.][0-9]+)?$"), tempRiseOil.match("^([0-9])+([.][0-9]+)?$"), tempRiseWinding.match("^([0-9])+([.][0-9]+)?$"), eff.match("^([0-9])+([.][0-9]+)?$"), !tapChangerType.match("^([0-9])+([.][0-9]+)?$") , impedance.match("^([0-9])+([.][0-9]+)?$") , connectionPhase.match("^([0-9])+([.][0-9]+)?$") , frequency.match("^([0-9])+([.][0-9]+)?$") , !cooling.match("^([0-9])+([.][0-9]+)?$") ,!vectorGroup.match("^([0-9])+([.][0-9]+)?$") , paymentAdv.match("^([0-9])+([.][0-9]+)?$") , balBeforeDispatch.match("^([0-9])+([.][0-9]+)?$") , guarantee.match("^([0-9])+([.][0-9]+)?$") , warranty.match("^([0-9])+([.][0-9]+)?$") , abg.match("^([0-9])+([.][0-9]+)?$") , pbg.match("^([0-9])+([.][0-9]+)?$") , qtyReceived.match("^([0-9])+([.][0-9]+)?$") , poRate.match("^([0-9])+([.][0-9]+)?$") , totalAmountPlusGST.match("^([0-9])+([.][0-9]+)?$") , !deliveryType.match("^([0-9])+([.][0-9]+)?$"), !shortCircuit.match("^([0-9])+([.][0-9]+)?$") , !lightImp.match("^([0-9])+([.][0-9]+)?$") , !heatRun.match("^([0-9])+([.][0-9]+)?$") , !specialTest.match("^([0-9])+([.][0-9]+)?$") , !routineTesting.match("^([0-9])+([.][0-9]+)?$") , !remark.match("^([0-9])+([.][0-9]+)?$") , !hvTermination.match("^([0-9])+([.][0-9]+)?$"), !lvTermination.match("^([0-9])+([.][0-9]+)?$"))
            if(productId!="" && !windingMaterial.match("^([0-9])+([.][0-9]+)?$") && tempRiseOil.match("^([0-9])+([.][0-9]+)?$") && tempRiseWinding.match("^([0-9])+([.][0-9]+)?$") && eff.match("^([0-9])+([.][0-9]+)?$") && !tapChangerType.match("^([0-9])+([.][0-9]+)?$") && impedance.match("^([0-9])+([.][0-9]+)?$") && connectionPhase.match("^([0-9])+([.][0-9]+)?$") && frequency.match("^([0-9])+([.][0-9]+)?$") && !cooling.match("^([0-9])+([.][0-9]+)?$") && !vectorGroup.match("^([0-9])+([.][0-9]+)?$") && paymentAdv.match("^([0-9])+([.][0-9]+)?$") && balBeforeDispatch.match("^([0-9])+([.][0-9]+)?$") && guarantee.match("^([0-9])+([.][0-9]+)?$") && warranty.match("^([0-9])+([.][0-9]+)?$") && abg.match("^([0-9])+([.][0-9]+)?$") && pbg.match("^([0-9])+([.][0-9]+)?$") && qtyReceived.match("^([0-9])+([.][0-9]+)?$") && poRate.match("^([0-9])+([.][0-9]+)?$") && totalAmountPlusGST.match("^([0-9])+([.][0-9]+)?$") && !deliveryType.match("^([0-9])+([.][0-9]+)?$") && !shortCircuit.match("^([0-9])+([.][0-9]+)?$") && !lightImp.match("^([0-9])+([.][0-9]+)?$") && !heatRun.match("^([0-9])+([.][0-9]+)?$") && !specialTest.match("^([0-9])+([.][0-9]+)?$") && !routineTesting.match("^([0-9])+([.][0-9]+)?$") && !remark.match("^([0-9])+([.][0-9]+)?$") && !hvTermination.match("^([0-9])+([.][0-9]+)?$") && !lvTermination.match("^([0-9])+([.][0-9]+)?$")){
                  API.createPostContract(productId, windingMaterial, tempRiseOil, tempRiseWinding, eff, tapChangerType, impedance, connectionPhase, frequency, cooling, vectorGroup, paymentAdv, balBeforeDispatch, guarantee, warranty, abg, pbg, qtyReceived,poRate, totalAmountPlusGST, deliveryType, shortCircuit, lightImp, heatRun, specialTest, routineTesting, remark, hvTermination, lvTermination)
                  .then((res) => {
                   console.log("here is response post contract", res)
                      setLoaderVisilbe(true)
                       setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                       setTimeout(() => {  setDisablePostContractField(true) }, 100);
                       setValidationApplyPostContract(false)
                       setNextButtonDisable(false)
                       setSaveButtonDisable(true)
                
                  })
                  .catch((err) => {
                        alert("Enquiry Id is mismatch: ", err)
                      setNextButtonDisable(true)
                      setSaveButtonDisable(false)
                    console.log("here is post create post contract error", err)
                })
                  
            }
            else{
                  console.log("create post contract has error for regex")
                  setNextButtonDisable(true)
                  setSaveButtonDisable(false)
            }       
      }
}
// create work order api service call
function createWorkOrder(){
      console.log("create work order is running...", productId, custPoNo, custPoDate, tfsCodeNo)
      if(custPoNo==="" || custPoDate==="" || tfsCodeNo===""){
            console.log("create work order has null")
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
      }
      else{
            if(productId!="" && !custPoNo.match("^([0-9])+([.][0-9]+)?$") && !tfsCodeNo.match("^([0-9])+([.][0-9]+)?$")){
                  API.createWorkOrder(productId, custPoNo, custPoDate, tfsCodeNo)
                  .then((res) => {
                   console.log("Inside if fr work order success", res)
                      setLoaderVisilbe(true)
                       setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                       setTimeout(() => {  setDisableWorkOrderField(true) }, 100);
                       setValidationApplyWorkOrder(false)
                       setNextButtonDisable(false)
                       setSaveButtonDisable(true)
                       setActiveStep(4)
                
                  })
                  .catch((err) => {
                      setNextButtonDisable(true)
                      setSaveButtonDisable(false)
                    console.log("Inside catch for work order ", err)
                })
                  
            }
            else{
                  console.log("Inside else for work order regex")
                  setNextButtonDisable(true)
                  setSaveButtonDisable(false)
            }       
      }
}


//---------------------------------------------------------
const[postContractProductDetails, setPostContractProductDetails] = useState([])
const[postContractMapExecute, setPostContractMapExecute] = useState(false)

const [formFields, setFormFields] = useState([
    {name:'', age:''},
])
const[ttglEnqRefNo, setTtglEnqRefNo] = useState(null)
const [receiptRegisterFormFields, setReceiptRegisterFormFileds] = useState([
  {
    ttglEnqRefNo:'',
    specification:'',
    nameOfItem:'',
    ratingKva:'',
    ratingKvaUnit:'KVA',
    level:'',
    voltageRatingPr:'',
    voltageRatingSec:'',
    qtyQtd:'',
    quotedEstimate:'',
    losses50:'',
    losses50Unit:'kW',
    losses100:'',
    losses100Unit:'kW',
    noLoadLosses:'',
    noLoadLossesUnit:'kW',
    loadLosses:'',
    loadLossesUnit:'kW',
   
},
])

const createProductReceiptRegister =(e)=>{
   // e.preventDefault();
    console.log(receiptRegisterFormFields)
    setLoaderVisilbe(true)
    API.createProductFirstStep(ttglEnqRefNo, receiptRegisterFormFields)
    .then(async(res) => {
     console.log("here is response for create receipt register", res)
     if(res.status==200){
        
        setPostContractProductDetails(res.data.data)
        for(let i=0; i<(res.data.data).length; i++){
            console.log("for loop is working..", i)
            await addPostContractForm(res.data.data[i].product_id, res.data.data[i].ttgl_enq_ref_no, res.data.data[i].name_of_item, res.data.data[i].specification)
        }
       
        console.log("here is he result", postContractFormFields)
        
     }
     setLoaderVisilbe(false)
     setDisableReceiptField(true)
    //  setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
    //  setTimeout(() => {  setDisableReceiptField(true) }, 100);
     setValidationApply(false)
      console.log("here is the statu before for buttons", nextButtonDisable, saveButtonDisable)
    
     console.log("here is the statu for after buttons", nextButtonDisable, saveButtonDisable)
     setEnquiryId(res.data.data.enquiry_id)
     setNextButtonDisable(false)
     setSaveButtonDisable(true)
     setProductId(res.data.data.product_id)
    })
    .catch((err) => {
        setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
        setNextButtonDisable(true)
        setSaveButtonDisable(false)
        alert("Enquiry Not created!!", err.response.message)
        console.log("ehre is add product first error", err)
  })
}

const handleReceiptRegisterFormChange= (event, index)=>{
    console.log(index, event.target.name)
    let data = [...receiptRegisterFormFields]
    
       if(event.target.name=="ttglEnqRefNo"){
        setTtglEnqRefNo(event.target.value)
       }
        data[index][event.target.name] = event.target.value;
   

    setReceiptRegisterFormFileds(data);
}

const addReceiptRegisterForm =() =>{
    let object ={
        ttglEnqRefNo: ttglEnqRefNo,
        specification:'',
        nameOfItem:'',
        ratingKva:'',
        ratingKvaUnit:'KVA',
        level:'',
        voltageRatingPr:'',
        voltageRatingSec:'',
        qtyQtd:'',
        quotedEstimate:'',
        losses50:'',
        losses50Unit:'kW',
        losses100:'',
        losses100Unit:'kW',
        noLoadLosses:'',
        noLoadLossesUnit:'kW',
        loadLosses:'',
        loadLossesUnit:'kW',
    }
    setReceiptRegisterFormFileds([...receiptRegisterFormFields, object])
 }

 const removeReceiptRegisterForm =(index)=>{
    console.log(" index", index)
   let data = [...receiptRegisterFormFields]
   data.splice(index, 1)
   setReceiptRegisterFormFileds(data)
}

const [postContractFormFields, setPostContractFormFileds] = useState([])
  const addPostContractForm =async (productId, ttglEnqRefNo, nameOfItem, specification) =>{
    console.log("post contract is runningg")
    let object ={
        nameOfItem: nameOfItem,
        specification: specification,
        ttglEnqRefNo:ttglEnqRefNo,
        productId: productId,
        windingMaterial:'',
        tempRiseOil:'',
        tempRiseWinding:'',
        tapChangerType:'',
        connectionPhase:'',
        frequency:'',
        impedance:'',
        cooling:'',
        vectorGroup:'',
        deliveryTime:'',
        lvTermination:'',
        hvTermination:'',
        qtyReceived:'',
        poRate:'',
        totalAmountPlusgst:'',
        tfsCodeNo:''
    }
    setPostContractFormFileds(postContractFormFields=>[...postContractFormFields, object])

    
 }
  const handlePostContractFormChange= (event, index)=>{
    console.log(index, event.target.name)
    let data = [...postContractFormFields]
    
   
        data[index][event.target.name] = event.target.value; 

    setPostContractFormFileds(data);
}
const createPostContractRegister=(e)=>{
    console.log("create post contract is working...")
   // e.preventDefault();
     console.log(postContractFormFields)
     setLoaderVisilbe(true)
    API.createPostContract(postContractFormFields)
    .then(async(res) => {
     console.log("here is response for create receipt register", res)
     if(res.status==200){
        
        setLoaderVisilbe(false)
        setDisablePostContractField(true)
        setValidationApply(false)
        setNextButtonDisable(false)
        setSaveButtonDisable(true)
     }
    
    })
    .catch((err) => {
        setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
        setNextButtonDisable(true)
        setSaveButtonDisable(false)
        alert("Product Not created!!", err.response.message)
        console.log("here is the post contract product error!! ", err)
  })
    
 }
// ---------------------------work order--------------------------------------------------

const [workOrderRegisterFormFields, setWorkOrderRegisterFormFileds] = useState({
    paymentAdv:'',
    balBeforeDispatch:'',
    abg:'',
    pbg:'',
    warranty:'',
    shortCircuit:'No',
    lightImp:'No',
    heatRun:'No',
    specialTest:'No',
    routineTesting:'No',
    remark:'',
    custPoNo:'',
    custPoDate:'2023/01/01',
    frieghtAndInsurance:'Acceptable'

})


const handleWorkOrderFormChange= (event)=>{
  
    console.log( event.target.name)
    let data = {...workOrderRegisterFormFields}
    
   
        data[event.target.name] = event.target.value; 

    setWorkOrderRegisterFormFileds(data);
}

const createWorkOrderRegister=(e)=>{
    console.log("create work orderis working...")
   // e.preventDefault();
     console.log(workOrderRegisterFormFields)
     setLoaderVisilbe(true)
    API.updateNewEnquiry(ttglEnqRefNo, workOrderRegisterFormFields)
    .then(async(res) => {
     console.log("here is create work order register ", res)
     if(res.status==200){
        
        setLoaderVisilbe(false)
        setDisableWorkOrderField(true)
                       setNextButtonDisable(false)
                       setSaveButtonDisable(true)
                       setActiveStep(4)
     }
    
    })
    .catch((err) => {
        setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
        setNextButtonDisable(true)
        setSaveButtonDisable(false)
        alert("Product Not created!!", err.response.message)
        console.log("here is the post contract product error!! ", err)
  })
    
 }


const options = ['The Godfather', 'Pulp Fiction'];

useEffect(() => {
      API.getAllListOfPendingEnquiry().then((res) => {
            setPendingEnquiryList(res.data.data);
           })
           .catch((err) => {
             console.log("fetch new ttglenqref no got error", err)
             alert("Not able to fetch the all pending enquires!!")
         })
    
    }, []);

  return (
    <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
     
      {loaderVisible? <SimpleBackdropCircular/>:<></>}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

           {/* Receipt register form */}

            {receiptRegisterFormFields.map((form, index)=>{
                    return(

                    

                        <div key={index} hidden={receiptRegisterHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20, paddingBottom:20}}>
                        <div style={{display:'flex', justifyContent:'flex-end',}}>
                        {index===0?
                            <Button disabled={ttglEnqRefNo==null || disableReceiptField}  onClick={addReceiptRegisterForm} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:0}}>Add Product</Button>
                        :
                        <Button onClick={()=>removeReceiptRegisterForm(index)} disabled={disableReceiptField}  style={{backgroundColor:'#dc3545', height:30, width:120, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:0}}>Remove Product</Button>

                        }


                        </div>              

                        <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:0}}>Product Basic Details :</p>


                            {/* first row */}
                        <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{marginRight:0}}>
                                    <TextField hidden={index!=0} id="standard-select-currency" name='ttglEnqRefNo'  disabled={disableReceiptField} onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.ttglEnqRefNo} select label="Enquiry" defaultValue="" variant="standard" style={{fontSize:12, width:'98%'}}>      
                                                {pendingEnquiryList.map((enquiryDetails)=>(
                                                    <MenuItem value={enquiryDetails.ttgl_enq_ref_no} >{enquiryDetails.ttgl_enq_ref_no} : {enquiryDetails.name}</MenuItem>   
                                                ))}
                                    </TextField>
                                </div>
                            
                            </div>
                            {/* second row */}
                        <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                                    <TextField size='small' name='specification'  disabled={disableReceiptField} onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.specification}  placeholder='10% extra oil For topping' id="standard-basic" label="Sepcification" multiline variant="standard" style={{ fontSize:12, width:'95%' }} />
                            
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                    <TextField size='small' name='nameOfItem'  disabled={disableReceiptField} onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.nameOfItem} placeholder='Suitable For Outdoor Storage' id="standard-basic" label="Name Of Item" multiline variant="standard" style={{fontSize:12, width:'95%'}}/>
                            </div>
                            
                        </div>
                        {/* third row */}
                        <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0, paddingRight:0}}>
                                    <TextField size='small' name='ratingKva'  disabled={disableReceiptField} onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.ratingKva} placeholder='250' id="standard-basic" label="Rating Kva" variant="standard" style={{ fontSize:12, width:'100%', paddingRight:0 }} />
                            </div>
                            <div className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12' style={{marginRight:0, paddingLeft:0}}>

                                <TextField size='small' select name='ratingKvaUnit'  disabled={disableReceiptField} onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.ratingKvaUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="KVA" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                        <MenuItem value={"KVA"}>KVA </MenuItem>
                                        <MenuItem  value={"MVA"}>MVA </MenuItem>
                                </TextField>

                            </div>
                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                            {/* <TextField size='small' name='ratingKva'  onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.ratingKva} placeholder='250' id="standard-adornment-weight" label="Rating Kva" variant="standard" style={{ fontSize:12, width:'100%', paddingRight:0 }} /> */}
                            
                                    <FormControl variant="standard" style={{marginTop:5, width:'95%'}} >
                                    <InputLabel id="demo-select-small">Voltage Rating Pr</InputLabel>
                                                    <Input
                                                    disabled={disableReceiptField}
                                                    id="standard-adornment-weight"
                                                    endAdornment={<InputAdornment position="end">KV</InputAdornment>}
                                                    aria-describedby="standard-weight-helper-text"
                                                    name='voltageRatingPr' onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.voltageRatingPr}
                                                    inputProps={{
                                                        'aria-label': 'Warantee',
                                                    }} placeholder='36'
                                                    />
                                                    {/* <FormHelperText id="standard-weight-helper-text">Voltate Pr</FormHelperText> */}
                                    </FormControl>  
                            </div>
                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <FormControl variant="standard" style={{marginTop:5, width:'95%'}} >
                                    <InputLabel id="demo-select-small">Voltage Rating Sec</InputLabel>
                                                    <Input
                                                    disabled={disableReceiptField}
                                                    id="standard-adornment-weight"
                                                    endAdornment={<InputAdornment position="end">KV</InputAdornment>}
                                                    aria-describedby="standard-weight-helper-text"
                                                    name='voltageRatingSec' onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.voltageRatingSec}
                                                    inputProps={{
                                                        'aria-label': 'Warantee',
                                                    }} placeholder='36'
                                                    />
                                                    {/* <FormHelperText id="standard-weight-helper-text">Warantee</FormHelperText> */}
                                    </FormControl>  
                            </div>



                            
                        </div>
                        {/* Fourth row */}
                        <div className='row' style={{backgroundColor:'', margin:0, padding:0, }}>
                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginTop:3}}>
                                    <TextField size='small' name='level' onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.level} placeholder='1' id="standard-basic" label="Level"  variant="standard" style={{fontSize:12, width:'98%'}}/>
                            </div>
                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                                                <TextField id="standard-number"   disabled={disableReceiptField}
                                                    label="Qty Qtd"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    name='qtyQtd' onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.qtyQtd}
                                                    variant="standard" style={{width:'95%'}}/>
                            </div>
                            
                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                            <TextField name='quotedEstimate' onChange={event => handleReceiptRegisterFormChange(event, index)}  style={{width:'95%'}}
                                label="Quoted Estimated (INR)"  disabled={disableReceiptField}
                            
                                id="formatted-numberformat-input"
                                placeholder='125,000'
                                InputProps={{
                                inputComponent: NumberFormatCustom,
                                }}
                                variant="standard"
                            />
                            
                            </div>
                        </div>
                        
                        <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:5}}>Select the Load :</p>
                            {/* Fifth Row */}
                            <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                            
                            <RadioGroup
                                row style={{backgroundColor:'', marginLeft:20}}
                                aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="first"
                                name="row-radio-buttons-group" onChange={(e)=>{setLoadSelect(e.target.value)}}
                                >
                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0, backgroundColor:''}}>
                                <FormControlLabel disabled={disableReceiptField}  value="first" control={<Radio />}  label={
                                <>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small'  name='losses50'   onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.losses50} disabled={disableReceiptField? true:loadSelect==="second"} placeholder='50' id="standard-basic" label="Losses50 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                            
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='losses50Unit'  disabled={disableReceiptField} onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.losses50Unit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small' name='losses100'   onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.losses100} disabled={disableReceiptField? true:loadSelect==="second"} placeholder='50' id="standard-basic" label="Losses100 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                                            
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='losses100Unit' disabled={disableReceiptField}  onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.losses100Unit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>

                                
                                </>} />
                                </div>
                                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12'>

                                </div>
                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                                <FormControlLabel disabled={disableReceiptField} value="second" control={<Radio />} label={ 
                                <>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small' name='noLoadLosses' onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.noLoadLosses} disabled={disableReceiptField? true:loadSelect==="first"} placeholder='50' id="standard-basic" label="No Load Losess (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                                            
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='noLoadLossesUnit' disabled={disableReceiptField}  onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.noLoadLossesUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>
                                <div className='row'>
                                        <div className='col-8' style={{paddingRight:0}}>
                                                <TextField size='small' name='loadLosses' onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.loadLosses} disabled={disableReceiptField? true:loadSelect==="first"} placeholder='50' id="standard-basic" label="Load Losses (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                                        </div>
                                        <div className='col-4' style={{paddingLeft:0}}>
                                                <TextField size='small' select name='loadLossesUnit' disabled={disableReceiptField}  onChange={event => handleReceiptRegisterFormChange(event, index)} value={form.loadLossesUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                    <MenuItem value={"kW"}>kW</MenuItem>
                                                    <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                </TextField>
                                        </div>
                                </div>
                                
                                
                                
                                
                                </>} />
                                </div>
                                
                                
                                
                                
                            </RadioGroup>

                        </div>
                        
                        
                        
                        </div>

                    )
                })}

       {/* Post Contract Review */}
        {postContractFormFields.map((productDetails, index)=>{
           console.log("length for postcontract form field: ",postContractFormFields.length)
            return(
                <> 
             
               
                {/* <button onClick={()=>addPostContractForm("89","io")}>form filed add</button> */}
                <div hidden={postContractHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:20, paddingRight:20, paddingLeft:20, borderRadius:"0px 0px 5px 5px", border:'1px solid lightgray', marginBottom:30, marginTop:30}}>
               
                     <Accordion style={{marginBottom:20, paddingLeft:0, paddingRight:0}}>
                            <AccordionSummary style={{backgroundColor:'lightgray',}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography style={{color:'gray', fontWeight:600}}>Product no. - {index+1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                            <div className='row' style={{marginLeft:0, width:'100%', backgroundColor:'', height: 'auto', marginBottom:20}}>
                                <div className='col-6'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>Name of Item:  <span style={{color:'black'}}>{productDetails.nameOfItem}</span></p>
                                </div>
                                <div className='col-6'>
                                        <p style={{color:'gray', fontWeight:500, marginTop:8}}>Specification: <span style={{color:'black'}}>{productDetails.specification}</span></p>
                                </div>
                            </div>
                            </Typography>
                            </AccordionDetails>
                      </Accordion>
                      

        
                        <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:0}}>Technical Information :</p>
                            {/* First row */}
                            <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                               
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' >
                                <TextField size='small' select name='windingMaterial'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.windingMaterial}  placeholder='250' id="demo-simple-select-autowidth" label="Winding Material" defaultValue="Aluminium" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                            <MenuItem value={"Copper"}>Copper</MenuItem>
                                            <MenuItem  value={"Aluminium"}>Aluminium </MenuItem>
                                </TextField>
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                <TextField size='small' name='tempRiseOil'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.tempRiseOil}  placeholder='250' id="standard-basic" label="Temp Rise Oil" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                    
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                        <TextField size='small' name='tempRiseWinding'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.tempRiseWinding}   placeholder='11' id="standard-basic" label="Temp Rise Winding" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                <TextField size='small' name='impedance'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.impedance}  placeholder='3' id="standard-basic" label="Impedance" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                 
                                  </div>
                            </div>
                            {/* Second row */}
                            <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                        <TextField size='small' name='tapChangerType'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.tapChangerType} select   placeholder='250' id="demo-simple-select-autowidth" label="Tap Changer Type" defaultValue="OCTC" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                            <MenuItem value={"OCTC"}>OCTC</MenuItem>
                                            <MenuItem  value={"OLTC"}>OLTC</MenuItem>
                                         </TextField>
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                <TextField size='small' name='connectionPhase'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.connectionPhase}  placeholder='3' id="standard-basic" label="Connection Phase" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                    
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                        <TextField size='small' name='frequency'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.frequency}  placeholder='50' id="standard-basic" label="Frequency" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                        <TextField size='small' name='cooling'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.cooling}  placeholder='ONAN' id="standard-basic" label="Cooling"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                                </div>
                            </div>
                            {/* Third row */}
                            <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                        <TextField size='small' name='vectorGroup'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.vectorGroup}  placeholder='dyn11' id="standard-basic" label="Vector Group" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                <TextField size='small' name='deliveryTime'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.deliveryTime} placeholder='Self By Road' id="standard-basic" label="Delivery Time" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                    
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                <TextField size='small' name='lvTermination'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.lvTermination} placeholder='Cable Box' id="standard-basic" label="LV Termination" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                   
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                        <TextField size='small' name='hvTermination'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.hvTermination}  placeholder='Bare Bushing' id="standard-basic" label="HV Termination"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                                
                                </div>
                            </div>
        
                        <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:0}}>Quoted :</p>
                                {/* eight row */}
                            <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:20 }}>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                    <TextField id="standard-number"
                                        label="Qty Received"
                                        type="number"
                                        name='qtyReceived'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.qtyReceived}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="standard"/>
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                        <TextField required
                                            label="PO Rate (INR)"
                                            name='poRate'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)}
                                            //value={values.numberformat}
                                            // onChange={handleChange}
                                           // name="numberformat"
                                            id="formatted-numberformat-input"
                                            placeholder='125,000'
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                            variant="standard"/>
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                        <TextField required
                                            label="Total Amount with 18% GST (INR)"
                                            //value={values.numberformat}
                                            //onChange={handleChange}
                                             value={ productDetails.poRate?(Number(productDetails.poRate)+(Number(productDetails.poRate))*0.18).toFixed(2):''}
                                            name='totalAmountPlusgst'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} 
                                            
                                            id="formatted-numberformat-input"
                                            placeholder='132,000'
                                            InputProps={{
                                            inputComponent: NumberFormatCustom,
                                            }}
                                            variant="standard"
                                        />
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                      <TextField size='small' name='tfsCodeNo'  disabled={disablePostContractField} onChange={event => handlePostContractFormChange(event, index)} value={productDetails.tfsCodeNo}  placeholder='11441/' id="standard-basic" label="TFS Code No." variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                 
                                </div>
                            </div>
        
        
        
                </div>
          </>
             )
         })
       
        } 

  

       {/* Work Order Register */}
       <div hidden={workOrderRegisterHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20}}>
            <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:0}}>Payment Terms / Guarantee / Warranty :</p>
                {/*First Row*/}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                        <FormControl variant="standard" sx={{  mt: 3 }}>
                            <InputLabel id="demo-select-small">Advanced Payment</InputLabel>
                                <Input 
                                    id="standard-adornment-weight"
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="standard-weight-helper-text"
                                    name='paymentAdv'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.paymentAdv}
                                    inputProps={{
                                    'aria-label': 'Advanced Payment',
                                    }} placeholder='50'/>
                        </FormControl>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                            <InputLabel id="demo-select-small">Balance Before Dispatch</InputLabel>
                              <Input 
                                id="standard-adornment-weight"
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                aria-describedby="standard-weight-helper-text"
                                name='balBeforeDispatch'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.balBeforeDispatch}
                                inputProps={{
                                'aria-label': 'Balance Before Dispatch',
                                }} placeholder='40'
                                 />
                        </FormControl>
                        
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <InputLabel id="demo-select-small">ABG</InputLabel>
                        <Input 
                            id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            name='abg' disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.abg}
                                    
                            inputProps={{
                            'aria-label': 'ABG',
                            }} placeholder='24'
                        />
                        </FormControl>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                    <InputLabel id="demo-select-small">PBG</InputLabel>
                        <Input 
                            id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            name='pbg' disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.pbg}
                                    
                            inputProps={{
                            'aria-label': 'PBG',
                            }} placeholder='50'
                        />
                        </FormControl>
                
                    </div>
                </div>
                {/*Second row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }} >
                    <InputLabel id="demo-select-small">Warantee</InputLabel>
                        <Input
                            id="standard-adornment-weight"
                            endAdornment={<InputAdornment position="end">Monthly</InputAdornment>}
                            name='warranty'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.warranty}
                                    
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                            'aria-label': 'Warantee',
                            }} placeholder='36'
                        />
                        </FormControl>   
                    </div>
                </div>

            <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:20}}>Testing Conditions :</p>
                {/*Third row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-select-currency" name='shortCircuit'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.shortCircuit}
                                     select label="Short Circuit:" defaultValue="No" variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                                
                            </TextField>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                            <TextField id="standard-select-currency" name='lightImp'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.lightImp}
                                      select label="Light Imp." defaultValue="No"  variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                            </TextField>   
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-select-currency" name='heatRun'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.heatRun}
                                     select label="Heat Run" defaultValue="No"  variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                            </TextField>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                            <TextField id="standard-select-currency"  name='specialTest'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.specialTest}
                                     select label="Sepcial Test" defaultValue="No"  variant="standard">
                            <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                            </TextField>
                    </div>
                </div>
                {/* Fourth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-select-currency" name='routineTesting'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.routineTesting}
                                     select label="Routine Testing" defaultValue="No"  variant="standard">
                                <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                <MenuItem key={"No"} value={"No"}>No </MenuItem>
                                
                            </TextField>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginTop:3}}>
                    <TextField size='small' name='remark'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.remark}
                                     placeholder='Cable Box' id="standard-basic" label="Remark" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                    
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        
                    </div>
                </div>  

            <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:0}}>Accomplish Information :</p>
                {/* Fifth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                        <TextField size='small' name='custPoNo'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.custPoNo}
                                      required placeholder='PO/TS/XER/127' id="standard-basic" label="Customer PO Number" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker 
                                            label="Customer PO Date"
                                            inputFormat="YYYY/MM/DD"
                                            disabled={disableWorkOrderField}
                                            value={workOrderRegisterFormFields.custPoDate}
                                            onChange={takeCustPoDateValue} id="standard-basic"
                                            renderInput={(params) => <TextField variant='standard' required size='small' style={{width:'90%'}} id="standard-basic" {...params} />}
                            />
                           </LocalizationProvider>
                    </div>
                    
                </div>
                {/* Sixth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:40  }}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                        <TextField size='small' name='frieghtAndInsurance'  disabled={disableWorkOrderField} onChange={event => handleWorkOrderFormChange(event)} value={workOrderRegisterFormFields.frieghtAndInsurance}
                                     placeholder='Acceptable' id="standard-basic" label="Frieght & Insurance" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                   
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        
                    </div>
                    
                </div>

       </div>



        {/* Button controllers */}
      <div className='row' style={{ width:'100%', backgroundColor:'', display:'flex', justifyContent:'flex-end', marginBottom:10, marginTop:10}}>
            {/* {receiptRegisterHidden ? <><Button onClick={backOrder} style={{ backgroundColor:'gray', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Back</Button></>:<></>} */}
              {ttglEnqRefNo===null? <></>: 
              <Button disabled={saveButtonDisable} onClick={saveDetails} style={{ backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>{spinnerVisible ? <ButtonSpinner/>: <>Save</>}</Button>}
                {activeStep<=3 ? 
                <>
                <Button disabled={nextButtonDisable} onClick={nextOrder} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Next</Button>
              
                </> : 
                <>
                  </>
               
                }
                 {activeStep==4 ? 
                <>
                 <Button onClick={finishOrder} style={{backgroundColor:'green', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Exit</Button>
                
                </> : 
                <>
                <Button onClick={()=>{setFinishProcessModalShow(true)}} style={{backgroundColor:'#dc3545', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Finish</Button>
                
                </>
               
                }
                
          
      </div>

    
      
    <ProductContractModal show={productContractModalShow} onHide={() => setProductContractModalShow(false)}/>  
    <ReceiptRegisterModal show={receiptRegisterModalShow} onHide={() => setReceiptRegisterModalShow(false)}/>  
    <FinishEnquiryCreation show={finishProcessModalShow} onHide={() => setFinishProcessModalShow(false)} onClick={()=>finishOrder()}/>  
            
    </Box>
  );
}









const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="INR "
    />
  );
});
