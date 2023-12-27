'use client'
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, InputLabel, Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';


interface Activity {
    activity_id: number;
    city: string;
    start_date: string;
    end_date: string;
    is_physical: boolean;
    type_volunteer: string;
}

// Mock API call
const fetchActivities = async () => {
    return new Promise<Activity[]>(resolve => {
        setTimeout(() => {
            resolve([
                { activity_id: 1, city: 'New York', start_date: '2023-01-10', end_date: '2023-01-15', is_physical: true, type_volunteer: 'Food packing' },
                { activity_id: 2, city: 'New York', start_date: '2023-01-10', end_date: '2023-01-15', is_physical: true, type_volunteer: 'Food packing' },
                { activity_id: 3, city: 'New York', start_date: '2023-01-10', end_date: '2023-01-15', is_physical: true, type_volunteer: 'Food packing' },
                { activity_id: 4, city: 'New York', start_date: '2023-01-10', end_date: '2023-01-15', is_physical: true, type_volunteer: 'Food packing' },
                { activity_id: 5, city: 'New York', start_date: '2023-01-10', end_date: '2023-01-15', is_physical: true, type_volunteer: 'Food packing' },
                { activity_id: 6, city: 'New York', start_date: '2023-01-10', end_date: '2023-01-15', is_physical: true, type_volunteer: 'Food packing' },
            ]);
        }, 1000);
    });
};


export default function VolunteerPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        fetchActivities().then(setActivities).catch(console.error);
    }, []);

    useEffect(() => {
        sortActivities();
    }, [sortCriteria]);

    const handleClickOpen = (activity: Activity) => {
        setSelectedActivity(activity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleVolunteer = () => {
        console.log(`User volunteered for activity: ${selectedActivity?.activity_id}`);
        // send volunteer request to API
        axios.post('/api/volunteer', { activity_id: selectedActivity?.activity_id })
        handleClose();
    };

    const sortActivities = () => {
        setActivities(prevActivities => {
            return [...prevActivities].sort((a, b) => {
                switch (sortCriteria) {
                    case 'city':
                        return a.city.localeCompare(b.city);
                    case 'is_physical':
                        return Number(a.is_physical) - Number(b.is_physical);
                    case 'type_volunteer':
                        return a.type_volunteer.localeCompare(b.type_volunteer);
                    case 'date':
                        // @ts-ignore
                        return new Date(a.start_date) - new Date(b.start_date);
                    default:
                        return 0;
                }
            });
        });
    };

    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>
                Volunteer
            </Typography>
            <FormControl sx={{ width: '50%' }} style={{margin: 'auto'}}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortCriteria}
                    label="Sort By"
                    onChange={(e) => setSortCriteria(e.target.value)}
                >
                    <MenuItem value="city">City</MenuItem>
                    <MenuItem value="is_physical">Physical Activity</MenuItem>
                    <MenuItem value="type_volunteer">Type of Volunteer Work</MenuItem>
                    <MenuItem value="date">Start Date</MenuItem>
                </Select>
            </FormControl>
            <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
                {activities.map((activity) => (
                    <Grid item key={activity.activity_id} xs={12} sm={6} md={4} lg={3} xl={2} m={1}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 345, m: 'auto' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Activity #{activity.activity_id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    City: {activity.city}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Start Date: {activity.start_date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    End Date: {activity.end_date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {activity.type_volunteer}
                                </Typography>
                                <Button variant="contained" onClick={() => handleClickOpen(activity)} sx={{ mt: 2 }}>
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
                        Are you sure you want to volunteer for Activity #{selectedActivity?.activity_id}?
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
