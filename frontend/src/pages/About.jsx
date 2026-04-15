import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API_BASE from '../config';

const About = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <Row className="mt-5">
        <Col md={6}>
          <h2 className="fw-bold mb-4">Our Story</h2>
          <p className="text-muted" style={{ lineHeight: '1.8' }}>
            We believe that premium quality shouldn't come with exorbitant price tags. 
            Founded in 2026, we've set out to revolutionize the way you shop online, prioritizing exceptional design, seamless experiences, and customer satisfaction.
          </p>
          <p className="text-muted" style={{ lineHeight: '1.8' }}>
            Every product in our catalog is hand-picked to ensure the highest standards. Welcome to the future of retail.
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className="bg-light w-100 h-100 rounded shadow-sm d-flex justify-content-center align-items-center overflow-hidden" style={{ minHeight: '300px' }}>
            <img src={`${API_BASE}/uploads/brand.png`} alt="Our Brand Story" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default About;
