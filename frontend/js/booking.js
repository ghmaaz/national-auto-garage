// ===============================
// LOGIN CHECK
// ===============================
if (localStorage.getItem("userLoggedIn") !== "true") {
  localStorage.setItem("redirectAfterLogin", "booking.html");
  window.location.href = "login.html";
}

// ===============================
// SUBMIT BOOKING (BACKEND)
// ===============================
function submitBooking() {

  const customerName = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const bikeNumber = document.getElementById("bikeNumber").value.trim();
  const bikeName = document.getElementById("bikeName").value.trim();
  const serviceType = document.getElementById("serviceType").value;
  const pickupRequired = document.getElementById("pickup").checked ? "Yes" : "No";

  const userEmail = localStorage.getItem("userEmail");

  if (!customerName || !phone || !bikeNumber || !bikeName || !serviceType) {
    alert("Please fill all fields");
    return;
  }

  const data = {
    customerName,
    phone,
    bikeNumber,
    bikeName,
    serviceType,
    pickupRequired,
    userEmail
  };

  fetch("https://national-auto-garage.onrender.com/api/booking/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => {

      // ===============================
      // 📲 WHATSAPP MESSAGE
      // ===============================
      const adminPhone = "918160991036";

      const message = `
Hello Maaz Pathan👋
🚲 *National Auto Garage*

📌 *New Booking Received*

👤 Customer: ${customerName}
📞 Mobile: ${phone}
🏍 Bike: ${bikeName} (${bikeNumber})
🛠 Service: ${serviceType}
🚚 Pickup: ${pickupRequired}
📧 Email: ${userEmail}
⏳ Status: Pending

Please check admin dashboard.
Thank you 🙏
      `;

      const whatsappURL =
        "https://wa.me/" +
        adminPhone +
        "?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank");

      alert("Booking submitted successfully!");
      window.location.href = "my-bookings.html";
    })
    .catch(() => {
      alert("Server error. Please try again.");
    });
}
