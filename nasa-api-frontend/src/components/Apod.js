import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    TextField,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Apod = () => {
    const [apodData, setApodData] = useState(null);
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchApodData = async (date) => {
        setError('');
        const today = new Date().toISOString().split('T')[0];

        // Preventing fetching data for future dates
        if (date > today) {
            setError('Please select a date that is today or in the past.');
            return;
        }

        try {
            const response = await axios.get(`https://nasa-api-project-y6kj.vercel.app/apod?date=${date}`);
            setApodData(response.data);
        } catch (err) {
            setError('Error fetching APOD data.');
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleFetchClick = () => {
        fetchApodData(date);
    };

    const handleMarsPhotosClick = () => {
        navigate('/mars-photos');
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        fetchApodData(today); // Fetching current date APOD on component mount
    }, []);

    const today = new Date().toISOString().split('T')[0];

    return (
        <Container sx={{ textAlign: 'center', padding: '40px' }}>
            <Typography variant="h3" gutterBottom>Astronomy Picture of the Day</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    inputProps={{ max: today }} // Disabling the future dates
                    sx={{ marginRight: '25px', width: '200px' }}
                />
                <motion.div
                    whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button variant="contained" color="primary" onClick={handleFetchClick} sx={{ width: '250px' }}>
                        Fetch for Selected Date
                    </Button>
                </motion.div>
            </div>

            {error && (
                <Snackbar
                    open={Boolean(error)}
                    autoHideDuration={6000}
                    message={error}
                    onClose={() => setError('')}
                />
            )}

            {apodData && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card sx={{ marginTop: '20px', padding: '20px' }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={apodData.url}
                            alt={apodData.title}
                        />
                        <CardContent>
                            <Typography variant="h5">{apodData.title}</Typography>
                            <Typography variant="subtitle1">{apodData.date}</Typography>
                            <Typography variant="body2">{apodData.explanation}</Typography>
                            {apodData.hdurl && (
                                <Button
                                    variant="outlined"
                                    href={apodData.hdurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ marginTop: '10px' }}
                                >
                                    View HD Image
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                    <motion.div
                        whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleMarsPhotosClick}
                            sx={{ marginTop: '20px' }}
                        >
                            View Mars Rover Photos
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </Container>
    );
};

export default Apod;
