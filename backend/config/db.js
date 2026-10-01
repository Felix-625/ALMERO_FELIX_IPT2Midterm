// ============================================================
// config/db.js — MongoDB connection using Mongoose
// ============================================================
// Separating the connection logic from server.js keeps
// server.js focused on wiring the Express app together.
// ============================================================

import mongoose from "mongoose";

// Connect to MongoDB using the URI from .env (loaded by server.js).
// Throws an error if the connection fails so the caller can exit.
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error(
        "MONGO_URI is not defined. Did you create backend/.env?"
      );
    }

    // Mongoose 8 does not need the legacy `useNewUrlParser` options.
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Exit the process so the server does not run without a database.
    process.exit(1);
  }
};

export default connectDB;