import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Toast, Form } from 'react-bootstrap';
import { SiAddthis } from 'react-icons/si';
import { BsFillCollectionFill } from 'react-icons/bs'
import { FaHandPointUp } from 'react-icons/fa';
import { RiEditBoxFill } from 'react-icons/ri';
import Header from '../../layouts/header/Header';
import Miniheader from '../../layouts/header/Miniheader';

function Create() {
    return (
        <div>
            <Header />
            <Miniheader />
            <Container className="container-box">
                <div className='my-3'>
                    <div className='mt-3'>
                        <h3>Import or Create a New Collection</h3>
                    </div>
                    <Card className='mt-3'>
                        <Card.Body>
                            <Row className='d-flex justify-content-center mx-1 my-3'>
                                <Col>
                                    <Link to='/importcollection'>
                                        <Button className="btn col-12 s-color" size="lg">
                                            <p className="m-1" ><BsFillCollectionFill size="30px" /></p>
                                            <p className="m-1" > Import an Existing Collection</p>
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to='/createcollections'>
                                        <Button className="btn col-12 s-color" size="lg">
                                            <p className="m-1"><FaHandPointUp size="30px" /></p>
                                            <p className="m-1">Create a Collection Manually</p>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
                <div className='my-3'>
                    <div className='mt-3'>
                        <h3>Create a New Service</h3>
                    </div>
                    <Card className='mt-3'>
                        <Card.Body>
                            <Row className='d-flex justify-content-center mx-1 my-3'>
                                <Col>
                                    <Link to="/createservice">
                                        <Button className="btn col-12 s-color" size="lg">
                                            <p className="m-1" ><SiAddthis size="30px" /></p>
                                            <p className="m-1" >Create a New Service</p>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default Create;