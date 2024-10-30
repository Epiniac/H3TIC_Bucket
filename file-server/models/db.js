import mysql from "mysql2/promise";

let connection = mysql.createPool({
  host: "db",
  user: "user",
  password: "password",
  database: "file_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

    // connection.connect((err) => {
    //     if (err) {
    //         console.error("Error connecting to the database:", err);
    //         return;
    //     }
    //     console.log("Connected to the database");
    // });

export default connection;
