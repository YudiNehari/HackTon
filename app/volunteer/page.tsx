'use client'
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, InputLabel, Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';


interface Activity {
    ActivityID: number;
    City: string;
    Date: string;
    End_date: string;
    Is_physical: boolean;
    TypeVolunteer: string;
    ActivityDescription: string;
}

const fetchActivities = async () => {
    const response = await fetch('http://13.51.64.28/get_activity');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
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
        console.log(`User volunteered for activity: ${selectedActivity?.ActivityID}`);
        // send volunteer request to API
        axios.post('/api/volunteer', { activity_id: selectedActivity?.ActivityID })
        handleClose();
    };

    const sortActivities = () => {
        setActivities(prevActivities => {
            return [...prevActivities].sort((a, b) => {
                switch (sortCriteria) {
                    case 'city':
                        return a.City.localeCompare(b.City);
                    case 'is_physical':
                        return Number(a.Is_physical) - Number(b.Is_physical);
                    case 'type_volunteer':
                        return a.TypeVolunteer.localeCompare(b.TypeVolunteer);
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
            {/*<FormControl sx={{ width: '50%' }} style={{margin: 'auto'}}>
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
            </FormControl>*/}
            <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
                {activities.map((activity) => (
                    <Grid item key={activity.ActivityID} xs={12} sm={6} md={4} lg={3} xl={2} m={1}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 345, m: 'auto' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Activity #{activity.ActivityID}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    City: {activity.City}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date: {activity.Date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {activity.TypeVolunteer}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                   Description: {activity.ActivityDescription}
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
                        Are you sure you want to volunteer for Activity #{selectedActivity?.ActivityID}?
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
