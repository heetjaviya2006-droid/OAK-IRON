import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <h2 className="text-center fw-bold mb-4 mt-5">Contact Us</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="john@example.com" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="How can we help?" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Your message..." />
            </Form.Group>
            <div className="text-center">
              <Button variant="dark" size="lg" className="px-5 shadow-sm">Send Message</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Contact;
