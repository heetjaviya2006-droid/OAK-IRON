import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section className="hero-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      paddingTop: '80px',
      background: '#FCFAFA'
    }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div>
              <h5 className="text-uppercase mb-3" style={{ color: '#B5935E', letterSpacing: '3px', fontWeight: 600 }}>
                New Collection 2026
              </h5>
              <h1 className="display-3 mb-4" style={{ fontWeight: 700, lineHeight: 1.1 }}>
                Elevate Your Living <br /> With <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Soulful</span> Design.
              </h1>
              <p className="lead mb-5 text-muted" style={{ maxWidth: '500px' }}>
                Discover our curated collection of artisanal furniture that blends timeless craftsmanship with modern minimalism.
              </p>
              <div className="d-flex gap-3">
                <Button variant="primary" className="btn-lg">Shop Now</Button>
                <Button variant="outline-dark" className="btn-lg border-0" style={{ fontWeight: 500 }}>Explore Trends</Button>
              </div>
            </div>
          </Col>
          <Col lg={6} className="mt-5 mt-lg-0">
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Furniture" 
                className="img-fluid"
                style={{ borderRadius: '24px', boxShadow: '0 50px 100px rgba(0,0,0,0.12)' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x800?text=Placeholder+Image'; }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '-30px',
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                zIndex: 2
              }} className="d-none d-md-block">
                <h6 className="mb-1" style={{ fontWeight: 700 }}>Minimalist Living Set</h6>
                <p className="mb-0 text-muted">$1,299</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
