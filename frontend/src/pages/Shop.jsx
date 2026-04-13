import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <h2 className="mb-4 mt-5">Shop All Products</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        {filteredProducts.map((product) => (
          <Col md={3} className="mb-4" key={product._id}>
            <ProductCard 
              id={product._id}
              image={product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image} 
              title={product.name} 
              category={product.category} 
              price={product.price} 
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Shop;
