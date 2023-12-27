import React from 'react';
import { Modal, Box, Typography, TextField, Button, Fade } from '@mui/material';

interface CreateActivityComponentProps {
  open: boolean;
  handleClose: () => void;
}

const CreateActivityComponent: React.FC<CreateActivityComponentProps> = ({ open, handleClose }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // log form
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log('form', formValues);
    
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
          <Typography variant="h6">CreateActivityComponentProps</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" name='email' fullWidth margin="normal" required />
            <TextField label="Password" name='password' type="password" fullWidth margin="normal" required />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>CreateActivityComponentProps</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateActivityComponent;
