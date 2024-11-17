const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");

// Remove the sidebarOpen variable and its event listener
// const sidebarOpen = document.querySelector("#sidebarOpen");
// sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

// You can directly ensure the sidebar is always open
sidebar.classList.remove("close");



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
  const contentMain = document.querySelector(".contentMain");

  // Cancel and Save buttons
  const cancelEditProfileBtn1 = document.getElementById('cancelEditProfile1');
  const saveEditProfileBtn1 = document.getElementById('saveEditProfile1');
  const cancelEditProfileBtn = document.getElementById('cancelEditProfile');
  const saveEditProfileBtn = document.getElementById('saveEditProfile');

  // Show a specific section and hide everything else
  function toggleSection(sectionToShow) {
    // Hide all sections and navbar
    editProfileSection.style.display = "none";
    accountSettingsContent.style.display = "none";
    navbar.style.visibility = "hidden"; // Use visibility instead of display to retain layout
    contentMain.style.display = "none"; // Hide contentMain completely

    // Prevent scrolling
    document.body.classList.add('no-scroll');

    // Show only the specified section
    if (sectionToShow === "editProfile") {
      editProfileSection.style.display = "block";
    } else if (sectionToShow === "accountSettings") {
      accountSettingsContent.style.display = "block";
    }
  }

  // Return to the main view with all original elements restored
  function restoreMainView() {
    // Hide all sections
    editProfileSection.style.display = "none";
    accountSettingsContent.style.display = "none";

    // Restore navbar and main content visibility
    navbar.style.visibility = "visible";
    contentMain.style.display = "block"; // Show contentMain again

    // Enable scrolling
    document.body.classList.remove('no-scroll');
  }

  // Event listeners for navigating between sections
  editProfileLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("editProfile");
  });

  accountSettingLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("accountSettings");
  });

  // Event listeners for Cancel and Save buttons in Edit Profile
  cancelEditProfileBtn.addEventListener('click', restoreMainView);
  saveEditProfileBtn.addEventListener('click', function () {
    // Optional save logic here
    restoreMainView();
  });

  // Event listeners for Cancel and Save buttons in Account Settings
  cancelEditProfileBtn1.addEventListener('click', restoreMainView);
  saveEditProfileBtn1.addEventListener('click', function () {
    // Optional save logic here
    restoreMainView();
  });
});




// Function to toggle the visibility of the dropdown menu
function toggleMenu(event) {
  event.stopPropagation(); // Prevent click from bubbling to the document

  const threeDots = event.target; // The clicked three dots icon
  const card = threeDots.closest('.card'); // Find the card containing the three dots
  const dropdownMenu = card.querySelector('.dropdown-menu'); // Find the dropdown inside the card

  // Toggle the visibility of the dropdown menu (show/hide)
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Hide dropdown on outside click
document.addEventListener('click', function(event) {
  // Close the dropdown if clicked outside
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(dropdownMenu => {
    if (!dropdownMenu.contains(event.target) && !event.target.matches('.three-dots')) {
      dropdownMenu.style.display = 'none'; // Hide if the click was outside
    }
  });
});


// Function to open the PDF in the modal
function openPdfInModal(pdfPath) {
  const modal = document.getElementById('modal-card');
  const iframe = document.getElementById('modal-pdf');

  // Set the src of the iframe to the selected PDF file
  iframe.src = pdfPath;

  // Show the modal
  modal.style.display = 'flex'; // Center the modal content
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('modal-card');
  modal.style.display = 'none'; // Hide the modal

  // Reset the iframe src to clear the content when modal is closed
  const iframe = document.getElementById('modal-pdf');
  iframe.src = '';
}

// Event listener for closing the modal when clicking the close button
document.getElementById('modal-card-close').addEventListener('click', closeModal);

// Function to handle clicking the card and opening the modal with the PDF from data-pdf-src
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function(event) {
    // Ensure that the card click is not triggering the dropdown
    if (event.target.matches('.three-dots')) return;

    const pdfPath = card.getAttribute('data-pdf-src'); // Get the data-pdf-src attribute of the clicked card
    if (pdfPath) {
      openPdfInModal(pdfPath); // Open the PDF in the modal
    }
  });
});

// Close the modal when clicking the overlay (background)
const modalOverlay = document.getElementById('modal-card');
modalOverlay.addEventListener('click', function(event) {
  // Check if the clicked target is the overlay itself (not the modal content)
  if (event.target === modalOverlay) {
    closeModal(); // Close the modal when clicking on the overlay
  }
});

// Separate toggle function for dropdown in the second menu (dropdown-menu1)
function toggleMenu1(event) {
  event.stopPropagation(); // Prevent click from bubbling to the document

  const threeDots = event.target; // The clicked three dots icon
  const card = threeDots.closest('.card'); // Find the card containing the three dots
  const dropdownMenu = card.querySelector('.dropdown-menu1'); // Find the dropdown inside the card

  // Toggle the visibility of the dropdown menu (show/hide)
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Hide dropdown on outside click for the second menu
document.addEventListener('click', function(event) {
  const dropdownMenus = document.querySelectorAll('.dropdown-menu1');
  dropdownMenus.forEach(dropdownMenu => {
    if (!dropdownMenu.contains(event.target) && !event.target.matches('.three-dots')) {
      dropdownMenu.style.display = 'none'; // Hide if the click was outside
    }
  });
});
