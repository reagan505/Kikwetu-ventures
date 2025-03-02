const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

showSignup.addEventListener('click', () => {
  signupForm.classList.add('visible');
  loginForm.classList.remove('visible');
  showSignup.classList.add('active');
  showLogin.classList.remove('active');
});

showLogin.addEventListener('click', () => {
  loginForm.classList.add('visible');
  signupForm.classList.remove('visible');
  showLogin.classList.add('active');
  showSignup.classList.remove('active');
});

document.querySelectorAll('.show-password input').forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const inputs = e.target.closest('form').querySelectorAll('input[type="password"]');
    inputs.forEach((input) => (input.type = e.target.checked ? 'text' : 'password'));
  });
});
