import React, { useState } from "react";
import {
  Container,
  Card,
  Breadcrumb,
  Form,
  Spinner,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Editor from "@monaco-editor/react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import * as API from "../../apiservice/Apiservice";

function Serviceeditresponse() {

  //Submit Spinner
  const [submitspinner, setSubmitSpinner] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  let { collectionid } = location.state;
  let { serviceid } = location.state;
  let { mockid } = location.state;
  let { statuscode } = location.state;
  let { defaultcode } = location.state;
  let { data_type } = location.state;
  let { header } = location.state;
  let { body } = location.state;


  const [status_code, setStatus_Code] = useState(statuscode);
  const [default_code, setDefault_Code] = useState(defaultcode);
  const [defcode, setDefCode] = useState('not-set');
  const [datatype, setDataType] = useState(data_type);
  const [respheader, setRespHeader] = useState(header);
  const [respbody, setRespBody] = useState(body);

  const handleStatusCode = (evt) => {
    console.log(evt.target.value);
    setStatus_Code(evt.target.value);
  };

  const handleDefaultCode = (evt) => {
    if (evt.target.value == "true") {
      console.log(evt.target.value);
      setDefault_Code(true);
      setDefCode('set');
      console.log(typeof default_code);
    } else {
      console.log(evt.target.value);
      setDefault_Code(false);
      setDefCode('set');
      console.log(typeof default_code);
    }
  };

  //Response Header Validation
  //Response Header - Check if Json and Enable validate button
  const [isjsonheader, setIsJsonHeader] = useState(false);
  const [validatejsonheader, setValidateJsonHeader] = useState("");
  const handleResponseHeader = (val, evt) => {
    try {
      JSON.parse(val);
      setRespHeader(JSON.parse(val));
      setValidateJsonHeader(true);
      setIsJsonHeader(true);
      setJsonValidDisplayHeader("");
      console.log("true json");
    } catch (e) {
      setIsJsonHeader(false);
      setValidateJsonHeader(false);
      console.log("false json");
      setJsonValidDisplayHeader("");
      return false;
    }
    return true;
  };

  //Response Header - Validation for JSON
  const [jsonvaliddisplayheader, setJsonValidDisplayHeader] = useState("");
  const validateCheckJsonHeader = () => {
    if (isjsonheader === true && validatejsonheader === true) {
      setValidateJsonHeader(true);
      setJsonValidDisplayHeader(true);
    } else {
      setValidateJsonHeader(false);
      setJsonValidDisplayHeader(false);
    }
  };

  //Response Body Validation
  const [finalresp, setFinalResp] = useState(false);
  //radio for json type
  const [jsontextarea, setJSONTextarea] = useState(false);
  const selectedJson = () => {
    console.log("selected JSON");
    setDataType('json');
    setJSONTextarea(true);
    setXMLTextarea(false);
    setPlainTextarea(false);
    setFormarea(false);
    setFinalResp(false);
    setIsForm(false);
  };

  //Response Body - Check if Json and Enable validate button
  const [isjson, setIsJson] = useState(false);
  const [validatejson, setValidateJson] = useState("");

  const handleResponseBodyJson = (val, evt) => {
    try {
      JSON.parse(val);
      setRespBody(JSON.parse(val));
      setValidateJson(true);
      setIsJson(true);
      setFinalResp(false);
      setJsonValidDisplay("");
      console.log("true json");
    } catch (e) {
      setIsJson(false);
      setValidateJson(false);
      setFinalResp(false);
      console.log("false json");
      setJsonValidDisplay("");
      return false;
    }
    return true;
  };

  //Response Body - Validation for JSON
  const [jsonvaliddisplay, setJsonValidDisplay] = useState("");
  const validateCheckJson = () => {
    if (isjson === true && validatejson === true) {
      setValidateJson(true);
      setJsonValidDisplay(true);
      setFinalResp(true);
    } else {
      setValidateJson(false);
      setJsonValidDisplay(false);
      setFinalResp(false);
    }
  };

  //radio for xml type
  const [xmltextarea, setXMLTextarea] = useState(false);
  const selectedXML = (evt) => {
    console.log("selected XML");
    setDataType('xml');
    setJSONTextarea(false);
    setPlainTextarea(false);
    setFormarea(false);
    setXMLTextarea(true);
    setFinalResp(false);
    setIsForm(false);
  };

  //Response Body - Check if XML or text and Enable validate button
  const [isxml, setIsXml] = useState(false);
  const [validatexml, setValidateXML] = useState("");

  const handleResponseBodyXml = (val, evt) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(val, "text/xml");
    // print the name of the root element or error message
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      setIsXml(false);
      setValidateXML(false);
      setXMLValidDisplay("");
      setFinalResp(false);
      console.log("error while parsing");
    } else {
      setRespBody(val.replace(/(\r\n|\n|\r|\s)/gm, ""));
      console.log(val.replace(/(\r\n|\n|\r|\s)/gm, ""));
      setValidateXML(true);
      setIsXml(true);
      setJsonValidDisplay("");
      setFinalResp(false);
    }
  };

  //Response Body - Validation for XML
  const [xmlvaliddisplay, setXMLValidDisplay] = useState("");
  const validateCheckXml = () => {
    if (isxml === true && validatexml === true) {
      setValidateXML(true);
      setXMLValidDisplay(true);
      setFinalResp(true);
    } else {
      setValidateXML(false);
      setXMLValidDisplay(false);
      setFinalResp(false);
    }
  };

  //radio for text type
  const [plaintextarea, setPlainTextarea] = useState(false);
  const selectedText = (evt) => {
    console.log("selected Text");
    setDataType('text');
    setXMLTextarea(false);
    setJSONTextarea(false);
    setFormarea(false);
    setPlainTextarea(true);
    setFinalResp(false);
    setIsForm(false);
  };

  //Response Body - Check if Text and Enable validate button
  const [istext, setIsText] = useState(false);
  const [validatetext, setValidateText] = useState("");

  const handleResponseBodyText = (evt) => {
    let regex =
      /^[^\s]+[a-zA-Z0-9$_&+,:;=?@#|'<>.-^*()%!\s]+([a-zA-Z0-9$_&+,:;=?@#|'<>.-^*()%!]+)*$/;
    if (regex.test(evt.target.value)) {
      console.log("Valid Regex", evt.target.value);
      setRespBody(evt.target.value);
      console.log(evt.target.value);
      setValidateText(true);
      setIsText(true);
      setTextValidDisplay("");
      setFinalResp(false);
    } else {
      console.log("Invalid Regex");
      setIsText(false);
      setValidateText(false);
      setTextValidDisplay("");
      setFinalResp(false);
    }
  };

  //Response Body - Validation for Text
  const [textvaliddisplay, setTextValidDisplay] = useState("");
  const validateCheckText = (evt) => {
    if (istext === true && validatetext === true) {
      setValidateText(true);
      setTextValidDisplay(true);
      setFinalResp(true);
    } else {
      setValidateText(false);
      setTextValidDisplay(false);
      setFinalResp(false);
    }
  };

  //radio for Form type data
  const [formarea, setFormarea] = useState(false);
  const selectedForm = (evt) => {
    console.log("selected Form");
    setDataType('form-data');
    setXMLTextarea(false);
    setJSONTextarea(false);
    setPlainTextarea(false);
    setFormarea(true);
    setFinalResp(false);
  };

  //Response Body - Check if Form and Enable validate button
  const [isform, setIsForm] = useState(false);
  const [validateform, setValidateForm] = useState("");
  const [filevalue, setFileValue] = useState(undefined);
  const handleResponseBodyForm = (evt) => {
    if (evt.target.file === null || evt.target.file === "") {
      console.log('Invalid Response');
      setValidateForm(false);
      setIsForm(false);
      setFormValidDisplay("");
      setFinalResp(false);
    }
    else {
      setRespBody('');
      console.log(evt.target.files[0]);
      setFileValue(evt.target.files[0]);
      setValidateForm(true);
      setIsForm(true);
      setFormValidDisplay("");
      setFinalResp(false);
    }
  };

  //Response Body - Validation for Form
  const [formvaliddisplay, setFormValidDisplay] = useState("");
  const validateCheckForm = (evt) => {
    if (isform === true && validateform === true) {
      setValidateForm(true);
      setFormValidDisplay(true);
      setFinalResp(true);
    } else {
      setValidateForm(false);
      setFormValidDisplay(false);
      setFinalResp(false);
    }
  };

  //update response api call
  const updateresponse = (event) => {
    setSubmitSpinner(true);
    event.preventDefault();
    if (isform === true) {
      API.UpdateServiceResponse(
        collectionid,
        serviceid,
        mockid,
        status_code,
        default_code,
        respheader,
        datatype,
        respbody
      )
        .then((res) => {
          console.log(res.data);
          let serviceid = res.data.data.service_id;
          console.log(serviceid);
          let mockid = res.data.data.mock_id;
          console.log(mockid);
          API.InitializeFile(collectionid, serviceid, mockid, filevalue).then((resp) => {
            console.log(resp.data);
            alert("Service updated successfully");
            setSubmitSpinner(false);
            navigate(-1);
          })
            .catch((err) => {
              alert("Unable to update service");
              setSubmitSpinner(false);
            })
        })
        .catch((err) => {
          alert(err.response.data.message);
          setSubmitSpinner(false);
        });
    }
    else {
      API.UpdateServiceResponse(
        collectionid,
        serviceid,
        mockid,
        status_code,
        default_code,
        respheader,
        datatype,
        respbody
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
    }
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
            <Breadcrumb.Item active>Edit Service Response</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card>
          <Card.Header>
          <h5 className="fw-bold">Edit Response</h5>
          <span className="small text-muted">
            (All fields are required and mandatory *)
          </span>
          </Card.Header>
          <Form.Group className="mb-3 px-3 py-3">
            <Row>
              <>
                <Col className="col-10 mt-2">
                  <Form.Group className="mb-3 col-3">
                    <Form.Label className="fw-bold">Status Code *</Form.Label>
                    <Form.Select
                      name="status_code"
                      defaultValue={status_code}
                      onChange={(evt) => {
                        handleStatusCode(evt);
                      }}
                    >
                      <option selected disabled>
                        Select status code
                      </option>
                      <option value="200">200 Success</option>
                      <option value="201">201 Created</option>
                      <option value="202">202 Accepted</option>
                      <option value="300">300 Multiple Choices</option>
                      <option value="301">301 Moved Permanently</option>
                      <option value="302">302 Found</option>
                      <option value="400">400 Bad Rquest</option>
                      <option value="401">401 Unauthorized</option>
                      <option value="403">402 Forbidden</option>
                      <option value="404">404 Not Found</option>
                      <option value="406">406 Not Acceptable</option>
                      <option value="500">500 Internal Server Error</option>
                      <option value="501">501 Bad Gateway</option>
                      <option value="502">502 Gateway Timeout</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 col-12">
                    <Form.Label className="fw-bold">Default *</Form.Label>
                    <Row>
                      <Col className="col-3">
                        <Form.Select
                          name="default"
                          defaultValue={default_code}
                          onChange={(evt) => {
                            handleDefaultCode(evt);
                          }}
                        >
                          <option selected disabled>
                            Select Default
                          </option>
                          <option value="true">Default</option>
                          <option value="false">Not Default</option>
                        </Form.Select>
                      </Col>
                      <Col className="col-8 m-1 small fw-bold">
                        <Alert variant="warning" className="p-1">
                          &nbsp;
                          <BsFillInfoSquareFill />
                          &nbsp; Setting this response as 'Default' will replace
                          the existing Default response
                        </Alert>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      Response Header *
                    </Form.Label>
                    <Card>
                      <Editor
                        height="20vh"
                        defaultLanguage="json"
                        defaultValue={JSON.stringify(respheader)}
                        name="header"
                        onChange={(evt) => {
                          handleResponseHeader(evt);
                        }}
                      />
                    </Card>
                    <Row>
                      <Col>
                        {jsonvaliddisplayheader === true ? (
                          <p className="text-success fw-bold">Valid JSON</p>
                        ) : jsonvaliddisplayheader === false ? (
                          <p className="text-danger fw-bold">Invalid JSON</p>
                        ) : null}
                      </Col>
                      <Col>
                        <div className="d-flex my-2 justify-content-end">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => validateCheckJsonHeader()}
                          >
                            Validate
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Response Body *</Form.Label>
                    <Form.Group className="mb-3">
                      <Form>
                        {["radio"].map((type) => (
                          <div className="mb-3">
                            <Form.Check
                              inline
                              className="radio-size"
                              label={<div className="mx-2">JSON</div>}
                              value={datatype}
                              name="group1"
                              type={type}
                              onChange={selectedJson}
                            />
                            <Form.Check
                              inline
                              className="radio-size"
                              label={<div className="mx-2">XML</div>}
                              value={datatype}
                              name="group1"
                              type={type}
                              onChange={selectedXML}
                            />
                            <Form.Check
                              inline
                              className="radio-size"
                              label={<div className="mx-2">Text</div>}
                              value={datatype}
                              name="group1"
                              type={type}
                              onChange={selectedText}
                            />
                            <Form.Check
                              inline
                              className="radio-size"
                              label={<div className="mx-2">File</div>}
                              value={datatype}
                              name="group1"
                              type={type}
                              onChange={selectedForm}
                            />
                          </div>
                        ))}
                      </Form>
                      {jsontextarea === true ? (
                        <>
                          <Card>
                            <Editor
                              height="50vh"
                              defaultLanguage="json"
                              name="body"
                              defaultValue={respbody}
                              onChange={(evt) => {
                                handleResponseBodyJson(evt);
                              }}
                            />
                          </Card>
                          <Row>
                            <Col>
                              {jsonvaliddisplay === true ? (
                                <p className="text-success fw-bold">
                                  Valid JSON Format
                                </p>
                              ) : jsonvaliddisplay === false ? (
                                <p className="text-danger fw-bold">
                                  Invalid JSON Format
                                </p>
                              ) : null}
                            </Col>
                            <Col>
                              <div className="d-flex my-2 justify-content-end">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => validateCheckJson()}
                                >
                                  Validate JSON
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </>
                      ) : xmltextarea === true ? (
                        <>
                          <Card>
                            <Editor
                              height="50vh"
                              defaultLanguage="xml"
                              defaultValue={respbody}
                              name="body"
                              onChange={(evt) => {
                                handleResponseBodyXml(evt);
                              }}
                            />
                          </Card>
                          <Row>
                            <Col>
                              {xmlvaliddisplay === true ? (
                                <p className="text-success fw-bold">
                                  Valid XML Format
                                </p>
                              ) : xmlvaliddisplay === false ? (
                                <p className="text-danger fw-bold">
                                  Invalid XML Format
                                </p>
                              ) : null}
                            </Col>
                            <Col>
                              <div className="d-flex my-2 justify-content-end">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => validateCheckXml()}
                                >
                                  Validate XML
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </>
                      ) : plaintextarea === true ? (
                        <>
                          <Form.Control
                            style={{ height: "200px" }}
                            name="body"
                            as="textarea"
                            defaultValue={respbody}
                            placeholder="Response Body"
                            onChange={(evt) => {
                              handleResponseBodyText(evt);
                            }}
                          />
                          <Row>
                            <Col>
                              {textvaliddisplay === true ? (
                                <p className="text-success fw-bold">
                                  Valid Text Format
                                </p>
                              ) : textvaliddisplay === false ? (
                                <p className="text-danger fw-bold">
                                  Invalid Text Format
                                </p>
                              ) : null}
                            </Col>
                            <Col>
                              <div className="d-flex my-2 justify-content-end">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => validateCheckText()}
                                >
                                  Validate Text
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </>
                      ) : formarea === true ? (
                        <Form.Group className="position-relative mb-3">
                          <Form.Label>File</Form.Label>
                          <Form.Control
                            type="file"
                            required
                            name="file"
                            onChange={handleResponseBodyForm}
                          />
                          <Row>
                            <Col>
                              {formvaliddisplay === true ? (
                                <p className="text-success fw-bold">
                                  Vaild Form
                                </p>
                              ) : formvaliddisplay === false ? (
                                <p className="text-danger fw-bold">
                                  Invalid Form
                                </p>
                              ) : null}
                            </Col>
                            <Col>
                              <div className="d-flex my-2 justify-content-end">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => validateCheckForm()}
                                >
                                  Validate Form
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form.Group>) : null}
                    </Form.Group>
                  </Form.Group>
                </Col>
              </>
            </Row>
            <div className="col-2">
            <Button
              className="mt-3"
              variant="primary"
              disabled={
                !status_code ||
                !defcode ||
                !jsonvaliddisplayheader ||
                !finalresp
              }
              onClick={updateresponse}
              type="submit"
            >
              {submitspinner === true ?
                <Spinner animation="grow" variant="light" size="sm" />
                :
                <span>Update Response</span>
              }
            </Button>
          </div>
          </Form.Group>
        </Card>
      </Container>
    </div>
  );
}

export default Serviceeditresponse;
