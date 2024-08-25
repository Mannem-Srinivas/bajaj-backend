const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = 3005;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Sample user details
const userDetails = {
    user_id: "srinivas_21BCE0266",
    email: "mannem.srinivas2021@vitstudent.ac.in",
    roll_number: "21BCE0266",

};

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Check if data is valid
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    // Process the data array
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            // Determine the highest lowercase alphabet
            if (item >= 'a' && item <= 'z') {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    const response = {
        is_success: true,
        user_id: userDetails.user_id,
        email: userDetails.email,
        roll_number: userDetails.roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
