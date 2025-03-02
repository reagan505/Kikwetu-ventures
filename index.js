const modal = document.querySelector('.modal');
const modalImg = document.querySelector('#modal-img');
const closeButton = document.querySelector('.close-button');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = item.src;
  });
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});





document.querySelector('.burger').addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
});

