// Form Validation Script
const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Show error message
function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  error.style.display = 'block';
}

// Hide error message
function hideError(input) {
  const error = input.nextElementSibling;
  error.style.display = 'none';
}

// Validate form fields
form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = true;

  // Validate username
  if (username.value.length < 3) {
    showError(username, 'Username must be at least 3 characters');
    valid = false;
  } else {
    hideError(username);
  }

  // Validate email (Faculty ID)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    showError(email, 'Please enter a valid Faculty ID.');
    valid = false;
  } else {
    hideError(email);
  }

  // Validate password
  if (password.value.length < 6) {
    showError(password, 'Password must be at least 6 characters');
    valid = false;
  } else {
    hideError(password);
  }

  if (valid) {
    alert('Sign-up successful!');
    form.reset();
  }
});
const signInLink = document.getElementById('signInLink');

signInLink.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default link behavior
  document.body.classList.add('fade-in'); // Add fade-out class to the body

  // Wait for the animation to finish before redirecting
  setTimeout(() => {
    window.location.href = 'signin.html'; // Redirect to the sign-in page
  }, 500); // Match the duration of your fade-out animation
});