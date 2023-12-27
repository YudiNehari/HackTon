'use client'

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Paper
} from '@mui/material';
import BusinessRegistrationForm from '@/components/forms/bussinessForm';

// Define a TypeScript interface for volunteer applications
interface VolunteerApplication {
  id: number;
  name: string;
  dateApplied: string;
}

// Fake JSON response with volunteer applications
const volunteerApplications: VolunteerApplication[] = [
  // Add your fake volunteer application data here
  { id: 1, name: 'Jane Doe', dateApplied: '2023-01-01' },
  { id: 2, name: 'John Smith', dateApplied: '2023-01-02' },
  // ... more applications
];

export default function OrganizationPage() {
  const [formState, setFormState] = useState({
    volunteerNeed: '',
    details: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement submission logic here
    console.log(formState);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Organization Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Volunteer Applications
          </Typography>
          {volunteerApplications.map(application => (
            <Card key={application.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{application.name}</Typography>
                <Typography color="text.secondary">
                  Applied on: {application.dateApplied}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Request a Volunteer
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <BusinessRegistrationForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
