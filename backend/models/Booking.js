const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  bikeNumber: String,
  bikeName: String,
  serviceType: String, // Service / Engine / Both
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
