const logger = require("./logger");
const dotenv = require("dotenv");
const fs = require("fs");

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

export const SECRET_KEY = process.env["SECRET_KEY"];
export const RAZORPAY_KEY_ID = process.env["RAZORPAY_KEY_ID"];
export const RAZORPAY_KEY_SECRET = process.env["RAZORPAY_KEY_SECRET"];

if (!SECRET_KEY) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if(!RAZORPAY_KEY_ID && ! RAZORPAY_KEY_SECRET){
    logger.error("No razorpay secret details. Set RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET in environment variable.");
    process.exit(1); 
}
