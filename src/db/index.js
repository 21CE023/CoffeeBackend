import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { app } from "../app.js";

const connectDB = async () => {
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("Error", (err) => {
            console.error(err);
        })
        console.log(`\n MongoDB connected!! \n DB Host: ${connectionInstant.connection.host} \n DB Name : ${connectionInstant.connection.name}\n`);
    } catch (error) {
        console.log("DB Connection ERROR: " + error);
        process.exit(1);
    }
}

export default connectDB;