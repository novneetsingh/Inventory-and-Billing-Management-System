import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth, getProducts).post(auth, createProduct);
router.route("/:id").put(auth, updateProduct).delete(auth, deleteProduct);

export default router;
