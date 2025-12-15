const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

// ✅ AUTO CREATE ADMIN (ONE TIME)
router.get("/seed", async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: "admin" });
    if (existing) {
      return res.json({ ok: true, message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hashed
    });

    await admin.save();
    res.json({ ok: true, message: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Admin seed failed" });
  }
});

// ✅ ADMIN LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: "Invalid login" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ error: "Invalid login" });

  res.json({ ok: true, message: "Admin login successful" });
});

module.exports = router;
