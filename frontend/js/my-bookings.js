// 🔐 LOGIN PROTECTION
if (localStorage.getItem("userLoggedIn") !== "true") {
  alert("Please login to view your bookings");
  window.location.href = "login.html";
}

const bookingList = document.getElementById("bookingList");

// 🔥 FETCH ALL BOOKINGS (NO FILTER)
fetch("https://national-auto-garage.onrender.com/api/booking/all")
  .then(res => res.json())
  .then(bookings => {
    if (!bookings || bookings.length === 0) {
      bookingList.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookings.forEach(b => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "16px";

      card.innerHTML = `
        <p><strong>Customer:</strong> ${b.customerName}</p>
        <p><strong>Bike:</strong> ${b.bikeName} (${b.bikeNumber})</p>
        <p><strong>Service:</strong> ${b.serviceType}</p>
        <p><strong>Status:</strong> ${b.status}</p>
      `;

      bookingList.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    bookingList.innerHTML = "<p>Error loading bookings.</p>";
  });
