const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5007;
const NASA_API_KEY = 'dFyDpv3PzSWK9Ko7izo5H2U5ZBsKUrduNmJi1F8P'; // Replace with your actual API key

app.use(cors());

// APOD Route
app.get('/apod', async (req, res) => {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from NASA API:', error.message);
        res.status(500).json({ message: 'Error fetching APOD data', error: error.message });
    }
});


app.get('/mars-photos', async (req, res) => {
    const { sol, camera, earth_date } = req.query;

    try {
        let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';

        // Check if both sol and earth_date are provided
        if (sol && earth_date) {
            return res.status(400).json({ error: 'Please provide either sol and camera or earth_date, not both.' });
        }

        // Check if sol is provided
        if (sol) {
            url += `sol=${sol}`;
            if (camera) {
                url += `&camera=${camera}`;
            }
        }
        // Check if earth_date is provided
        else if (earth_date) {
            url += `earth_date=${earth_date}`;
        } else {
            return res.status(400).json({ error: 'Please provide either sol and camera or earth_date.' });
        }

        // Always append the API key
        url += `&api_key=${NASA_API_KEY}`; // Use your actual NASA API key here

        const response = await axios.get(url);
        const photos = response.data.photos;

        if (photos.length > 0) {
            res.json({ photos });
        } else {
            res.json({ photos: [] });
        }
    } catch (error) {
        console.error('Error fetching data from NASA API:', error.message);
        res.status(500).json({ error: 'Error fetching data from NASA API.' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
