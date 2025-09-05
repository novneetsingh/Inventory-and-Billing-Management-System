import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllTransactions,
  createTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// Transaction routes
router.route("/").get(auth, getAllTransactions).post(auth, createTransaction);

export default router;
