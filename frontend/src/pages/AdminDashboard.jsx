import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  // Navigate to the create form instead of silently posting an empty product
  const createProductHandler = () => {
    navigate('/admin/products/create');
  };

  const deleteHandler = async (id) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <h2>Admin Dashboard - Products</h2>
        <Button variant="dark" onClick={createProductHandler}>
          + Create Product
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Button
                  variant="light"
                  className="btn-sm me-2 border"
                  onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                >
                  Edit
                </Button>
                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4">No products found. Click "+ Create Product" to add one.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
