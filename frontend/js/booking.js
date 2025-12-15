// 🔐 LOGIN PROTECTION (page load par)
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
    userEmail: localStorage.getItem("userEmail")
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

  // ✅ FETCH (with proper error handling)
  fetch("https://national-auto-garage.onrender.com/api/booking/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(async res => {
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    return res.json();
  })
  .then(() => {
    alert("Booking Submitted Successfully!");
    window.location.href = "my-bookings.html";
  })
  .catch(err => {
    console.error("BOOKING ERROR:", err);
    alert("Server issue. Please try again in a moment.");
  });
}
