
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


  // Function to preview the uploaded image
  function previewImage(event) {
      const preview = document.getElementById('profileImagePreview');
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(e) {
          preview.src = e.target.result; // Set the preview image source
      }
      reader.readAsDataURL(file);
  }


// Function to toggle edit mode (enables/disables the input fields)
function toggleEditMode() {
    const usernameField = document.getElementById('username');
    const professorField = document.getElementById('professor');
    const departmentField = document.getElementById('department');
    const profilePictureInput = document.getElementById('profilePicture'); // Get the profile picture input

    // Toggle the disabled property
    usernameField.disabled = !usernameField.disabled;
    professorField.disabled = !professorField.disabled;
    departmentField.disabled = !departmentField.disabled;

    // Enable or disable the file input based on edit mode
    profilePictureInput.disabled = !profilePictureInput.disabled;
}

function toggleEditing() {
    const editButton = document.getElementById('editButton');
    const inputs = document.querySelectorAll('.modal-input2'); // Select all input fields
    const isEditing = editButton.textContent === 'Save'; // Check if in editing mode

    if (isEditing) {
        // Save data
        inputs.forEach(input => {
            input.disabled = true; // Disable fields after saving
            input.classList.remove('editing'); // Remove editing class
            localStorage.setItem(input.id, input.value); // Store value in localStorage
        });

        editButton.textContent = 'Edit'; // Change button text to Edit
    } else {
        // Enable editing mode
        inputs.forEach(input => {
            input.value = localStorage.getItem(input.id) || ''; // Load saved value
            input.disabled = false; // Enable fields for editing
            input.classList.add('editing'); // Add editing class for styling
        });

        editButton.textContent = 'Save'; // Change button text to Save
    }
}



  function toggleEditing1() {
    const editButton = document.getElementById('editButton1');
    const inputs = document.querySelectorAll('.modal-input1');
    const uploadContainer = document.querySelector('.upload-container'); // Select the upload container
    const isEditing = editButton.textContent === 'Save';

    if (isEditing) {
        // Save data to local storage or perform necessary actions
        inputs.forEach(input => {
            input.disabled = true; // Disable input fields
            input.classList.remove('editing'); // Remove editing class
            localStorage.setItem(input.id, input.value); // Store value
        });

        // Hide the upload container smoothly
        uploadContainer.classList.remove('visible'); // Remove visible class
        uploadContainer.style.height = '0'; // Collapse height

        editButton.textContent = 'Edit'; // Change button text to Edit
    } else {
        // Enable input fields for editing
        inputs.forEach(input => {
            input.value = localStorage.getItem(input.id) || ''; // Load saved value
            input.disabled = false; // Enable input fields
            input.classList.add('editing'); // Add editing class for styling
        });

        // Show the upload container smoothly
        uploadContainer.style.height = 'auto'; // Set height to auto for transition
        void uploadContainer.offsetHeight; // This forces a reflow
        uploadContainer.classList.add('visible'); // Add visible class for opacity transition

        editButton.textContent = 'Save'; // Change button text to Save
    }
  }
  function saveChanges() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const title = document.getElementById('title').value;
    const navbar = document.querySelector(".navbar");

    // Perform validation (check if fields are not empty, valid email format, etc.)

    // Save data (for example, send it to the backend or save it in local storage)
    // Example for local storage:
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email)
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
  document.getElementById('cancelEditProfile').onclick = function() {
    document.getElementById('editProfileSection').style.display = "none";
    document.getElementById('overviewSection').style.display = "block";
    // Navigate to overview
  };

