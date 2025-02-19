const hamburger = document.getElementById('hamburger');
const navContainer = document.querySelector('.nav');
const sections = document.querySelectorAll('section');
const windowHeight = window.innerHeight;
const revealPoint = 150;

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  navContainer.classList.toggle('active');
});

// Debounce function to limit scroll handler execution
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Optimized scroll event to reveal sections
const revealSections = () => {
  sections.forEach((section) => {
    if (!section.classList.contains('visible')) {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add('visible');
      }
    }
  });
};

// Apply debounce for better reactivity
window.addEventListener('scroll', debounce(revealSections, 50));
