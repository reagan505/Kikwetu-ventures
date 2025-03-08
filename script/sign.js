// Import Firebase services from firebase.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Toggle between Sign-Up and Login forms
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

showSignup.addEventListener("click", () => {
  signupForm.classList.add("visible");
  loginForm.classList.remove("visible");
  showSignup.classList.add("active");
  showLogin.classList.remove("active");
});

showLogin.addEventListener("click", () => {
  loginForm.classList.add("visible");
  signupForm.classList.remove("visible");
  showLogin.classList.add("active");
  showSignup.classList.remove("active");
});

// Show/Hide Passwords
document.querySelectorAll('.show-password input').forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const inputs = e.target.closest("form").querySelectorAll('input[type="password"]');
    inputs.forEach((input) => (input.type = e.target.checked ? "text" : "password"));
  });
});

// Handle Sign-Up
signupForm.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign-Up Successful! Welcome, " + userCredential.user.email);
    console.log("User created:", userCredential.user);
    signupForm.querySelector("form").reset(); // Clear the form
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
    alert("Error signing up: " + error.message);
  }
});

// Handle Login
loginForm.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful! Welcome back, " + userCredential.user.email);
    console.log("Logged in user:", userCredential.user);
    loginForm.querySelector("form").reset(); // Clear the form
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Error logging in: " + error.message);
  }
});

