import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../src/RegisterForm.css'; 
import { ToastContainer, toast } from 'react-toastify';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://billing-software-backend-api.onrender.com/rootadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (response.ok) {
        navigate('/');
        toast.success('Registered Successfully!');
      } else {
        toast.error('Failed to create user, Try again');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create user, Try again');
    }
  };

  return (
    <Container fluid className="register-container">
      <ToastContainer />
      <Box className="register-box">
        <Box className="register-form">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Create a new account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="primary" className="register-button">
              SIGN UP
            </Button>
          </form>
          <Box className="login-link">
            Already have an account? <a href="/">Sign In</a>
          </Box>
        </Box>
        <Box className="register-welcome">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1">
          KMF Billing Software WebApp done using MERN <br /> A product of KMF by Kevin Matthew Franklin
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
