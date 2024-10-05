# NASA API Project

## Overview
This project is a web application that showcases two major NASA APIs:

- **Astronomy Picture of the Day (APOD)**
- **Mars Rover Photos**

Users can explore stunning astronomical images and learn about various Mars Rover missions. The application allows users to fetch the Astronomy Picture of the Day for a selected date and view photos taken by the Mars Rover for a specific Sol or Earth date.

## Features
### Astronomy Picture of the Day:
- Fetch and display the astronomy picture for the selected date.
- View high-definition images with a link to the original source.
- Navigate to Mars Rover Photos directly from the APOD page.

### Mars Rover Photos:
- Fetch Mars photos based on either the Martian Sol (solar day) or Earth date.
- Select specific cameras used by Mars Rovers to filter the results.
- Display photos with dynamic updates based on user input.

## APIs Used
### 1. Astronomy Picture of the Day (APOD)
- **Endpoint**: `https://api.nasa.gov/planetary/apod`
- **Parameters**:
    - `date`: The date for which you want to fetch the astronomy picture (format: YYYY-MM-DD).
    - **API Key**: Requires a valid NASA API key. You can obtain it by registering [here](https://api.nasa.gov/).

### 2. Mars Rover Photos
- **Endpoint**: `https://api.nasa.gov/mars-photos/api/v1/rovers/{rover_name}/photos`
- **Parameters**:
    - `sol`: The Martian Sol (solar day) for which you want to fetch photos.
    - `earth_date`: The Earth date for which you want to fetch photos.
    - `camera`: The specific camera used to take the photos (optional).
    - **API Key**: Requires a valid NASA API key.

## Installation
### Prerequisites
- Node.js (version 12 or later)
- npm (Node Package Manager)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

## Install Dependencies:
- bash
- Copy code
- npm install
- 
## Set Up Environment Variables:
- Create a .env file in the root directory of the project and add your NASA API key:

- plaintext
-Copy code
-NASA_API_KEY=your_api_key_here

## Run the Application:
- bash
- Copy code
- npm start
- The application should now be running on http://localhost:3000.

## Usage
### APOD:
- By default, the APOD page fetches and displays the astronomy picture for the current date.
- You can select a different date using the date picker and click "Fetch for Selected Date" to see the corresponding image.
### Mars Rover Photos:
- Enter a Martian Sol or an Earth date to fetch photos taken by the Mars Rover.
- Select a camera to filter results.
- Click "Fetch Mars Photos" to see the images.
## Contributing
- Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

## Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes and commit them (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Open a pull request.
## License
- This project is licensed under the MIT License.

## Acknowledgments
- NASA for providing the APIs.
- Material-UI for the component library.
- Framer Motion for animations.


