
function saveChanges(field) {
  const value = document.getElementById(field + 'Input').value;
  alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated to: ${value}`);
}

// Email Modal Validation
document.querySelector('#emailModal .btn-primary').addEventListener('click', function () {
  const emailInput = document.getElementById('emailInput').value.trim();
  const confirmPassword = document.getElementById('emailConfirmInput').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput)) {
    return; // No alert, just exit the function
  }

  if (confirmPassword === '') {
    return; // No alert, just exit the function
  }

  // Logic for success here (you can add backend logic later)
});

// Password Modal Validation
document.querySelector('#passwordModal .btn-primary').addEventListener('click', function () {
  const oldPassword = document.getElementById('oldPasswordInput').value.trim();
  const newPassword = document.getElementById('newPasswordInput').value.trim();
  const confirmPassword = document.getElementById('confirmPasswordInput').value.trim();

  if (oldPassword === '') {
    return; // No alert, just exit the function
  }

  if (newPassword.length < 8) {
    return; // No alert, just exit the function
  }

  if (newPassword !== confirmPassword) {
    return; // No alert, just exit the function
  }

  // Logic for success here (you can add backend logic later)
});

// Faculty ID Modal Validation
document.querySelector('#facultyIdModal .btn-primary').addEventListener('click', function () {
  const newFacultyId = document.getElementById('newFacultyIdInput').value.trim();
  const confirmPassword = document.getElementById('confirmFacultyIdInput').value.trim();

  if (newFacultyId === '') {
    return; // No alert, just exit the function
  }

  if (newFacultyId.length !== 6 || isNaN(newFacultyId)) {
    return; // No alert, just exit the function
  }

  if (confirmPassword === '') {
    return; // No alert, just exit the function
  }

  // Logic for success here (you can add backend logic later)
});
