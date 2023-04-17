import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Box,Container} from '@mui/material';


export default function Spinner() {
    return (
        <Container sx={{height: '100vh',width: '100vw', display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Container>

    );
}
