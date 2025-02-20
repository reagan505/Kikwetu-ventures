document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let autoplay;

    const updateCarousel = () => {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    };

    const moveToNext = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    };

    const moveToPrev = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    };

    const startAutoplay = () => {
        autoplay = setInterval(moveToNext, 3000);
    };

    const stopAutoplay = () => {
        clearInterval(autoplay);
    };

    prevButton.addEventListener('click', () => {
        stopAutoplay();
        moveToPrev();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        moveToNext();
        startAutoplay();
    });

    document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoplay);

    updateCarousel();
    startAutoplay();
});



  document.querySelector('.burger').addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      nav.classList.toggle('active');
  });
