import React, { useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container fluid style={{ minHeight: '80vh', paddingTop: '80px' }}>
      <Row>
        <Col md={2} className="bg-dark text-white p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <h5 className="mb-4 text-center border-bottom pb-3">Admin Panel</h5>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin" className="text-white mb-2">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/products" className="text-white mb-2">Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders" className="text-white mb-2">Orders</Nav.Link>
            <Nav.Link as={Link} to="/admin/users" className="text-white mb-2">Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/settings" className="text-white mb-2">Settings</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4 bg-light">
          <div className="bg-white p-4 rounded shadow-sm" style={{ minHeight: '100%' }}>
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminLayout;
