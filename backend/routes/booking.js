const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

/**
 * CREATE BOOKING (Customer)
 */
router.post("/create", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

/**
 * GET ALL BOOKINGS (Admin)
 */
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/**
 * UPDATE BOOKING STATUS (Admin)
 */
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await Booking.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Status update failed" });
  }
});


module.exports = router;
