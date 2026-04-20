import express from "express";
import {
  createPortfolio,
  getAllPortfolio,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

import upload from "../middlewears/upload.js";
import protectAdmin from "../middlewears/authMiddleware.js";

const router = express.Router();

// ➕ CREATE
router.post(
  "/create",
  upload.single("image"),
  createPortfolio
);

// 📥 GET ALL
router.get("/", getAllPortfolio);

// 📄 GET SINGLE
router.get("/:id", getSinglePortfolio);

// ✏️ UPDATE
router.put(
  "/update/:id",
  protectAdmin,
  upload.single("image"),
  updatePortfolio
);

// ❌ DELETE
router.delete("/:id", protectAdmin, deletePortfolio);

export default router;