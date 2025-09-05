import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getInventoryReport,
  getTransactionsReport,
} from "../controllers/reportController.js";

const router = express.Router();

// Report routes
router.get("/inventory", auth, getInventoryReport);
router.get("/transactions", auth, getTransactionsReport);

export default router;
