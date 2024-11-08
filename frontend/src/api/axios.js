// src/api/axios.js

import axios from 'axios';

// Log the backend API URL to the console to confirm it's set correctly
console.log('Backend API URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8002',  // Uses your environment variable or defaults to localhost:8002
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api; // Exporting the axios instance



