// Generic AJAX handler for updating user details
function updateField(url, formId, fieldSelector) {
    document.getElementById(formId).addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        const formData = new FormData(this); // Collect the form data

        fetch(url, {
            method: 'POST',
            body: formData, // Send the form data to the server
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.success) {
                    document.querySelector(fieldSelector).textContent = formData.get(Object.keys(formData)[0]);
                    alert(data.message);
                    const modalId = `#${formId.replace('Form', 'Modal')}`;
                    $(modalId).modal('hide'); // Close modal after successful update
                } else {
                    alert(data.message || 'Update failed');
                }
            })
            .catch((error) => console.error('Error:', error));
    });
}

// Initialize AJAX for email, password, and faculty ID updates
updateField('update-email.php', 'updateEmailForm', '.user-email');
updateField('update-password.php', 'updatePasswordForm', '.user-password');
updateField('update-faculty-id.php', 'updateFacultyIdForm', '.user-id');
