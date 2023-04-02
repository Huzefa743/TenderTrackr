import React from "react";
import Header from "../../layouts/header/Header";
import Miniheader from "../../layouts/header/Miniheader";
import { Container, Card, Row, Col } from "react-bootstrap";
import Aboutus from "../../logos/About.svg";

function About() {
  return (
    <div>
      <Header />
      <Miniheader />
      <Container className="container-box">
        <h3>About Mimicker</h3>
        <Card className="mt-3">
          <Card.Header>Mimicker Tool</Card.Header>
          <Row>
            <Col>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <blockquote className="blockquote mb-0 textalign ">
                    <p>
                      Mimicker is a THBS tool for mocking an API interaction
                      using HTTPS request. You can customize your responses to
                      simulate pretty much any response either success or
                      failure Response. It supports all four methods - <br/>
                      <div className="badge bg-success">GET</div> &nbsp;
                      <div className="badge bg-info">PUT</div> &nbsp;
                      <div className="badge bg-warning">POST</div> &nbsp;
                      <div className="badge bg-danger">DELETE</div> <br/>
                      Mimicker also offers some great
                      functionality like Strict mode and simulate delay in API response – you can
                      simulate your response in multiple formats such as JSON,
                      XML, Text and Files.
                    </p>
                  </blockquote>
                </div>
              </Card.Body>
            </Col>
            <Col>
              <Card.Img variant="top" src={Aboutus} />
            </Col>
          </Row>
          <Card.Footer>A THBS Application</Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default About;
