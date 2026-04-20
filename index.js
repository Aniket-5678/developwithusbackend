// index.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectionDB from "./db/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import path from "path";
import fs from "fs";  
dotenv.config();

connectionDB()

const app = express();
// 🔥 ADD THIS BLOCK (VERY IMPORTANT)
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
// 🔹 Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is runing on ${process.env.PORT}`);
    
})