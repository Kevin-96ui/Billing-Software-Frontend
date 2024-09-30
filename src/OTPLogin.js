import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../src/firebase.js'; 
import { sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';

const OTPLogin = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/finishSignUp', 
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save the email locally to complete sign-in when user returns
      window.localStorage.setItem('emailForSignIn', email);
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('An error occurred while sending OTP. Please try again later.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        throw new Error('No email found in local storage');
      }

      const result = await signInWithEmailLink(auth, email, window.location.href);
      if (result.user) {
        toast.success('OTP verified! Logging in...');
        navigate('/landingpage');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred while verifying OTP. Please try again later.');
    }
  };

  return (
    <Container fluid className="login-container">
      <ToastContainer />
      <Box className="login-box">
        <Box className="login-form">
          <Typography variant="h4" component="h1" gutterBottom>
            Hello from OTP login
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Sign in to your account
          </Typography>
          {!otpSent ? (
            <>
              <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="primary" onClick={handleSendOtp} className="login-button">
                Send OTP
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button type="submit" variant="primary" className="login-button">
                Verify OTP and Sign In
              </Button>
            </form>
          )}
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

export default OTPLogin;
