const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");

// Dark/Light toggle functionality
darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

// Submenu functionality
submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

// Adjust sidebar based on window width
if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}

function toggleDropUp() {
  const dropUpMenu = document.getElementById('drop-up');
  const arrow = document.querySelector('.arrow-up');

  // Toggle the drop-up menu visibility
  dropUpMenu.classList.toggle('show');

  // Toggle the rotation of the arrow
  arrow.classList.toggle('arrow-up-rotate');
}

// Ensure the quit modal works as expected
const modal = document.getElementById("quitModal");
const signOutBtn = document.getElementById("signOutBtn");
const closeBtn = document.querySelector(".close-btn");
const confirmQuitBtn = document.getElementById("confirmQuit");

signOutBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

confirmQuitBtn.addEventListener("click", () => {
  // Perform sign-out action here
  modal.style.display = "none";
});

function toggleEditing1() {
  const editButton = document.getElementById('editButton1');
  const editableFields = document.querySelectorAll('.editable-field');
  const isEditing = editButton.textContent === 'Save';

  if (isEditing) {
      // Save data and disable editing
      editableFields.forEach(field => {
          const key = field.parentElement.getAttribute('data-editable');
          const value = field.textContent.trim();
          localStorage.setItem(key, value); // Save to localStorage
          field.contentEditable = "false"; // Disable editing
          field.classList.remove('editing'); // Remove editing styling
      });
      editButton.textContent = 'Edit'; // Switch button back to Edit
  } else {
      // Enable editing
      editableFields.forEach(field => {
          const key = field.parentElement.getAttribute('data-editable');
          field.textContent = localStorage.getItem(key) || field.textContent; // Load saved data if available
          field.contentEditable = "true"; // Enable editing
          field.classList.add('editing'); // Add editing styling
      });
      editButton.textContent = 'Save'; // Switch button to Save
  }
}
