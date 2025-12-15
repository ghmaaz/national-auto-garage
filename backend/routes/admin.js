const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| 🔹 ONE-TIME ADMIN CREATE (SEED)
| 👉 Browser me sirf 1 baar open karo:
| https://your-backend-url/api/admin/seed
|--------------------------------------------------------------------------
*/
router.get("/seed", async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: "admin" });

    if (existing) {
      return res.json({
        ok: true,
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword
    });

    await admin.save();

    res.json({
      ok: true,
      message: "Admin created successfully",
      username: "admin",
      password: "admin123"
    });

  } catch (err) {
    console.error("ADMIN SEED ERROR:", err);
    res.status(500).json({
      ok: false,
      error: "Admin seed failed"
    });
  }
});

/*
|--------------------------------------------------------------------------
| 🔐 ADMIN LOGIN
|--------------------------------------------------------------------------
*/
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        error: "Username and password required"
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        ok: false,
        error: "Invalid login"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        error: "Invalid login"
      });
    }

    res.json({
      ok: true,
      message: "Admin login successful"
    });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
});

module.exports = router;
