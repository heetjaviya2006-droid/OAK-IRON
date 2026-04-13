import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQ = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px', maxWidth: '800px' }}>
      <h2 className="text-center fw-bold mb-5 mt-5">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0" className="shadow-sm">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How long does shipping take?</Accordion.Header>
          <Accordion.Body>
            Standard shipping typically takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What is your return policy?</Accordion.Header>
          <Accordion.Body>
            We offer a 30-day return policy for all unused items in their original packaging. Please contact support to initiate a return.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Do you ship internationally?</Accordion.Header>
          <Accordion.Body>
            Currently, we ship to the US, Canada, and select European countries. We are working on expanding our global reach soon.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
export default FAQ;
