'use client'
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Organization {
    id: number;
    name: string;
    location: string;
    needs: string;
    hours: string;
}

const organizations: Organization[] = [
    { id: 1, name: 'Helping Hands', location: 'New York', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 2, name: 'Green Earth', location: 'San Francisco', needs: 'Park cleaning', hours: '10:00 - 16:00' },
    { id: 3, name: 'Food Bank', location: 'Chicago', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 4, name: 'Homeless Shelter', location: 'Los Angeles', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 5, name: 'Community Center', location: 'New York', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 6, name: 'Helping Hands', location: 'San Francisco', needs: 'Park cleaning', hours: '10:00 - 16:00' },
    { id: 7, name: 'Green Earth', location: 'Chicago', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 8, name: 'Food Bank', location: 'Los Angeles', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 9, name: 'Homeless Shelter', location: 'New York', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 10, name: 'Community Center', location: 'San Francisco', needs: 'Park cleaning', hours: '10:00 - 16:00' },
    { id: 11, name: 'Helping Hands', location: 'Chicago', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 12, name: 'Green Earth', location: 'Los Angeles', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 13, name: 'Food Bank', location: 'New York', needs: 'Food packing', hours: '09:00 - 15:00' },
    { id: 14, name: 'Homeless Shelter', location: 'San Francisco', needs: 'Park cleaning', hours: '10:00 - 16:00' },
    { id: 15, name: 'Community Center', location: 'Chicago', needs: 'Food packing', hours: '09:00 - 15:00' },
];

export default function VolunteerPage() {
    const [open, setOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

    const handleClickOpen = (organization: Organization) => {
        setSelectedOrganization(organization);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleVolunteer = () => {
        console.log(`User volunteered for organization: ${selectedOrganization?.name}`);
        handleClose();
    };

    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>
                Volunteer
            </Typography>
            <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
                {organizations.map((organization) => (
                    <Grid item key={organization.id} xs={12} sm={6} md={4} lg={3} xl={2} m={1}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 345, m: 'auto' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {organization.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {organization.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Needs: {organization.needs}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hours: {organization.hours}
                                </Typography>
                                <Button variant="contained" onClick={() => handleClickOpen(organization)} sx={{mt: 2}}>
                                    Volunteer
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Volunteer Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to volunteer for {selectedOrganization?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleVolunteer} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
