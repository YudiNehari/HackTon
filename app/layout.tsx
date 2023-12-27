'use client'
import React, { useState, ReactNode } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';
import SignInComponent from '@/components/sign-in';
import RegisterComponent from '@/components/register';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

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

          <RegisterComponent open={openRegister} handleClose={handleCloseRegister} />
          <SignInComponent open={openSignIn} handleClose={handleCloseSignIn} />
        </Box>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
