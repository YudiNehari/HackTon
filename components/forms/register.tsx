import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Fade } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface RegisterComponentProps {
  open: boolean;
  handleClose: () => void;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ open, handleClose }) => {
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const Router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // log form
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log('form', formValues);

    try {
      // Assuming your registration endpoint is '/api/register', adjust it accordingly
      const isSuccess = (Math.random() > 0.5);
      console.log(isSuccess);
      
      let response = await axios.post('http://13.51.64.28/register', formValues);
        // @ts-ignore

      if (response && response.data) {
        const { user_id } = response.data;
        console.log('response', response.data);
        
        console.log('Registration successful. User ID:', user_id);
        // @ts-ignore
          sessionStorage.setItem('user_id', user_id);
          Router.push('choose');
          setError(null);
          setSuccess(true);
        }
  
      // Optionally, you can perform actions based on the successful registration
      // For example, redirect the user to a new page or show a success message

      // Close the modal or perform other actions
      handleClose();
    } catch (error) {
      console.error('Registration failed:');
      // Handle registration failure, show an error message, etc.
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
          <Typography variant="h6">Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="First Name" name="first_name" fullWidth margin="normal" required />
            <TextField label="Last Name" name="last_name" fullWidth margin="normal" required />
            <TextField label="Email" name="email" fullWidth margin="normal" required />
            <TextField label="Password" name="password" type="password" fullWidth margin="normal" required />
            <TextField label="Password Again" name="password_again" type="password" fullWidth margin="normal" required />
            <TextField label="Phone Number" name="phone_number" fullWidth margin="normal" required />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>
              Register
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RegisterComponent;
