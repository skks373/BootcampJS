import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.query('CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, location TEXT NULL, position VARCHAR(50) NULL, age INT NULL, PRIMARY KEY (`id`))', (err, row) => {
    if (err) throw err
    console.log('Users tables created')
})

connection.query('INSERT INTO users(name, location, position, age) VALUES("admin", "aici", "CEO", 35)', (err, row) => {
    if (err) throw err
    console.log('Added default user')
})

export default connection;