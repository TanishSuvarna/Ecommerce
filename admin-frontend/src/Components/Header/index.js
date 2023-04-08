import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import {signout} from '../../redux/actions/authActions.js'
import {useDispatch, useSelector} from 'react-redux'
import Sidebar from '../Sidebar/Sidebar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (e) =>{
        if(e.target.id==="logout"){
            dispatch(signout());
            navigate("/login");
        }
        else navigate("/" + e.target.id);
    }
    const auth = useSelector(state => state.authReducer.authenticated)
    return (
        <Navbar collapseOnSelect expand="lg" style ={{backgroundColor : '#060b26'}}>
          
            {auth && <Sidebar/>}
            <Navbar.Brand style={{cursor:'pointer' , color : '#f5f5f5'}} id = "home" onClick={handleClick}>Admin Dashboard</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="me-auto">
              </Nav>
              <Nav >
                {!auth ?
                <>
                 <Nav.Link style ={{color :'#f5f5f5'}} id = "register" onClick={handleClick}>Register</Nav.Link>
                 <Nav.Link style ={{color :'#f5f5f5'}} id = "login" onClick={handleClick}>Login</Nav.Link>
                </>:
                 <Nav.Link style ={{color :'#f5f5f5'}} id = "logout" onClick={handleClick}>Logout</Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          
        </Navbar>
           
      );
}

export default Header;