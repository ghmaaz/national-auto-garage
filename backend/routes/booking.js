const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

/* ======================================================
   📝 CREATE BOOKING (USER)
====================================================== */
router.post("/create", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      bikeNumber,
      bikeName,
      serviceType,
      userEmail
    } = req.body;

    // 🔎 Validation
    if (
      !customerName ||
      !phone ||
      !bikeNumber ||
      !bikeName ||
      !serviceType
    ) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required"
      });
    }

    const booking = new Booking({
      customerName,
      phone,
      bikeNumber,
      bikeName,
      serviceType,
      userEmail, // optional but useful
      status: "Pending"
    });

    await booking.save();

    res.json({
      ok: true,
      message: "Booking created successfully",
      booking
    });

  } catch (err) {
    console.error("BOOKING CREATE ERROR:", err);
    res.status(500).json({
      ok: false,
      error: "Booking failed"
    });
  }
});

/* ======================================================
   📋 GET ALL BOOKINGS (ADMIN + USER VIEW)
====================================================== */
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("FETCH BOOKINGS ERROR:", err);
    res.status(500).json({
      ok: false,
      error: "Failed to fetch bookings"
    });
  }
});

/* ======================================================
   🔄 UPDATE BOOKING STATUS (ADMIN)
====================================================== */
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        ok: false,
        error: "Status is required"
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        ok: false,
        error: "Booking not found"
      });
    }

    res.json({
      ok: true,
      message: "Status updated successfully",
      booking
    });

  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    res.status(500).json({
      ok: false,
      error: "Status update failed"
    });
  }
});

module.exports = router;
