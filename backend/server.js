require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* =====================
   MONGODB CONNECTION
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

/* =====================
   ROUTES
===================== */
app.use("/api/auth", require("./routes/auth"));      // ✅ USER LOGIN / SIGNUP
app.use("/api/booking", require("./routes/booking"));// ✅ BOOKINGS
app.use("/api/admin", require("./routes/admin"));    // ✅ ADMIN

/* =====================
   HEALTH CHECK
===================== */
app.get("/", (req, res) => {
  res.send("National Auto Garage Backend Running");
});

app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "Server alive" });
});

/* =====================
   SERVER START
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});
