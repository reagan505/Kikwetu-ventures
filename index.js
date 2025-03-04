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


window.formbutton = window.formbutton || function () {
  (formbutton.q = formbutton.q || []).push(arguments);
};
formbutton("create", {
  action: "https://formspree.io/f/mqkrrllr",
  title: "How can we help?",
  fields: [
    {
      type: "email",
      label: "Email:",
      name: "email",
      required: true,
      placeholder: "your@email.com"
    },
    {
      type: "textarea",
      label: "Message:",
      name: "message",
      placeholder: "What's on your mind?"
    },
    {
      type: "submit"
    }
  ],
  styles: {
    title: {
      backgroundColor: "#5faf58",
      color: "#fff",
      fontSize: "18px",
      padding: "10px",
      borderRadius: "5px"
    },
    button: {
      backgroundColor: "#366e1c",
      color: "#fff",
      fontSize: "16px",
      padding: "10px 15px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease"
    },
    input: {
      border: "1px solid #5faf58",
      borderRadius: "4px",
      padding: "8px",
      fontSize: "14px",
      marginBottom: "10px"
    },
    textarea: {
      border: "1px solid #5faf58",
      borderRadius: "4px",
      padding: "8px",
      fontSize: "14px",
      marginBottom: "10px"
    }
  },
  onHover: {
    button: { backgroundColor: "#5faf58" }
  }
});
