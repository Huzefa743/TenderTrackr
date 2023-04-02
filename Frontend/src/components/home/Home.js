import React from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import Body from '../../layouts/Body/Body'
import Footer from '../../layouts/footer/Footer'
import Header from '../../layouts/header/Header'
import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <Body/>
      <Footer/>
    </>
  )
}

export default Home