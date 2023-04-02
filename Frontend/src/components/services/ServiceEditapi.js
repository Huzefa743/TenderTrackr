import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Breadcrumb,
  Card,
  Spinner
} from "react-bootstrap";
import { MdError } from "react-icons/md";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "react-json-pretty/themes/monikai.css";
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import * as API from "../../apiservice/Apiservice";

function ServiceEditapi() {
  const navigate = useNavigate();

  //Submit Spinner
const [submitspinner, setSubmitSpinner] = useState(false);


  const location = useLocation();
  let { collectionid } = location.state;
  let { serviceid } = location.state;
  let { servicename } = location.state;
  let { collectionname } = location.state;
  let { servicedescription } = location.state;
  let { methodtype } = location.state;
  let { uri } = location.state;
  let { responsedelay } = location.state;

  const [servname, setServName] = useState(servicename);
  const [servdesc, setServDesc] = useState(servicedescription);
  const [methtype, setMethType] = useState(methodtype);
  const [url, setUrl] = useState(uri);
  const [respdelay, setRespDelay] = useState(responsedelay);

  //Service Name Validation
  const [Servicenameerror, setServiceNameError] = useState("");
  const handleServiceName = (evt) => {
    if (evt.target.value == "") {
      setServName('');
      setServiceNameError("This field is required *");
    } else {
      console.log(evt.target.value);
      setServName(evt.target.value);
      setServiceNameError("");
    }
  };

  //Service Description Validation
  const [Servicedescriptionerror, setServiceDescripionError] = useState("");
  const handleServiceDescription = (evt) => {
    if (evt.target.value === "") {
      setServDesc('');
      setServiceDescripionError("This field is required *");
    } else {
      console.log(evt.target.value);
      setServDesc(evt.target.value);
      setServiceDescripionError("");
    }
  };

  //Method Type Validation
  const handleMethodType = (evt) => {
    console.log(evt.target.value);
    setMethType(evt.target.value);
  };

  //URL Validation
  const [urlerror, setUrlError] = useState("");
  const handleUrl = (evt) => {
    if (evt.target.value === "") {
      setUrl('');
      setUrlError("This field is required *");
    } else {
      console.log(evt.target.value);
      setUrl(evt.target.value);
      setUrlError("");
    }
  };

  //Response Delay Validation
  const handleResponseDelay = (evt) => {
    console.log(evt.target.value);
    setRespDelay(evt.target.value);
  };

  const updateserviceform = (event) => {
    setSubmitSpinner(true);
    event.preventDefault();
    API.UpdateService(
      collectionid,
      serviceid,
      servname,
      servdesc,
      methtype,
      url,
      respdelay
    )
      .then((res) => {
        alert("Service updated successfully");
        navigate(-1);
        setSubmitSpinner(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
        setSubmitSpinner(false);
      });
  };

  return (
    <div>
      <Header />
      <Miniheader />
      <Container className="container-box">
        <div className="mt-3 text-primary fw-bold">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/collections">Collections</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate(-1)}>
              Services
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Service Details</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card>
          <Card.Header>
          <h5 className="fw-bold">Edit {servname}</h5>
          <span className="small text-muted">(All fields are required and mandatory *)</span>
          </Card.Header>
          <Form className="mt-2 px-3 py-3" autoComplete="new-password">
          <Form.Group className="mb-3 col-3">
            <Form.Label className="fw-bold">Collection Name *</Form.Label>
            <Form.Control
              type="text"
              name="CollectionName"
              readOnly
              value={collectionname}
            />
          </Form.Group>
            <Form.Group className="mb-3 col-5">
              <Form.Label className="fw-bold">Service Name *</Form.Label>
              <Form.Control
                type="text"
                name="serviceName"
                onChange={(evt) => handleServiceName(evt)}
                placeholder="Enter a Service Name"
                defaultValue={servname}
                required
              />
              {Servicenameerror ? (
                <p className="m-0 text-danger small fw-bold">
                  <MdError /> {""}
                  {Servicenameerror}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Service Description *</Form.Label>
              <Form.Control
                as="textarea"
                name="serviceDescription"
                onChange={(evt) => handleServiceDescription(evt)}
                placeholder="Enter a Service Description"
                defaultValue={servdesc}
                required
              />
              {Servicedescriptionerror ? (
                <p className="m-0 text-danger small fw-bold">
                  <MdError /> {""}
                  {Servicedescriptionerror}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 col-3">
              <Form.Label className="fw-bold">Method Type *</Form.Label>
              <Form.Select
                name="methodType"
                onChange={(evt) => handleMethodType(evt)}
                defaultValue={methtype}
                required
              >
                <option selected disabled>
                  Select Method Type
                </option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="POST">POST</option>
                <option value="DELETE">DELETE</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">URI *</Form.Label>
              <Form.Control
                name="uri"
                onChange={(evt) => handleUrl(evt)}
                placeholder="Enter a valid URL"
                defaultValue={url}
                required
              />
              {urlerror ? (
                <p className="m-0 text-danger small fw-bold">
                  <MdError /> {""}
                  {urlerror}
                </p>
              ) : null}
              <Form.Text className="text-muted">
                Please ensure to enter URI starting with
                /collection_name/service_name
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 col-3">
              <Form.Label className="fw-bold">Response Delay *</Form.Label>
              <Form.Select
                name="responseDelay"
                onChange={(evt) => handleResponseDelay(evt)}
                defaultValue={respdelay}
                required
              >
                <option selected disabled>
                  Select Response Delay
                </option>
                <option value={0}>0 second</option>
                <option value={1000}>1 second</option>
                <option value={3000}>3 seconds</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
              </Form.Select>
            </Form.Group>
            <Button
              className="mt-3"
              variant="primary"
              disabled={!servname || !servdesc || !methtype || !url || !respdelay}
              onClick={updateserviceform}
              type="submit"
            >
              {submitspinner === true?
              <Spinner animation="grow" variant="light" size="sm"/>
              :
              <span>Update Service</span>
              }
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default ServiceEditapi;
