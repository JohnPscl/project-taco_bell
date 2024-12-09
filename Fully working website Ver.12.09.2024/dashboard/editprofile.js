
function previewImage(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    reader.onload = function (e) {
        const img = document.getElementById('profileImagePreview'); // Get the image element
        img.src = e.target.result; // Set the image source to the file data
    }

    if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  const userData = {
    username:'' ,
    professor:'' ,
    department: '',
    profileImageURL: '' // Sample image path
};

// Function to automatically populate fields with user data
function populateProfileFields() {
    document.getElementById('username').value = userData.username;
    document.getElementById('professor').value = userData.professor;
    document.getElementById('department1').value = userData.department;
    document.getElementById('profileImagePreview').src = userData.profileImageURL;
}

// Function to handle the image preview
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('profileImagePreview').src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Automatically populate fields on page load
window.onload = populateProfileFields;

function toggleEditing() {
    const editButton = document.getElementById('editButton');
    const inputs = document.querySelectorAll('.modal-input2'); // Select all input fields
    const isEditing = editButton.textContent === 'Save'; // Check if in editing mode
    const departmentDropdown = document.getElementById('departmentDropdown');
    const departmentText = document.getElementById('departmentText'); // Text input field

    if (isEditing) {
        // Save data
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.value = input.placeholder; // Restore placeholder if empty
            }
            input.disabled = true; // Disable fields after saving
            input.classList.remove('editing'); // Remove editing class
            localStorage.setItem(input.id, input.value); // Save value in localStorage
        });

        // Save the dropdown's selected value to the text field
        const selectedOptionText = departmentDropdown.options[departmentDropdown.selectedIndex].text;
        departmentText.value = selectedOptionText; // Save selected option to the text field
        departmentText.placeholder = selectedOptionText; // Update placeholder with the saved value

        // Hide dropdown, show text field
        departmentDropdown.style.display = 'none';
        departmentText.style.display = 'block';

        editButton.textContent = 'Edit'; // Change button text
    } else {
        // Enable editing
        inputs.forEach(input => {
            if (input.id !== 'email' && input.id !== 'facultyID') {
                // Use the current value as a placeholder
                input.placeholder = input.value || input.placeholder; // Preserve previous placeholder
                input.value = ''; // Clear the input for editing
                input.disabled = false; // Enable field for editing
                input.classList.add('editing');
            }
        });

        // Sync the dropdown to the current department text value
        const currentDepartmentText = departmentText.value || departmentText.placeholder; // Use placeholder if value is empty
        if (currentDepartmentText) {
            Array.from(departmentDropdown.options).forEach(option => {
                if (option.text === currentDepartmentText) {
                    departmentDropdown.value = option.value; // Match dropdown to the saved value
                }
            });
        }

        // Show dropdown, hide text field
        departmentDropdown.style.display = 'block';
        departmentText.style.display = 'none';

        editButton.textContent = 'Save'; // Change button text
    }
}



// Function to save changes in edit profile
function saveChanges() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const title = document.getElementById('title').value;

    // Perform validation (check if fields are not empty, valid email format, etc.)

    // Save data to local storage
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('department', department);

    // Hide the edit profile section
    document.getElementById('editProfileSection').style.display = "none";

    // Show the overview section (assuming it has an ID of "overviewSection")
    document.getElementById('overviewSection').style.display = "block";

    // Optionally disable inputs again after saving
    toggleEditing();
}

// Attach the saveChanges function to the Save button
document.getElementById('saveEditProfile').onclick = saveChanges;

// Optional: Attach a function to the cancel button
document.getElementById('cancelEditProfile').onclick = function () {
    document.getElementById('editProfileSection').style.display = "none";
    document.getElementById('overviewSection').style.display = "block";
    // Navigate to overview
};