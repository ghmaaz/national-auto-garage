const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// CREATE
router.post("/create", async (req, res) => {
  try {
    const booking = new Booking({
      customerName: req.body.customerName,
      phone: req.body.phone,
      bikeNumber: req.body.bikeNumber,
      bikeName: req.body.bikeName,
      serviceType: req.body.serviceType,
      userEmail: req.body.userEmail,
      status: "Pending"
    });

    await booking.save();
    res.json({ message: "Booking created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

// GET ALL
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;
