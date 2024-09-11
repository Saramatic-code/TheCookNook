// pages/api/recipes.js

import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Fetch data from your FastAPI backend
            const response = await axios.get('http://127.0.0.1:8000/recipes/');
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error fetching recipes from backend:', error);
            res.status(500).json({ error: 'Failed to fetch recipes' });
        }
    } else {
        // Handle other HTTP methods if needed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
