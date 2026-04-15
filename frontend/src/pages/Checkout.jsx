import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import API_BASE from '../config';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress]       = useState('');
  const [city, setCity]             = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry]       = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [step, setStep]             = useState(1); // 1 = cart review, 2 = shipping, 3 = confirm

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const itemsPrice    = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 49.99;
  const totalPrice    = itemsPrice + shippingPrice;

  const placeOrderHandler = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      const orderItems = cart.map((item) => ({
        name:    item.name,
        qty:     item.qty,
        image:   item.image || '/uploads/placeholder.png',
        price:   item.price,
        product: item.id,
      }));

      await axios.post(
        `${API_BASE}/api/orders`,
        { orderItems, shippingAddress: { address, city, postalCode, country }, paymentMethod, itemsPrice, shippingPrice, totalPrice },
        config
      );

      clearCart();
      navigate(`/orders`);
    } catch (err) {
      const status  = err.response?.status;
      const message = err.response?.data?.message || 'Failed to place order.';

      if (status === 401) {
        // Stale token — clear it and force re-login
        localStorage.removeItem('userInfo');
        setError('Your session has expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
        <div className="text-center mt-5">
          <h2 className="fw-bold mb-3">Your Cart is Empty</h2>
          <p className="text-muted mb-4">Add some products before checking out.</p>
          <Button variant="dark" onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <h2 className="fw-bold mb-2 mt-5">Checkout</h2>

      {/* Step Indicator */}
      <div className="d-flex gap-2 align-items-center mb-4">
        {['Review Cart', 'Shipping', 'Confirm'].map((label, i) => (
          <React.Fragment key={i}>
            <span
              className={`px-3 py-1 rounded-pill small fw-semibold ${step === i + 1 ? 'bg-dark text-white' : step > i + 1 ? 'bg-success text-white' : 'bg-light text-muted'}`}
              style={{ cursor: 'pointer' }}
              onClick={() => step > i + 1 && setStep(i + 1)}
            >
              {i + 1}. {label}
            </span>
            {i < 2 && <span className="text-muted">›</span>}
          </React.Fragment>
        ))}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {/* LEFT: Steps */}
        <Col md={7}>
          {/* Step 1: Cart Review */}
          {step === 1 && (
            <div className="border rounded p-4 bg-white shadow-sm">
              <h5 className="fw-bold mb-3">🛒 Your Items</h5>
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image?.startsWith('/') ? `${API_BASE}${item.image}` : item.image}
                            alt={item.name}
                            style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/56x56?text=img'; }}
                          />
                          <span className="fw-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td><Badge bg="secondary">{item.qty}</Badge></td>
                      <td className="text-end fw-bold">₹{(item.price * item.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-4 d-flex justify-content-end">
                <Button variant="dark" onClick={() => setStep(2)}>Continue to Shipping →</Button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="border rounded p-4 bg-white shadow-sm">
              <h5 className="fw-bold mb-3">📦 Shipping Address</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text" placeholder="e.g. 12 Main Street"
                    value={address} onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text" placeholder="e.g. Surat"
                        value={city} onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text" placeholder="e.g. 395001"
                        value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text" placeholder="e.g. India"
                    value={country} onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Payment Method</Form.Label>
                  <div className="d-flex gap-3">
                    {['COD', 'UPI', 'Card'].map((method) => (
                      <Form.Check
                        key={method}
                        type="radio"
                        label={method === 'COD' ? '💵 Cash on Delivery' : method === 'UPI' ? '📱 UPI' : '💳 Card'}
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    ))}
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-dark" onClick={() => setStep(1)}>← Back</Button>
                  <Button
                    variant="dark"
                    onClick={() => {
                      if (!address || !city || !postalCode || !country) {
                        setError('Please fill all shipping fields.');
                        return;
                      }
                      setError('');
                      setStep(3);
                    }}
                  >
                    Review Order →
                  </Button>
                </div>
              </Form>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="border rounded p-4 bg-white shadow-sm">
              <h5 className="fw-bold mb-3">✅ Confirm Order</h5>

              <div className="mb-3 p-3 rounded" style={{ background: '#f8f9fa' }}>
                <p className="mb-1"><strong>📍 Shipping to:</strong></p>
                <p className="mb-0 text-muted">{address}, {city}, {postalCode}, {country}</p>
              </div>
              <div className="mb-3 p-3 rounded" style={{ background: '#f8f9fa' }}>
                <p className="mb-0"><strong>💳 Payment:</strong> {paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod}</p>
              </div>
              <div className="mb-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
                <p className="mb-1"><strong>🛒 Items:</strong></p>
                {cart.map((item) => (
                  <p key={item.id} className="mb-0 text-muted small">{item.name} × {item.qty} = ₹{(item.price * item.qty).toLocaleString()}</p>
                ))}
              </div>

              <div className="d-flex justify-content-between">
                <Button variant="outline-dark" onClick={() => setStep(2)}>← Back</Button>
                <Button variant="dark" onClick={placeOrderHandler} disabled={loading}>
                  {loading ? 'Placing Order...' : '🎉 Place Order'}
                </Button>
              </div>
            </div>
          )}
        </Col>

        {/* RIGHT: Order Summary */}
        <Col md={5}>
          <div className="border rounded p-4 bg-white shadow-sm" style={{ position: 'sticky', top: '100px' }}>
            <h5 className="fw-bold mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Items ({cart.reduce((a, i) => a + i.qty, 0)})</span>
              <span>₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping</span>
              <span>{shippingPrice === 0 ? <span className="text-success">Free</span> : `₹${shippingPrice}`}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            {shippingPrice > 0 && (
              <p className="text-muted small mt-2">🚚 Free shipping on orders over ₹500</p>
            )}
            {!userInfo && (
              <Alert variant="warning" className="mt-3 small">
                You need to <a href="/login">login</a> to place an order.
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
