import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await Admin.findOne({ username });
    if (exist) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered",
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await Admin.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Admin deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Logout (Frontend handled)
export const logoutAdmin = async (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getAdminProfile = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};