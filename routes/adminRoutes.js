import express from "express";
import {
  registerAdmin,
  loginAdmin,
  deleteAdmin,
  logoutAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";
import protectAdmin from "../middlewears/authMiddleware.js";
const router = express.Router();

// 🔐 Auth Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.delete("/delete/:id", protectAdmin , deleteAdmin);
router.post("/logout" ,protectAdmin, logoutAdmin);
router.get("/me", protectAdmin, getAdminProfile);

export default router;