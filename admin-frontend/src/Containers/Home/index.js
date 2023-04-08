import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const Home = () => {
  const auth = useSelector(state => state.authReducer.authenticated);
  return (
    auth ? 
  
      <Container fluid>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
   : 
  <Navigate to = "/login"/>
  
  )}

  export default Home