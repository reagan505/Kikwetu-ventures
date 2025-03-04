document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.getElementById("next-button");
  const stepsContainer = document.getElementById("dynamic-steps");

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
    } else {
      alert("Please fill out all fields.");
    }
  });

  const isFormValid = ({ destination, travelType, meals, transportation, activities, duration }) =>
    destination && travelType && meals && transportation && activities?.length > 0 && duration;

  const renderSummary = ({ destination, travelType, meals, transportation, activities, duration }) => {
    const [destinationName, destinationPrice] = destination.split("|");
    const [mealsType, mealsPrice] = meals.split("|");
    const [transportationType, transportationPrice] = transportation.split("|");

    const totalCost =
      parseFloat(destinationPrice) +
      parseFloat(mealsPrice) +
      parseFloat(transportationPrice);

    stepsContainer.innerHTML = `
      <div class="step active">
        <h3>Summary of Your Trip</h3>
        <p><strong>Destination:</strong> ${destinationName}</p>
        <p><strong>Experience:</strong> ${travelType}</p>
        <p><strong>Meals:</strong> ${mealsType}</p>
        <p><strong>Transportation:</strong> ${transportationType}</p>
        <p><strong>Activities:</strong> ${activities.join(", ")}</p>
        <p><strong>Duration:</strong> ${duration} days</p>
        <p><strong>Total Cost:</strong> $${totalCost.toFixed(2)}</p>
        <button id="confirm-booking">Confirm & Pay</button>
      </div>`;

    document.getElementById("confirm-booking").addEventListener("click", () =>
      initiatePayment(totalCost)
    );
  };

  const initiatePayment = (amount) => {
    const intasend = new window.IntaSend({
      publicAPIKey: "ISPubKey_test_8aacd2a6-ba3b-453a-913c-246fd6300376", // Replace with your actual IntaSend public key
      live: false,
    });

    intasend.checkout({
      amount: (amount * 100).toFixed(0), // Convert to cents
      currency: "USD",
      email: "customer@example.com",
      description: "Trip Payment",
      onComplete: (results) => {
        console.log("Payment successful", results);
        alert("Payment successful! Enjoy your trip.");
      },
      onError: (error) => {
        console.error("Payment failed", error);
        alert("Payment failed. Please try again.");
      },
    });
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
