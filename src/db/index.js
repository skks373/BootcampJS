import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

await connection.query('CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, location TEXT NULL, position VARCHAR(50) NULL, age INT NULL, PRIMARY KEY (`id`))');
await connection.query('INSERT INTO users(name, location, position, age) VALUES("admin", "aici", "CEO", 35)');


export default connection;
