// Load environment variables from backend/.env into process.env.
// Must run BEFORE any code that reads process.env.
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";

await connectDB();

const app = express();


app.use(express.json()); // parse JSON request bodies
app.use(cors());         // allow the React frontend to call this API

app.get("/", (req, res) => {
  res.json({
    message: "School Event Scheduler API is running",
    status: "ok",
  });
});


app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});