const dotenv = require("dotenv");
dotenv.config();
import { SECRET_KEY, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../util/secrets";

const SERVER_PORT = Number(process.env["SERVER_PORT"]) || 3000;
const DB_HOST = process.env["DB_HOST"] || "grit.simpragma.com";
const DB_NAME = process.env["DB_NAME"] || "funnl_db";
const DB_USER = process.env["DB_USER"] || "appuser";
const DB_PASSWORD = process.env["DB_PASSWord"] || "Simpragma123!@#";
const DB_PORT = Number(process.env["DB_PORT"]) || 5432;

export const appConfig = {
    "version": "1.0.0",
    "appName": "typescript-node-starter",
    "server": {
        "port": SERVER_PORT
    },
    "security": {
        "jwt": {
            "secretKey": SECRET_KEY,
            "expiryTime": "30d"
        }
    },
    "database": {
        "host": DB_HOST,
        "dbName": DB_NAME,
        "dbPort": DB_PORT,
        "user": {
            "name": DB_USER,
            "password": DB_PASSWORD
        }
    },
    "razorpay": {
        "keyId": RAZORPAY_KEY_ID,
        "keySecret": RAZORPAY_KEY_SECRET
    }
};