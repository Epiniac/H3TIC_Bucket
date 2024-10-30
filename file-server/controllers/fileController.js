import connection from "../models/db.js";

export const getHome = async (req, res, next) => {
    try {
        const [rows] = await connection.query("SELECT 1");
        console.log(rows);
        res.json({ message: "Hello monde !" });
    } catch (error) {
        next(error);
    }
};

