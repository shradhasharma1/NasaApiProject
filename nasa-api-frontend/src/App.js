// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Apod from './components/Apod';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import NotFound from './components/NotFound';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Apod />} />
                <Route path="/mars-photos" element={<MarsRoverPhotos />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
