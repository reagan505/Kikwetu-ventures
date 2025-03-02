const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

// Toggle Navigation on Burger Click
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  burger.classList.toggle('active');
});

const greetingElement = document.getElementById('greeting');
const currentHour = new Date().getHours();

let greetingMessage = "Welcome to Kikwetu Ventures!";
if (currentHour >= 5 && currentHour < 12) {
  greetingMessage = "Good Morning! Welcome to Kikwetu Ventures!";
} else if (currentHour >= 12 && currentHour < 18) {
  greetingMessage = "Good Afternoon! Welcome to Kikwetu Ventures!";
} else if (currentHour >= 18 && currentHour < 22) {
  greetingMessage = "Good Evening! Welcome to Kikwetu Ventures!";
} else {
  greetingMessage = "Hello! Welcome to Kikwetu Ventures!";
}

greetingElement.textContent = greetingMessage;