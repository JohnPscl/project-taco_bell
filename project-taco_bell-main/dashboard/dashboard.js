const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");

// Remove the sidebarOpen variable and its event listener
// const sidebarOpen = document.querySelector("#sidebarOpen");
// sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

// You can directly ensure the sidebar is always open
sidebar.classList.remove("close");

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

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

// Get elements
const modal = document.getElementById("quitModal");
const signOutBtn = document.getElementById("signOutBtn");
const closeBtn = document.querySelector(".close-btn");
const confirmQuit = document.getElementById("confirmQuit");
const cancelQuit = document.getElementById("cancelQuit");

// Open modal when "Sign Out" button is clicked
signOutBtn.onclick = function(event) {
  event.preventDefault(); // Prevent default link action
  modal.style.display = "flex"; // Show modal
}

// Close modal when the "x" (close) button is clicked
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Confirm sign out action
confirmQuit.onclick = function() {
  // Perform the sign out action here, e.g., redirect to login page
  window.location.href = 'index.html'; // Example action
}

// Cancel quit action (hide the modal)
cancelQuit.onclick = function() {
  modal.style.display = "none";
}

// Close modal if user clicks anywhere outside of the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function loadContent(page) {
  const contentArea = document.getElementById('contentArea');

  // Fetch the HTML content
  fetch(page)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(html => {
          contentArea.innerHTML = html; // Replace the content without transitions
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}

const searchInput = document.querySelector('.search-bar input[type="text"]');
const clearSearchButton = document.querySelector('.clear-search');

// Add an input event listener to the search input
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() !== '') {
    clearSearchButton.style.display = 'flex'; // Show the "X" button when there is text
  } else {
    clearSearchButton.style.display = 'none'; // Hide the "X" button when there is no text
  }
});

// Add an event listener to clear the input field when the "X" button is clicked
clearSearchButton.addEventListener('click', () => {
  searchInput.value = ''; // Clear the input field
  clearSearchButton.style.display = 'none'; // Hide the "X" button
});
document.addEventListener("DOMContentLoaded", function () {
  const editProfileLink = document.getElementById('editProfileLink');
  const editProfileSection = document.getElementById('editProfileSection');
  const accountSettingLink = document.getElementById('accountSettingLink');
  const accountSettingsContent = document.getElementById('accountSettingsContent');
  const navbar = document.querySelector(".navbar");

  // Cancel and Save buttons for Account Settings
  const cancelEditProfileBtn1 = document.getElementById('cancelEditProfile1');
  const saveEditProfileBtn1 = document.getElementById('saveEditProfile1');

  // Toggle visibility of sections
  function toggleSection(sectionToShow) {
    // Hide both sections initially
    editProfileSection.style.display = "none";
    accountSettingsContent.style.display = "none";
    
    // Show the appropriate section
    if (sectionToShow === "editProfile") {
      editProfileSection.style.display = "block";
      navbar.style.display = "none";
    } else if (sectionToShow === "accountSettings") {
      accountSettingsContent.style.display = "block";
      navbar.style.display = "none";
    }
  }

  // Show Edit Profile Section
  editProfileLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("editProfile");
  });

  // Show Account Settings Section
  accountSettingLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("accountSettings");
  });

  // Cancel button for Account Settings
  cancelEditProfileBtn1.addEventListener('click', function () {
    accountSettingsContent.style.display = "none";
    navbar.style.display = "flex"; // Show the navbar again
  });

  // Save button for Account Settings
  saveEditProfileBtn1.addEventListener('click', function () {
    // Add any save logic here if needed
    accountSettingsContent.style.display = "none";
    navbar.style.display = "flex"; // Show the navbar again
  });
});
