import React, { useState, createContext } from "react";
import './index.css'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./privateroutes/PrivateRoutes";
import { SuccessExistcontext, Successcontext, UserIdContext } from "../src/components/context/Authcontext";
import Home from './screen/Home/Home';
import Login from './screens/login/Login';
import Create from './components/create/Create';
import Services from './components/services/Services';
import ServiceEditapi from './components/services/ServiceEditapi';
import Register from './screens/register/Register';
import Collections from './components/collections/Collections';
import Createcollection from './components/create/Createcollection';
import Createservice from './components/create/Createservice';
import Serviceeditresponse from './components/services/Serviceeditresponse';
import Importcollection from './components/collections/Importcollection';
import Serviceaddresponse from './components/services/Serviceaddresponse';
import Editcollection from './components/collections/Editcollection';
import ResetPassword from './components/resetpwd/ResetPassword';
import About from './components/aboutus/About';
import Enquiry from "./screens/Enquiry/Enquiry";
import SOP from "./screens/SOP/SopList/SOP";
import BOM from "./screens/BOM/BOM";
import PendingEnquiry from "./screens/Enquiry/PendingEnquiry";
import CreateEnquiry from "./screens/Enquiry/CreateEnquiry/CreateEnquiry";
import UpdateEnquiry from "./screens/Enquiry/UpdateEnquiry/UpdateEnquiry";
import CreateNewEnquiry from "./screens/Enquiry/NewEnquiry/CreateNewEnquiry";
import NewEnquiry from "./screens/Enquiry/NewEnquiry/NewEnquiry";
import UpdateProduct from "./screens/Enquiry/UpdateProduct/UpdateProduct";
import Rough from "./screens/Rough/rough";
import CreateSop from "./screens/SOP/CreateEnquiry/CreateSop";
import PendingSOP from "./screens/SOP/PendingSop/PendingSOP";
import UpdateSop from "./screens/SOP/UpdateEnquiry/UpdateSop";
import ActiveSop from "./screens/SOP/SopList/ActiveSop";
import CreateQuotation from "./screens/Quotation/CreateQuotation/CreateQuotation";
import QuotationList from "./screens/Quotation/QuotationHome/QuotationList";
import UpdateQuotation from "./screens/Quotation/UpdatedQuotation/UpdateQuotation";
import DetailSop from "./screens/SOP/DetailsSOP/DetailSop";
import CustomerDetails from "./screen/customerDetails/CustomerDetails";


export const AuthContext = createContext();

function App() {

  const [successmsgexist, setSuccessmsgExist] = useState(false);
  const [successmsg, setSuccessmsg] = useState('');
  const [userid, setUserId] = useState('');

  return (
    <div>
      <BrowserRouter basename='/kc'>
        <SuccessExistcontext.Provider value={[successmsgexist, setSuccessmsgExist]}>
          <Successcontext.Provider value={[successmsg, setSuccessmsg]}>
            <UserIdContext.Provider value={[userid, setUserId]}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpwd" element={<ResetPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/customer-details/:customerId" element={<CustomerDetails />} />







                <Route path="/enquiry" element={<Enquiry />} />
                  <Route path="/sop" element={<ActiveSop />} />
                  <Route path="/bom" element={<BOM />} />
                  <Route path="/createservice" element={<Createservice />} />
                  
                  <Route path="/pending-enquiry" element={<PendingEnquiry />} />
                  <Route path="/create-enquiry" element={<CreateEnquiry />} />
                  <Route path="/rough" element={<Rough />} />
                  <Route path="/create-new-enquiry" element={<NewEnquiry />} />
                  <Route path="/update-enquiry/:enquiryid" element={<UpdateEnquiry />} />
                  <Route path="/update-product/:productid/" element={<UpdateProduct />} />
                  {/* sop related routes */}
                  <Route path="/create-new-sop" element={<CreateSop />} />
                  <Route path="/pending-sop" element={<PendingSOP />} />
                  <Route path="/update-sop/:sopno" element={<UpdateSop/>}/>
                  <Route path="/detail-sop/:sopno" element={<DetailSop/>}/>
                  {/* Quotation routes */}
                  <Route path="/quotation" element={<QuotationList />} />
                  <Route path="/create-quotation" element={<CreateQuotation />} />
                  <Route path="/update-quotation/:quotationid" element={<UpdateQuotation />} />
                  {/* <Route path="/update-enquiry/:enquiryid/:enquirystatus" element={<UpdateEnquiry />} /> */}
                  <Route path="/serviceeditresponse" element={<Serviceeditresponse />} />
                  <Route path="/serviceaddresponse" element={<Serviceaddresponse />} />
                  <Route path="/importcollection" element={<Importcollection />} />
                  <Route path="/editcollection" element={<Editcollection />} />
  
                <Route exact element={<PrivateRoutes />}>
                  <Route path="/enquiry" element={<Enquiry />} />
                  <Route path="/sop" element={<ActiveSop />} />
                  <Route path="/bom" element={<BOM />} />
                  <Route path="/createservice" element={<Createservice />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/pending-enquiry" element={<PendingEnquiry />} />
                  <Route path="/create-enquiry" element={<CreateEnquiry />} />
                  <Route path="/rough" element={<Rough />} />
                  <Route path="/create-new-enquiry" element={<NewEnquiry />} />
                  <Route path="/update-enquiry/:enquiryid" element={<UpdateEnquiry />} />
                  <Route path="/update-product/:productid/" element={<UpdateProduct />} />
                  {/* sop related routes */}
                  <Route path="/create-new-sop" element={<CreateSop />} />
                  <Route path="/pending-sop" element={<PendingSOP />} />
                  <Route path="/update-sop/:sopno" element={<UpdateSop/>}/>
                  <Route path="/detail-sop/:sopno" element={<DetailSop/>}/>
                  {/* Quotation routes */}
                  <Route path="/quotation" element={<QuotationList />} />
                  <Route path="/create-quotation" element={<CreateQuotation />} />
                  <Route path="/update-quotation/:quotationid" element={<UpdateQuotation />} />
                  {/* <Route path="/update-enquiry/:enquiryid/:enquirystatus" element={<UpdateEnquiry />} /> */}
                  <Route path="/serviceeditresponse" element={<Serviceeditresponse />} />
                  <Route path="/serviceaddresponse" element={<Serviceaddresponse />} />
                  <Route path="/importcollection" element={<Importcollection />} />
                  <Route path="/editcollection" element={<Editcollection />} />
                </Route>
              </Routes>
            </UserIdContext.Provider>
          </Successcontext.Provider>
        </SuccessExistcontext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
