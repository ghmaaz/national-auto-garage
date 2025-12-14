const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// ✅ Create booking
router.post("/create", async (req, res) => {
  try {
    const booking = new Booking({
      customerName: req.body.customerName,
      phone: req.body.phone,
      bikeNumber: req.body.bikeNumber,
      bikeName: req.body.bikeName,
      serviceType: req.body.serviceType,
      status: "Pending"
    });

    await booking.save();
    res.json({ message: "Booking created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
});

// ✅ GET ALL BOOKINGS (FIX)
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// ✅ UPDATE STATUS
router.put("/update-status/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Status update failed" });
  }
});

module.exports = router;
