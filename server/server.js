const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Configure Google Drive API
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// Cache configuration
const cache = {
    images: null,
    lastUpdate: null,
    cacheDuration: 5 * 60 * 1000, // 5 minutes
};

// Routes
app.get('/api/gallery', async (req, res) => {
    try {
        // Check cache
        if (cache.images && cache.lastUpdate && Date.now() - cache.lastUpdate < cache.cacheDuration) {
            return res.json({ success: true, images: cache.images });
        }

        const response = await drive.files.list({
            q: `'${process.env.GOOGLE_FOLDER_ID}' in parents and mimeType contains 'image/'`,
            fields: 'files(id, name, mimeType)',
            orderBy: 'name',
        });

        const images = response.data.files;
        
        // Update cache
        cache.images = images;
        cache.lastUpdate = Date.now();

        res.json({ success: true, images });
    } catch (error) {
        console.error('Error fetching gallery:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch gallery' });
    }
});

app.get('/api/image/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { size = 'thumbnail' } = req.query;

        // Get file metadata
        const file = await drive.files.get({
            fileId: id,
            fields: 'id, name, mimeType',
        });

        // Stream the file
        const response = await drive.files.get(
            {
                fileId: id,
                alt: 'media',
            },
            { responseType: 'stream' }
        );

        // Set appropriate headers
        res.setHeader('Content-Type', file.data.mimeType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

        // Pipe the file stream to response
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch image' });
    }
});

// Handle all other routes - serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 