'use client'

// First, import necessary components from Material UI
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Modal, Box, TextField, Grid } from '@mui/material';

// Define a TypeScript interface for volunteer data
interface Volunteer {
    id: number;
    name: string;
    age: number;
    location: string;
    volunteerWork: string;  // Field for where they volunteered
    avatar: string;
}

// Fake JSON response
const volunteers: Volunteer[] = [
    // Add your fake 20 volunteer data here
    { id: 11, name: 'Alice Johnson', age: 28, location: 'Chicago', volunteerWork: 'Community Center', avatar: 'assets/bg.png' },
    { id: 12, name: 'Bob Williams', age: 32, location: 'San Francisco', volunteerWork: 'Food Bank', avatar: 'path/to/avatar12.jpg' },
    { id: 13, name: 'Charlie Brown', age: 36, location: 'New York', volunteerWork: 'Homeless Shelter', avatar: 'path/to/avatar13.jpg' },
    { id: 14, name: 'David Miller', age: 40, location: 'Los Angeles', volunteerWork: 'Food Bank', avatar: 'path/to/avatar14.jpg' },
    { id: 15, name: 'Eve Wilson', age: 44, location: 'Chicago', volunteerWork: 'Community Center', avatar: 'path/to/avatar15.jpg' },
    { id: 16, name: 'Frank Thomas', age: 48, location: 'San Francisco', volunteerWork: 'Food Bank', avatar: 'path/to/avatar16.jpg' },
    { id: 17, name: 'Grace Davis', age: 52, location: 'New York', volunteerWork: 'Homeless Shelter', avatar: 'path/to/avatar17.jpg' },
    { id: 18, name: 'Helen Garcia', age: 56, location: 'Los Angeles', volunteerWork: 'Food Bank', avatar: 'path/to/avatar18.jpg' },
    { id: 19, name: 'Ivy Hernandez', age: 60, location: 'Chicago', volunteerWork: 'Community Center', avatar: 'path/to/avatar19.jpg' },
    { id: 20, name: 'Jack Martinez', age: 64, location: 'San Francisco', volunteerWork: 'Food Bank', avatar: 'path/to/avatar20.jpg' },


];

export default function DonerPage() {
    // check if user is logged in in local storage
    // if not, redirect to login page
    const user = localStorage.getItem('user');
    if (!user) {
        console.log('no user');
        // router.push('/login');
    }
    console.log('user' ,user);
    
    const [open, setOpen] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

    const handleOpen = (volunteer: Volunteer) => {
        setSelectedVolunteer(volunteer);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>
                Doner Page
            </Typography>
            <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
                {volunteers.map((volunteer) => (
                    <Grid item key={volunteer.id} xs={12} sm={6} md={4} lg={3} xl={2} m={1}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 345, m: 'auto' }}>
                            <CardMedia
                                component="img"
                                image="assets/bg.png"
                                alt={volunteer.name}
                                sx={{ height: 140 }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {volunteer.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Age: {volunteer.age}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {volunteer.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Volunteered at: {volunteer.volunteerWork}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2 }}>
                                <Button size="small" fullWidth variant="contained" onClick={() => handleOpen(volunteer)}>
                                    Donate
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="donate-modal-title"
                aria-describedby="donate-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="donate-modal-title" variant="h6" component="h2">
                        Donate to {selectedVolunteer?.name}
                    </Typography>
                    <Typography id="donate-modal-description" sx={{ mt: 2 }}>
                        Location: {selectedVolunteer?.location}
                    </Typography>
                    <Typography id="donate-modal-description" sx={{ mt: 2 }}>
                        Volunteered at: {selectedVolunteer?.volunteerWork}
                    </Typography>
                    <TextField label="Your Name" fullWidth margin="normal" />
                    <TextField label="Donation Amount" fullWidth margin="normal" />
                    <Button variant="contained" sx={{ mt: 2 }}>Submit Donation</Button>
                </Box>
            </Modal>
        </div>
    );
}
