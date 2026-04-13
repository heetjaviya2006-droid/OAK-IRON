import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Checkout = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <h2 className="mb-4 mt-5">Checkout</h2>
      <Form style={{ maxWidth: '600px' }}>
        <Form.Group className="mb-3">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="Enter postal code" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" />
        </Form.Group>
        <Button variant="dark">Continue to Payment</Button>
      </Form>
    </Container>
  );
};
export default Checkout;
