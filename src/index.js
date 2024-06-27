// require('dotenv').config({path: './env'})

import dotenv from 'dotenv';
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { app } from "./app.js"; 

dotenv.config({
    path: './env'
})

connectDB()
.then((result) => {
    app.listen(process.env.PORT || 8080, (err, result) => {
        console.log(`Server is listening on http://localhost:${process.env.PORT}`);
    })
}).catch((err) => {
    console.error("MongoDB Connection ERROR: " + err.message);
});










/*
import express from "express";
const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", () => {
            console.log("ERROR: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on http://localhost:${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})()
*/