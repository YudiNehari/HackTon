'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { AppBar, Toolbar, Button, Box, Modal, TextField, Typography, Fade } from '@mui/material';
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [openRegister, setOpenRegister] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  // Dummy submit handler
  const handleSubmit = (event: any) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
          email: data.get('email'),
          password: data.get('password'),
      });
      setOpenSignIn(false);
      
      const response = fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: data.get('email'),
              password: data.get('password'),
          }),
      });
      
      // volunteer, donor, organization
      router.push('/volunteer');
      
  };

  return (
    <html lang="en">
      <body className={inter.className}>
      <Box sx={{
            flexGrow: 1,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                      <Link href="/">Home</Link>
                    </Button>
                    <Button color="inherit" onClick={handleOpenRegister}>Register</Button>
                    <Button color="inherit" onClick={handleOpenSignIn}>Sign In</Button>
                    <Button color="inherit">
                      <Link href="/volunteer">volunteer</Link>
                    </Button>
                    <Button color="inherit">
                      <Link href="/donor">donor</Link>
                    </Button>
                    <Button color="inherit">
                      <Link href="/organization">organization</Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Modal
              open={openRegister}
              onClose={handleCloseRegister}
              closeAfterTransition
              BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openRegister}>
                    <Box sx={{
                        width: '40%',
                        margin: 'auto',
                        marginTop: '10vh',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: 24,
                    }}>
                        <Typography variant="h6">Register</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField label="Email" name='email' fullWidth margin="normal" required />
                            <TextField label="Password" name='password' type="password" fullWidth margin="normal" required />
                            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }}>Register</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

            <Modal
              open={openSignIn}
              onClose={handleCloseSignIn}
              closeAfterTransition
              BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openSignIn}>
                    <Box sx={{
                        width: '40%',
                        margin: 'auto',
                        marginTop: '10vh',
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
  )
}
