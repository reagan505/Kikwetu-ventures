document.querySelector('.cta').addEventListener('click', () => {
  alert('Welcome! Let’s get started.');
  // Add additional functionality here
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentIndex = 0;
  let autoplay;

  // Update carousel to move to the current index
  const updateCarousel = () => {
      const offset = -currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;
      fadeInItem(); // Trigger fade effect for new item
  };

  // Fade-in effect on carousel items
  const fadeInItem = () => {
      items.forEach((item, index) => {
          if (index === currentIndex) {
              item.style.opacity = 1; // Show the current item
          } else {
              item.style.opacity = 0; // Hide other items
          }
      });
  };

  // Move to the next item
  const moveToNext = () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
  };

  // Move to the previous item
  const moveToPrev = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
  };

  // Handle autoplay functionality
  const startAutoplay = () => {
      if (!autoplay) { // Prevent multiple intervals
          autoplay = setInterval(moveToNext, 3000);
      }
  };

  // Stop autoplay
  const stopAutoplay = () => {
      clearInterval(autoplay);
      autoplay = null;
  };

  // Event listeners for prev/next buttons
  prevButton.addEventListener('click', () => {
      stopAutoplay(); // Stop autoplay when user manually clicks
      moveToPrev();
      startAutoplay(); // Restart autoplay after a manual click
  });
  nextButton.addEventListener('click', () => {
      stopAutoplay();
      moveToNext();
      startAutoplay();
  });

  // Auto-play functionality (starts when the page is loaded)
  startAutoplay();

  // Pause autoplay on hover
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', startAutoplay);

  // Initialize the carousel
  updateCarousel(); // Set initial state (first item)
});


document.querySelector('.burger').addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
});

