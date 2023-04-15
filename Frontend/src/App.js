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
import Login from './screen/login/Login';
import ResetPassword from './components/resetpwd/ResetPassword';

import CustomerDetails from "./screen/customerDetails/CustomerDetails";
import CreateCustomer from "./screen/crateCustomer/CreateCustomer";
import CreateSite from "./screen/crateSite/CreateSite";
import CreateWork from "./screen/crateWork/CreateWork";
import CreateLabour from "./screen/crateLabour/CreateLabour";
import CreateMaterial from "./screen/createMaterial/CreateMaterial";
import CreatePayment from "./screen/cratePayment/CreatePayment";
import History from "./screen/history/History";


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
                <Route exact element={<PrivateRoutes />}>
                    {/* <Route path="/register" element={<Register />} /> */}
                    <Route path="/resetpwd" element={<ResetPassword />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/customer-details/:customerId" element={<CustomerDetails />} />
                    <Route path="/create-customer" element={<CreateCustomer />} />
                    <Route path="/create-site" element={<CreateSite />} />
                    <Route path="/create-work" element={<CreateWork />} />
                    <Route path="/create-labour" element={<CreateLabour />} />
                    <Route path="/create-material" element={<CreateMaterial />} />
                    <Route path="/create-payment" element={<CreatePayment />} />
                    <Route path="/history" element={<History />} />
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
