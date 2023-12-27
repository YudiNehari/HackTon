'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { styled, keyframes } from '@mui/system';
// @ts-ignore
import Wave from 'react-wavify'
import Link from 'next/link';
import AudioRecorder from '@/components/audio';
// Animation for the wave effect
const wave = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

// Styled Icon component with animation logic
const StyledIcon:any = styled(MicIcon)(({ theme, animate }: {theme: any, animate: any}) => ({
  cursor: 'pointer',
  animation: animate ? `${wave} 1.5s ease-in-out` : 'none',
  backgroundColor: '#eee',
}));

export default function Home() {
  const stats = [
    { title: 'Volunteers', value: 120, imageUrl: 'assets/val.png', url: 'volunteer' },
    { title: 'Businesses Helped', value: 75, imageUrl: 'assets/bus.png', url: 'organization' },
    { title: 'Donors', value: 20, imageUrl: 'assets/don.png', url: 'donor' },
    { title: 'Money Donated', value: 15000, isCurrency: true, imageUrl: 'assets/mon.png', url: '' },
    // Add more stats and images here
  ];

  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1500); // duration of animation
  };

  useEffect(() => {

  }, [animate]); 

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


      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 20,
      }}>
                  <AudioRecorder />

      </Box>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link href={stat.url}>
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
            </Link>
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



const SineWaveCanvas = ({ animate }: {animate: any}) => {
  const canvasRef:any = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let frame = 0;

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < 4; i++) {
        const amplitude = 20;
        const wavelength = 200;
        const offsetX = frame * 0.1;
        const offsetY = height / 2 + (i * 50) - 75;
        const strokeColor = `hsl(${50 * i}, 100%, 50%)`;

        context.beginPath();
        for (let x = 0; x < width; x++) {
          const y = offsetY + amplitude * Math.sin((x + offsetX) / wavelength);
          context.lineTo(x, y);
        }
        context.strokeStyle = strokeColor;
        context.lineWidth = 2;
        context.stroke();
      }

      if (animate) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 10,
        right: 20,
        bottom: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: animate ? 1 : -1,
        width: '100%', // Ensure the canvas fills the parent
        height: '100%' // Ensure the canvas fills the parent
      }}
    />
  );
};

