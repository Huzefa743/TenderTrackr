import React, { useState } from "react";
import { Container, Form, Card, Button, Breadcrumb, Spinner } from "react-bootstrap";
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import "./Create.css";
import * as API from "../../apiservice/Apiservice";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { MdError } from "react-icons/md";

function Createcollection() {
  const Navigate = useNavigate();

  //Submit Spinner
  const [submitspinner, setSubmitSpinner] = useState(false);

  const [collname, setCollName] = useState("");
  const [collnameerror, setCollNameError] = useState("");
  const changeName = (evt) => {
    if (evt.target.value === "") {
      setCollNameError("Collection Name cannot be empty");
    } else {
      setCollName(evt.target.value);
      setCollNameError("");
    }
  };

  const [colldesc, setCollDesc] = useState("");
  const [colldescerror, setCollDescError] = useState("");
  const changeDesc = (evt) => {
    if (evt.target.value === "") {
      setCollDescError("Collection Description cannot be empty");
    } else {
      setCollDesc(evt.target.value);
      setCollDescError("");
    }
  };

  const [img, setImg] = useState({ newImg: null });
  const [imgerror, setImgError] = useState("");
  const changeImage = async (event) => {
    var maxFileSize = 1048576; //1MB
    if (event.target.files[0].size > maxFileSize) {
      setImg({ newImg: null });
      setImgError("File size cannot be greater than 1MB");
    } else {
      console.log(event.target.files[0]);
      const file = event.target.files[0];
      setImgError("");
      setImg({ oldImg: URL.createObjectURL(file), newImg: file });
    }
  };

  const createCollection = async (e) => {
    setSubmitSpinner(true);
    e.preventDefault();
    await API.createCollection(collname, colldesc, img.newImg)
      .then((res) => {
        alert("new collection Created");
        console.log(res.data);
        Navigate("/collections");
        setSubmitSpinner(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data.message);
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
            <Breadcrumb.Item active>Create a Collection</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="mt-4" style={{ width: "80%" }}>
          <Card.Header>
            <h5 className="fw-bold">Create a new Collection</h5>
            <p className="small text-muted">(All fields are required and mandatory)</p>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={createCollection}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Collection Name *</Form.Label>
                <Form.Control
                  placeholder="Enter Collection Name"
                  name="name"
                  onChange={(evt) => changeName(evt)}
                />
                {collnameerror ? (
                  <p className="m-0 text-danger small fw-bold">
                    <MdError /> {""}
                    {collnameerror}
                  </p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Collection Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Collection Description"
                  name="desc"
                  onChange={(evt) => changeDesc(evt)}
                />
                {colldescerror ? (
                  <p className="m-0 text-danger small fw-bold">
                    <MdError /> {""}
                    {colldescerror}
                  </p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Collection Image *</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={changeImage}
                />
                <Form.Text>
                  <p className="text-muted m-0">Please upload a file below 1MB</p>
                </Form.Text>
                {imgerror ? (
                  <p className="m-0 mx-1 text-danger small fw-bold">
                    <MdError /> {""}
                    {imgerror}
                  </p>
                ) : null}
                {img.oldImg ? (
                  <img
                    className="mt-2"
                    src={img.oldImg}
                    alt="collection img"
                    width="20%"
                    height="auto"
                  />
                ) : null}
              </Form.Group>
              <Button
                type="submit"
                disabled={!collname || !colldesc || !img.newImg}
              >
                {submitspinner === true ?
                  <Spinner animation="grow" variant="light" size="sm" />
                  :
                  <span>Create Collection</span>
                }
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Createcollection;
