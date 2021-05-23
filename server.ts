
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./src/utils/connectDB";
import { CORS_CONFIG } from "./src/config";
import metricsRoutes from "./src/routes/api/metrics";
import swaggerUI from "swagger-ui-express";

dotenv.config()

export const app = express();

// Connect to MongoDB
connectDB((process.env.DB_URI as string), process.env.NODE_ENV === "testing");

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

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(require('./src/swagger/swagger.json')));

metricsRoutes(app);

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);