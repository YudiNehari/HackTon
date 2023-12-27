import React from 'react';
import { Modal, Box, Typography, TextField, Button, Fade } from '@mui/material';
import axios from 'axios';

interface BussinessFormComponentProps {
  open: boolean;
  handleClose: () => void;
  userId: number; // Assuming you have a way to get the user ID from the parent component
}

const BussinessFormComponent: React.FC<BussinessFormComponentProps> = ({ open, handleClose, userId }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      // Assuming your register_business endpoint is '/api/register_business', adjust it accordingly
      const response = await axios.post('/api/register_business', {
        ...formValues,
        user_id: userId,
      });

      // Assuming the response has a 'business_id' property
      const { business_id } = response.data;

      console.log('Business registration successful. Business ID:', business_id);

      // Optionally, you can perform actions based on the successful business registration
      // For example, redirect the user to a new page or show a success message

      handleClose();
    } catch (error) {
      console.error('Business registration failed:');
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
          <Typography variant="h6">Register Business</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Business Name" name="business_name" fullWidth margin="normal" required />
            <TextField label="City" name="city" fullWidth margin="normal" required />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>
              Register Business
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BussinessFormComponent;
