import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <h2 className="fw-bold mb-0">My Orders</h2>
        <Button variant="dark" onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-2 text-muted">Loading orders...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem' }}>🛍️</div>
          <h4 className="fw-bold mt-3">No orders yet</h4>
          <p className="text-muted mb-4">You haven't placed any orders yet.</p>
          <Button variant="dark" onClick={() => navigate('/shop')}>Start Shopping</Button>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="border rounded shadow-sm overflow-hidden">
          <Table responsive hover className="mb-0 bg-white">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-muted small align-middle">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="align-middle">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td className="align-middle">
                    <div>
                      {order.orderItems.slice(0, 2).map((item, i) => (
                        <div key={i} className="small">{item.name} × {item.qty}</div>
                      ))}
                      {order.orderItems.length > 2 && (
                        <div className="small text-muted">+{order.orderItems.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="fw-bold align-middle">₹{order.totalPrice.toFixed(2)}</td>
                  <td className="align-middle">
                    <span className="small">{order.paymentMethod}</span>
                  </td>
                  <td className="align-middle">
                    {order.isDelivered ? (
                      <Badge bg="success">Delivered</Badge>
                    ) : (
                      <Badge bg="warning" text="dark">Processing</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Order Details Cards for mobile / detail view */}
      {!loading && orders.length > 0 && (
        <div className="mt-4">
          <h5 className="fw-bold mb-3">Order Details</h5>
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4 mb-3 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="mb-0 fw-bold">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="mb-0 text-muted small">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                {order.isDelivered
                  ? <Badge bg="success" className="px-3 py-2">Delivered ✓</Badge>
                  : <Badge bg="warning" text="dark" className="px-3 py-2">Processing…</Badge>
                }
              </div>

              {/* Items */}
              <div className="mb-3">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image?.startsWith('/') ? `http://localhost:5000${item.image}` : item.image}
                        alt={item.name}
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=img'; }}
                      />
                      <div>
                        <p className="mb-0 fw-semibold small">{item.name}</p>
                        <p className="mb-0 text-muted small">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="fw-bold">₹{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="row g-2 text-muted small mb-2">
                <div className="col-6"><strong>📍 Ship to:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</div>
                <div className="col-6"><strong>💳 Payment:</strong> {order.paymentMethod}</div>
              </div>
              <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
                <span>Total</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrderHistory;
