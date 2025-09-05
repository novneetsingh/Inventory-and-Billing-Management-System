import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Contact routes
router.route("/").get(auth, getAllContacts).post(auth, createContact);
router.route("/:id").put(auth, updateContact).delete(auth, deleteContact);

export default router;
