// 🔐 LOGIN PROTECTION
if (localStorage.getItem("userLoggedIn") !== "true") {
  alert("Please login to view your bookings");
  window.location.href = "login.html";
}

const bookingList = document.getElementById("bookingList");
const userEmail = localStorage.getItem("userEmail");

// FETCH USER BOOKINGS
fetch("https://national-auto-garage.onrender.com/api/booking/all")
  .then(res => res.json())
  .then(bookings => {
    const myBookings = bookings.filter(b => b.userEmail === userEmail);

    if (myBookings.length === 0) {
      bookingList.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    myBookings.forEach(b => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "16px";

      card.innerHTML = `
        <p><strong>Bike:</strong> ${b.bikeName} (${b.bikeNumber})</p>
        <p><strong>Service:</strong> ${b.serviceType}</p>
        <p>
          <strong>Status:</strong>
          <span style="color:${b.status === "Completed" ? "#16a34a" : "#f59e0b"}">
            ${b.status}
          </span>
        </p>
      `;

      bookingList.appendChild(card);
    });
  })
  .catch(() => {
    bookingList.innerHTML = "<p>Error loading bookings.</p>";
  });
