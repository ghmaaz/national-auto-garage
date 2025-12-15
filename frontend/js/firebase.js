// 🔥 Firebase SDKs (Web v10 – browser compatible)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2xWj8Tycwm60CdUfXLhJjsBTXpP6wmVc",
  authDomain: "national-auto-garage.firebaseapp.com",
  projectId: "national-auto-garage",
  storageBucket: "national-auto-garage.firebasestorage.app",
  messagingSenderId: "866545378100",
  appId: "1:866545378100:web:e847dce29547ad33c8fb61"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ EXPORT FUNCTION (IMPORTANT)
export function googleSignup() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.displayName || "User");

      alert("Google signup successful!");
      window.location.href = "booking.html";
    })
    .catch((error) => {
      console.error("Google Signup Error:", error);
      alert("Google signup failed. Try again.");
    });
}
