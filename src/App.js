// Install necessary packages before starting
// npm install axios react-icons

// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSpotifyData = async () => {
    if (!spotifyUrl) {
      alert('Please enter a valid Spotify URL');
      return;
    }

    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
      headers: {
        'x-rapidapi-key': '6dfff8a15dmsh50fe9ab52054b5dp1dd8cejsn6fffd706b566',
        'x-rapidapi-host': 'spotify-scraper.p.rapidapi.com'
      },
      params: { url: spotifyUrl }
    };

    try {
      const response = await axios.request(options);
      setDownloadLink(response.data.download_url); // Extract download link from response
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      setDownloadLink('Failed to retrieve download link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Spotify Track Downloader</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Spotify Track URL"
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
          />
        </div>
        <button
          onClick={fetchSpotifyData}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg focus:outline-none"
        >
          {loading ? 'Fetching...' : 'Fetch & Download'}
        </button>
        {downloadLink && (
          <div className="mt-4 p-4 bg-gray-50 border rounded-lg text-sm text-gray-800">
            <strong>Download Link:</strong>
            <p>{downloadLink}</p>
            <a
              href={downloadLink}
              download
              className="block mt-2 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg"
            >
              Download Track
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// App.css
// Include TailwindCSS via a CDN or configured in your project

// Tailwind Setup
// Add Tailwind by installing it (npm install -D tailwindcss) and configuring it in your project.
