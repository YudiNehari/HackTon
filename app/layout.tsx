'use client'
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Button, Box, Modal, TextField, Typography, Fade, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Link from 'next/link';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser]:any = useState(null);

  const router = useRouter();

  const [openRegister, setOpenRegister] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [userType, setUserType] = useState('volunteer');

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpenRegister(false);
    setOpenSignIn(false);
    setUser(Object.fromEntries(data.entries()));
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(Object.fromEntries(data.entries())));    
  };

  const Reg = () => (
    <>
    <TextField label="Name" name='name' fullWidth margin="normal" required />
    <TextField label="Email" name='email' fullWidth margin="normal" required />
    <TextField label="Password" name='password' type="password" fullWidth margin="normal" required />
    <TextField label="Age" name='age' type="number" fullWidth margin="normal" required />
    </>
  )

  const renderUserTypeFields = () => {
    switch (userType) {
      case 'volunteer':
        return (
          <>
            <Reg />
            <TextField label="Preferred Volunteer Work" name='volunteerWork' fullWidth margin="normal" required />
            {/* Additional fields specific to volunteers */}
          </>
        );
      case 'donor':
        return (
          <>
            <Reg />
            <TextField label="Donation Type" name='donationType' fullWidth margin="normal" required />
            {/* Additional fields specific to donors */}
          </>
        );
      case 'organization':
        return (
          <>
            <TextField label="Organization Name" name='organizationName' fullWidth margin="normal" required />
            <TextField label="Organization Type" name='organizationType' fullWidth margin="normal" required />
            <TextField label="Organization Address" name='organizationAddress' fullWidth margin="normal" required />
            <TextField label="Organization Phone Number" name='organizationPhoneNumber' fullWidth margin="normal" required />
            <TextField label="Organization Email" name='organizationEmail' fullWidth margin="normal" required />
            <TextField label="Organization Website" name='organizationWebsite' fullWidth margin="normal" required />
            <TextField label="Organization Description" name='organizationDescription' fullWidth margin="normal" required />
            <TextField label="Organization Name" name='organizationName' fullWidth margin="normal" required />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <html lang="en">
      <body>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit">
                <Link href="/">Home</Link>
              </Button>
              <Button color="inherit" onClick={handleOpenRegister}>Register</Button>
              <Button color="inherit" onClick={handleOpenSignIn}>Sign In</Button>
            </Toolbar>
          </AppBar>

          <Modal open={openRegister} onClose={handleCloseRegister} closeAfterTransition>
            <Fade in={openRegister}>
              <Box sx={{
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
                  <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Register as</FormLabel>
                    <RadioGroup row value={userType} onChange={handleUserTypeChange}>
                      <FormControlLabel value="volunteer" control={<Radio />} label="Volunteer" />
                      <FormControlLabel value="donor" control={<Radio />} label="Donor" />
                      <FormControlLabel value="organization" control={<Radio />} label="Organization" />
                    </RadioGroup>
                  </FormControl>
                  {renderUserTypeFields()}
                  <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>Register</Button>
                </form>
              </Box>
            </Fade>
          </Modal>

          <Modal open={openSignIn} onClose={handleCloseSignIn} closeAfterTransition>
            <Fade in={openSignIn}>
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
                <Typography variant="h6">Sign In</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField label="Email" name='email' fullWidth margin="normal" required />
                  <TextField label="Password" name='password' type="password" fullWidth margin="normal" required />
                  <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>Sign In</Button>
                </form>
              </Box>
            </Fade>
          </Modal>
        </Box>
          {children}
      </body>
    </html>
  );
}