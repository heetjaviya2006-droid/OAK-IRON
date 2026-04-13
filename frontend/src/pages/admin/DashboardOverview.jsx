import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const DashboardOverview = () => {
  return (
    <div>
      <h3 className="mb-4 fw-bold">Dashboard Overview</h3>
      <Row>
        <Col md={3}>
          <Card className="text-center shadow-sm mb-4 border-0">
            <Card.Body>
              <Card.Title className="text-muted">Total Sales</Card.Title>
              <h3 className="fw-bold">$12,450</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm mb-4 border-0">
            <Card.Body>
              <Card.Title className="text-muted">Total Orders</Card.Title>
              <h3 className="fw-bold">142</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm mb-4 border-0">
            <Card.Body>
              <Card.Title className="text-muted">Total Products</Card.Title>
              <h3 className="fw-bold">56</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm mb-4 border-0">
            <Card.Body>
              <Card.Title className="text-muted">Total Users</Card.Title>
              <h3 className="fw-bold">89</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="p-5 text-center text-muted bg-light rounded mt-4">
        [Sales Chart Placeholder]
      </div>
    </div>
  );
};
export default DashboardOverview;
