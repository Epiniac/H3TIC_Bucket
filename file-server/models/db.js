import mysql from "mysql";

const connection = mysql.createConnection({
    host: "db",
    user: "user",
    password: "password",
    database: "Bucket",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

export default connection;