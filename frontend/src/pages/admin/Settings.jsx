import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Settings = () => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <h3 className="fw-bold mb-4">Site Settings</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Site Name</Form.Label>
          <Form.Control type="text" defaultValue="Heet Project" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="email" defaultValue="admin@heetproject.com" />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Check type="checkbox" label="Enable Maintenance Mode" />
        </Form.Group>
        <Button variant="dark">Save Settings</Button>
      </Form>
    </div>
  );
};
export default Settings;
