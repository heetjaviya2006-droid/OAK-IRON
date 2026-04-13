import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <main>
      <Hero />
      
      {/* Category Section */}
      <section className="py-5" style={{ background: '#F8F9FA' }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h5 className="text-uppercase mb-3" style={{ color: '#B5935E', letterSpacing: '2px', fontSize: '0.9rem' }}>Room Inspirations</h5>
            <h2 className="display-5 fw-bold">Shop by Category</h2>
          </div>
          <Row className="g-4">
            <Col md={6}>
              <div className="category-card">
                <div className="bg-overlay"></div>
                <img 
                  src="http://localhost:5000/uploads/sofa.png" 
                  className="w-100 h-100 object-fit-cover position-absolute" 
                  alt="Living Room"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Placeholder+Image'; }}
                />
                <div className="category-content">
                  <h2 className="display-6 fw-bold mb-2">Living Room</h2>
                  <p className="lead mb-4">Timeless comfort for your soul.</p>
                  <a href="#" className="text-white text-decoration-none fw-bold border-bottom border-white pb-1">Shop Now &rarr;</a>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Row className="g-4">
                <Col xs={12}>
                  <div className="category-card" style={{ height: '238px' }}>
                    <div className="bg-overlay"></div>
                    <img 
                      src="http://localhost:5000/uploads/table.png" 
                      className="w-100 h-100 object-fit-cover position-absolute" 
                      alt="Bedroom"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Placeholder+Image'; }}
                    />
                    <div className="category-content" style={{ bottom: '20px', left: '30px' }}>
                      <h3 className="fw-bold mb-1">Bedroom</h3>
                      <a href="#" className="text-white text-decoration-none small fw-bold">Explore &rarr;</a>
                    </div>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="category-card" style={{ height: '238px' }}>
                    <div className="bg-overlay"></div>
                    <img 
                      src="http://localhost:5000/uploads/chair.png" 
                      className="w-100 h-100 object-fit-cover position-absolute" 
                      alt="Office"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Placeholder+Image'; }}
                    />
                    <div className="category-content" style={{ bottom: '20px', left: '30px' }}>
                      <h3 className="fw-bold mb-1">Home Office</h3>
                      <a href="#" className="text-white text-decoration-none small fw-bold">Explore &rarr;</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white border-bottom">
        <Container className="py-5">
          <Row className="g-4 text-center">
            {[
              { title: 'Fast Shipping', text: 'Premium delivery to your doorstep within 3-5 business days.', icon: <path d="M5 12h14M12 5l7 7-7 7"/> },
              { title: '5 Year Warranty', text: 'We stand behind our craftsmanship with a long-term guarantee.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
              { title: 'Expert Support', text: 'Our design consultants are available 24/7 for your needs.', icon: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></> }
            ].map((f, i) => (
              <Col md={4} key={i}>
                <div className="p-4">
                  <div className="mb-4 text-accent" style={{ color: '#B5935E' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </div>
                  <h5 className="fw-bold mb-3">{f.title}</h5>
                  <p className="text-muted mb-0">{f.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <FeaturedProducts />

      {/* Brand Mission Section */}
      <section className="py-5" style={{ background: '#F8F9FA' }}>
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h5 className="text-uppercase mb-4" style={{ color: '#B5935E', letterSpacing: '2px' }}>Our Mission</h5>
              <h2 className="display-4 fw-bold mb-4" style={{ letterSpacing: '-1px' }}>Sustainable. Minimal. Eternal.</h2>
              <p className="lead text-muted mb-0" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                We believe that furniture should be more than just functional objects. They are the backdrop to your life's most meaningful moments. That's why we use only sustainably sourced materials and ethical craftsmanship.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Home;
