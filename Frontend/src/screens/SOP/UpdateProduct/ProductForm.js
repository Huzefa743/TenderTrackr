import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button, Form } from 'react-bootstrap';
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
import {NumericFormat} from 'react-number-format';
import '../Horizontal.css'
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, InputLabel, Radio, RadioGroup } from '@mui/material';
import ProductContractModal from '../productContractModal';
import ReceiptRegisterModal from '../ReceiptRegisterModal';
import FinishEnquiryCreation from '../FinishEnquiryCreationModal';
import * as API from "../../../apiservice/Apiservice";
import SimpleBackdropCircular from '../SimpleBackdropCircular';
import SimpleBackdropSign from '../SimpleBackdropSign';
import {useForm} from "react-hook-form"
import { FaClosedCaptioning } from 'react-icons/fa';
import moment from 'moment';

const steps = ['Receipt Register', 'Post Contract Review', 'Work Order Register'];

export default function ProductForm() {

    let {productid} = useParams()
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
      navigate("/enquiry");
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
  

  
    const takeCustPoDateValue = (newValue) => {
        console.log("new value", newValue)
        let date = new Date(newValue)
        let data = {...updateProductFormField}
      
     
          data["custPoDate"] = moment(date).format("YYYY/MM/DD") 
  
      setUpdateProductFormField(data);
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
     // createWorkOrderRegister()
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
  // ---------------------------Update product details Section--------------------------------------------------
  const[updateButtonDisable, setUpdateButtonDisable] = useState(false)
  const [disableUpdateProductField, setDisableUpdatedProductField] = useState(false)
  const [updateProductFormField, setUpdateProductFormField] = useState({
        specification:'',
        nameOfItem:'',
        ratingKva:'',
        ratingKvaUnit:'',
        level:'',
        voltageRatingPr:'',
        voltageRatingSec:'',
        qtyQtd:null,
        quotedEstimate:'',
        losses50:'',
        losses50Unit:'',
        losses100:'',
        losses100Unit:'',
        noLoadLosses:'',
        noLoadLossesUnit:'',
        loadLosses:'',
        loadLossesUnit:'',
        loadSelect:'',
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
  })
  
  
  const handleUpdatProductFormChange= (event)=>{
      console.log( event.target.name)

      let data = {...updateProductFormField}
      if(event.target.name=="loadSelect"){
        console.log("condition for load select")
        setLoadSelect(event.target.value)
      }
      
      data[event.target.name] = event.target.value; 
      setUpdateProductFormField(data);
  }
  
  const handleUpdatedProductDetails=(e)=>{
      console.log("updated product details working...")
  
       console.log(updateProductFormField)
       setLoaderVisilbe(true)
        if(loadSelect=="first"){
          let data = {...updateProductFormField}
          data["loadLosses"] = ""; 
          data["noLoadLosses"]=""
          setUpdateProductFormField(data);
        }else if(loadSelect=="second"){
          let data = {...updateProductFormField}
          data["losses50"] = ""; 
          data["losses100"]=""
          setUpdateProductFormField(data);
        }

       API.updateProduct(productid, updateProductFormField)
       .then( async (res) => {
        console.log("update product success", res)
          
            setTimeout(() => {  setLoaderVisilbe(false) }, 2000);
            setTimeout(() => {  setDisableUpdatedProductField(true) }, 100);
           
            if(res.status==200){
             setUpdateButtonDisable(true)
             setTimeout(() => {  navigate('/pending-enquiry') }, 1000);
            }
       })
       .catch((err) => {
          alert("Update product error!!")
         console.log("Update product has error", err)
         setDisableUpdatedProductField(false)
     })
      
   }

  async function FetchProductDetails(){
    console.log("fetch product details is running....")
    API.getProductById(productid).then((res) => {

           if(res.status==200){
         setUpdateProductFormField(res.data.data);
          console.log("get product details", res)
                 if(res.data.data.losses100!="" && res.data.data.losses50!=""){
                          setLoadSelect("second")
                 }else{
                       setLoadSelect("first")
                 }
           }
           else{
            alert("Fetch product details got error!!")
           }
         })
         .catch((err) => {
           console.log("get enquiry details got failed", err)
          alert("Got error while loading enquiry details!!")
       })
}

async function cancelHandler(){
  console.log("cancel handler is working....")
  navigate('/pending-enquiry')
  
}

  
 
  useEffect(() => {
    FetchProductDetails()
      
      }, []);
  
    return (
      <Box sx={{'& .MuiTextField-root': { m: 0, width: '25ch' },}}>
       
        {loaderVisible? <SimpleBackdropCircular/>:<></>}
        {/* <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper> */}
  
             {/* Receipt register form */}
  
      
             <div  className='row' style={{height:'auto', float:'right', backgroundColor:'', margin:0, padding:0, marginTop:0, marginRight:10, paddingTop:20, paddingRight:20, paddingLeft:20, borderRadius:"0px 0px 5px 5px", border:'1px solid lightgray', marginBottom:30, marginTop:10}}>
    
                                
  
                          <p style={{fontWeight:700, fontSize:15, marginTop:0, marginBottom:10}}>Product Basic Details :</p>
  
  
                              {/* first row */}
                          <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                              <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{marginRight:0}}>
                                    
                                  </div>
                              
                              </div>
                              {/* second row */}
                          <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0}}>
                                      <TextField size='small' name='specification'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.specification}  placeholder='10% extra oil For topping' id="standard-basic" label="Sepcification" multiline variant="standard" style={{ fontSize:12, width:'95%' }} />
                              
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                                      <TextField size='small' name='nameOfItem'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.nameOfItem} placeholder='Suitable For Outdoor Storage' id="standard-basic" label="Name Of Item" multiline variant="standard" style={{fontSize:12, width:'95%'}}/>
                              </div>
                              
                          </div>
                          {/* third row */}
                          <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                              <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0, marginTop:4, paddingRight:0}}>
                                      <TextField size='small' name='ratingKva'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.ratingKva} placeholder='250' id="standard-basic" label="Rating Kva" variant="standard" style={{ fontSize:12, width:'100%', paddingRight:0 }} />
                              </div>
                              <div className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12' style={{marginRight:0, paddingLeft:0}}>
  
                                  <TextField size='small' select name='ratingKvaUnit'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.ratingKvaUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="KVA" variant="standard" style={{ fontSize:12, marginTop:4, width:'90%',  }} >
                                          <MenuItem value={"KVA"}>KVA </MenuItem>
                                          <MenuItem  value={"MVA"}>MVA </MenuItem>
                                  </TextField>
  
                              </div>
                              <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                              
                                      <FormControl variant="standard" style={{marginTop:0, width:'95%'}} >
                                      <InputLabel id="demo-select-small">Voltage Rating Pr</InputLabel>
                                                      <Input
                                                      disabled={disableUpdateProductField}
                                                      id="standard-adornment-weight"
                                                      endAdornment={<InputAdornment position="end">KV</InputAdornment>}
                                                      aria-describedby="standard-weight-helper-text"
                                                      name='voltageRatingPr' onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.voltageRatingPr}
                                                      inputProps={{
                                                          'aria-label': 'Warantee',
                                                      }} placeholder='36'
                                                      />
                                                      {/* <FormHelperText id="standard-weight-helper-text">Voltate Pr</FormHelperText> */}
                                      </FormControl>  
                              </div>
                              <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                      <FormControl variant="standard" style={{marginTop:0, width:'95%'}} >
                                      <InputLabel id="demo-select-small">Voltage Rating Sec</InputLabel>
                                                      <Input
                                                      disabled={disableUpdateProductField}
                                                      id="standard-adornment-weight"
                                                      endAdornment={<InputAdornment position="end">KV</InputAdornment>}
                                                      aria-describedby="standard-weight-helper-text"
                                                      name='voltageRatingSec' onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.voltageRatingSec}
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
                                      <TextField size='small' name='level' onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.level} placeholder='1' id="standard-basic" label="Level"  variant="standard" style={{fontSize:12, width:'98%'}}/>
                              </div>
                              <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                                                  <TextField id="standard-number"   disabled={disableUpdateProductField}
                                                      label="Qty Qtd"
                                                      type="number"
                                                      InputLabelProps={{
                                                          shrink: true,
                                                      }}
                                                      name='qtyQtd' onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.qtyQtd}
                                                      variant="standard" style={{width:'95%'}}/>
                              </div>
                              
                              <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{marginRight:0}}>
                              <TextField name='quotedEstimate' onChange={event => handleUpdatProductFormChange(event)}  style={{width:'95%'}}
                                  label="Quoted Estimated (INR)"  disabled={disableUpdateProductField}
                                   value={updateProductFormField.quotedEstimate}
                                  id="formatted-numberformat-input"
                                  placeholder='125,000'
                                  // InputProps={{
                                  // inputComponent: NumberFormatCustom(updateProductFormField.quotedEstimate),
                                  // }}
                                  variant="standard"
                              />
                              
                              </div>
                          </div>
                          
                          <p style={{fontWeight:700, fontSize:15,  margin:0, marginTop:30, marginBottom:10}}>Select the Load :</p>
                              {/* Fifth Row */}
                              <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                              
                              <RadioGroup
                                  row style={{backgroundColor:'', marginLeft:20}}
                                  aria-labelledby="demo-row-radio-buttons-group-label" 
                                  name="loadSelect" onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.loadSelect}
                                  >
                                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12' style={{marginRight:0, backgroundColor:''}}>
                                  <FormControlLabel disabled={disableUpdateProductField}   value="first" control={<Radio />}  label={
                                  <>
                                  <div className='row'>
                                          <div className='col-8' style={{paddingRight:0}}>
                                                  <TextField size='small'  name='losses50' disabled={disableUpdateProductField || loadSelect=="second"}   onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.losses50}  placeholder='50' id="standard-basic" label="Losses50 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                              
                                          </div>
                                          <div className='col-4' style={{paddingLeft:0}}>
                                                  <TextField size='small' select name='losses50Unit'  disabled={disableUpdateProductField || loadSelect=="second"} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.losses50Unit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                      <MenuItem value={"kW"}>kW</MenuItem>
                                                      <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                  </TextField>
                                          </div>
                                  </div>
                                  <div className='row'>
                                          <div className='col-8' style={{paddingRight:0}}>
                                                  <TextField size='small' name='losses100' disabled={disableUpdateProductField || loadSelect=="second"}   onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.losses100}  placeholder='50' id="standard-basic" label="Losses100 (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, }} />
                                              
                                          </div>
                                          <div className='col-4' style={{paddingLeft:0}}>
                                                  <TextField size='small' select name='losses100Unit' disabled={disableUpdateProductField || loadSelect=="second"}  onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.losses100Unit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
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
                                                  <TextField size='small' name='noLoadLosses' disabled={disableUpdateProductField || loadSelect=="first"} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.noLoadLosses}  placeholder='50' id="standard-basic" label="No Load Losess (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                                              
                                          </div>
                                          <div className='col-4' style={{paddingLeft:0}}>
                                                  <TextField size='small' select name='noLoadLossesUnit' disabled={disableUpdateProductField || loadSelect=="first"}  onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.noLoadLossesUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                      <MenuItem value={"kW"}>kW</MenuItem>
                                                      <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                  </TextField>
                                          </div>
                                  </div>
                                  <div className='row'>
                                          <div className='col-8' style={{paddingRight:0}}>
                                                  <TextField size='small' name='loadLosses' disabled={disableUpdateProductField || loadSelect=="first"} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.loadLosses}  placeholder='50' id="standard-basic" label="Load Losses (%)" variant="standard" style={{ fontSize:12, width:'100%', fontWeight:700, zIndex: '999' }} />
                                          </div>
                                          <div className='col-4' style={{paddingLeft:0}}>
                                                  <TextField size='small' select name='loadLossesUnit' disabled={disableUpdateProductField || loadSelect=="first"}  onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.loadLossesUnit}  placeholder='250' id="demo-simple-select-autowidth" label="Unit" defaultValue="kW" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                                      <MenuItem value={"kW"}>kW</MenuItem>
                                                      <MenuItem  value={"Watt"}>Watt</MenuItem>
                                                  </TextField>
                                          </div>
                                  </div>
                                  
                                  
                                  
                                  
                                  </>} />
                                  </div>
                                  
                                  
                                  
                                  
                              </RadioGroup>
  
                          </div>
                          
                          
                {/* ---------------------------------------------section second--------------------------- */}
             
                    
                        
  
          
                          <p style={{fontWeight:700, fontSize:15, margin:0, marginTop:30, marginBottom:0}}>Technical Information :</p>
                              {/* First row */}
                              <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                                 
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' >
                                  <TextField size='small' select name='windingMaterial'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.windingMaterial}  placeholder='250' id="demo-simple-select-autowidth" label="Winding Material" defaultValue="Aluminium" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                              <MenuItem value={"Copper"}>Copper</MenuItem>
                                              <MenuItem  value={"Aluminium"}>Aluminium </MenuItem>
                                  </TextField>
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                  <TextField size='small' name='tempRiseOil'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.tempRiseOil}   placeholder='250' id="standard-basic" label="Temp Rise Oil" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                      
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                          <TextField size='small' name='tempRiseWinding'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.tempRiseWinding}   placeholder='11' id="standard-basic" label="Temp Rise Winding" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                  <TextField size='small' name='impedance'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.impedance}  placeholder='3' id="standard-basic" label="Impedance" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                   
                                    </div>
                              </div>
                              {/* Second row */}
                              <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                          <TextField size='small' name='tapChangerType'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.tapChangerType} select   placeholder='250' id="demo-simple-select-autowidth" label="Tap Changer Type" defaultValue="OCTC" variant="standard" style={{ fontSize:12, width:'90%',  }} >
                                              <MenuItem value={"OCTC"}>OCTC</MenuItem>
                                              <MenuItem  value={"OLTC"}>OLTC</MenuItem>
                                           </TextField>
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                  <TextField size='small' name='connectionPhase'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.connectionPhase}  placeholder='3' id="standard-basic" label="Connection Phase" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                      
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                          <TextField size='small' name='frequency'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.frequency}  placeholder='50' id="standard-basic" label="Frequency" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                          <TextField size='small' name='cooling'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.cooling}  placeholder='ONAN' id="standard-basic" label="Cooling"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                                  </div>
                              </div>
                              {/* Third row */}
                              <div className='row' style={{backgroundColor:'', margin:0, padding:0,  }}>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                          <TextField size='small' name='vectorGroup'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.vectorGroup}  placeholder='dyn11' id="standard-basic" label="Vector Group" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                  <TextField size='small' name='deliveryTime'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.deliveryTime} placeholder='Self By Road' id="standard-basic" label="Delivery Time" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                      
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                  <TextField size='small' name='lvTermination'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.lvTermination} placeholder='Cable Box' id="standard-basic" label="LV Termination" variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                                     
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                          <TextField size='small' name='hvTermination'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.hvTermination}  placeholder='Bare Bushing' id="standard-basic" label="HV Termination"  variant="standard" style={{fontSize:12, width:'90%'}}/>
                                  
                                  </div>
                              </div>
          
                          <p style={{fontWeight:700, fontSize:15, margin:0,  marginTop:30, marginBottom:10}}>Quoted :</p>
                                  {/* eight row */}
                              <div className='row' style={{backgroundColor:'', margin:0, padding:0, marginBottom:20 }}>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                      <TextField id="standard-number"
                                          label="Qty Received"
                                          type="number"
                                          name='qtyReceived'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.qtyReceived}
                                          InputLabelProps={{
                                          shrink: true,
                                          }}
                                          variant="standard"/>
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                          <TextField required
                                              label="PO Rate (INR)"
                                              name='poRate'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)}
                                              value={updateProductFormField.poRate}
                                              //value={values.numberformat}
                                              // onChange={handleChange}
                                             // name="numberformat"
                                              id="formatted-numberformat-input"
                                              placeholder='125,000'
                                              // InputProps={{
                                              //     inputComponent: NumberFormatCustom,
                                              // }}
                                              variant="standard"/>
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12' style={{marginRight:0}}>
                                          <TextField required
                                              label="Total Amount with 18% GST (INR)"
                                              //value={values.numberformat}
                                              //onChange={handleChange}
                                              value={updateProductFormField.totalAmountPlusgst}
                                              name='totalAmountPlusgst'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} 
                                              
                                              id="formatted-numberformat-input"
                                              placeholder='132,000'
                                              // InputProps={{
                                              // inputComponent: NumberFormatCustom,
                                              // }}
                                              variant="standard"
                                          />
                                  </div>
                                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                        <TextField size='small' name='tfsCodeNo'  disabled={disableUpdateProductField} onChange={event => handleUpdatProductFormChange(event)} value={updateProductFormField.tfsCodeNo}  placeholder='11441/' id="standard-basic" label="TFS Code No." variant="standard" style={{ fontSize:12, width:'90%', fontWeight:700, }} />
                   
                                  </div>
                              </div>
          
          
          
                  </div>
        
         
          
  
  
  
  
  
          {/* Button controllers */}
        <div className='row' style={{ width:'100%', backgroundColor:'', display:'flex', justifyContent:'flex-end', marginBottom:10, marginTop:10}}>
            <Button disabled={updateButtonDisable} onClick={()=>cancelHandler()} style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
            <Button disabled={updateButtonDisable} onClick={()=>handleUpdatedProductDetails()} style={{backgroundColor:'#0059BF', height:30, width:90, textAlign:'center', padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Update</Button>
        
                  
            
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
