import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button, Form } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import StepLabel from '@mui/material/StepLabel';
import ButtonPr from './ButtonPr';
import ButtonSpinner from './Spinner';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import './Horizontal.css'
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, Radio, RadioGroup } from '@mui/material';
import ProductContractModal from './productContractModal';
import ReceiptRegisterModal from './ReceiptRegisterModal';
import FinishEnquiryCreation from './FinishEnquiryCreationModal';
import * as API from "../../apiservice/Apiservice";
import SimpleBackdropCircular from './SimpleBackdropCircular';
import SimpleBackdropSign from './SimpleBackdropSign';
import {useForm} from "react-hook-form"
import { FaClosedCaptioning } from 'react-icons/fa';


const steps = ['Customer Details', 'Receipt Register', 'Post Contract Review', 'Work Order Register'];


export default function UpdateEnquiryStepper(props) {
    console.log("we are at update enquiry stepper", props.id)
    let {enquiryid} = useParams()
    let {enquirystatus} = useParams()
    console.log("here is path param vlaues", enquiryid, enquirystatus)


    
    


  const [activeStep, setActiveStep] = React.useState(Number(enquirystatus));
  const [completed, setCompleted] = React.useState({});
  const [customerFormHidden, setCustomerFormHidden] = React.useState(true)
  const [receiptRegisterHidden, setReceiptRegisterHidden] = React.useState(true)
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
  const [ttglEnqRefNo, setttglEnqRefNo] = useState(2)
  const [revision, setrevision] = useState("")
  const [ttglEnqRefDate, setttglEnqRefDate] = useState("01-01-23")
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
  const [enquiryId, setEnquiryId] = useState(enquiryid)
  
  //Work Order Register
  const [validationApplyWorkOrder, setValidationApplyWorkOrder] = useState(false)
  const [disableWorkOrderField, setDisableWorkOrderField] = useState(false)
  const [custPoNo, setcustPoNo] = useState("")
  const [custPoDate, setcustPoDate] = useState(dayjs('2023-01-01T21:11:54'))
  const [tfsCodeNo, settfsCodeNo] = useState("")

  // finish function call
  const navigate = useNavigate();

  function finishOrder() {
  console.log("finish order is working.", activeStep)
    if(activeStep=="4"){
        navigate("/enquiry");
    }
    else{
        navigate("/pending-enquiry");
    }
    
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

  function saveDetails(){
    setSpinnerVisible(false)
    setTimeout(() => {  setSpinnerVisible(false) }, 500);
    
    if(activeStep==0){
      setValidationApplyCustomer(true)
      createCustomer()
    }
    if(activeStep==2){
      console.log("active state", activeStep)
      setValidationApplyPostContract(true)
      createPostContract()
    }
    if(activeStep==1){
      console.log("here is load status", loadSelect)

      setValidationApply(true)
      createReceiptRegister()
    }
    if(activeStep==3){
      console.log("active state", activeStep)
      setValidationApplyWorkOrder(true)
      createWorkOrder()
    }
  }
  
  function currentStatusRender(){
    console.log("current status is render", activeStep)
    if(activeStep==0){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(false)
      setActiveStep(0)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)
    }
    else if(activeStep==1){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(false)
      setActiveStep(1)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)
    }
    else if(activeStep==2){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(true)
      setWorkOrderRegisterHidden(false)
      setActiveStep(2)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)
    }
    else if(activeStep==3){
        console.log("activ3e 3", activeStep)
        setCustomerFormHidden(true)
        setReceiptRegisterHidden(true)
        setPostContractHidden(true)
        setWorkOrderRegisterHidden(false)
        setActiveStep(3)
        setNextButtonDisable(true)
        setSaveButtonDisable(false)
      } 
  }


  function nextOrder(){
    console.log("next order working", activeStep)
    if(activeStep==0){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(false)
      setActiveStep(1)
      setNextButtonDisable(true)
      setSaveButtonDisable(false)
    }
    else if(activeStep==1){
      setCustomerFormHidden(true)
      setReceiptRegisterHidden(true)
      setPostContractHidden(false)
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
    else if(activeStep==3){
        setCustomerFormHidden(true)
        setReceiptRegisterHidden(true)
        setPostContractHidden(true)
        setWorkOrderRegisterHidden(false)
        setActiveStep(4)
        setNextButtonDisable(true)
        setSaveButtonDisable(false)
      } 
  }
  
  function backOrder(){
    console.log("back order working", activeStep)
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
    else if(activeStep==4){
        setCustomerFormHidden(true)
        setReceiptRegisterHidden(true)
        setPostContractHidden(false)
        setWorkOrderRegisterHidden(true)
        setActiveStep(3)
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
                   console.log("here is response", res)
                      setLoaderVisilbe(true)
                       setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
                       setTimeout(() => {  setDisableCustomerField(true) }, 100);
                       setValidationApplyCustomer(false)
                       setNextButtonDisable(false)
                       setSaveButtonDisable(true)
                
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
      if(newttglEnqRefNo==="" || revision==="" || ttglEnqRefDate==="" || name==="" || deltBy==="" || custEnqRefNo==="" || specification==="" 
      || nameOfItem==="" || ratingKva==="" || level==="" || voltageRatingPr==="" || voltageRatingSec==="" ||
       qtyQtd==="" || quotedEstimate===""){
         console.log("error in create receitp register null values") 
         setNextButtonDisable(true)
         setSaveButtonDisable(false)
        
     }
     else{
      if( revision.match("^([0-9])+([.][0-9]+)?$") && !ttglEnqRefDate.match("^([0-9])+([.][0-9]+)?$") && !name.match("^([0-9])+([.][0-9]+)?$") && !deltBy.match("^([0-9])+([.][0-9]+)?$") && custEnqRefNo.match("^([0-9])+([.][0-9]+)?$") && !specification.match("^([0-9])+([.][0-9]+)?$")
      && !nameOfItem.match("^([0-9])+([.][0-9]+)?$") && ratingKva.match("^([0-9])+([.][0-9]+)?$") && !level.match("^([0-9])+([.][0-9]+)?$") && voltageRatingPr.match("^([0-9])+([.][0-9]+)?$") && voltageRatingSec.match("^([0-9])+([.][0-9]+)?$") &&
       qtyQtd.match("^([0-9])+([.][0-9]+)?$") && quotedEstimate.match("^([0-9])+([.][0-9]+)?$")){
            API.createReceiptRegister(newttglEnqRefNo, revision, ttglEnqRefDate, name, deltBy, custEnqRefNo, specification, nameOfItem, ratingKva, level, voltageRatingPr, voltageRatingSec, losses100, losses50, loadLosses, noLoadLosses, qtyQtd, quotedEstimate)
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
      console.log("create post contract is running...", enquiryId, windingMaterial, tempRiseOil, tempRiseWinding, eff, tapChangerType, impedance, connectionPhase, frequency, cooling, vectorGroup, paymentAdv, balBeforeDispatch, guarantee, warranty, abg, pbg, qtyReceived,poRate, totalAmountPlusGST, deliveryType, shortCircuit, lightImp, heatRun, specialTest, routineTesting, remark, hvTermination, lvTermination)
      if(windingMaterial===""|| tempRiseOil===""|| tempRiseWinding==="" || eff==="" || tapChangerType===""|| impedance==="" || connectionPhase===""|| frequency===""|| cooling==="" || vectorGroup==="" || paymentAdv==="" || balBeforeDispatch==="" || guarantee==="" || warranty==="" || abg==="" || pbg==="" || qtyReceived==="" || poRate==="" || totalAmountPlusGST==="" || deliveryType==="" || shortCircuit==="" || lightImp==="" ||  heatRun==="" || specialTest==="" || routineTesting===""|| remark==="" || hvTermination===""|| lvTermination===""){
            console.log("create customer has null")
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
      }
      else{
            console.log(enquiryId!="", !windingMaterial.match("^([0-9])+([.][0-9]+)?$"), tempRiseOil.match("^([0-9])+([.][0-9]+)?$"), tempRiseWinding.match("^([0-9])+([.][0-9]+)?$"), eff.match("^([0-9])+([.][0-9]+)?$"), !tapChangerType.match("^([0-9])+([.][0-9]+)?$") , impedance.match("^([0-9])+([.][0-9]+)?$") , connectionPhase.match("^([0-9])+([.][0-9]+)?$") , frequency.match("^([0-9])+([.][0-9]+)?$") , !cooling.match("^([0-9])+([.][0-9]+)?$") ,!vectorGroup.match("^([0-9])+([.][0-9]+)?$") , paymentAdv.match("^([0-9])+([.][0-9]+)?$") , balBeforeDispatch.match("^([0-9])+([.][0-9]+)?$") , guarantee.match("^([0-9])+([.][0-9]+)?$") , warranty.match("^([0-9])+([.][0-9]+)?$") , abg.match("^([0-9])+([.][0-9]+)?$") , pbg.match("^([0-9])+([.][0-9]+)?$") , qtyReceived.match("^([0-9])+([.][0-9]+)?$") , poRate.match("^([0-9])+([.][0-9]+)?$") , totalAmountPlusGST.match("^([0-9])+([.][0-9]+)?$") , !deliveryType.match("^([0-9])+([.][0-9]+)?$"), !shortCircuit.match("^([0-9])+([.][0-9]+)?$") , !lightImp.match("^([0-9])+([.][0-9]+)?$") , !heatRun.match("^([0-9])+([.][0-9]+)?$") , !specialTest.match("^([0-9])+([.][0-9]+)?$") , !routineTesting.match("^([0-9])+([.][0-9]+)?$") , !remark.match("^([0-9])+([.][0-9]+)?$") , !hvTermination.match("^([0-9])+([.][0-9]+)?$"), !lvTermination.match("^([0-9])+([.][0-9]+)?$"))
            if(enquiryId!="" && !windingMaterial.match("^([0-9])+([.][0-9]+)?$") && tempRiseOil.match("^([0-9])+([.][0-9]+)?$") && tempRiseWinding.match("^([0-9])+([.][0-9]+)?$") && eff.match("^([0-9])+([.][0-9]+)?$") && !tapChangerType.match("^([0-9])+([.][0-9]+)?$") && impedance.match("^([0-9])+([.][0-9]+)?$") && connectionPhase.match("^([0-9])+([.][0-9]+)?$") && frequency.match("^([0-9])+([.][0-9]+)?$") && !cooling.match("^([0-9])+([.][0-9]+)?$") && !vectorGroup.match("^([0-9])+([.][0-9]+)?$") && paymentAdv.match("^([0-9])+([.][0-9]+)?$") && balBeforeDispatch.match("^([0-9])+([.][0-9]+)?$") && guarantee.match("^([0-9])+([.][0-9]+)?$") && warranty.match("^([0-9])+([.][0-9]+)?$") && abg.match("^([0-9])+([.][0-9]+)?$") && pbg.match("^([0-9])+([.][0-9]+)?$") && qtyReceived.match("^([0-9])+([.][0-9]+)?$") && poRate.match("^([0-9])+([.][0-9]+)?$") && totalAmountPlusGST.match("^([0-9])+([.][0-9]+)?$") && !deliveryType.match("^([0-9])+([.][0-9]+)?$") && !shortCircuit.match("^([0-9])+([.][0-9]+)?$") && !lightImp.match("^([0-9])+([.][0-9]+)?$") && !heatRun.match("^([0-9])+([.][0-9]+)?$") && !specialTest.match("^([0-9])+([.][0-9]+)?$") && !routineTesting.match("^([0-9])+([.][0-9]+)?$") && !remark.match("^([0-9])+([.][0-9]+)?$") && !hvTermination.match("^([0-9])+([.][0-9]+)?$") && !lvTermination.match("^([0-9])+([.][0-9]+)?$")){
                  API.createPostContract(enquiryId, windingMaterial, tempRiseOil, tempRiseWinding, eff, tapChangerType, impedance, connectionPhase, frequency, cooling, vectorGroup, paymentAdv, balBeforeDispatch, guarantee, warranty, abg, pbg, qtyReceived,poRate, totalAmountPlusGST, deliveryType, shortCircuit, lightImp, heatRun, specialTest, routineTesting, remark, hvTermination, lvTermination)
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
      console.log("create work order is running...")
      if(custPoNo==="" || custPoDate==="" || tfsCodeNo===""){
            console.log("create work order has null")
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
      }
      else{
            if(!custPoNo.match("^([0-9])+([.][0-9]+)?$") && !tfsCodeNo.match("^([0-9])+([.][0-9]+)?$")){
                  API.createWorkOrder(enquiryId, custPoNo, custPoDate, tfsCodeNo)
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

const [enquiryDetails, setEnquiryDetails] = useState([])
//fetch enquiry by id
function fetchEnquiryById(){
  API.getEnquiryById(props.id)
  .then((res) => {
   console.log("here is response for get enquiry by id", res)
   setEnquiryDetails(res.data.data)
  console.log(" current active state", activeStep)

  })
  .catch((err) => {
    console.log("ehre is enquiry by id is error", err)
})
}





useEffect(() => {
    if(Number(enquirystatus)==3){
        setWorkOrderRegisterHidden(false)
      }
    fetchEnquiryById()
      API.getNewTtglEnqRefNo().then((res) => {
            setNewttglEnqRefNo(res.data.newEnquiryId);
           })
           .catch((err) => {
             console.log("fetch new ttglenqref no got error", err)
         })
        // currentStatusRender()
       
    
    }, []);

    useEffect(()=>{
        if(enquirystatus=="2"){
            console.log("isnide if condiiton")
            setCustomerFormHidden(true)
            setReceiptRegisterHidden(true)
            setPostContractHidden(false)
            setNextButtonDisable(true)
            setSaveButtonDisable(false)
          }
    },[])

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
      {/* customer detials form */}
      <div hidden={customerFormHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20}}>
           
             <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                       
                     
                        <TextField size='small'  autoComplete="email" autoFocus onChange={(e) => {setCustomerName(e.target.value)}} disabled={disableCustomerField} error={validationApplyCustomer ? (customerName === "" || customerName.match("^([0-9])+([.][0-9]+)?$") ) : '' } helperText={validationApplyCustomer ? (customerName === "" ? 'Customer Name Cannot be Empty!' : ' ' && !customerName.match("^[0-9]+([.][0-9]+)?$") ? '':'Customer Name Should not be Number!'):''} placeholder='Mr. John Smith' id="standard-basic" label="Customer Name" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        <TextField size='small' onChange={(e) => {setEmail(e.target.value)}} disabled={disableCustomerField} error={validationApplyCustomer ? (email === "" || !email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) : '' } helperText={validationApplyCustomer ? (email === "" ? 'Email Cannot be Empty!' : ' ' && !email.match("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/") ? '':'Email Should not be Number!'):''}  placeholder='name123@xxx.com' id="standard-basic" label="Email" variant="standard" style={{fontSize:12, width:'90%'}} />
                  </div>
              </div>
              <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        <TextField size='small'   onChange={(e) => {setMobile(e.target.value)}} disabled={disableCustomerField} error={validationApplyCustomer ? (mobile === "" || !mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) : '' } helperText={validationApplyCustomer ? (mobile === "" ? 'Mobile Cannot be Empty!' : ' ' && mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '':'Mobile Should be Number!'):''}  placeholder='+91 9876543210' id="standard-basic" label="Mobile Number" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        <TextField size='small'  onChange={(e) => {setGST(e.target.value)}} disabled={disableCustomerField} error={validationApplyCustomer ? (gst === "" || gst.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyCustomer ? (gst === "" ? 'GST Cannot be Empty!' : ' ' && !gst.match("^[0-9]+([.][0-9]+)?$") ? '':'GST Should be Number!'):''} placeholder='e.g. 1234-4567-0909' id="standard-basic" label="GST Number" variant="standard" style={{fontSize:12, width:'90%'}}/>
                  </div>
              </div>

              <div className='row' style={{backgroundColor:'', margin:0, padding:0 }}>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        <TextField size='small' onChange={(e) => {setAddress(e.target.value)}} disabled={disableCustomerField} error={validationApplyCustomer ? (address === "" || address.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyCustomer ? (address === "" ? 'Address Cannot be Empty!' : ' ' && !address.match("^[0-9]+([.][0-9]+)?$") ? '':'Address Should not be Number!'):''}  placeholder='e.g. 27/2, Area, City' multiline id="standard-basic" label="Enter the Address" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700}} />
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        {/* <TextField size='small' placeholder='Enter the name' id="standard-basic" label="Email" variant="standard" style={{fontSize:12, width:'100%'}}/>
                   */}
                  </div>
              </div>
      </div>
       {/* Receipt register form */}
      <div hidden={receiptRegisterHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20, paddingBottom:20}}>
             
               <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:20}}>Enquiry Basic Details :</p>
         
                 {/* first row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                          <TextField size='small' value={newttglEnqRefNo} onChange={(e) => {setttglEnqRefNo(e.target.value)}} disabled={disableReceiptField}  required  placeholder='120675' id="standard-read-only-input" defaultValue="127867" InputProps={{readOnly: true,}} label="ttgl Enq Ref No" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                          <TextField  size="small" onChange={(e) => {setrevision(e.target.value) } } disabled={disableReceiptField}  error={validationApply ? (revision === "" || !revision.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApply ? (revision === "" ? 'Revision Cannot be Empty!' : ' ' && revision.match("^[0-9]+([.][0-9]+)?$") ? '':'Revision Should be Number!'):''} required placeholder='00' id="standard-basic" label="Revision" variant="standard" style={{fontSize:12, width:'90%'}}/>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{backgroundColor:'', paddingTop:0}}>
                          
                    {/* <TextField size='small' type="date" onChange={(e) => {setrevision(e.target.value)}} disabled={disableReceiptField} error={errorOccurReceipt} helperText={errorMessageReceipt} required placeholder='00' id="standard-basic" label="Revision" variant="standard" style={{fontSize:12, width:'90%'}}/>
                    */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker 
                                                  label="Enq Ref Date"
                                                  inputFormat="MM/DD/YYYY"
                                                  disabled={disableReceiptField}
                                                  value={refDateValue}
                                                  onChange={takeRefDateValue} id="standard-basic"
                                                  renderInput={(params) => <TextField   error={validationApply ? ttglEnqRefDate === "" : ""} helperText={validationApply ? ttglEnqRefDate === "" ? 'Enq Ref Date Cannot be Empty!' : ' ' : " "} variant="standard" required size='small' style={{width:'90%'}} id="standard-basic" {...params} />}
                                />
                          </LocalizationProvider>
                          
                    </div>
                </div>
                {/* second row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12' style={{marginRight:0}}>
                          <TextField size='small' onChange={(e) => {setName(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (name === "" || name.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (name === "" ? 'Name Cannot be Empty!' : ' ' && !name.match("^[0-9]+([.][0-9]+)?$") ? '':'Name Should not be number!'):''} required  placeholder='LEENA POWERTECH ENGINEERS PVT. LTD.' id="standard-basic" label="Name" variant="standard" style={{ fontSize:12, width:'95%', }} />
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                          <TextField size='small' onChange={(e) => {setdeltBy(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (deltBy === "" || deltBy.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (deltBy === "" ? 'Delt By Cannot be Empty!' : ' ' && !deltBy.match("^[0-9]+([.][0-9]+)?$") ? '':'Delt By Should not be number!'):''} required placeholder='RS' id="standard-basic" label="Delt by" variant="standard" style={{fontSize:12, width:'92%'}}/>
                    </div>
                    
                </div>
                {/* thrid row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                          <TextField size='small' onChange={(e) => {setspecification(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (specification === "" || specification.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (specification === "" ? 'Specification Cannot be Empty!' : ' ' && !specification.match("^[0-9]+([.][0-9]+)?$") ? '':'Specification Should not be Number!'):''} required placeholder='10% extra oil For topping' id="standard-basic" label="Sepcification" multiline variant="standard" style={{ fontSize:12, width:'95%' }} />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                          <TextField size='small' onChange={(e) => {setnameOfItem(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (nameOfItem === "" || nameOfItem.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (nameOfItem === "" ? 'Name of Item Cannot be Empty!' : ' ' && !nameOfItem.match("^[0-9]+([.][0-9]+)?$") ? '':'Name of Item Should not be Number!'):''} required placeholder='Suitable For Outdoor Storage' id="standard-basic" label="Name Of Item" multiline variant="standard" style={{fontSize:12, width:'95%'}}/>
                    </div>
                    
                </div>
                {/* fourth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                          <TextField size='small' onChange={(e) => {setratingKva(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (ratingKva === "" || !ratingKva.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (ratingKva === "" ? 'Rating KVA Cannot be Empty!' : ' ' && ratingKva.match("^[0-9]+([.][0-9]+)?$") ? '':'Rating KVA Should be Number!'):''} required placeholder='250' id="standard-basic" label="Rating Kva" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <TextField id="standard-select-currency" onChange={(e) => {setlevel(e.target.value)}} select disabled={disableReceiptField} error={validationApply ? (level === "" || level.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (level === "" ? 'Level Cannot be Empty!' : ' ' && !level.match("^[0-9]+([.][0-9]+)?$") ? '':'Level Should  not be Number!'):''} label="Level" defaultValue="L1" variant="standard" style={{fontSize:12, width:'90%'}}>
                              <MenuItem value={"L1"}>L1 </MenuItem>
                              <MenuItem  value={"L2"}>L2 </MenuItem>
                              <MenuItem  value={"L3"}>L3 </MenuItem>
                        </TextField>
                         
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                          <TextField size='small' onChange={(e) => {setvoltageRatingPr(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (voltageRatingPr === "" || !voltageRatingPr.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (voltageRatingPr === "" ? 'Cannot be Empty!' : ' ' && voltageRatingPr.match("^[0-9]+([.][0-9]+)?$") ? '':'Voltage Rating Pr Should be Number!'):''} required placeholder='11' id="standard-basic" label="Voltage Rating(Pr)" variant="standard" style={{ fontSize:12, width:'90%', }} />
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                          <TextField size='small' onChange={(e) => {setvoltageRatingSec(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (voltageRatingSec === "" || !voltageRatingSec.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (voltageRatingPr === "" ? 'Cannot be Empty!' : ' ' && voltageRatingSec.match("^[0-9]+([.][0-9]+)?$") ? '':'Voltage Rating Sec Should be Number!'):''} required placeholder='.433' id="standard-basic" label="Voltage Rating(Sec)"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                    </div>
                </div>
                {/* Fifth row */}
                <div className='row' style={{backgroundColor:'', margin:0, padding:0, }}>
                   
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                          <TextField size='small' onChange={(e) => {setcustEnqRefNo(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (custEnqRefNo === "" || !custEnqRefNo.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (custEnqRefNo === "" ? 'Cannot be Empty!' : ' ' && custEnqRefNo.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!'):''}  required placeholder='128976' id="standard-basic" label="Cust Enq Ref No" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                          <TextField size='small' onChange={(e) => {setqtyQtd(e.target.value)}} disabled={disableReceiptField} error={validationApply ? (qtyQtd === "" || !qtyQtd.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (qtyQtd === "" ? 'Cannot be Empty!' : ' ' && qtyQtd.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!'):''} required placeholder='1' id="standard-basic" label="Qty Qtd"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                    <TextField required onChange={(e) => {setquotedEstimate(e.target.value)}} disabled={disableReceiptField}  error={validationApply ? (quotedEstimate === "" || !quotedEstimate.match("^[0-9]+([.][0-9]+)?$")) : '' } helperText={validationApply ? (quotedEstimate === "" ? 'Cannot be Empty!' : ' ' && quotedEstimate.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!'):''} style={{width:'95.5%'}}
                      label="Quoted Estimated (INR)"
                      name="numberformat"
                      id="formatted-numberformat-input"
                      placeholder='125,000'
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                      variant="standard"
                    />
                          
                        
                    </div>
                </div>
                 {/* sixth row */}
                
                {/* Seventh Row */}
                <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:5}}>Select the Load :</p>
         
                 <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                    
                    <RadioGroup
                        row style={{backgroundColor:'', marginLeft:20}}
                        aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="first"
                        name="row-radio-buttons-group" onChange={(e)=>{setLoadSelect(e.target.value)}}
                        >
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                        <FormControlLabel disabled={disableReceiptField}  value="first" control={<Radio />}  label={
                        <><TextField size='small'  onChange={(e) => {setlosses50(e.target.value)}} disabled={disableReceiptField? true:loadSelect==="second"}  error={validationApply ? (loadSelect==="first"  && (losses50 === "" || !losses50.match("^[0-9]+([.][0-9]+)?$"))) : '' } helperText={validationApply ? (loadSelect==="second" ? '':  (losses50 === "" ? 'Cannot be Empty!' : ' ' && losses50.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!')):''} required placeholder='50' id="standard-basic" label="Losses50 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                        <br/>
                        <TextField size='small' onChange={(e) => {setlosses100(e.target.value)}} disabled={disableReceiptField? true:loadSelect==="second"} error={validationApply ? (loadSelect==="first"  && (losses100 === "" || !losses100.match("^[0-9]+([.][0-9]+)?$"))) : '' } helperText={validationApply ? (loadSelect==="second" ? '':  (losses100 === "" ? 'Cannot be Empty!' : ' ' && losses100.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!')):''} required placeholder='50' id="standard-basic" label="Losses100 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                       
                        </>} />
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                        <FormControlLabel disabled={disableReceiptField} value="second" control={<Radio />} label={ 
                        <><TextField size='small' onChange={(e) => {setNoLoadLosses(e.target.value)}} disabled={disableReceiptField? true:loadSelect==="first"} error={validationApply ? (loadSelect==="second"  && (noLoadLosses === "" || !noLoadLosses.match("^[0-9]+([.][0-9]+)?$"))) : '' } helperText={validationApply ? (loadSelect==="first" ? '':  (noLoadLosses === "" ? 'Cannot be Empty!' : ' ' && noLoadLosses.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!')):''} required placeholder='50' id="standard-basic" label="No Load Losess (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                        <br/>
                        <TextField size='small' onChange={(e) => {setLoadLosses(e.target.value)}} disabled={disableReceiptField? true:loadSelect==="first"} error={validationApply ? (loadSelect==="second"  && (loadLosses === "" || !loadLosses.match("^[0-9]+([.][0-9]+)?$"))) : '' } helperText={validationApply ? (loadSelect==="first" ? '':  (loadLosses === "" ? 'Cannot be Empty!' : ' ' && loadLosses.match("^[0-9]+([.][0-9]+)?$") ? '':'Should be Number!')):''} required placeholder='50' id="standard-basic" label="Load Losses (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                       
                       </>} />
                        </div>
                        
                      
                        
                        
                    </RadioGroup>
    
                </div>
                
               
               
      </div>

       {/* Post Contract Review */}
       <div hidden={postContractHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20}}>
                 
             <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:0}}>Technical Information :</p>
                  {/* First row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {setwindingMaterial(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (windingMaterial === "" || windingMaterial.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (windingMaterial === "" ? 'Winding Cannot be Empty!' : ' ' && !windingMaterial.match("^[0-9]+([.][0-9]+)?$") ? '':'Winding Material Should be Number!'):''} required placeholder='250' id="standard-basic" label="Winding Material"  variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <TextField size='small' onChange={(e) => {settempRiseOil(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (tempRiseOil === "" || !tempRiseOil.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (tempRiseOil === "" ? 'Temp Rise Oil Cannot be Empty!' : ' ' && tempRiseOil.match("^[0-9]+([.][0-9]+)?$") ? '':'Temp Rise Oil Should be Number!'):''} required placeholder='250' id="standard-basic" label="Temp Rise Oil" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                            
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {settempRiseWinding(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (tempRiseWinding === "" || !tempRiseWinding.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (tempRiseWinding === "" ? 'Temp Rise Winding Cannot be Empty!' : ' ' && tempRiseWinding.match("^[0-9]+([.][0-9]+)?$") ? '':'Temp Rise Winding Should be Number!'):''} required placeholder='11' id="standard-basic" label="Temp Rise Winding" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                              <TextField size='small' onChange={(e) => {seteff(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (eff === "" || !eff.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (eff === "" ? 'EFF Cannot be Empty!' : ' ' && revision.match("^[0-9]+([.][0-9]+)?$") ? '':'EFF Should be Number!'):''} required placeholder='.433' id="standard-basic" label="%EFF"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                        </div>
                    </div>
                    {/* Second row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {settapChangerType(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (tapChangerType === "" || tapChangerType.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (tapChangerType === "" ? 'Tap changer Type Cannot be Empty!' : ' ' && !tapChangerType.match("^[0-9]+([.][0-9]+)?$") ? '':'Tap Changer Type Should not be Number!'):''} required placeholder='NA' id="standard-basic" label="Tap Changer Type" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <TextField size='small' onChange={(e) => {setconnectionPhase(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (connectionPhase === "" || !connectionPhase.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (connectionPhase === "" ? 'Connection Phase Cannot be Empty!' : ' ' && connectionPhase.match("^[0-9]+([.][0-9]+)?$") ? '':'Connection Phase Should be Number!'):''} required placeholder='3' id="standard-basic" label="Connection Phase" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                            
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {setfrequency(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (frequency === "" || !frequency.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (frequency === "" ? 'Frequency Cannot be Empty!' : ' ' && frequency.match("^[0-9]+([.][0-9]+)?$") ? '':'Frequency Should be Number!'):''} required placeholder='50' id="standard-basic" label="Frequency" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                              <TextField size='small' onChange={(e) => {setcooling(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (cooling === "" || cooling.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (cooling === "" ? 'Cooling Cannot be Empty!' : ' ' && !cooling.match("^[0-9]+([.][0-9]+)?$") ? '':'Cooling Should not be Number!'):''} required placeholder='ONAN' id="standard-basic" label="Cooling"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                        </div>
                    </div>
                    {/* Third row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {setvectorGroup(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (vectorGroup === "" || vectorGroup.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (vectorGroup === "" ? 'Vector Group Cannot be Empty!' : ' ' && !vectorGroup.match("^[0-9]+([.][0-9]+)?$") ? '':'Vector Group Should not be Number!'):''} required placeholder='dyn11' id="standard-basic" label="Vector Group" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <TextField size='small' onChange={(e) => {setimpedance(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (impedance === "" || !impedance.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (impedance === "" ? 'Impedance Cannot be Empty!' : ' ' && impedance.match("^[0-9]+([.][0-9]+)?$") ? '':'Impedance Should be Number!'):''} required placeholder='3' id="standard-basic" label="Impedance" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                            
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {setdeliveryType(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (deliveryType === "" || deliveryType.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (deliveryType === "" ? 'Delivery Type Cannot be Empty!' : ' ' && !deliveryType.match("^[0-9]+([.][0-9]+)?$") ? '':'Delivery Type Should not be Number!'):''} required placeholder='Self By Road' id="standard-basic" label="Delivery Type" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                              <TextField size='small' onChange={(e) => {sethvTermination(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (hvTermination === "" || hvTermination.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (hvTermination === "" ? 'HV Termination Cannot be Empty!' : ' ' && !hvTermination.match("^[0-9]+([.][0-9]+)?$") ? '':'HV Termination Should be Number!'):''} required placeholder='Bare Bushing' id="standard-basic" label="HV Termination"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                     
                        </div>
                    </div>
                    {/* Third row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {setlvTermination(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (lvTermination === "" || lvTermination.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (lvTermination === "" ? 'LV Termination Cannot be Empty!' : ' ' && !lvTermination.match("^[0-9]+([.][0-9]+)?$") ? '':'LV Termination Should be Number!'):''} required placeholder='Cable Box' id="standard-basic" label="LV Termination" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        
                    </div>

              <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:0}}>Payment Terms / Guarantee / Warranty :</p>

                    {/* Fourth row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                            <Input 
                              id="standard-adornment-weight"
                              endAdornment={<InputAdornment position="end">%</InputAdornment>}
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) => {setpaymentAdv(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (paymentAdv === "" || !paymentAdv.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (paymentAdv === "" ? 'Payment Cannot be Empty!' : ' ' && paymentAdv.match("^[0-9]+([.][0-9]+)?$") ? '':'Payment ADV. Should be Number!'):''}
                              inputProps={{
                                'aria-label': 'Advanced Payment',
                              }} placeholder='50'
                            />
                            <FormHelperText id="standard-weight-helper-text">Advanced Payment</FormHelperText>
                          </FormControl>
                                  </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                            <Input 
                              id="standard-adornment-weight"
                              endAdornment={<InputAdornment position="end">%</InputAdornment>}
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) => {setbalBeforeDispatch(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (balBeforeDispatch === "" || !balBeforeDispatch.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (balBeforeDispatch === "" ? 'Bal Before D. Cannot be Empty!' : ' ' && balBeforeDispatch.match("^[0-9]+([.][0-9]+)?$") ? '':'Bal Before D. Should be Number!'):''}
                              inputProps={{
                                'aria-label': 'Balance Before Dispatch',
                              }} placeholder='40'
                            />
                            <FormHelperText id="standard-weight-helper-text">Balance Before Dispatch</FormHelperText>
                          </FormControl>
                          
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                            <Input 
                              id="standard-adornment-weight"
                              endAdornment={<InputAdornment position="end">%</InputAdornment>}
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) => {setabg(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (abg === "" || !abg.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (abg === "" ? 'ABG Cannot be Empty!' : ' ' && abg.match("^[0-9]+([.][0-9]+)?$") ? '':'ABG Should be Number!'):''}
                              inputProps={{
                                'aria-label': 'ABG',
                              }} placeholder='24'
                            />
                            <FormHelperText id="standard-weight-helper-text">ABG</FormHelperText>
                          </FormControl>
                              {/* <TextField size='small' required placeholder='24' id="standard-basic" label="ABG (%)" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                         */}
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                            <Input 
                              id="standard-adornment-weight"
                              endAdornment={<InputAdornment position="end">%</InputAdornment>}
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) => {setpbg(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (pbg === "" || !pbg.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (pbg === "" ? 'PBG Cannot be Empty!' : ' ' && pbg.match("^[0-9]+([.][0-9]+)?$") ? '':'PBG Should be Number!'):''}
                              inputProps={{
                                'aria-label': 'PBG',
                              }} placeholder='50'
                            />
                            <FormHelperText id="standard-weight-helper-text">PBG</FormHelperText>
                          </FormControl>
                              {/* <TextField size='small' required placeholder='50' id="standard-basic" label="PBG (%)"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                        */}
                        </div>
                    </div>

                    {/* Fifth row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              {/* <TextField size='small' required placeholder='24' id="standard-basic" label="Gurantee" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} /> */}
                              <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                            <Input 
                              id="standard-adornment-weight"
                              endAdornment={<InputAdornment position="end">Monthly</InputAdornment>}
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) => {setguarantee(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (guarantee === "" || !guarantee.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (guarantee === "" ? 'Guarantee Cannot be Empty!' : ' ' && guarantee.match("^[0-9]+([.][0-9]+)?$") ? '':'Guarantee Should be Number!'):''}
                              inputProps={{
                                'aria-label': 'Gurantee',
                              }} placeholder='24'
                            />
                            <FormHelperText id="standard-weight-helper-text">Gurantee</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        {/* <TextField size='small' required placeholder='5' id="standard-basic" label="Warantee (Monthly)" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} /> */}
                        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }} >
                            <Input
                              id="standard-adornment-weight"
                              endAdornment={<InputAdornment position="end">Monthly</InputAdornment>}
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) => {setwarranty(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (warranty === "" || !warranty.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (warranty === "" ? 'Warranty Cannot be Empty!' : ' ' && warranty.match("^[0-9]+([.][0-9]+)?$") ? '':'Warranty Should be Number!'):''}
                              inputProps={{
                                'aria-label': 'Warantee',
                              }} placeholder='36'
                            />
                            <FormHelperText id="standard-weight-helper-text">Warantee</FormHelperText>
                          </FormControl>   
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              {/* <TextField size='small' required placeholder='Self By Road' id="standard-basic" label="Delivery Type" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        */}
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                              {/* <TextField size='small' required placeholder='.433' id="standard-basic" label="%EFF"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                      */}
                        </div>
                    </div>
                    <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:20}}>Testing Conditions :</p>
                          {/* Sixth row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField id="standard-select-currency" onChange={(e) => {setshortCircuit(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (shortCircuit === "" || shortCircuit.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (shortCircuit === "" ? 'Short Circui Cannot be Empty!' : ' ' && !shortCircuit.match("^[0-9]+([.][0-9]+)?$") ? '':'Short Circuit Should not be Number!'):''} select label="Short Circuit:" defaultValue="No" variant="standard">
                                    <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                    <MenuItem key={"No"} value={"No"}>No </MenuItem>
                                    
                              </TextField>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                              <TextField id="standard-select-currency" onChange={(e) => {setlightImp(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (lightImp === "" || lightImp.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (lightImp === "" ? 'Light Imp. Cannot be Empty!' : ' ' && !lightImp.match("^[0-9]+([.][0-9]+)?$") ? '':'Light Imp Should not be Number!'):''} select label="Light Imp." defaultValue="No"  variant="standard">
                                    <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                    <MenuItem key={"No"} value={"No"}>No </MenuItem>
                              </TextField>   
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField id="standard-select-currency" onChange={(e) => {setheatRun(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (heatRun === "" || heatRun.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (heatRun === "" ? 'Heat Run Cannot be Empty!' : ' ' && !heatRun.match("^[0-9]+([.][0-9]+)?$") ? '':'Heat Run Should not be Number!'):''} select label="Heat Run" defaultValue="No"  variant="standard">
                                    <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                    <MenuItem key={"No"} value={"No"}>No </MenuItem>
                              </TextField>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                              <TextField id="standard-select-currency" onChange={(e) => {setSpecialTest(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (specialTest === "" || specialTest.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (specialTest === "" ? 'Special Test Cannot be Empty!' : ' ' && !specialTest.match("^[0-9]+([.][0-9]+)?$") ? '':'Special Test Should not be Number!'):''} select label="Sepcial Test" defaultValue="No"  variant="standard">
                              <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                    <MenuItem key={"No"} value={"No"}>No </MenuItem>
                              </TextField>
                        </div>
                    </div>
                    {/* Seventh row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              <TextField id="standard-select-currency" onChange={(e) => {setroutineTesting(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (routineTesting === "" || routineTesting.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (routineTesting === "" ? 'Routine Testing Cannot be Empty!' : ' ' && !routineTesting.match("^[0-9]+([.][0-9]+)?$") ? '':'Routine Testing Should not be Number!'):''} select label="Routing Testing" defaultValue="No"  variant="standard">
                                    <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                    <MenuItem key={"No"} value={"No"}>No </MenuItem>
                                    
                              </TextField>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginTop:3}}>
                        <TextField size='small' onChange={(e) => {setremark(e.target.value) } } multiline disabled={disablePostContractField}  error={validationApplyPostContract ? (remark === "" || remark.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (remark === "" ? 'Remark Cannot be Empty!' : ' ' && !remark.match("^[0-9]+([.][0-9]+)?$") ? '':'Remark Should not be Number!'):''} required placeholder='Cable Box' id="standard-basic" label="Remark" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                       
                              {/* <TextField id="standard-select-currency" onChange={(e) => {setremark(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (remark === "" || remark.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (remark === "" ? 'Remark Cannot be Empty!' : ' ' && remark.match("^[0-9]+([.][0-9]+)?$") ? '':'Remark Should be Number!'):''} select label="Remark" defaultValue="L1" variant="standard">
                                    <MenuItem key={"Yes"} value={"Yes"}>Yes </MenuItem>
                                    <MenuItem key={"No"} value={"No"}>No </MenuItem>
                              </TextField>    */}
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                              {/* <TextField size='small' onChange={(e) => {setrevision(e.target.value) } } disabled={disableReceiptField}  error={validationApplyPostContract ? (revision === "" || !revision.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (revision === "" ? 'Revision Cannot be Empty!' : ' ' && revision.match("^[0-9]+([.][0-9]+)?$") ? '':'Revision Should be Number!'):''} required placeholder='5' id="standard-basic" label="Marketing I/C"  variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} /> */}
                     
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                            
                        </div>
                    </div>

                <p style={{fontWeight:700, fontSize:15, marginTop:20, marginBottom:0}}>Quoted :</p>
                       {/* eight row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:20 }}>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                            <TextField id="standard-number"
                              label="Qty Received"
                              type="number"
                              onChange={(e) => {setqtyReceived(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (qtyReceived === "" || !qtyReceived.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (qtyReceived === "" ? 'Qty Received Cannot be Empty!' : ' ' && qtyReceived.match("^[0-9]+([.][0-9]+)?$") ? '':'Qty Received Should be Number!'):''}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"/>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                <TextField required
                                    label="PO Rate (INR)"
                                    onChange={(e) => {setpoRate(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (poRate === "" || !poRate.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (poRate === "" ? 'PO Rate Cannot be Empty!' : ' ' && poRate.match("^[0-9]+([.][0-9]+)?$") ? '':'PO Rate Should be Number!'):''}
                                    //value={values.numberformat}
                                    // onChange={handleChange}
                                    name="numberformat"
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
                                  value={ poRate?(Number(poRate)+(Number(poRate))*0.18).toFixed(2):''}
                                  onChange={(e) => {settotalAmountPlusGST(e.target.value) } } disabled={disablePostContractField}  error={validationApplyPostContract ? (totalAmountPlusGST === "" || !totalAmountPlusGST.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyPostContract ? (totalAmountPlusGST === "" ? 'Total Amount 18% Cannot be Empty!' : ' ' && totalAmountPlusGST.match("^[0-9]+([.][0-9]+)?$") ? '':'Total Amount 18% Should be Number!'):''}
                                  name="numberformat"
                                  id="formatted-numberformat-input"
                                  placeholder='132,000'
                                  InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="standard"
                                />
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        
                        </div>
                    </div>



       </div>

       {/* Work Order Register */}
       <div hidden={workOrderRegisterHidden} className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:30, marginRight:10, paddingTop:30, paddingRight:20, paddingLeft:20, borderRadius:5, border:'1px solid lightgray', marginBottom:20}}>
                 
             <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:0}}>Finalished Information :</p>
                    {/* First row */}
                    <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {setcustPoNo(e.target.value) } } disabled={disableWorkOrderField}  error={validationApplyWorkOrder ? (custPoNo === "" || custPoNo.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyWorkOrder ? (custPoNo === "" ? 'Cust Po No. Cannot be Empty!' : ' ' && !custPoNo.match("^[0-9]+([.][0-9]+)?$") ? '':'Cust Po No. Should be Number!'):''} required placeholder='PO/TS/XER/127' id="standard-basic" label="Customer PO Number" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker 
                                                  label="Customer PO Date"
                                                  inputFormat="MM/DD/YYYY"
                                                  disabled={disableWorkOrderField}
                                                  value={custPoDate}
                                                  onChange={custPoDateRef} id="standard-basic"
                                                  renderInput={(params) => <TextField variant='standard' required size='small' style={{width:'90%'}} id="standard-basic" {...params} />}
                                />
                          </LocalizationProvider>
                        </div>
                        
                    </div>
                     {/* Second row */}
                     <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:40  }}>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                              <TextField size='small' onChange={(e) => {settfsCodeNo(e.target.value) } } disabled={disableWorkOrderField}  error={validationApplyWorkOrder ? (tfsCodeNo === "" || tfsCodeNo.match("^([0-9])+([.][0-9]+)?$")) : '' } helperText={validationApplyWorkOrder ? (tfsCodeNo === "" ? 'TFS Code Cannot be Empty!' : ' ' && !tfsCodeNo.match("^[0-9]+([.][0-9]+)?$") ? '':'TFS Code No Material Should be Number!'):''} required placeholder='11441/' id="standard-basic" label="TFS Code No." variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                             
                        </div>
                        
                    </div>
                   



       </div>




        {/* Button controllers */}
      <div className='row' style={{ width:'100%', backgroundColor:'', display:'flex', justifyContent:'flex-end', marginBottom:10, marginTop:10}}>
            {customerFormHidden ? <><Button onClick={backOrder} style={{ backgroundColor:'gray', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>Back</Button></>:<></>}
                <Button disabled={saveButtonDisable} onClick={saveDetails} style={{ backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white', marginRight:20}}>{spinnerVisible ? <ButtonSpinner/>: <>Save</>}</Button>
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
