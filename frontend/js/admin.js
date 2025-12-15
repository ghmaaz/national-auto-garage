const container = document.getElementById("adminBookings");

fetch("https://national-auto-garage.onrender.com/api/booking/all")
  .then(res => res.json())
  .then(bookings => {
    if (!bookings.length) {
      container.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookings.forEach(b => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "16px";

      card.innerHTML = `
        <p><strong>Name:</strong> ${b.customerName}</p>
        <p><strong>Bike:</strong> ${b.bikeName} (${b.bikeNumber})</p>
        <p><strong>Service:</strong> ${b.serviceType}</p>

        <label><strong>Status:</strong></label>
        <select onchange="updateStatus('${b._id}', this.value)">
          <option ${b.status==="Pending"?"selected":""}>Pending</option>
          <option ${b.status==="Approved"?"selected":""}>Approved</option>
          <option ${b.status==="Completed"?"selected":""}>Completed</option>
          <option ${b.status==="Rejected"?"selected":""}>Rejected</option>
        </select>
      `;

      container.appendChild(card);
    });
  });

function updateStatus(id, status) {
  fetch(`https://national-auto-garage.onrender.com/api/booking/update-status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
  .then(res => res.json())
  .then(() => alert("Status updated"));
}

// Logout
document.getElementById("logoutLink").onclick = () => {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
};
