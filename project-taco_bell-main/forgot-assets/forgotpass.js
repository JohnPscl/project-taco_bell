// Form Validation Script
const form = document.getElementById('reset-password-form'); // Ensure the form is selected correctly
const email = document.getElementById('email');
const faculty = document.getElementById('faculty');
const newPassword = document.getElementById('new1password');
const confirmPassword = document.getElementById('confirmpassword');

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
  e.preventDefault(); // Prevent the form from submitting

  let valid = true;

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    showError(email, 'Please enter a valid email address.');
    valid = false;
  } else {
    hideError(email);
  }

  // Validate faculty ID
  if (faculty.value.length < 3) {
    showError(faculty, 'Faculty ID must be at least 3 characters');
    valid = false;
  } else {
    hideError(faculty);
  }

  // Validate new password
  if (newPassword.value.length < 6) {
    showError(newPassword, 'Password must be at least 6 characters');
    valid = false;
  } else {
    hideError(newPassword);
  }

  // Validate confirm password
  if (confirmPassword.value !== newPassword.value) {
    showError(confirmPassword, 'Passwords do not match');
    valid = false;
  } else {
    hideError(confirmPassword);
  }
  if (valid) {
    alert('Password reset successful!');
    form.reset();
  }

});

// Redirect to create account page
const signInLink = document.querySelector('.create a');

signInLink.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default link behavior
  document.body.classList.add('fade-in'); // Add fade-in class to the body

  // Wait for the animation to finish before redirecting
  setTimeout(() => {
    window.location.href = 'signin.html'; // Redirect to the create account page
  }, 500); // Match the duration of your fade-out animation
});
