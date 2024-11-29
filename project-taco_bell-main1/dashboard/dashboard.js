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

});

// Function to toggle the visibility of the dropdown menu
function toggleMenu(event) {
  event.stopPropagation(); // Prevent propagation to avoid unwanted closing

  // Close any other active dropdowns before showing the current one
  const activeMenus = document.querySelectorAll(".dropdown-menu.active");
  activeMenus.forEach((menu) => {
    if (menu !== event.target.closest(".card").querySelector(".dropdown-menu")) {
      menu.classList.remove("active");
    }
  });

  // Find the card element containing the clicked three dots
  const card = event.target.closest(".card");

  // Look for the dropdown menu inside the card
  let dropdownMenu = card.querySelector(".dropdown-menu");

  // If no dropdown exists, create a new one dynamically
  if (!dropdownMenu) {
    dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu", "active"); // Add active class for visibility
    dropdownMenu.innerHTML = `
      <ul>
        <li><a href="#">File Information</a></li>
        <li><a href="#">Move to Trash</a></li>
      </ul>
    `;
    card.appendChild(dropdownMenu); // Append the new dropdown to the card
  } else {
    // Toggle the dropdown's visibility
    dropdownMenu.classList.toggle("active");
  }

  // Toggle the scroll behavior of the PDF container based on the dropdown visibility
  const pdfContainer = card.querySelector(".pdf-container");

  // If dropdown is visible, disable scrolling inside the iframe and container
  if (dropdownMenu.classList.contains("active")) {
    pdfContainer.style.overflow = "hidden"; // Hide scrollbars
  } else {
    pdfContainer.style.overflow = "auto"; // Enable scrollbars when dropdown is not visible
  }
}

// Add listener to close all dropdowns when clicking outside
document.addEventListener("click", () => {
  const activeMenus = document.querySelectorAll(".dropdown-menu.active");
  activeMenus.forEach((menu) => menu.classList.remove("active")); // Remove active class
  
  // Also reset the PDF container's overflow when closing the dropdown
  const pdfContainer = document.querySelector(".pdf-container");
  if (pdfContainer) {
    pdfContainer.style.overflow = "auto"; // Re-enable scrolling if dropdown is closed
  }
});







// Get elements
const openNewModal = document.getElementById('openNewModal');
const newModal = document.getElementById('newModal');
const closeBtnNew = document.querySelector('.close-btn-new'); // Updated selector
const saveNewItem = document.getElementById('saveNewItem');
const cancelNewItem = document.getElementById('cancelNewItem');
const fileInput = document.getElementById('fileInput');
const fileChosenText = document.querySelector('.file-chosen-text');
const removeFileBtn = document.querySelector('.remove-file-btn'); // X button for removing the file
const openFilter = document.getElementById('openFilter'); // Filter button
const filterModal = document.querySelector('.modal-filter'); // Filter modal
const closeFilterBtn = document.querySelector('.close-btn-filter'); // Close button for filter modal
const cardContainer = document.getElementById('card-container'); // Target the card container
const cardCounter = document.getElementById('card-counter'); // Element to display card count

// Open new item modal
openNewModal.addEventListener('click', () => {
  newModal.style.display = 'flex'; // or 'block' depending on your CSS
});

// Close new item modal when 'X' button is clicked
closeBtnNew.addEventListener('click', () => {
  newModal.style.display = 'none';
});

// Save new item and close modal
saveNewItem.addEventListener('click', () => {
  // Get values from input fields
  const fileInputElement = fileInput.files[0];
  const fileName = document.getElementById('fileLocation').value || "Untitled"; // Default title

  // Check if file input is provided
  if (!fileInputElement) {
    alert('Please upload a file before saving.');
    return;
  }

  // Generate a temporary URL for the uploaded file
  const fileURL = URL.createObjectURL(fileInputElement); // Temporary URL

// Create a new card element
const newCard = document.createElement('div');
newCard.classList.add('card');
newCard.setAttribute('data-pdf-src', fileURL); // Store PDF URL in card attribute

// Add content to the new card
newCard.innerHTML = `
  <div class="card-header" data-pdf-src="" style="display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <i class="fas fa-file file-icon"></i>
      <h3 class="card-title">${fileName}</h3>
    </div>
    <div class="icon-group" style="display: flex; gap: 0x;">
      <a class="bx bx-star icon" title="Add to Favorites"></a>
      <a class="bx bx-trash icon" title="Move to Trash"></a>
      <a class="bx bx-info-circle icon" title="File Information"></a>
    </div>
  </div>
  <div class="pdf-container">
    <iframe src="${fileURL}" type="application/pdf" class="pdf-iframe"></iframe>
  </div>
`;

// Add click event to open the PDF in a new tab (default behavior)
newCard.addEventListener('click', () => {
  const pdfSrc = newCard.getAttribute('data-pdf-src');
  if (pdfSrc) {
    window.open(pdfSrc, '_blank'); // Open the PDF in a new tab
  }
});

// Prevent the click event from propagating for specific icons
const icons = newCard.querySelectorAll('.icon'); // Select all icons inside the card
icons.forEach((icon) => {
  icon.addEventListener('click', (event) => {
    event.stopPropagation(); // Stop the event from reaching the card
    // You can also add specific functionality for each icon here
    if (icon.classList.contains('bx-star')) {
      console.log('Star icon clicked');
    } else if (icon.classList.contains('bx-trash')) {
      console.log('Trash icon clicked');
    } else if (icon.classList.contains('bx-info-circle')) {
      console.log('Info icon clicked');
    }
  });
});

  // Append the new card to the card container
  cardContainer.appendChild(newCard);

  // Reset the modal fields
  fileInput.value = ''; // Clear file input
  document.getElementById('fileLocation').value = ''; // Clear location input

  // Close the modal
  newModal.style.display = 'none';

  // Update card counter
  updateCardCounter();
});

// Cancel new item and close modal
cancelNewItem.addEventListener('click', () => {
  newModal.style.display = 'none';
});

// Close new item modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === newModal) {
    newModal.style.display = 'none';
  }
});

// File input change event
fileInput.addEventListener('change', function() {
  if (this.files.length > 0) {
    fileChosenText.textContent = this.files[0].name; // Update the text with the chosen file name
    removeFileBtn.style.display = 'inline'; // Show the X button
  } else {
    fileChosenText.textContent = 'No file chosen'; // Reset the text if no file is chosen
    removeFileBtn.style.display = 'none'; // Hide the X button
  }
});

// Event listener for removing the file
removeFileBtn.addEventListener('click', function() {
  fileInput.value = ''; // Clear the file input
  fileChosenText.textContent = 'No file chosen'; // Reset text
  removeFileBtn.style.display = 'none'; // Hide the X button
});

// Open filter modal when filter button is clicked
openFilter.addEventListener('click', () => {
  filterModal.style.display = 'flex'; // or 'block' depending on your CSS
});

// Close filter modal when 'X' button is clicked
closeFilterBtn.addEventListener('click', () => {
  filterModal.style.display = 'none';
});

// Close filter modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === filterModal) {
    filterModal.style.display = 'none';
  }
});


