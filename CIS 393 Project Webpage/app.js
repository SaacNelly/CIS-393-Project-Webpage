var mysql = require('mysql');

var con = mysql.createConnection
({
    host: 'localhost',
    user: 'root',
    database: 'user_info_db'
})

con.connect(function(err) 
{
    if (err) 
    {
        console.error("Error connection to the database.");
    }
    console.log("Connected to database.");
});

const express = require('express');
const app = express();
const port = 5500;

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.post('/users', (req, res) => 
{
    console.log("req body: " + req.body);
    const { name, age, dob } = req.body;
    const sql = 'INSERT INTO users (name, age, dob) VALUES (?, ?, ?)';
    con.query(sql, [name, age, dob], (err, result) => 
    {
        if (err) 
        {
            res.status(500).send('Failed to insert user');
            console.error(err);
            return;
        }
        res.json({ message: 'User added successfully', userId: result.insertId });
    });
});

app.get('/users', (req, res) => 
{
    con.query('SELECT * FROM users', (err, results, fields) => 
    {
        if (err) 
        {
            res.status(500).send('Error fetching users: ' + err.message);
            return;
        }
        res.json(results);
    });
});

app.put('/users/update', (req, res) => 
{
    const { name, age, dob } = req.body;
    const sql = 'UPDATE users SET age = ?, dob = ? WHERE name = ?';
    con.query(sql, [age, dob, name], (err, result) => 
    {
        if (err) 
        {
            res.status(500).send({ error: 'Failed to update user' });
            return;
        }
        res.send({ message: 'User updated successfully' });
    });
});

app.delete('/users/delete/:name', (req, res) => 
{
    const { name } = req.params;
    const sql = 'DELETE FROM users WHERE name = ?';
    con.query(sql, [name], (err, result) => 
    {
        if (err) 
        {
            res.status(500).send({ error: 'Failed to delete user' });
            return;
        }
        res.send({ message: 'User deleted successfully' });
    });
});

app.get('/users/:name', (req, res) => 
{
    const { name } = req.params;
    const sql = 'SELECT * FROM users WHERE name = ?';
    con.query(sql, [name], (err, results) => 
    {
        if (err) 
        {
            res.status(500).send({ error: 'Failed to fetch user' });
            return;
        }
        res.send(results[0] || { message: 'No user found' });
    });
});

app.get('/users', (req, res) => 
{
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, results) => 
    {
        if (err) 
        {
            res.status(500).send({ error: 'Failed to fetch users' });
            return;
        }
        res.send(results);
    });
});


app.listen(port, () => 
{
    console.log(`Server running on http://localhost:${port}`);
});


