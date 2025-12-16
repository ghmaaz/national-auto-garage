// Firebase SDKs (v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2xWj8Tycwm60CdUfXLhJjsBTXpP6wmVc",
  authDomain: "national-auto-garage.firebaseapp.com",
  projectId: "national-auto-garage",
  storageBucket: "national-auto-garage.firebasestorage.app",
  messagingSenderId: "866545378100",
  appId: "1:866545378100:web:e847dce29547ad33c8fb61"
};

// Init
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// ===============================
// EMAIL SIGNUP
// ===============================
export function emailSignup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// ===============================
// EMAIL LOGIN
// ===============================
export function emailLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// ===============================
// GOOGLE LOGIN / SIGNUP
// ===============================
export function googleLogin() {
  return signInWithPopup(auth, provider);
}

// ===============================
// LOGOUT
// ===============================
export function logoutUser() {
  return signOut(auth);
}

// ===============================
// AUTH STATE
// ===============================
export function watchAuth(callback) {
  onAuthStateChanged(auth, callback);
}
