require('dotenv').config();
const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');

const app = express();
const port =5000

// Your base64 credentials (replace with your actual base64 string)
const base64Credentials = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsICJwcm9qZWN0X2lkIjogIm15LXByb2plY3QtNDU3MDA5Iiw...";  // shortened for brevity

// Decode the base64 credentials and save them to a file
const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
const filePath = path.join(__dirname, 'google-credentials.json');
fs.writeFileSync(filePath, decodedCredentials, 'utf-8');

// Google API settings
const KEY_FILE = filePath;
const SCOPE = ['https://www.googleapis.com/auth/business.manage'];

// Middleware to parse JSON body
app.use(express.json());

// API Endpoint to reply to a review
app.post('/api/reply-to-review', async (req, res) => {
    const { locationName, reviewId, replyText } = req.body;

    if (!locationName || !reviewId || !replyText) {
        return res.status(400).json({ error: 'Missing required fields: locationName, reviewId, replyText' });
    }

    try {
        const auth = new GoogleAuth({
            keyFile: KEY_FILE,
            scopes: SCOPE,
        });

        const client = await auth.getClient();
        const url = `https://mybusiness.googleapis.com/v4/${locationName}/reviews/${reviewId}:reply`;

        const response = await axios.post(
            url,
            { comment: replyText },
            { headers: { Authorization: `Bearer ${await client.getAccessToken()}` } }
        );

        res.status(200).json({ message: "Reply posted successfully", data: response.data });
    } catch (error) {
        console.error("Error posting reply:", error.response?.data || error.message);
        res.status(500).json({ error: 'Error posting reply', details: error.response?.data || error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
