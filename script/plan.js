document.addEventListener("DOMContentLoaded", () => {
  const planButton = document.getElementById("plan-button");

  planButton.addEventListener("click", () => {
      const destination = document.getElementById("destination").value.trim();
      const travelType = document.getElementById("travel-type").value.trim();
      const duration = document.getElementById("duration").value.trim();
      const budget = document.getElementById("budget").value.trim();

      const messageBox = document.createElement("div");
      messageBox.classList.add("message-box");

      // Clear previous messages
      document.querySelector(".main-container").appendChild(messageBox);
      const existingMessage = document.querySelector(".message-box");
      if (existingMessage) existingMessage.remove();

      // Validation
      if (!destination || !travelType || !duration || !budget) {
          messageBox.innerHTML = `<p class="error">⚠️ Please fill out all the fields to plan your trip.</p>`;
      } else {
          messageBox.innerHTML = `
              <div class="success">
                  ✅ <p>Your trip to <strong>${destination}</strong> (${travelType}) for <strong>${duration} days</strong> with a budget of <strong>$${budget}</strong> is being planned!</p>
              </div>
          `;
      }

      document.querySelector(".footer").appendChild(message);
  });
});


document.querySelector('.cta').addEventListener('click', () => {
  alert('Welcome! Let’s get started.');
  // Add additional functionality here
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
});

