import React from 'react'
import Layout from '../../Components/Layout'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
const Home = () => {
  return (
    <Layout sidebar>
    <Container fluid style={{background: '#fff'}} className="text-center">
          <Row className = "mt-5">
            <Col className = "mt-5">
                <h1>Welcome to Admin Dashboard</h1>
                <p class="lead">It is a long established fact that a reader 
                                will be distracted by the readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                as opposed to using 'Content here, content here', making it look like readable English.
                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model 
                                text, and a sear
                                </p>       
            </Col>
          </Row>
      </Container>
  </Layout>
  )
}

export default Home