import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Container sx={{ textAlign: 'center', padding: '40px' }}>
            <Typography variant="h4">404 - Page Not Found</Typography>
        </Container>
    );
};

export default NotFound;
