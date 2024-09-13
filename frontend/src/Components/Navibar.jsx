import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookingModal from './Booking';
import email from './Login'
import {handleLogout} from './Logout'

const Styles = styled.div`
  a,
  .navbar-brand,
  .navbar-nav,
  nav-link {
    color: #adb1b8;
    &:hover {
      color: white;
    }
  }
`;

const NaviBar = () => {
  
  const[isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('access_token')!==null){
      setIsAuth(true)
    }
  },[isAuth])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const [showBron, setShowBron] = useState(false);

  const handleShow = () => setShowBron(true);
  const handleClose = () => setShowBron(false);

  return (
    <>
    <Styles>
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
  <Container>
    <Navbar.Brand>Block WW</Navbar.Brand>
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse className='responsive-navbar-nav'>
      <Nav className='me-auto'>
        <Nav.Link as={Link} to='/' style={{ textDecoration: 'none' }}>
          Главная
        </Nav.Link>
        <Nav.Link as={Link} to='/about' style={{ textDecoration: 'none' }}>
          О нас
        </Nav.Link>
        <Nav.Link as={Link} to='/menu' style={{ textDecoration: 'none' }}>
          Меню
        </Nav.Link>
      </Nav>
      <div className="bron-button-container">
      <Button onClick={handleShow} className='button-bron' variant='primary'>
        Забронировать столик
      </Button>
      </div>
      {isAuth ? (
    <>
        <span className='nav-link active'>{email}!</span>
        <Link to="/logout" className='nav-link active'>Выйти</Link>
    </>
) : (
    <>
       
        <Link to="/login" className='nav-link active' style={{ marginRight: '8px' }}>Войти</Link>
        <Link to="/register" className='nav-link active'>Регистрация</Link>
    </>
)}
 
    </Navbar.Collapse>
  </Container>
</Navbar>
      </Styles>

      <BookingModal showBron={showBron} handleCloseBron={handleClose} />

    
    </>
  );
};

export default NaviBar;