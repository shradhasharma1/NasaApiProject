import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, TextField, Container, Typography, Grid, Card, CardMedia, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import styled from '@emotion/styled';

const StyledTextField = styled(TextField)`
    .MuiInputLabel-root {
        position: absolute;
        transform: translate(14px, -6px) scale(0.75);
    }
`;

const StyledInputLabel = styled(InputLabel)`
    position: absolute;
    transform: translate(14px, -6px) scale(0.75);
`;

const StyledSelect = styled(Select)`
    & .MuiInputLabel-root {
        position: absolute;
        transform: translate(14px, -6px) scale(0.75);
    }
`;

const GradientText = styled(Typography)`
    background: linear-gradient(90deg,
        #FF0000,  /* Red */
        #FF7F00,  /* Orange */
        #FFFF00,  /* Yellow */
        #00FF00,  /* Green */
        #00FFFF,  /* Cyan */
        #0000FF,  /* Blue */
        #4B0082,  /* Indigo */
        #9400D3   /* Violet */
    );
    background-size: 300%; /* Allowing this for smooth transitions */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    animation: gradient-animation 3s ease infinite; /* Adding animation for a dynamic effect */

    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }
`;

const MarsRoverPhotos = () => {
    const [sol, setSol] = useState(null);
    const [camera, setCamera] = useState('');
    const [earthDate, setEarthDate] = useState('');
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [photoCount, setPhotoCount] = useState(0);

    const cameras = [
        { value: 'fhaz', label: 'Front Hazard Avoidance Camera' },
        { value: 'rhaz', label: 'Rear Hazard Avoidance Camera' },
        { value: 'mast', label: 'Mast Camera' },
        { value: 'chemcam', label: 'Chemistry and Camera Complex' },
        { value: 'mahli', label: 'Mars Hand Lens Imager' },
        { value: 'mardi', label: 'Mars Descent Imager' },
        { value: 'navcam', label: 'Navigation Camera' },
    ];

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMaxDate(today);
    }, []);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchMarsPhotos = async () => {
        console.log(`Fetching Mars photos for Sol: ${sol}, Camera: ${camera}, Earth Date: ${earthDate}`);

        try {
            if (earthDate && camera) {
                setError('Please select either Sol and Camera, or Earth Date. Not both.');
                return;
            }

            if (!earthDate && !sol) {
                setError('Please provide either a Sol value or an Earth date.');
                return;
            }

            let url = '';

            if (earthDate) {
                const formattedDate = moment(earthDate).format('YYYY-MM-DD');
                url = `https://nasa-api-project-y6kj.vercel.app/mars-photos?earth_date=${formattedDate}`;
            } else if (sol) {
                url = `https://nasa-api-project-y6kj.vercel.app/mars-photos?sol=${sol}`;
                if (camera) {
                    url += `&camera=${camera}`;
                }
            }

            console.log('API Request URL:', url);
            await delay(1000);

            const response = await axios.get(url);
            console.log('Response from Mars API:', response.data);

            if (response.data.photos && response.data.photos.length > 0) {
                setPhotos(response.data.photos);
                setPhotoCount(response.data.photos.length);
                setError('');
            } else {
                setError(`No photos available for the specified criteria.`);
                setPhotos([]);
                setPhotoCount(0);
            }
        } catch (err) {
            setError('Error fetching Mars photos: ' + err.message);
            if (err.response && err.response.status === 429) {
                console.error('Rate limit exceeded. Please try again later.');
            }
            if (err.response && err.response.status === 500) {
                console.error('Server error. Please try again later.');
            }
        }
    };

    return (
        <Container sx={{ padding: '40px' }}>
            <Typography variant="h3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }} gutterBottom>Mars Rover Photos</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Sol"
                    type="number"
                    value={sol || ''}
                    onChange={(e) => setSol(e.target.value ? parseInt(e.target.value) : null)}
                    sx={{ marginRight: '10px', width: '100px' }}
                />
                <FormControl sx={{ marginRight: '10px', width: '200px' }}>
                    <StyledTextField
                        id="earth-date"
                        type="date"
                        label="Earth Date"
                        value={earthDate}
                        onChange={(e) => setEarthDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: maxDate,
                        }}
                    />
                </FormControl>
                <FormControl sx={{ marginRight: '10px', width: '200px' }}>
                    <StyledInputLabel id="camera-label">Camera</StyledInputLabel>
                    <StyledSelect
                        value={camera || ''}
                        onChange={(e) => setCamera(e.target.value)}
                        displayEmpty
                        labelId="camera-label"
                    >
                        <MenuItem value="">
                            <em>All Cameras</em>
                        </MenuItem>
                        {cameras.map((cam) => (
                            <MenuItem key={cam.value} value={cam.value}>{cam.label}</MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
                <Button variant="contained" color="primary" onClick={fetchMarsPhotos}>
                    Fetch Mars Photos
                </Button>
            </div>
            {error && <Typography color="error">{error}</Typography>}
            {photoCount > 0 && (
                <GradientText style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    Displayed {photoCount} photos based on the selected criteria.
                </GradientText>
            )}
            <Grid container spacing={3}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={`Mars photo taken by ${photo.camera.full_name}`}
                                image={photo.img_src}
                                title={`Mars photo taken by ${photo.camera.full_name}`}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MarsRoverPhotos;
