require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ MONGODB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// ✅ ROUTES
app.use("/api/booking", require("./routes/booking"));
app.use("/api/admin", require("./routes/admin")); // 🔥 ADMIN ROUTE ADDED

// ✅ TEST ROOT
app.get("/", (req, res) => {
  res.send("National Auto Garage Backend Running");
});

// ✅ SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT", PORT);
});
