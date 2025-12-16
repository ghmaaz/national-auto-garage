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

  // ===============================
  // LOGOUT
  // ===============================
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();

      // 🔐 Clear session
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");

      alert("Logged out successfully");
      window.location.href = "index.html";
    });
  }
});

// ===============================
// ⚠️ IMPORTANT NOTE
// ===============================
// ❌ loginUser() yahan NAHI rakha gaya
// ❌ signupUser() yahan NAHI rakha gaya
//
// 👉 Login / Signup ab sirf:
//    - login.html
//    - signup.html
// ke andar Firebase se handle ho raha hai
//
// Is file ka kaam sirf:
// ✔ navbar control
// ✔ session check
// ✔ logout
