import React, { useState, useEffect } from "react";
import "./Services.css";
import {
  Container,
  Accordion,
  Table,
  Badge,
  Button,
  Form,
  Alert,
  InputGroup,
  Dropdown,
  Toast,
  Row,
  Col,
} from "react-bootstrap";
import { FiMoreVertical } from "react-icons/fi";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { FaCopy, FaSearch } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillDelete } from "react-icons/ai";
import { RiSecurePaymentLine, RiSecurePaymentFill } from 'react-icons/ri';
import JSONPretty from "react-json-pretty";
import XMLViewer from 'react-xml-viewer';
import fileDownload from 'js-file-download'
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import CircularProgress from '@mui/material/CircularProgress';
import * as API from "../../apiservice/Apiservice";
import Switch from '@mui/material/Switch';

function Services() {
  //Spinner
  const [spinner, setSpinner] = useState(false);

  const [showresponse, setShowResponse] = useState(false);

  const location = useLocation();
  let { collectionname } = location.state;
  let { collectionid } = location.state;
  let { collectiondesc } = location.state;

  //Services list
  const [allservicedata, setAllServiceData] = useState([]);
  const [allservicedataresponse, setAllServiceDataResponse] = useState([]);

  //Capturehostname
  const [hostname, setHostName] = useState(undefined);

  //Captureprotocolname
  const [protocol, setProtocolName] = useState(undefined);

  useEffect(() => {
    setSpinner(true);
    API.getAllServices(collectionid).then((res) => {
      console.log(res.data.data);
      console.log(window.location.host);
      setHostName(window.location.host);
      console.log(window.location.protocol);
      setProtocolName(window.location.protocol);
      setAllServiceData(res.data.data);
      setAllServiceDataResponse(res.data.data.map((k) => k.responses));
      setSpinner(false);
    });
  }, []);

  const [servicedetailsbyid, setServiceDetailsById] = useState([]);
  const [servicebyidresponse, setServiceByIdResponse] = useState([]);
  const [formdatauri, setFormDataUri] = useState('');
  const [formdatamethtype, setFormDataMethType] = useState('');
  const [formfilepath, setFormFilePath] = useState('');
  const getServicebyId = (serid) => {
    API.getServicesbyId(collectionid, serid).then((res) => {
      console.log(res.data.data);
      setServiceDetailsById(res.data.data);
      setServiceByIdResponse(res.data.data.responses);
      setFormDataUri(res.data.data.uri);
      setFormDataMethType(res.data.data.method);
      if (res.data.data.responses.map((i) => i.dataType === "form-data")) {
        setFormFilePath(res.data.data.responses.map((i) => i.filePath));
      }
    });
  };

  //Show response - Each Response
  const [detailskey, setDetailsKey] = useState(undefined);
  const [detailskey2, setDetailsKey2] = useState(undefined);
  const [formdatatype, setFormDataType] = useState('');
  const [formdataresp, setFormDataResp] = useState('');
  const toggleShowResponse = (key, indkey, datatype, mockid) => {
    setDetailsKey(key);
    setDetailsKey2(indkey);
    setFormDataType(datatype)
    setShowResponse(true);
    // if (datatype === "form-data") {
    //   API.displayMockFormData(formdatamethtype, formdatauri, mockid).then((resp) => {
    //     console.log(resp.data);
    //     setFormDataResp(resp.data);
    //   })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //       setFormDataResp(err.response.data);
    //     })
    // }
  };

  const [serviceid, setServiceId] = useState(undefined);
  const deleteSrvc = (service_id, detailskey2) => {
    setServiceId(service_id);
    API.deleteService(collectionid, service_id, detailskey2).then((res) => {
      console.log(res.data);
      alert(res.data.message);
      window.location.reload();
    });
  };

  const deleteresponse = (evt, collectionid, servcid, mckid) => {
    evt.preventDefault();
    API.deleteResponse(collectionid, servcid, mckid)
      .then((res) => {
        alert("Response successfully deleted");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  //Strict mode Validation & API call -
  const [strictchecked, setStrictChecked] = useState(false);
  const [strictalert, setStrictAlert] = useState('');
  const handleStrict = (evt, collecid, serviceid) => {
    setStrictChecked(evt.target.checked);
    console.log(strictchecked);
    API.Strictmode(collecid, serviceid, evt.target.checked).then((res) => {
      if (evt.target.checked == true) {
        setStrictAlert(true);
        setTimeout(() => {
          setStrictAlert('');
        }, 3000);
      }
      else {
        setStrictAlert(false);
        setTimeout(() => {
          setStrictAlert('');
        }, 3000);
      }
    })
  }

  const OpennewTab = (event, uri, mock_id,filename) => {
    event.preventDefault();
    API.displayMockFormData(formdatamethtype, uri, mock_id, filename, {
      responseType: 'blob',
    }).then((resp) => {
      console.log(resp.data);
      fileDownload(resp.data);
    })
      .catch((err) => {
        console.log(err.response.data);
        setFormDataResp(err.response.data);
      })
    // let myresponse = protocol + "//" + hostname + uri + "?mockId=" + mock_id;
    // fileDownload(myresponse, servname);
  }

  const onCopyText = () => {
    alert("Copied to Clipboard!");
  };

  //Search services
  const [searchservice, setSearchService] = useState("");

  return (
    <div>
      <Header />
      <Miniheader />
      <Container className="container-box">
        <div className="mt-3">
          <h4>{collectionname}</h4>
          <p className="m-0 fs-6">{collectiondesc}</p>
        </div>
        {spinner === true ?
          <CircularProgress className="mt-3" color="secondary" />
          :
          <div>
            <div className="mt-3">
              <InputGroup size="lg" style={{ width: "83%" }}>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Search a Service"
                  onChange={(event) => setSearchService(event.target.value)}
                />
              </InputGroup>
            </div>
            <Row>
              {allservicedata
                .filter((post) => {
                  if (searchservice === "") {
                    return post;
                  } else if (
                    post.service_name
                      .toLowerCase()
                      .includes(searchservice.toLowerCase())
                  ) {
                    return post;
                  }
                })
                .map((i, indkey) => (
                  <>
                    <Col className="col-10">
                      <Accordion className="mt-3" flush>
                        <Accordion.Item
                          className="s-light-color"
                          eventKey="0"
                          onClick={() => getServicebyId(i.service_id)}
                        >
                          <Accordion.Header>
                            <div className="fs-5">
                              {i.method === "GET" ? (
                                <Badge bg="success">{i.method}</Badge>
                              ) : i.method === "POST" ? (
                                <Badge bg="warning">{i.method}</Badge>
                              ) : i.method === "PUT" ? (
                                <Badge bg="info">{i.method}</Badge>
                              ) : i.method === "DELETE" ? (
                                <Badge bg="danger">{i.method}</Badge>
                              ) : null}
                            </div>
                            <h5 className="mx-3">{i.service_name}</h5>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="my-3 fs-6">
                              {servicedetailsbyid.service_description}
                            </div>
                            <Table bordered>
                              <thead>
                                <tr className="p-dark-color text-white">
                                  <th className="col-1">Method</th>
                                  <th className="col-2">Service Name</th>
                                  <th className="col-3">Response Delay</th>
                                  <th className="col-9" colSpan={2}>
                                    {" "}
                                    Default URI
                                  </th>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="fs-5">
                                      {servicedetailsbyid.method === "GET" ? (
                                        <Badge bg="success">
                                          {servicedetailsbyid.method}
                                        </Badge>
                                      ) : servicedetailsbyid.method === "POST" ? (
                                        <Badge bg="warning">
                                          {servicedetailsbyid.method}
                                        </Badge>
                                      ) : servicedetailsbyid.method === "PUT" ? (
                                        <Badge bg="info">
                                          {servicedetailsbyid.method}
                                        </Badge>
                                      ) : servicedetailsbyid.method === "DELETE" ? (
                                        <Badge bg="danger">
                                          {servicedetailsbyid.method}
                                        </Badge>
                                      ) : null}
                                    </div>
                                  </td>
                                  <td>{servicedetailsbyid.service_name}</td>
                                  <td>
                                    {Math.floor(
                                      servicedetailsbyid.responseDelay / 1000
                                    )}{" "}
                                    second(s)
                                  </td>
                                  <td>
                                    <InputGroup>
                                      <Form.Control
                                        readOnly
                                        defaultValue={servicedetailsbyid.uri}
                                      />
                                      <CopyToClipboard
                                        text={
                                          protocol +
                                          "//" +
                                          hostname +
                                          servicedetailsbyid.uri
                                        }
                                        onCopy={onCopyText}
                                      >
                                        <Tooltip
                                          title="Copy URI"
                                          placement="top"
                                          arrow
                                          componentsProps={{
                                            tooltip: {
                                              sx: {
                                                bgcolor: "#65499c",
                                                "& .MuiTooltip-arrow": {
                                                  color: "#65499c",
                                                },
                                              },
                                            },
                                          }}
                                        >
                                          <Button variant="outline-primary">
                                            <FaCopy />
                                          </Button>
                                        </Tooltip>
                                      </CopyToClipboard>
                                    </InputGroup>
                                  </td>
                                  <td>
                                    <Link
                                      to="/serviceeditapi"
                                      state={{
                                        collectionid: collectionid,
                                        serviceid: servicedetailsbyid.service_id,
                                        collectionname: collectionname,
                                        servicename:
                                          servicedetailsbyid.service_name,
                                        servicedescription:
                                          servicedetailsbyid.service_description,
                                        methodtype: servicedetailsbyid.method,
                                        uri: servicedetailsbyid.uri,
                                        responsedelay:
                                          servicedetailsbyid.responseDelay,
                                      }}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <Button variant="outline-primary">
                                        Edit
                                      </Button>
                                    </Link>
                                  </td>
                                </tr>
                              </thead>
                            </Table>
                            <div>
                              <Row>
                                <Col>
                                  <p className="fs-6 fw-bold">Responses:</p>
                                  <Form.Group className="mb-3">
                                    <Row>
                                      <Col>
                                        <Form.Label className="fw-bold m-0">Strict Mode</Form.Label>
                                        <Switch color="secondary" checked={strictchecked}
                                          onChange={(evt) => { handleStrict(evt, collectionid, servicedetailsbyid.service_id) }} />
                                      </Col>
                                      <Col>
                                        {strictalert === true ?
                                          <Alert className="p-1 px-2" variant="success"><RiSecurePaymentFill />&nbsp;Strict mode is on</Alert>
                                          : strictalert === false ?
                                            <Alert className="p-1 px-2" variant="warning"><RiSecurePaymentLine />&nbsp;Strict mode is off</Alert> :
                                            null}
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                  <Link
                                    to="/serviceaddresponse"
                                    state={{
                                      collectionid: collectionid,
                                      serviceid: servicedetailsbyid.service_id,
                                    }}
                                  >
                                    <Button variant="primary mb-3">
                                      Add Response +
                                    </Button>
                                  </Link>
                                </Col>
                              </Row>
                            </div>
                            <Table>
                              <thead className="p-dark-color text-white">
                                <tr>
                                  <th className="col-2">Status Code</th>
                                  <th className="col-2 text-center">Default</th>
                                  <th className="col-6">URI</th>
                                  <th className="col-2 text-center">Details</th>
                                  <th className="col-1">Actions</th>
                                </tr>
                              </thead>
                              {servicebyidresponse.map((k, key) => (
                                <tbody>
                                  <tr>
                                    <td className="fw-bold">{k.status_code}</td>
                                    {k.default === true ? (
                                      <td className="fw-bold text-primary text-center fs-5">
                                        <BsCheckLg />
                                      </td>
                                    ) : (
                                      <td className="fw-bold text-secondary text-center fs-5">
                                        <BsXLg />
                                      </td>
                                    )}
                                    <td>
                                      <InputGroup>
                                        <Form.Control
                                          readOnly
                                          defaultValue={
                                            i.uri + "?mockId=" + k.mock_id
                                          }
                                        />
                                        <CopyToClipboard
                                          text={
                                            protocol +
                                            "//" +
                                            hostname +
                                            i.uri +
                                            "?mockId=" +
                                            k.mock_id
                                          }
                                          onCopy={onCopyText}
                                          ser
                                        >
                                          <Tooltip
                                            title="Copy URI"
                                            placement="top"
                                            arrow
                                            componentsProps={{
                                              tooltip: {
                                                sx: {
                                                  bgcolor: "#65499c",
                                                  "& .MuiTooltip-arrow": {
                                                    color: "#65499c",
                                                  },
                                                },
                                              },
                                            }}
                                          >
                                            <Button variant="outline-primary">
                                              <FaCopy />
                                            </Button>
                                          </Tooltip>
                                        </CopyToClipboard>
                                      </InputGroup>
                                    </td>
                                    <td className="text-center">
                                      <Button
                                        variant="outline-primary"
                                        onClick={() => {
                                          toggleShowResponse(key, indkey, k.dataType, k.mock_id);
                                        }}
                                      >
                                        View
                                      </Button>
                                    </td>
                                    <td>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="outline-light text-dark">
                                          <FiMoreVertical className="fs-5" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Link
                                            to="/serviceeditresponse"
                                            state={{
                                              collectionid: collectionid,
                                              serviceid: i.service_id,
                                              mockid: k.mock_id,
                                              statuscode: k.status_code,
                                              data_type: k.dataType,
                                              defaultcode: k.default,
                                              header: Object.entries(k.header).map(
                                                ([key, value]) => ({ [key]: value })
                                              ),
                                              body: atob(k.body),
                                            }}
                                            style={{ textDecoration: "none" }}
                                          >
                                            <Dropdown.Item href="#/action-2">
                                              Edit Response
                                            </Dropdown.Item>
                                          </Link>
                                          <Dropdown.Item
                                            onClick={(evt) =>
                                              deleteresponse(
                                                evt,
                                                collectionid,
                                                i.service_id,
                                                k.mock_id
                                              )
                                            }
                                          >
                                            Delete Response
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                  {key === detailskey && indkey === detailskey2 ? (
                                    <td colSpan={4}>
                                      <Toast
                                        className="my-3"
                                        show={showresponse}
                                        onClose={toggleShowResponse}
                                        style={{ width: "100%" }}
                                      >
                                        <Toast.Header>
                                          <h5 className="me-auto text-dark">
                                            Response Details
                                          </h5>
                                        </Toast.Header>
                                        <Toast.Body>
                                          <Row className="mb-2">
                                            <Col className="fw-bold">Response Type :&nbsp;
                                              <span className="text-secondary text-uppercase fw-normal fs-6">
                                                {k.dataType}
                                              </span>
                                            </Col>
                                          </Row>
                                          <div className="my-2">
                                            <div className="mb-2 fw-bold">
                                              Response Header
                                            </div>

                                            <Table
                                              bordered
                                              style={{ width: "70%" }}
                                            >
                                              <tbody>
                                                {Object.entries(k.header).map(
                                                  ([key, value]) => (
                                                    <tr>
                                                      <td className="fs-6 text-secondary col-4">
                                                        {key}
                                                      </td>
                                                      <td className="fs-6 text-primary col-4">
                                                        {value}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </Table>
                                          </div>
                                          <Row>
                                            <Col className="col-11">
                                              <div className="my-2">
                                                <div className="mb-2 fw-bold">
                                                  Response Body
                                                </div>
                                                {formdatatype === "form-data" ?
                                                  <>
                                                    <Button variant="outline-primary"
                                                      onClick={(evt) => OpennewTab(evt, i.uri, k.mock_id, 'something.pdf')}
                                                    >
                                                      Click to view file
                                                    </Button>
                                                  </>
                                                  : formdatatype === "xml" ?
                                                    <>
                                                      <XMLViewer xml={atob(k.body).replaceAll('"', '')} />
                                                    </>
                                                    :
                                                    <JSONPretty
                                                      data={atob(k.body)}
                                                    ></JSONPretty>
                                                }
                                              </div>
                                            </Col>
                                            <Col className="col-1">
                                              {formdatatype === "form-data" ?
                                                null
                                                : formdatatype === "xml" ?
                                                  <CopyToClipboard
                                                    text={atob(k.body).replaceAll('"', '')}
                                                    onCopy={onCopyText}
                                                  >
                                                    <Tooltip
                                                      title="Copy Response"
                                                      placement="top"
                                                      arrow
                                                      componentsProps={{
                                                        tooltip: {
                                                          sx: {
                                                            bgcolor: "#65499c",
                                                            "& .MuiTooltip-arrow": {
                                                              color: "#65499c",
                                                            },
                                                          },
                                                        },
                                                      }}
                                                    >
                                                      <Button variant="outline-primary">
                                                        <FaCopy />
                                                      </Button>
                                                    </Tooltip>
                                                  </CopyToClipboard>
                                                  :
                                                  <CopyToClipboard
                                                    text={atob(k.body)}
                                                    onCopy={onCopyText}
                                                  >
                                                    <Tooltip
                                                      title="Copy Response"
                                                      placement="top"
                                                      arrow
                                                      componentsProps={{
                                                        tooltip: {
                                                          sx: {
                                                            bgcolor: "#65499c",
                                                            "& .MuiTooltip-arrow": {
                                                              color: "#65499c",
                                                            },
                                                          },
                                                        },
                                                      }}
                                                    >
                                                      <Button variant="outline-primary">
                                                        <FaCopy />
                                                      </Button>
                                                    </Tooltip>
                                                  </CopyToClipboard>
                                              }
                                            </Col>
                                          </Row>
                                        </Toast.Body>
                                      </Toast>
                                    </td>
                                  ) : null}
                                </tbody>
                              ))}
                            </Table>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Col>
                    <Col className="col-2 mt-4">
                      <Tooltip
                        title="Delete Service"
                        placement="top"
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: "#DC3545",
                              "& .MuiTooltip-arrow": {
                                color: "#DC3545",
                              },
                            },
                          },
                        }}
                      >
                        <Button
                          variant="outline-danger"
                          className="border-0 px-1 py-0"
                          onClick={() => {
                            deleteSrvc(i.service_id, indkey);
                          }}
                          style={{ fontSize: "1.8em" }}
                        >
                          <AiFillDelete className="mb-2" />
                        </Button>
                      </Tooltip>
                    </Col>
                  </>
                ))}
            </Row>
          </div>
        }
      </Container>
    </div>
  );
}

export default Services;
