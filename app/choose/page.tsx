'use client'
import * as React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
    const Router = useRouter();

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <Button variant="contained" size="large" style={{ width: '80%', height: '20vh' }} onClick={() => Router.push('/volunteer')}>
                Volunteer
            </Button>
            <Button variant="contained" color="secondary" size="large" style={{ width: '80%', height: '20vh' }} onClick={() => Router.push('/organization')}>
                Add a Business
            </Button>
            <Button variant="contained" color="success" size="large" style={{ width: '80%', height: '20vh' }} onClick={() => Router.push('/donor')}>
                Donate
            </Button>
        </div>
    );
};

export default HomePage;

