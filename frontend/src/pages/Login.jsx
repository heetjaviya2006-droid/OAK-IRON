import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(`${API_BASE}/api/auth/login`, { email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(data.role === 'admin' ? '/admin' : '/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeaholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Login
        </Button>
      </Form>
      <div className="mt-3 text-center">
        New Customer? <Link to="/register">Register</Link>
      </div>
    </Container>
  );
}

export default Login;
