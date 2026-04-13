import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <Container className="py-5" style={{ minHeight: '80vh', paddingTop: '100px', maxWidth: '600px' }}>
      <h2 className="mb-4 mt-5">User Profile</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={user.name} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" defaultValue={user.email} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password to change" />
        </Form.Group>
        <Button variant="dark" onClick={() => setMessage('Profile updated successfully (Mock)')}>
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};
export default Profile;
