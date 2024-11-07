// app.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API endpoint to get questions
app.get('/api/questions', (req, res) => {
    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error loading questions' });
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));