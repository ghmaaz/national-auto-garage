// ===============================
// LOGIN STATUS CHECK
// ===============================
function isUserLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}

// ===============================
// NAVBAR TOGGLE (ALL PAGES)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  const myBookingsLink = document.getElementById("myBookingsLink");

  if (isUserLoggedIn()) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";
    if (myBookingsLink) myBookingsLink.style.display = "inline";
  } else {
    if (loginLink) loginLink.style.display = "inline";
    if (logoutLink) logoutLink.style.display = "none";
    if (myBookingsLink) myBookingsLink.style.display = "none";
  }

  // LOGOUT
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      alert("Logged out successfully");
      window.location.href = "index.html";
    });
  }
});

// ===============================
// REAL LOGIN FUNCTION (BACKEND)
// ===============================
function loginUser() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  fetch("https://national-auto-garage.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        window.location.href = "booking.html";
      } else {
        if (errorMsg) {
          errorMsg.style.display = "block";
          errorMsg.innerText = data.error || "Login failed";
        } else {
          alert(data.error || "Login failed");
        }
      }
    })
    .catch(() => {
      alert("Server error. Please try again.");
    });
}
