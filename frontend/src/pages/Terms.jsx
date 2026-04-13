import React from 'react';
import { Container } from 'react-bootstrap';

const Terms = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px', maxWidth: '800px' }}>
      <h2 className="fw-bold mb-4 mt-5">Terms & Conditions</h2>
      <p className="text-muted">Last updated: April 2026</p>
      
      <h5 className="mt-4 fw-bold">1. Agreement to Terms</h5>
      <p>By accessing this website, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws.</p>
      
      <h5 className="mt-4 fw-bold">2. Use License</h5>
      <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
      
      <h5 className="mt-4 fw-bold">3. Disclaimer</h5>
      <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.</p>
    </Container>
  );
};
export default Terms;
