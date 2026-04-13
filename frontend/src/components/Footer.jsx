import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-5 mt-5" style={{ background: '#2D2D2D', color: 'white' }}>
      <Container className="py-5">
        <Row className="gy-5">
          <Col lg={4}>
            <h4 className="mb-4" style={{ fontWeight: 700, letterSpacing: '1px' }}>OAK & IRON</h4>
            <p className="text-white-50 mb-4" style={{ maxWidth: '300px' }}>
              Crafting premium furniture for the modern home since 2012. Quality materials, timeless design.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><Instagram size={20} /></a>
              <a href="#" className="text-white"><Twitter size={20} /></a>
              <a href="#" className="text-white"><Facebook size={20} /></a>
            </div>
          </Col>
          <Col md={4} lg={2}>
            <h6 className="mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Shop</h6>
            <ul className="list-unstyled text-white-50 d-grid gap-2">
              <li><a href="#" className="text-decoration-none text-reset">Living Room</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Dining Room</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Bedroom</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Office</a></li>
            </ul>
          </Col>
          <Col md={4} lg={2}>
            <h6 className="mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Company</h6>
            <ul className="list-unstyled text-white-50 d-grid gap-2">
              <li><a href="#" className="text-decoration-none text-reset">About Us</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Sustainability</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Careers</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Press</a></li>
            </ul>
          </Col>
          <Col md={4} lg={4}>
            <h6 className="mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Newsletter</h6>
            <p className="text-white-50 mb-4">Join our list for exclusive releases and design tips.</p>
            <div className="position-relative">
              <Form.Control 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-0 border-bottom border-white-50 text-white rounded-0 px-0 pb-2"
                style={{ boxShadow: 'none' }}
              />
              <button className="btn btn-link text-white position-absolute end-0 bottom-0 p-0 mb-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </Col>
        </Row>
        <hr className="my-5 border-white-50" />
        <Row>
          <Col md={6}>
            <p className="mb-0 text-white-50 small">&copy; 2026 OAK & IRON. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0 text-white-50 small">Terms & Conditions | Privacy Policy</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
