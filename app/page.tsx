'use client'
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';

// CountUp component as defined previously

export default function Home() {
  const stats = [
    { title: 'Volunteers', value: 120, imageUrl: 'assets/val.png' },
    { title: 'Businesses Helped', value: 75, imageUrl: 'assets/bus.png' },
    { title: 'Donors', value: 20, imageUrl: 'assets/don.png' },
    { title: 'Money Donated', value: 15000, isCurrency: true, imageUrl: 'assets/mon.png' },
    // Add more stats and images here
  ];

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundImage: 'url(assets/bg.png)',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 4,
    }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <CardMedia
                component="img"
                height="300"
                image={stat.imageUrl}
                alt={stat.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="div" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
                  {stat.isCurrency ? '$' : ''}
                  <CountUp start={0} end={stat.value} duration={2000} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


interface CountUpProps {
  start: number;
  end: number;
  duration: number;
}

const CountUp: React.FC<CountUpProps> = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let frame: number;
    const countUp = (timestamp: number) => {
      const progress = timestamp / duration;
      setCount(start + Math.min(end * progress, end));
      if (progress < 1) {
        frame = requestAnimationFrame(countUp);
      }
    };
    frame = requestAnimationFrame(countUp);
    return () => cancelAnimationFrame(frame);
  }, [start, end, duration]);

  return <>{Math.round(count)}</>;
};