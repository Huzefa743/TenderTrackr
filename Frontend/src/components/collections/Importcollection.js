import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Breadcrumb,
  Form,
  Button,
  Spinner
} from "react-bootstrap";
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import { UserIdContext } from "../context/Authcontext";
import { CgClose, CgMathPlus } from "react-icons/cg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import * as API from "../../apiservice/Apiservice";

function Importcollection() {
  const navigate = useNavigate();

  //Submit Spinner
  const [submitspinner, setSubmitSpinner] = useState(false);

  const [userid, setUserId] = useContext(UserIdContext);

  // Validation for collection name
  const [collecname, setCollecName] = useState(undefined);
  const collname = (evt) => {
    console.log(evt.target.value);
    setCollecName(evt.target.value);
  };

  // Validation for collection file
  const [collecfile, setCollecFile] = useState(undefined);
  const collfile = (evt) => {
    console.log(evt.target.files[0]);
    setCollecFile(evt.target.files[0]);
  };

  //Import Collection API
  const importcoll = (evt) => {
    setSubmitSpinner(true);
    evt.preventDefault();
    API.ImportCollection(userid, collecname, collecfile)
      .then((res) => {
        alert("Collection imported successfully");
        navigate('/collections');
        setSubmitSpinner(false);
      })
      .catch((err) => {
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
              <Link to="/create">Create</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Import a Collection</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="mt-4" style={{ width: "80%" }}>
          <Card.Header closeButton={false}>
            <h5 className="fw-bold">Import a new Collection</h5>
            <p className="small text-muted">(All fields are required and mandatory)</p>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => importcoll(e)}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Collection Name *</Form.Label>
                <Form.Control
                  placeholder="Enter Collection Name"
                  required
                  onChange={(e) => collname(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Collection File *</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={(e) => collfile(e)}
                />
              </Form.Group>
              <Button type="submit" disabled={!collecname || !collecfile}>
                {submitspinner === true ?
                  <Spinner animation="grow" variant="light" size="sm" />
                  :
                  <span>  Import Collection</span>
                }
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Importcollection;
