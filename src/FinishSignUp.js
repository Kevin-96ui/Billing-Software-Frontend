// src/FinishSignUp.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { Typography, Container, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FinishSignUp = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignIn = async () => {
      const url = window.location.href;
      const email = window.localStorage.getItem('emailForSignIn');

      if (!email || !isSignInWithEmailLink(auth, url)) {
        toast.error('Invalid or expired sign-in link.');
        navigate('/');
        return;
      }

      try {
        await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        toast.success('Sign-in successful!');
        navigate('/landingpage'); 
      } catch (error) {
        console.error('Error during sign-in:', error);
        toast.error('Sign-in failed. Please try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    handleSignIn();
  }, [navigate]);

  return (
    <Container>
      <ToastContainer />
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">Processing...</Typography>
      </Box>
    </Container>
  );
};

export default FinishSignUp;
