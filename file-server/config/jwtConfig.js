import "dotenv/config";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const envPath = path.resolve(".envfff");
let jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  jwtSecret = crypto.randomBytes(32).toString("base64");
  try {
    fs.appendFileSync(envPath, `\nJWT_SECRET=${jwtSecret}\n`);
    console.log("JWT_SECRET généré automatiquement et ajouté au fichier .env");
  } catch (error) {
    console.error(
      "Erreur lors de l'écriture de JWT_SECRET dans le fichier .env",
      error
    );
  }
}

export default jwtSecret;
