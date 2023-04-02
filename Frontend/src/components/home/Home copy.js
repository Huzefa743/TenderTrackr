import React from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import Header from '../../layouts/header/Header'
import Miniheader from '../../layouts/header/Miniheader';
import HomepageLogo from '../../logos/Homepage.svg';
import './Home.css'

function Home() {
  return (
    <div>
      <Header />
      <Miniheader />
      <Container className="container-box">
        <Card className="bg-light text-dark border-0">
          <Card.Img className="home-logo-image" src={HomepageLogo} alt="logo" />
          <Card.ImgOverlay>
            <Card.Title className='text-primary'><h1>Welcome, to Mimicker</h1></Card.Title>
            <div className='col-6'>
              <Card.Text><h5 className='text-secondary'>The Mocker Tool</h5></Card.Text>
              <Card.Text className="mt-4">
                <strong>Where you can-</strong>
                <ListGroup className='mt-2' variant="flush">
                  <ListGroup.Item variant="secondary">Create your own Collections and Services</ListGroup.Item>
                  <ListGroup.Item variant="light">Generate your own Mock Responses</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Export or Import Collections</ListGroup.Item>
                  <ListGroup.Item variant="light">Download your Collection in HTML Document</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Export your Mimicker Collection as Postman Collection</ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </div>
          </Card.ImgOverlay>
        </Card>
        {/* <div>
          <img className="home-logo-image"  alt="logo" />
        </div> */}
      </Container>
    </div>
  )
}

export default Home