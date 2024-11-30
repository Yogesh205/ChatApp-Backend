import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./Route/user.route.js";
import messageRoute from "./Route/message.route.js";
import { app, server } from "./SocketIO/Server.js";

dotenv.config();

// middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:4001', // Allow only this origin
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow specific headers
    credentials: true, // Allow cookies to be sent
  };
  
  // Use CORS middleware
  app.use(cors(corsOptions));
  
  
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});