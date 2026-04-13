import React from 'react';
import { Container, Table } from 'react-bootstrap';

const OrderHistory = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <h2 className="mb-4 mt-5">My Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="text-center py-4">You have no orders yet.</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
export default OrderHistory;
