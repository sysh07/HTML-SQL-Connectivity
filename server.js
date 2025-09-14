const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection details - **CHANGE THESE TO YOURS**
const db = mysql.createConnection({
    host: 'localhost',//Enter your local host
    user: 'root',//Enter your user name
    password: 'sql_password',//Enter ur SQL password
    database: 'user_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

const path = require('path');
...
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle form submissions
app.post('/submit-info', (req, res) => {
    const { name, phone, address, age } = req.body;

    if (!name || !phone || !address || !age) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO users (name, phone, address, age) VALUES (?, ?, ?, ?)';
    db.query(query, [name, phone, address, age], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Failed to save data.' });
        }
        res.status(200).json({ message: 'Data saved successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Please create an 'index.html' file inside a 'public' folder.`);

});

