import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { ShoppingCart, Search, User, Menu, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={scrolled ? 'scrolled' : ''}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '1px' }}>
          OAK & IRON
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <Menu size={24} />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {userInfo && userInfo.role === 'admin' && (
              <Nav.Link as={Link} to="/admin" style={{ color: '#B5935E', fontWeight: 'bold' }}>Admin Dashboard</Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center">
            {userInfo ? (
              <NavDropdown title={<><User size={20} className="me-1"/>{userInfo.name}</>} id="username">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login"><User size={20} /></Nav.Link>
            )}

            <Nav.Link as={Link} to="/cart" className="position-relative ms-3">
              <ShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{ fontSize: '10px' }}>
                {cart.reduce((a, c) => a + c.qty, 0)}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
