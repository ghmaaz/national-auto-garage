// 🔐 LOGIN CHECK
if (localStorage.getItem("userLoggedIn") !== "true") {
  alert("Please login to view your bookings");
  window.location.href = "login.html";
}

// 🔥 TARGET CONTAINER
const bookingList = document.getElementById("bookingList");

// SAFETY CHECK
if (!bookingList) {
  alert("Booking container not found");
}

// 🔥 FETCH BOOKINGS
fetch("https://national-auto-garage.onrender.com/api/booking/all")
  .then(res => res.json())
  .then(bookings => {

    bookingList.innerHTML = "";

    if (!Array.isArray(bookings) || bookings.length === 0) {
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
        <p>
          <strong>Status:</strong>
          <span style="color:orange;font-weight:600;">
            ${b.status}
          </span>
        </p>
      `;

      bookingList.appendChild(card);
    });
  })
  .catch(err => {
    console.error("FETCH ERROR:", err);
    bookingList.innerHTML = "<p>Error loading bookings.</p>";
  });
