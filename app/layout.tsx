'use client'
import './globals.css'
import React, { useState, useEffect, ReactNode } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';
import SignInComponent from '@/components/forms/sign-in';
import RegisterComponent from '@/components/forms/register';
import { useRouter } from 'next/navigation';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const Router = useRouter();
  const [openRegister, setOpenRegister] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a user in the session storage
    let userId = null;
    if (sessionStorage.getItem('user_id') === null) {
       userId = sessionStorage.getItem('user_id');
    }
    setUserLoggedIn(!!userId);
  }, []);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleSignOut = () => {
    // Clear user session
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('business_id');
    Router.push('/');
    setUserLoggedIn(false);
  };

  let isUserLoggedIn = null;
  if (sessionStorage.getItem('user_id')) {
   isUserLoggedIn = sessionStorage.getItem('user_id') !== null;
  }

  return (
    <html lang="en">
      <body>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit">
                <Link href="/">Home</Link>
              </Button>
              {!isUserLoggedIn && (
                <>
                  <Button color="inherit" onClick={handleOpenRegister}>Register</Button>
                  <Button color="inherit" onClick={handleOpenSignIn}>Sign In</Button>
                </>
              )}
              {isUserLoggedIn && (
                <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
              )}
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
