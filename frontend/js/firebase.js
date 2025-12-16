// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2xWj8Tycwm60CdUfXLhJjsBTXpP6wmVc",
  authDomain: "national-auto-garage.firebaseapp.com",
  projectId: "national-auto-garage",
  storageBucket: "national-auto-garage.appspot.com",
  messagingSenderId: "866545378100",
  appId: "1:866545378100:web:e847dce29547ad33c8fb61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* =========================
   EMAIL SIGNUP
========================= */
export function emailSignup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(res => {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", res.user.email);
      return res;
    });
}

/* =========================
   EMAIL LOGIN
========================= */
export function emailLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", res.user.email);
      return res;
    });
}

/* =========================
   GOOGLE LOGIN / SIGNUP
========================= */
export function googleLogin() {
  return signInWithPopup(auth, provider)
    .then(res => {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", res.user.email);
      return res;
    });
}
