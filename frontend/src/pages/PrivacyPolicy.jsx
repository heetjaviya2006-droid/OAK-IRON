import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px', maxWidth: '800px' }}>
      <h2 className="fw-bold mb-4 mt-5">Privacy Policy</h2>
      <p className="text-muted">Last updated: April 2026</p>
      
      <h5 className="mt-4 fw-bold">1. Information We Collect</h5>
      <p>We collect information that you manually provide us such as your name, email address, shipping address, and payment information when you make a purchase.</p>
      
      <h5 className="mt-4 fw-bold">2. How We Use Your Information</h5>
      <p>We use the information we collect to fulfill orders, communicate with you regarding your purchases, and improve our services.</p>
      
      <h5 className="mt-4 fw-bold">3. Data Security</h5>
      <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks.</p>
    </Container>
  );
};
export default PrivacyPolicy;
