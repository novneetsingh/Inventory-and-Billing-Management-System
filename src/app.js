import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Database connection
try {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database connected");
} catch (error) {
  console.log("Database connection error", error);
  process.exit(1);
}

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to inventory and billing management system");
});

// API Routes
app.use("/", authRoutes);
app.use("/products", productRoutes);
app.use("/contacts", contactRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
