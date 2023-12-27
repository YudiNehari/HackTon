import React from 'react';
import { Modal, Box, Typography, TextField, Button, Fade } from '@mui/material';

interface BussinessFormComponentProps {
  open: boolean;
  handleClose: () => void;
}

const BussinessFormComponent: React.FC<BussinessFormComponentProps> = ({ open, handleClose }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log('form', formValues);
    

    

    console.log('BussinessFormComponent');
    
    handleClose();
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
          <Typography variant="h6">BussinessFormComponentProps</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" name='email' fullWidth margin="normal" required />
            <TextField label="Password" name='password' type="password" fullWidth margin="normal" required />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>BussinessFormComponentProps</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BussinessFormComponent;
