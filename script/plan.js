document.addEventListener("DOMContentLoaded", () => {
    const prices = {
      destinations: {
        "Uweza art gallery": 500,
        "kibera art district": 300,
        "Mtaa Safi": 200,
        Kibera: 400,
      },
      meals: {
        standard: 50,
        premium: 100,
        local: 70,
      },
      transportation: {
        bus: 20,
        car: 100,
        walking: 0,
      },
    };

    const nextButton = document.getElementById("next-button");
    const stepsContainer = document.getElementById("dynamic-steps");
    const progressBarFill = document.getElementById("progress-bar-fill");

    // Update progress bar dynamically
    const updateProgressBar = (percentage) => {
      progressBarFill.style.width = `${percentage}%`;
      progressBarFill.style.transition = "width 0.5s ease-in-out";
    };

    nextButton.addEventListener("click", () => {
      const formData = {
        destination: document.getElementById("destination")?.value,
        travelType: document.getElementById("travel-type")?.value,
        meals: document.getElementById("meals")?.value,
        transportation: document.getElementById("transportation")?.value,
        activities: Array.from(
          document.getElementById("activities")?.selectedOptions || []
        ).map((opt) => opt.value),
        duration: document.getElementById("duration")?.value,
      };

      if (isFormValid(formData)) {
        renderSummary(formData);
        updateProgressBar(100);
      } else {
        showToast("Please fill out all required fields before proceeding.");
        updateProgressBar(50); // Partially completed
      }
    });

    // Validate form fields
    const isFormValid = ({
      destination,
      travelType,
      meals,
      transportation,
      activities,
      duration,
    }) => {
      const requiredFields = { destination, travelType, meals, transportation, duration };
      let allValid = true;

      Object.entries(requiredFields).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (!value) {
          allValid = false;
          element?.classList.add("error-highlight");
        } else {
          element?.classList.remove("error-highlight");
        }
      });

      return allValid && activities.length > 0;
    };

    // Render trip summary with cost breakdown
    const renderSummary = ({
      destination,
      travelType,
      meals,
      transportation,
      activities,
      duration,
    }) => {
      const totalCost =
        prices.destinations[destination] +
        prices.meals[meals] +
        prices.transportation[transportation];

      stepsContainer.innerHTML = `
        <div class="step active summary-card">
          <h3>Trip Summary</h3>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Experience:</strong> ${travelType}</p>
          <p><strong>Meal Plan:</strong> ${meals} ($${prices.meals[meals]})</p>
          <p><strong>Transportation:</strong> ${transportation} ($${prices.transportation[transportation]})</p>
          <p><strong>Activities:</strong> ${activities.join(", ")}</p>
          <p><strong>Duration:</strong> ${duration} days</p>
          <hr>
          <p><strong>Total Cost:</strong> $${(totalCost * duration).toFixed(2)}</p>
          <button id="confirm-booking" class="primary-btn">Confirm Booking</button>
        </div>
      `;

      document
        .getElementById("confirm-booking")
        .addEventListener("click", () => confirmBooking(totalCost * duration));
    };

    // Confirm booking with a toast notification
    const confirmBooking = (amount) => {
      showToast(
        `Your booking has been confirmed! Total amount: $${amount.toFixed(2)}. Enjoy your trip!`,
        "success"
      );
      console.log("Booking confirmed. Total amount:", amount);
    };

    // Display a toast notification
    const showToast = (message, type = "info") => {
      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.innerText = message;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s ease";
      }, 3000);

      setTimeout(() => {
        toast.remove();
      }, 3500);
    };
  });







document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          nav.classList.toggle('active');
          burger.classList.toggle('toggle');
      });
  } else {
      console.error("Elements with classes '.burger' or '.nav' are missing in the HTML.");
  }
});


// Canvas Background Pattern
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawPattern() {
  const colors = ['#ffffff33', '#ffffff44', '#ffffff22'];
  for (let i = 0; i < 200; i++) {
      ctx.beginPath();
      ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 50,
          0,
          Math.PI * 2
      );
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fill();
  }
}

drawPattern();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawPattern();
});
