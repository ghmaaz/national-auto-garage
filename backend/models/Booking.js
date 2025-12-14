const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    bikeNumber: {
      type: String,
      required: true
    },
    bikeName: {
      type: String,
      required: true
    },
    serviceType: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
