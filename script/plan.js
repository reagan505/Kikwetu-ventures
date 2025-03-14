// document.addEventListener("DOMContentLoaded", () => {
//   const tripForm = document.getElementById("trip-planner");
//   const nextButton = document.getElementById("next-button");
//   const progressBarFill = document.getElementById("progress-bar-fill");

//   // Initialize dynamic steps
//   const stepsContainer = document.getElementById("dynamic-steps");
//   let currentStep = 0;

//   // Sample cost data for calculations
//   const costData = {
//     destination: { "Uweza art gallery": 2000, "kibera art district": 3000, "Mtaa Safi": 2500, "ngong_hills": 4000 },
//     experience: { adventure: 1000, relaxation: 800, cultural: 1200 },
//     meals: { standard: 500, premium: 1000, local: 700 },
//     transportation: { bus: 300, car: 1000, walking: 0 },
//     activities: { community_walk: 500, local_cuisine: 800, crafts_shopping: 600, storytelling: 700 },
//   };

//   function calculateTotalCost() {
//     const destination = tripForm.destination.value;
//     const experience = tripForm["travel-type"].value;
//     const meals = tripForm.meals.value;
//     const transportation = tripForm.transportation.value;
//     const activities = Array.from(tripForm.activities.selectedOptions).map(opt => opt.value);
//     const duration = parseInt(tripForm.duration.value) || 0;

//     let totalCost = 0;

//     if (destination) totalCost += costData.destination[destination];
//     if (experience) totalCost += costData.experience[experience];
//     if (meals) totalCost += costData.meals[meals];
//     if (transportation) totalCost += costData.transportation[transportation];
//     if (activities.length) {
//       totalCost += activities.reduce((sum, activity) => sum + costData.activities[activity], 0);
//     }
//     totalCost *= duration;

//     return totalCost;
//   }

//   function updateProgressBar() {
//     const steps = 4; // Example total steps
//     progressBarFill.style.width = `${((currentStep + 1) / steps) * 100}%`;
//   }

//   function showSummary() {
//     const totalCost = calculateTotalCost();
//     stepsContainer.innerHTML = `
//       <div class="summary">
//         <h3>Trip Summary</h3>
//         <p><strong>Total Cost:</strong> KES ${totalCost}</p>
//         <button id="proceed-to-payment" class="primary-btn">Proceed to Payment</button>
//       </div>
//     `;

//     const proceedButton = document.getElementById("proceed-to-payment");
//     proceedButton.addEventListener("click", async () => {
//       await processPayment(totalCost);
//     });
//   }

//   async function processPayment(totalCost) {
//     try {
//       const response = await fetch("http://localhost:5000/submit-order", { // Update with your backend API endpoint
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: totalCost,
//           description: "Custom Trip to Kibra",
//           currency: "KES",
//           callback_url: "https://your-website.com/payment-success",
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.redirect_url) {
//         window.location.href = data.redirect_url; // Redirect user to payment URL
//       } else {
//         console.error("Payment initiation failed", data);
//         alert("Failed to initiate payment. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error processing payment", error);
//       alert("An error occurred while processing payment. Please try again later.");
//     }
//   }

//   nextButton.addEventListener("click", () => {
//     if (currentStep === 0) {
//       const isValid = validateForm();
//       if (!isValid) {
//         alert("Please fill out all required fields.");
//         return;
//       }

//       currentStep++;
//       updateProgressBar();
//       showSummary();
//     }
//   });

//   function validateForm() {
//     const requiredFields = [
//       tripForm.destination,
//       tripForm["travel-type"],
//       tripForm.meals,
//       tripForm.transportation,
//       tripForm.duration,
//     ];

//     return requiredFields.every(field => field.value.trim() !== "");
//   }
// });








// document.addEventListener('DOMContentLoaded', () => {
// const burger = document.querySelector('.burger');
// const nav = document.querySelector('.nav');

// if (burger && nav) {
//     burger.addEventListener('click', () => {
//         nav.classList.toggle('active');
//         burger.classList.toggle('toggle');
//     });
// } else {
//     console.error("Elements with classes '.burger' or '.nav' are missing in the HTML.");
// }
// });


// // Canvas Background Pattern
// const canvas = document.getElementById('backgroundCanvas');
// const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// function drawPattern() {
// const colors = ['#ffffff33', '#ffffff44', '#ffffff22'];
// for (let i = 0; i < 200; i++) {
//     ctx.beginPath();
//     ctx.arc(
//         Math.random() * canvas.width,
//         Math.random() * canvas.height,
//         Math.random() * 50,
//         0,
//         Math.PI * 2
//     );
//     ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
//     ctx.fill();
// }
// }

// drawPattern();
// window.addEventListener('resize', () => {
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// drawPattern();
// });