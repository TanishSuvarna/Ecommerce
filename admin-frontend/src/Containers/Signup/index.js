import React from 'react'
import Layout from '../../Components/Layout'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {authAction} from "../../redux/actions/authActions"
import { useDispatch } from "react-redux"
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import TokenVerify from '../../Hooks/tokenVerify';

const Signup = () => {
    const [userInfo , setUserInfo] = useState({firstName:"" ,lastName:"",email:"" , password:""})
    const dispatch = useDispatch();
    const auth = TokenVerify();
    const formSubmit = async(e) =>{
        e.preventDefault();
        dispatch(authAction(userInfo , "signup"));
    }
    const formChange = async(e) => {
        setUserInfo((prev) => {
            return {...prev , [e.target.name] : e.target.value};
        })
    }
  return (
    auth ? <Navigate to ="/"/>:
    <Layout>
        <Container fluid  className = "containerSignin">
        <Row className = "mt-5" >
            <Col md = {{span : 6 , offset : 3}}>
                <Form onSubmit={formSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="Enter First Name"name="firstName" onChange={formChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" placeholder="Enter Last Name" name="lastName" onChange={formChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={formChange}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={formChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Signup