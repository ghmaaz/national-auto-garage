const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

/* ✅ TEST ROUTE (DEBUG) */
router.get("/test", (req, res) => {
  res.json({ ok: true, message: "Admin route working" });
});

/* ✅ CREATE ADMIN (ONE TIME) */
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hash });

    await admin.save();
    res.json({ success: true, message: "Admin created" });
  } catch (err) {
    console.error("ADMIN CREATE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* ✅ ADMIN LOGIN (FIXED) */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
