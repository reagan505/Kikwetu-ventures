document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById("next-button");

    nextButton.addEventListener("click", () => {
        const destination = document.getElementById("destination").value.trim();
        const travelType = document.getElementById("travel-type").value.trim();
        const duration = document.getElementById("duration").value.trim();

        const errorMessage = document.querySelector(".error-message");
        if (errorMessage) {
            errorMessage.remove(); // Clear any existing error messages
        }

        // Redirect to the next page if fields are valid
        if (destination && travelType && duration) {
            window.location.href = "user.html"; // Replace with the actual URL of the next page
        } else {
            // Display an error message
            const form = document.getElementById("trip-planner");
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-message");
            errorDiv.textContent = "⚠️ Please fill out all the fields to proceed.";
            errorDiv.style.color = "red";
            errorDiv.style.marginTop = "1rem";
            form.appendChild(errorDiv);
        }
    });
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
