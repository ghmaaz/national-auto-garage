// ===============================
// LOGIN STATUS CHECK
// ===============================
function isUserLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}

// ===============================
// NAVBAR TOGGLE
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
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userEmail");
      alert("Logged out successfully");
      window.location.href = "index.html";
    });
  }
});

// ===============================
// LOGIN FUNCTION (LOGIN PAGE)
// ===============================
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  // Demo credentials (for now)
  if (email === "user@test.com" && password === "123456") {
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    window.location.href = "booking.html";
  } else {
    if (errorMsg) errorMsg.style.display = "block";
  }
}
