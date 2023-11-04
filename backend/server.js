
const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config();

const app = express();
const PORT = 3001

app.use(cors());
app.use(express.json());

app.post('/api/generate-images', async (req, res) => {
  const { prompt, n, size } = req.body;

  const API_KEY = process.env.API_KEY;

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, n, size })
  };

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', options);
    console.log(response)
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
