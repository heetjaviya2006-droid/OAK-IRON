import React from 'react';
import { Table, Button } from 'react-bootstrap';

const OrderList = () => {
  return (
    <div>
      <h3 className="fw-bold mb-4">Orders</h3>
      <Table striped bordered hover responsive className="table-sm bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="7" className="text-center py-4">No orders found.</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default OrderList;
