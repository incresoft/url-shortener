import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import "./modules/server";

const Main = async () => {
    mongoose.connection.on("open", () => {
        console.log("Database is connected");
    });

    mongoose.connection.on("close", () => {
        console.log("Database is disconnected");
    });

    await mongoose.connect(process.env.Mongodb as string, {
        keepAlive: true,
        connectTimeoutMS: 0,
        socketTimeoutMS: 0,
        serverSelectionTimeoutMS: 0
    });
};

Main().catch(() => console.error);