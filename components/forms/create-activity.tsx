import React from 'react';
import { Modal, Box, Typography, TextField, Button, Fade, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

interface CreateActivityComponentProps {
  open: boolean;
  handleClose: () => void;
  businessId: number; // Assuming you have a way to get the business ID from the parent component
}

const CreateActivityComponent: React.FC<CreateActivityComponentProps> = ({ open, handleClose, businessId }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // log form
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      // Assuming your add_activity endpoint is '/api/add_activity', adjust it accordingly
      const response = await axios.post('/api/add_activity', {
        ...formValues,
        business_id: businessId,
      });

      // Assuming the response has a 'success' property
      const { success } = response.data;

      if (success) {
        console.log('Activity creation successful.');
        // Optionally, you can perform actions based on the successful activity creation
        // For example, redirect the user to a new page or show a success message
      } else {
        console.error('Activity creation failed.');
        // Optionally, handle the case where the activity creation was not successful
      }

      // Close the modal or perform other actions
      handleClose();
    } catch (error) {
      console.error('Error creating activity:');
      // Handle the error, show an error message, etc.
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
          <Typography variant="h6">Create Activity</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Date" name="date" fullWidth margin="normal" required type="date" />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Type of Volunteer</InputLabel>
              <Select label="Type of Volunteer" name="type_volunteer">
                <MenuItem value="select">Select</MenuItem>
                {/* Add other options based on your requirements */}
              </Select>
            </FormControl>
            <TextField label="Number of Volunteers" name="NumberOfVolunteers" fullWidth margin="normal" required type="number" />
            <TextField label="Activity Description" name="ActivityDescription" fullWidth multiline rows={4} margin="normal" required />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>
              Create Activity
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateActivityComponent;
