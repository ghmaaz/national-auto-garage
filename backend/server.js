require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ SIMPLE PING TEST (VERY IMPORTANT)
app.get("/ping", (req, res) => {
  res.send("SERVER ALIVE");
});

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// ✅ ROUTES
app.use("/api/booking", require("./routes/booking"));
app.use("/api/admin", require("./routes/admin"));

// ✅ ROOT TEST
app.get("/", (req, res) => {
  res.send("National Auto Garage Backend Running");
});

// ✅ SERVER START (RENDER SAFE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT", PORT);
});
