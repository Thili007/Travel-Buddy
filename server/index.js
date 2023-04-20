import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import tripRoutes from "./routes/tripsRoutes.js";
import cityDetailsRoutes from "./routes/cityDetailsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

// routes
app.use("/api/user", userRoutes);
app.use("/api/user", postsRoutes);
app.use("/api/user", tripRoutes);
app.use("/api/user", cityDetailsRoutes);

const port = process.env.PORT || 5000;
const db = process.env.MONGO_DB;

mongoose
  .set("strictQuery", true)
  .connect(db)
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`connected to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
