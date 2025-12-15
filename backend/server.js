require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// ROUTES
const bookingRoutes = require("./routes/booking");
app.use("/api/booking", bookingRoutes);

// TEST ROOT
app.get("/", (req, res) => {
  res.send("National Auto Garage Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT", PORT);
});
