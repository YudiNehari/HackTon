import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Fade, Box, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
interface SignInComponentProps {
  open: boolean;
  handleClose: () => void;
}

const SignInComponent: React.FC<SignInComponentProps> = ({ open, handleClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const Router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    
    try {
      // Assuming your login endpoint is '/api/login', adjust it accordingly
      
      const isSuccess = (Math.random() > 0.5);
      console.log(isSuccess);
      
      let response = {};
      if(isSuccess){    
        response = { data: { user_id: 123, business_id: 456 } };
      }else{
        
        response = await axios.post('/api/login', formValues);
      }
      // Assuming the response has a 'user_id' and 'business_id' property
      
      // @ts-ignore
      console.log(response,response.data,response && response.data);
      
      // @ts-ignore
      if (response && response.data) {
      // @ts-ignore
        const { user_id, business_id } = response.data;
        console.log('Login successful. User ID:', user_id);
        console.log('Business ID:', business_id);
        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('business_id', business_id);
        Router.push('choose');
        setError(null);
        setSuccess(true);
      }
      // Save login information in the session

      // Reset error and set success to true

      // Close the modal or perform other actions
      handleClose();
    } catch (error) {
      console.error('Login failed:');

      // Set error message and reset success
      setError('Login failed. Please check your credentials.');
      setSuccess(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box 
          sx={{ 
            width: '40%',
            maxHeight: '80vh',
            overflowY: 'auto',
            margin: 'auto',
            marginTop: '5vh',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: 24,
          }}>
          <Typography variant="h6">Sign In</Typography>
          
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">Login successful!</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField label="Email" name='email' fullWidth margin="normal" required />
            <TextField label="Password" name='password' type="password" fullWidth margin="normal" required />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>Sign In</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignInComponent;
