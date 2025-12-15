const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* =====================
   SIGNUP
===================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ ok: false, error: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ ok: false, error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.json({
      ok: true,
      message: "Signup successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Signup failed" });
  }
});

/* =====================
   LOGIN
===================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ ok: false, error: "Invalid login" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ ok: false, error: "Invalid login" });
    }

    res.json({
      ok: true,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Login failed" });
  }
});

module.exports = router;
