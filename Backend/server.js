const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require('dotenv').config(); 

const app = express();

app.use(express.json());
app.use(cors());

// Set the port to listen on
const PORT = process.env.PORT || 8080

// Create a MySQL connection
const db = mysql.createConnection({
    host: "localhost",     
    user: "root",     
    password: "@Vikram@Sql@Root@#12", 
    database: "crud" 
})

// Define a route to fetch all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});

// Define a route to create a new student
app.post("/create", (req, res) => {
    const sql = "INSERT INTO student(`name`, `created_at`, `description`) VALUES(?, CURRENT_DATE(), ?)";  // Using CURRENT_DATE()
    const values = [
        req.body.name,
        req.body.description
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err.message);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});

// Define a route to update an existing student by ID
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body; // Removed email as it's not defined here
    const sql = "UPDATE student SET name = ?, description = ?,  created_at = CURRENT_DATE()  WHERE id = ?";

    db.query(sql, [name, description, id], (err, data) => {
        if (err) {
            console.error("Error updating data:", err.message);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json({ message: "Student updated successfully", data });
    });
});

// Define a route to delete a student by ID
app.delete("/student/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = "DELETE FROM student WHERE id = ?";

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error updating data:", err.message);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json({ message: "Student updated successfully", data });
    });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})