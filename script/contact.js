document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const successMessage = document.createElement("p");
    successMessage.textContent = "Thank you for your message! We will get back to you soon.";
    successMessage.style.color = "#366e1c";
    successMessage.style.fontWeight = "bold";
    successMessage.style.textAlign = "center";
    successMessage.style.marginTop = "20px";

    form.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  burger.addEventListener("click", () => {
    const isVisible = nav.getAttribute("data-visible") === "true";
    nav.setAttribute("data-visible", !isVisible);
    burger.classList.toggle("active");
  });
});

