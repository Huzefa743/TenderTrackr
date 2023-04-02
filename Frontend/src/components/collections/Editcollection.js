import React, { useEffect, useState } from "react";
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
import { Card, Form, Button, Container, Breadcrumb, Spinner } from "react-bootstrap";
import { MdError } from "react-icons/md";
import * as API from "../../apiservice/Apiservice";

function Editcollection() {
  const Navigate = useNavigate();

  //Submit Spinner
  const [submitspinner, setSubmitSpinner] = useState(false);

  const location = useLocation();
  let { collectionname } = location.state;
  let { collectionid } = location.state;
  let { collectiondesc } = location.state;

  const [img, setImg] = useState({ oldImg: null, newImg: null });

  useEffect(() => {
    handleSelect();
  }, []);

  const [collname, setCollName] = useState(collectionname);
  const [collnameerror, setCollNameError] = useState("");
  const changeName = (evt) => {
    if (evt.target.value == "") {
      setCollName("");
      setCollNameError("Collection Name cannot be empty");
    } else {
      setCollName(evt.target.value);
      setCollNameError("");
    }
  };

  const [colldesc, setCollDesc] = useState(collectiondesc);
  const [colldescerror, setCollDescError] = useState("");
  const changeDesc = (evt) => {
    if (evt.target.value == "") {
      setCollDesc("");
      setCollDescError("Collection Description cannot be empty");
    } else {
      setCollDesc(evt.target.value);
      setCollDescError("");
    }
  };

  const getImg = async (url) => {
    try {
      const response = await fetch(
        "https://mimicker.thbscoetg.com/api/v1/collectionImage/" + url,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "image/jpeg",
            Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      const blob = await response.blob();
      return [URL.createObjectURL(blob), null];
    } catch (err) {
      alert(err.response.data.message);
      console.error(`get: error occurred ${err}`);
      return [null, err];
    }
  };

  const handleSelect = async (e) => {
    const [response, error] = await getImg(collectionid);
    if (error) console.log(error);
    else {
      console.log(`got response ${response}`);
      console.log({ oldImg: response, newImg: null });
      setImg({ oldImg: response, newImg: null });
    }
  };

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

  const updateCollection = async (e) => {
    setSubmitSpinner(true);
    e.preventDefault();
    await API.updateCollection(collectionid, collname, colldesc, img.newImg)
      .then((res) => {
        alert("Collection updated Successfully!");
        Navigate("/collections");
        setSubmitSpinner(false);
      })
      .catch((e) => {
        console.log(e);
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
            <Breadcrumb.Item><Link to="/home">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/collections">Collections</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Collection</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="mt-4" style={{ width: "80%" }}>
          <Card.Header closeButton={false}>
            <h5 className="fw-bold">Edit Collection</h5>
            <p className="small text-muted">(All fields are required and mandatory)</p>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={updateCollection}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Collection Name *</Form.Label>
                <Form.Control
                  placeholder="Enter Collection Name"
                  required
                  onChange={(evt) => changeName(evt)}
                  defaultValue={collname}
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
                  required
                  onChange={(evt) => changeDesc(evt)}
                  defaultValue={colldesc}
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
                <Form.Control type="file" name="file" onChange={changeImage} />
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
                disabled={!collname || !colldesc || !img.oldImg}
              >
                {submitspinner === true ?
                  <Spinner animation="grow" variant="light" size="sm" />
                  :
                  <span>Update Collection</span>
                }
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Editcollection;
