// ===============================
// LOGIN CHECK
// ===============================
if (localStorage.getItem("userLoggedIn") !== "true") {
  alert("Please login first");
  window.location.href = "login.html";
}

const bookingTable = document.getElementById("bookingTableBody");
const userEmail = localStorage.getItem("userEmail");

fetch("https://national-auto-garage.onrender.com/api/booking/all")
  .then(res => res.json())
  .then(bookings => {

    // 🔥 FILTER USER BOOKINGS
    const myBookings = bookings.filter(
      b => b.userEmail === userEmail
    );

    if (myBookings.length === 0) {
      bookingTable.innerHTML =
        "<tr><td colspan='5'>No bookings found</td></tr>";
      return;
    }

    bookingTable.innerHTML = "";

    myBookings.forEach(b => {

      let statusClass = "badge";
      if (b.status === "Approved") statusClass += " yes";
      if (b.status === "Rejected") statusClass += " no";

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${new Date(b.createdAt).toLocaleString()}</td>
        <td>${b.customerName}</td>
        <td>${b.bikeName} (${b.bikeNumber})</td>
        <td>${b.serviceType}</td>
        <td>
          <span class="${statusClass}">
            ${b.status}
          </span>
        </td>
      `;

      bookingTable.appendChild(tr);
    });
  })
  .catch(() => {
    bookingTable.innerHTML =
      "<tr><td colspan='5'>Error loading bookings</td></tr>";
  });
