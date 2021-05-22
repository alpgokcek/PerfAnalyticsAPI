
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./src/utils/connectDB";
import { CORS_CONFIG } from "./src/config";
import metricsRoutes from "./src/routes/api/metrics";

dotenv.config()

const app = express();

// Connect to MongoDB
connectDB((process.env.DB_URI as string));

const PORT = process.env.PORT || 5000

// Express configuration
app.use(cors(CORS_CONFIG));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @route   GET /
 * @desc    Test Base API
 * @access  Public
 */
app.get("/", (_req, res) => {
  res.send("API is successfully running!");
});

metricsRoutes(app);

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

export default server;