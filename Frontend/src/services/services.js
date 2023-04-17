import axios from "axios";

const baseURL = "https://kraftman-consultant.onrender.com/api/v1/"
const base = "http://mimicker.thbscoetg.com"
//const baseURL = "https://kraftman-consultant.onrender.com/api/v1/"


// Login User - POST
export const login = async (emailId, password) =>
  await axios({
    method: "POST",
    url: baseURL + "login",
    data: {
      emailId: emailId,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

//Customers
//Get all customers - GET
export const getAllCustomer = async (page, limit) =>{
    return await axios({
      method: "GET",
      url: baseURL + `customer/1/1000`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }

//Get  customers detauks- GET
export const getCustomerDetails= async (customerId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `customer/${customerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

  //Get  payment list details - GET
export const getPaymentListByCustId= async (customerId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `payment/${customerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

  //Get  site list - GET
export const getSiteList= async (customerId) =>{
  console.log(" jere get list of site is working.", customerId)
  return await axios({
    method: "GET",
    url: baseURL + `site-list/${customerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

    //Get  work details by work id - GET
export const getWorkDetailsByWorkId= async (workId) =>{
  console.log("Get work detials by work id", workId)
  return await axios({
    method: "GET",
    url: baseURL + `work/${workId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }
    //Get  labour details by work id - GET
    export const getLabourDetailsByLabourId= async (labourId) =>{
      console.log("Get labour detials by labour id", labourId)
      return await axios({
        method: "GET",
        url: baseURL + `labour/${labourId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
        },
      });
      }

   //Get  material details by material id - GET
   export const getMaterilDetailsByMaterialId= async (materialId) =>{
    console.log("Get labour detials by maerila id", materialId)
    return await axios({
      method: "GET",
      url: baseURL + `material/${materialId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }

    //Get  work list - GET
export const getWorkList= async ( siteId) =>{
  console.log(" jere get list of work is working.", siteId)
  return await axios({
    method: "GET",
    url: baseURL + `work-list/${siteId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }



    //Get labour list - GET
export const getLabourList= async (workId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `labour-list/${workId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

      //Get material list - GET
export const getMaterialList= async (workId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `material-list/${workId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }
      //Get all payment  list - GET
      export const getAllPaymentDetails= async () =>{
        return await axios({
          method: "GET",
          url: baseURL + `payment-list`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
          },
        });
        }
         //Get all payment  list - GET
      export const getAllCreditPaymentDetails= async () =>{
        return await axios({
          method: "GET",
          url: baseURL + `payment-list-credit`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
          },
        });
        }
         //Get all payment  list - GET
      export const getAllDebitPaymentDetails= async () =>{
        return await axios({
          method: "GET",
          url: baseURL + `payment-list-debit`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
          },
        });
        }

//-------create customer------------------
export const createCustomer = async (data) =>{
  console.log("create customer is running...")
  
   return await axios({
      method: "POST",
      url: baseURL + `create-customer`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//delete payment
export const deletePayment = async (paymentId) =>{
  return await axios({
    method: "DELETE",
    url: baseURL + `payment/${paymentId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

//delete customer
export const deleteCustomer = async (customerId) =>{
  return await axios({
    method: "DELETE",
    url: baseURL + `customer/${customerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

//delete labour
export const deleteLabour = async (labourId) =>{
  return await axios({
    method: "DELETE",
    url: baseURL + `labour/${labourId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

//delete material
export const deleteMaterial = async (materialId) =>{
  return await axios({
    method: "DELETE",
    url: baseURL + `material/${materialId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

//-------create Site------------------
export const createSite = async (custId, data) =>{
  console.log("create site is running...")
  
   return await axios({
      method: "POST",
      url: baseURL + `create-site/${custId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//-------create payment------------------
export const createPayment = async ( data) =>{
  console.log("create payment is running...")
  
   return await axios({
      method: "POST",
      url: baseURL + `create-payment`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//-------create Work------------------
export const createWork = async (custId, siteId, data) =>{
  console.log("create work is running...")
  
   return await axios({
      method: "POST",
      url: baseURL + `create-work/${custId}/${siteId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }
//-------create Work------------------
export const updateWork = async (workId, data) =>{
  console.log("update work is running...")
  
   return await axios({
      method: "PUT",
      url: baseURL + `update-work/${workId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//-------update Labour------------------
export const updateLabour = async (labourId, data) =>{
  console.log("update labour is running...")
  
   return await axios({
      method: "PUT",
      url: baseURL + `update-labour/${labourId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }
//-------udpate Labour------------------
export const updateMaterial = async (materialId, data) =>{
  console.log("update material is running...")
  
   return await axios({
      method: "PUT",
      url: baseURL + `update-material/${materialId}`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//-------create Labour------------------
export const createLabour = async (custId, siteId,workId, data) =>{
  console.log("create labour is running...")
  
   return await axios({
      method: "POST",
      url: baseURL + `create-labour/${custId}/${siteId}/${workId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//-------create Material------------------
export const createMaterial = async (custId, siteId,workId, data) =>{
  console.log("create material is running...")
  
   return await axios({
      method: "POST",
      url: baseURL + `create-material/${custId}/${siteId}/${workId}`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }