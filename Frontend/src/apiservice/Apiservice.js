import axios from "axios";

const baseURL = "https://kraftman-consultants.onrender.com/api/v1/"
const base = "http://mimicker.thbscoetg.com"






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

//Authentication
// Register User - POST
export const register = async (data) =>{
 
        const file = new FormData();
        file.append("firstName", data.firstName);
        file.append("lastName", data.lastName);
        file.append("emailId", data.emailId);
        file.append("password", data.password);
        file.append("userType", data.userType);
        file.append("userAvatar", data.userAvatar);
        file.append("designation", data.designation);
        file.append("mobileNumber", data.mobileNumber);
        file.append("nickName", data.nickName);

        return await axios({
          method: "POST",
          url: baseURL + `create-user`,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: file,
        });
  };


  //Enquires
//Get all Enquiry - GET
export const getAllEnquiry = async (page, limit) =>{
return await axios({
  method: "GET",
  url: baseURL + `get-all-enquiry?limit=${limit}&page=${page}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

//Get all Enquiry - GET
export const getAllDeployedEnquiry = async (page, limit) =>{
  return await axios({
    method: "GET",
    url: baseURL + `get-all-deployed-enquiry?limit=${limit}&page=${page}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }
  //Get all pending and active sop - GET
export const getAllPendingAndActiveSop = async () =>{
  return await axios({
    method: "GET",
    url: baseURL + `get-all-pending-&-active-sop`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

//Get enquiry by id  - GET
export const getEnquiryById = async (ttglEnqRefNo) =>{
return await axios({
  method: "GET",
  url: baseURL + `get-enquiry/${ttglEnqRefNo}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

//Get customer by id  - GET
export const getCustomerById = async (customerId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `get-customer/${customerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}



//Get customer by id  - GET
export const getProductById = async (productId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `get-product/${productId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }
  
//get quotation detila by ID  - GET
export const getQuotationById = async (quotationId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `get-quotation/${quotationId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

  //Get sop by id  - GET
export const getSopById = async (sopNo) =>{
  console.log(" get sop by id is running...", sopNo)
  return await axios({
    method: "GET",
    url: baseURL + `get-sop/${sopNo}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }
  
 

//Get all pending Enquiry - GET
export const getAllPendingEnquiry = async (page, limit) =>{
  console.log("service called", page, limit)
return await axios({
  method: "GET",
  url: baseURL + `get-all-pending-enquiry?page=${page}&limit=${limit}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}


//Get all pending sop - GET
export const getAllPendingSop = async (page, limit) =>{
  console.log("service called for get all pending sop", page, limit)
return await axios({
  method: "GET",
  url: baseURL + `get-all-pending-sop?page=${page}&limit=${limit}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

//Get all active sop - GET
export const getAllActiveSop = async (page, limit) =>{
  console.log("service called for get all active sop", page, limit)
return await axios({
  method: "GET",
  url: baseURL + `get-all-active-sop?page=${page}&limit=${limit}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

//Get all active sop - GET
export const getAllQuotaton = async (page, limit) =>{
  console.log("service called for get all quotaton ", page, limit)
return await axios({
  method: "GET",
  url: baseURL + `get-all-quotation?page=${page}&limit=${limit}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

//Get Enquiry by search - GET
export const getEnquiryBySearch = async (status, query) =>{
  console.log("serach enquiry service is wrunning...service called", status, query)
return await axios({
  method: "GET",
  url: baseURL + `search-enquiry/${status}/${query}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}
//Get sop by search - GET
export const getSopBySearch = async (status, query) =>{
  console.log("serach sop service is wrunning...service called", status, query)
return await axios({
  method: "GET",
  url: baseURL + `search-sop/${status}/${query}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}



//Get all list of pending Enquiry - GET
export const getAllListOfPendingEnquiry = async () =>{
return await axios({
  method: "GET",
  url: baseURL + `get-list-pending-enquiry`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

//Get all pending Enquiry - GET
export const getNewTtglEnqRefNo = async () =>
await axios({
  method: "GET",
  url: baseURL + `get-new-ttglenqrefno`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});



// create New Enquiry  - POST
export const createNewEnquiry = async (ttglEnqRefNo,email, mobile, address, gst,  revision, ttglEnqRefDate, name, deltBy, custEnqRefNo, customerId) =>{
  
  console.log("create new enquiry service is running...")
   return await axios({
      method: "POST",
      url: baseURL + "create-new-enquiry",
      data: {
        ttglEnqRefNo: ttglEnqRefNo,
        email:email,
        mobile:mobile,
        address:address,
        gst:gst,
        revision: revision, 
        ttglEnqRefDate: ttglEnqRefDate, 
        name: name, 
        deltBy: deltBy, 
        custEnqRefNo: custEnqRefNo, 
        customerId: customerId
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

// create Customer  - POST
export const createCustomer = async (name, email, address, mobile, gst) =>{
console.log(typeof mobile)
let mobileInInt = parseInt(mobile)
console.log(typeof mobile, mobile)
 return await axios({
    method: "POST",
    url: baseURL + "create-customer",
    data: {
      name: String(name),
      email: email,
      address: address,
      mobile: Number(mobile),
      gst: gst,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

// create New Enquiry  - POST
export const updateNewEnquiry = async (ttglEnqRefNo, updatedData) =>{
  
  console.log("update new enquiry service is running...")
   return await axios({
      method: "PUT",
      url: baseURL + `update-enquiry/${ttglEnqRefNo}`,
      data: updatedData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }
// create or update sop  - POST
export const createOrUpdateSop = async (data) =>{
  
  console.log("create or update sop service is running...")
   return await axios({
      method: "POST",
      url: baseURL + `create-sop`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

  // create quotation  - POST
export const createQuotation = async (data) =>{
  
  console.log("create quotation service is running...")
   return await axios({
      method: "POST",
      url: baseURL + `create-quotation`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }
  // update product  - POST
export const updateProduct = async (productId, updatedData) =>{
  
  console.log("update product api service is running...")
   return await axios({
      method: "PUT",
      url: baseURL + `update-product/${productId}`,
      data: updatedData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }
  // update sop by id  - POST
  export const updateSopById = async (sopNo, updatedData) =>{
  
    console.log("update sop by id is working...")
     return await axios({
        method: "PUT",
        url: baseURL + `update-sop/${sopNo}`,
        data: updatedData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
        },
      });
    }
    // update quotation by id  - POST
  export const updateQuotationById = async (quotationId, updatedData) =>{
  
    console.log("update quotation by id is working...")
     return await axios({
        method: "PUT",
        url: baseURL + `update-quotation/${quotationId}`,
        data: updatedData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
        },
      });
    }



// create Customer  - POST
export const updateCustomer = async (ttglEnqRefNo, updatedData) =>{

console.log("update customer is working......")
 return await axios({
    method: "PUT",
    url: baseURL + `update-customer/${ttglEnqRefNo}`,
    data: updatedData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

// create receipt register  - POST
export const createProductFirstStep = async (ttglEnqRefNo, data) =>{
  console.log("create product first step is working....")

    return await axios({
      method: "POST",
      url: baseURL + `add-product-1/${ttglEnqRefNo}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

// create post Contract  - POST
export const createPostContract = async (data) =>{
  console.log("create post contract is working....")

    return await axios({
      method: "POST",
      url: baseURL + "add-product-2",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

// create work Order  - POST
export const createWorkOrder = async (productId, custPoNo, custPoDate, tfsCodeNo) =>{
  console.log("Create work order is running....")
   return await axios({
      method: "POST",
      url: baseURL + "add-product-3/"+productId,
      data: {
        custPoNo: custPoNo,
        custPoDate: custPoDate, 
        tfsCodeNo: tfsCodeNo
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }
  //delete pending enquiry
  export const deletePendingEnquiry = async (enquiryId) =>{
  return await axios({
    method: "DELETE",
    url: baseURL + `delete-enquiry/${enquiryId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

//delete quotation
export const deleteQuotation = async (quotationId) =>{
  console.log("delete quotation service is running....")
  return await axios({
    method: "DELETE",
    url: baseURL + `delete-quotation/${quotationId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

  //delete pending sop
  export const deletePendingSop = async (sopNo) =>{
    return await axios({
      method: "DELETE",
      url: baseURL + `delete-sop/${sopNo}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

  //delete pending sop
  export const deleteQuotationProduct = async (quotationProductId) =>{
    return await axios({
      method: "DELETE",
      url: baseURL + `delete-quotation-product/${quotationProductId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

  //delete products 
  export const deleteProduct = async (productId) =>{
    console.log("delete product si working...")
    return await axios({
      method: "DELETE",
      url: baseURL + `delete-product/${productId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

  //remove products from SOP
  export const removeProductFromSOP = async (productId) =>{
    console.log("remove product from sop working...")
    return await axios({
      method: "PUT",
      url: baseURL + `product-remove-from-sop/${productId}`,
      data:{
        sopNo:"",
        sopStatus:"",
        sopQtyAlCons:"",
        qtyRecd:"",
        projSalesQty:"",
        balQty:"",
        sopRemarks:""
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

//downoad work order
export const generateWorkOrderDocument = async (enquiryId) =>
  await axios({
    method: "GET",
    url: baseURL + `download-enquiry-wo/${enquiryId}`,
    headers: {
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

  //downoad work order register
export const generateWorkOrderRegister = async (fromDate, toDate) =>{
return await axios({
  method: "GET",
  url: baseURL + `download-enquiry-wo-register?fromDate=${fromDate}&toDate=${toDate}`,
  headers: {
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});
}

  //downoad Receipt register
  export const generateReceiptRegister = async (fromDate, toDate) =>{
    return await axios({
      method: "GET",
      url: baseURL + `download-receipt-registration-register?fromDate=${fromDate}&toDate=${toDate}`,
      headers: {
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }














//Authentication
// Register User - POST
export const registerUser = async (userName, password, emailId) =>
  await axios({
    method: "POST",
    url: baseURL + "auth/register",
    data: {
      userName: userName,
      password: password,
      emailId: emailId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

// Login User - POST
export const loginUser = async (emailId, password) =>
  await axios({
    method: "POST",
    url: baseURL + "auth/signin",
    data: {
      emailId: emailId,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

// Reset Password - POST
export const ResetPassword = async (oldpassword, newpassword) =>
  await axios({
    method: "POST",
    url: baseURL + "auth/resetpassword",
    data: {
      currentPassword: oldpassword,
      newPassword: newpassword,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//Collections
//Get all collections - GET
export const getAllCollection = async (page, rowsPerPage) =>
  await axios({
    method: "GET",
    url: baseURL + `collection?page=${page}&limit=${rowsPerPage}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//Get all collection image only - GET
export const getAllCollectionImage = async (collimageid) =>
  await axios({
    method: "GET",
    url: baseURL + `collectionImage/${collimageid}`,
    headers: {
      "Content-Type": "image/jpeg",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//SearchCollection - GET
export const searchCollection = async (collsearchname) =>
  await axios({
    method: "GET",
    url: baseURL + `searchcollection/${collsearchname}`,
    headers: {
      "Content-Type": "image/jpeg",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//delete collection
export const deleteCollection = async (collection_id) =>
  await axios({
    method: "DELETE",
    url: baseURL + `collection/${collection_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//update collection
export const updateCollection = async (
  collection_id,
  coll_name,
  coll_desc,
  coll_image
) => {
  console.log(coll_image);
  const file = new FormData();
  const data = {
    collectionname: coll_name,
    collectionDescription: coll_desc,
  };
  file.append("collectionImage", coll_image);
  file.append("collectionname", coll_name);
  file.append("collectionDescription", coll_desc);
  return await axios({
    method: "PUT",
    url: baseURL + `collection/${collection_id}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: file,
  });
};

//create collection
export const createCollection = async (
  collection_name,
  coll_desc,
  coll_image
) => {
  const file = new FormData();
  file.append("collectionImage", coll_image);
  file.append("collectionName", collection_name);
  file.append("collectionDescription", coll_desc);
  return await axios({
    method: "POST",
    url: baseURL + `collection`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: file,
  });
};

//Services
//get All Services
export const getAllServices = async (collid) =>
  await axios({
    method: "GET",
    url: baseURL + `service/${collid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//getservice by Id
export const getServicesbyId = async (collid, serviceid) =>
  await axios({
    method: "GET",
    url: baseURL + `service/${collid}/${serviceid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//delete Service
export const deleteService = async (collid, serviceid) =>
  await axios({
    method: "DELETE",
    url: baseURL + `service/${collid}/${serviceid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//create Service
export const CreateService = async (
  collecid,
  servname,
  servdesc,
  methtype,
  url,
  respdelay,
  strictchecked,
  statuscode,
  respheader,
  respbody,
  defaultcode,
  datatype
) => {
  return await axios({
    method: "POST",
    url: baseURL + `service/${collecid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: {
      serviceName: servname,
      serviceDescription: servdesc,
      methodType: methtype,
      uri: url,
      responseDelay: respdelay,
      strictMode: strictchecked,
      responses: [
        {
          status_code: statuscode,
          default: defaultcode,
          header: respheader,
          dataType: datatype,
          body: respbody,
        },
      ],
    },
  });
};

//Initialize Response File
export const InitializeFile = async (
  collid,
  servid,
  mockid,
  responseFile
) => {
  const files = new FormData();
  files.append("responseFile", responseFile);
  return await axios({
    method: "PUT",
    url: baseURL + `initializeresponsefile/${collid}/${servid}/${mockid}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: files,
  });
};


//Mock response display for Form data
export const displayMockFormData = async (methtype, uri, mockid) =>
  await axios({
    method: methtype,
    url: base + `${uri}?mockId=${mockid}`,
    headers: {
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });


//Mock response display for Form data
export const Strictmode = async (collid, servid, strictmode) => {
  await axios({
    method: "PUT",
    url: baseURL + `service/${collid}/${servid}`,
    headers: {
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: {
      strict_mode: strictmode
    }
  });
}


//Update Service
export const UpdateService = async (
  collid,
  servid,
  servicename,
  servicedescription,
  methodtype,
  uri,
  responsedelay
) => {
  await axios({
    method: "PUT",
    url: baseURL + `service/${collid}/${servid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: {
      serviceName: servicename,
      serviceDescription: servicedescription,
      methodType: methodtype,
      uri: uri,
      responseDelay: responsedelay,
    },
  });
};

//Search Service By collection
export const getServiceByCollection = async (servicename) =>
  await axios({
    method: "GET",
    url: baseURL + `searchcollectionbyservicename/${servicename}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//Responses
//Add Service Responses
export const AddServiceResponse = async (
  collid,
  servid,
  statuscode,
  defaultcode,
  respheader,
  datatype,
  respbody
) => {
  return await axios({
    method: "POST",
    url: baseURL + `response/${collid}/${servid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: {
      status_code: statuscode,
      default: defaultcode,
      header: respheader,
      dataType: datatype,
      body: respbody,
    },
  });
};

//Update Service Responses
export const UpdateServiceResponse = async (
  collid,
  servid,
  mockid,
  statuscode,
  defaultcode,
  respheader,
  datatype,
  respbody
) => {
  return await axios({
    method: "PUT",
    url: baseURL + `response/${collid}/${servid}/${mockid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: {
      status_code: statuscode,
      default: defaultcode,
      header: respheader,
      dataType: datatype,
      body: respbody,
    },
  });
};

//delete Response
export const deleteResponse = async (collid, servid, mockid) =>
  await axios({
    method: "DELETE",
    url: baseURL + `response/${collid}/${servid}/${mockid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//Import and Export
//Export Collection
export const exportCollection = async (collid) =>
  await axios({
    method: "GET",
    url: baseURL + `exportfile/${collid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });

//Import Collection
export const ImportCollection = async (userid, CollectionName, file) => {
  const files = new FormData();
  files.append("collectionName", CollectionName);
  files.append("file", file);
  await axios({
    method: "POST",
    url: baseURL + `importfile/${userid}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: files,
  });
};


//HTML Document Generate
export const generateDocument = async (collid) =>
  await axios({
    method: "GET",
    url: baseURL + `document/${collid}`,
    headers: {
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });


  //Export postman collection
  export const exportPostmanCollection = async (collid, hostname) =>
  await axios({
    method: "GET",
    url: baseURL + `getpostmancollection/${collid}/${hostname}`,
    headers: {
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });