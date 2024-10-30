import "dotenv/config";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
let jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    jwtSecret = crypto.randomBytes(32).toString("base64");

    try {
        if (fs.existsSync(envPath)) {
            fs.appendFileSync(envPath, `\nJWT_SECRET=${jwtSecret}\n`);
            console.log(
                "JWT_SECRET was automatically generated and added to the .env file."
            );
        } else {
            fs.writeFileSync(envPath, `JWT_SECRET=${jwtSecret}\n`);
            console.log("The .env file was created and JWT_SECRET was added.");
        }
    } catch (error) {
        console.error("Error writing JWT_SECRET to the .env file", error);
    }
}

export default jwtSecret;
