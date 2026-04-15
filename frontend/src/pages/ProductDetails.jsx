import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import API_BASE from '../config';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({ id: product._id, name: product.name, price: product.price, image: product.image });
    alert('Added to cart!');
    navigate('/cart');
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <Row className="mt-5">
        <Col md={6}>
          <Image src={product.image?.startsWith('/') ? `${API_BASE}${product.image}` : product.image} alt={product.name} fluid className="rounded shadow-sm" />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h3 className="fw-bold">{product.name}</h3>
          <h4 className="text-muted mb-4">₹{product.price}</h4>
          <p>{product.description}</p>
          <div className="mb-3">
            <strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
          <Button 
            className="btn-dark w-50 py-2 rounded-0 shadow" 
            disabled={product.countInStock === 0} 
            onClick={addToCartHandler}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetails;
