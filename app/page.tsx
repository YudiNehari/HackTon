'use client'
import { Box} from '@mui/material';

export default function Home() {

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundImage: 'url(assets/bg.png)',
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
        </Box>
    );
}
