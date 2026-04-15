import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';
import API_BASE from '../config';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products`);
        setProducts(data.slice(0, 4)); // Get first 4 products
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-5" style={{ background: 'white' }}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h5 className="text-uppercase mb-2" style={{ color: '#B5935E', letterSpacing: '2px', fontSize: '0.9rem' }}>Curated Selection</h5>
            <h2 className="display-5 mb-0" style={{ fontWeight: 700 }}>Featured Products</h2>
          </div>
          <a href="/shop" className="text-dark text-decoration-none border-bottom border-dark pb-1" style={{ fontWeight: 600 }}>
            View All Collection
          </a>
        </div>

        <Row>
          {products.map(product => (
            <Col key={product._id} md={6} lg={3}>
              <ProductCard 
                 id={product._id}
                 image={product.image.startsWith('/') ? `${API_BASE}${product.image}` : product.image} 
                 title={product.name} 
                 category={product.category} 
                 price={product.price}
                 isNew={true}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
