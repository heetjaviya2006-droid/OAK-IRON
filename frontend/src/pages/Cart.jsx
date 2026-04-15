import React from 'react';
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const cartTotal = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <h2 className="mb-4 mt-5">Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {cart.length === 0 ? (
              <ListGroup.Item>
                Your cart is currently empty.
              </ListGroup.Item>
            ) : (
              cart.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.image?.startsWith('/') ? `http://localhost:5000${item.image}` : item.image}
                        alt={item.name}
                        fluid
                        rounded
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
                      />
                    </Col>
                    <Col md={3}>{item.name}</Col>
                    <Col md={2}>₹{item.price}</Col>
                    <Col md={2}>Qty: {item.qty}</Col>
                    <Col md={2}>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <div className="p-4 border rounded shadow-sm">
            <h4>Order Summary</h4>
            <hr />
            <div className="mb-3 d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>₹{cartTotal.toFixed(2)}</strong>
            </div>
            <Button className="w-100 btn-dark" disabled={cart.length === 0} onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Cart;
