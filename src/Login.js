import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import '../src/LoginForm.css';
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://billing-software-backend-api.onrender.com/rootadmin');
      console.log(response);
      const users = await response.json();
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate('/landingpage');
        toast.success('Login successful!');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <Container fluid className="login-container">
      <ToastContainer />
      <Box className="login-box">
        <Box className="login-form">
          <Typography variant="h4" component="h1" gutterBottom>
            Hello!
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Sign in to your account
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
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box className="form-footer">
              <div>
                <strong>Forgot password is temporarily disabled</strong>
              </div>
              <Box component={Link} to="/otplogin" className="login-otp">
                Login Using OTP?
              </Box>
            </Box>
            <Button type="submit" variant="primary" className="login-button">
              SIGN IN
            </Button>
          </form>
          <Box className="create-account">
            Don't have an account? <a href="/register">Create</a>
          </Box>
        </Box>
        <Box className="login-welcome">
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

export default LoginForm;