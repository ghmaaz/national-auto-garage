const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    bikeNumber: String,
    bikeName: String,
    serviceType: String,
    userEmail: {
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

module.exports = mongoose.model("Booking", bookingSchema);
