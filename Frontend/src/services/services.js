import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/"
const base = "http://mimicker.thbscoetg.com"




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

  //Get  site list - GET
export const getSiteList= async (customerId) =>{
  return await axios({
    method: "GET",
    url: baseURL + `site-list/${customerId}`,
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