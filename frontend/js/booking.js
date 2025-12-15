// 🔐 LOGIN PROTECTION
if (localStorage.getItem("userLoggedIn") !== "true") {
  alert("Please login to book service");
  window.location.href = "login.html";
}

// 📝 SUBMIT BOOKING
function submitBooking() {
  const data = {
    customerName: document.getElementById("customerName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    bikeNumber: document.getElementById("bikeNumber").value.trim(),
    bikeName: document.getElementById("bikeName").value.trim(),
    serviceType: document.getElementById("serviceType").value,
    userEmail: localStorage.getItem("userEmail") || "N/A",
    pickupRequired: document.getElementById("pickup")?.checked ? "Yes" : "No"
  };

  // ✅ VALIDATION
  if (!data.customerName || !data.phone || !data.bikeNumber || !data.bikeName || !data.serviceType) {
    alert("Please fill all fields");
    return;
  }

  if (data.phone.length !== 10) {
    alert("Enter valid 10 digit mobile number");
    return;
  }

  // 🔥 CREATE BOOKING
  fetch("https://national-auto-garage.onrender.com/api/booking/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {

    const adminPhone = "918160991036"; // ✅ Maaz Pathan (corrected)
    const bookingId = result._id || "Generated";

    const sendWhatsApp = (mapLink) => {
      const message = `
Hello Maaz 👋
🔧 *National Auto Garage*

📌 *New Booking Received*

🆔 Booking ID: ${bookingId}
👤 Customer: ${data.customerName}
📞 Mobile: ${data.phone}
🏍 Bike: ${data.bikeName} (${data.bikeNumber})
🛠 Service: ${data.serviceType}
🚚 Pickup Required: ${data.pickupRequired}
📧 Email: ${data.userEmail}
📍 Location: ${mapLink}
⏳ Status: Pending

Please confirm booking.
Thank you 🙏
      `;

      const whatsappURL =
        "https://wa.me/" +
        adminPhone +
        "?text=" +
        encodeURIComponent(message);

      alert("Booking Submitted Successfully!");

      // 📲 WhatsApp open
      window.open(whatsappURL, "_blank");

      // 🔁 Redirect
      window.location.href = "my-bookings.html";
    };

    // 🌍 LOCATION
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const mapLink = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
          sendWhatsApp(mapLink);
        },
        () => sendWhatsApp("Location not shared")
      );
    } else {
      sendWhatsApp("Location not supported");
    }
  })
  .catch(() => {
    alert("Server issue. Please try again.");
  });
}
