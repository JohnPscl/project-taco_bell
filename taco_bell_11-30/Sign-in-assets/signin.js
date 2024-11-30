// Select the login button and form elements
const loginButton = document.querySelector('.login-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Function to display generic error messages
function showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    errorElement.innerText = message; // Itinatak ang mensahe sa span
    errorElement.style.display = "inline"; // Ipinapakita ito sa inline para maipakita sa loob ng label
}

// Function to clear error messages
function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((el) => {
        el.style.display = "none"; // Itinatago ang lahat ng error messages
    });
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Event listener para sa button click
loginButton.addEventListener('click', function (event) {
    event.preventDefault(); // Pigilan ang default form submission
    clearErrors(); // I-clear ang dating error messages

    // Kunin ang mga input values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs
    let hasError = false;

    // Email validation
    if (email === '') {
        showError('email', 'Wrong email.'); // Gawing generic ang mensahe
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('email', 'Wrong email.'); // Gawing generic ang mensahe
        hasError = true;
    }

    // Password validation
    if (password === '') {
        showError('password', 'Wrong password.'); // Gawing generic ang mensahe
        hasError = true;
    }

    if (!hasError) {
        // I-display ang success message o gawin ang ibang actions kung walang error
        alert(`Login successful! Email sent to ${email}.`);

        // Reset the form fields
        emailInput.value = '';
        passwordInput.value = '';
    }
});
