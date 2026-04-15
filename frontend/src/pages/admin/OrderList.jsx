import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const deliverHandler = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${id}/deliver`, {}, config);
      fetchOrders();
    } catch (err) {
      setError('Failed to mark as delivered');
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <div>
      <h3 className="fw-bold mb-4">Orders</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="table-sm bg-white">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAYMENT</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="small text-muted">#{order._id.slice(-8).toUpperCase()}</td>
              <td>{order.user?.name || 'N/A'}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="fw-bold">₹{order.totalPrice.toFixed(2)}</td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.isDelivered
                  ? <Badge bg="success">Delivered</Badge>
                  : <Badge bg="warning" text="dark">Processing</Badge>
                }
              </td>
              <td>
                {!order.isDelivered && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => deliverHandler(order._id)}
                  >
                    Mark Delivered
                  </Button>
                )}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;
