import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UserList = () => {
  return (
    <div>
      <h3 className="fw-bold mb-4">Users</h3>
      <Table striped bordered hover responsive className="table-sm bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="text-center py-4">No users found.</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default UserList;
