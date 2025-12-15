const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

// ✅ CREATE ADMIN (POST ONLY)
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username & password required" });
    }

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hash });
    await admin.save();

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Admin create failed" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

module.exports = router;
