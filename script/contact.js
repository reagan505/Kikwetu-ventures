import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Get the form element
const contactForm = document.getElementById("contactForm");

// Add an event listener for form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Get form field values
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const country = document.getElementById("country").value.trim();
  const subject = document.getElementById("subject").value.trim();

  // Validate fields
  if (!firstname || !lastname || !country || !subject) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  try {
    // Add a new document to the "contacts" collection in Firestore
    await addDoc(collection(db, "contacts"), {
      firstname,
      lastname,
      country,
      subject,
      timestamp: serverTimestamp(), // Use Firestore server timestamp
    });

    alert("Message sent successfully!");
    contactForm.reset(); // Clear the form
  } catch (error) {
    console.error("Error saving message: ", error);
    alert("Error sending message. Please check your internet connection or try again later.");
  }
});

// Handle mobile navigation toggle
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isVisible = nav.classList.contains("active");
    nav.classList.toggle("active", !isVisible);
    burger.classList.toggle("active", !isVisible);
  });
} else {
  console.error("Burger or Nav element is missing in the DOM.");
}

