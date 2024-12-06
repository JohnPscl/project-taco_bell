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

//Toggle Section

document.addEventListener("DOMContentLoaded", function () {
  const editProfileLink = document.getElementById('editProfileLink');
  const editProfileSection = document.getElementById('editProfileSection');
  const accountSettingLink = document.getElementById('accountSettingLink');
  const accountSettingsContent = document.getElementById('accountSettingsContent');
  const myVaultLink = document.getElementById('myVaultLink');
  const contentMain = document.querySelector(".contentMain");
  const contentMain1 = document.getElementById('contentMain1'); // Added contentMain1
  const contentMain2 = document.getElementById('contentMain2'); // Added contentMain2
  const myFavoritesLink = document.getElementById('myFavorites');
  const myTrashLink = document.getElementById('myTrash');
  const trashContainer = document.getElementById('trash-container');
  const favoritesContainer = document.getElementById('favorites-container');
  const navbar = document.querySelector(".navbar");

  // Show a specific section and hide everything else
  function toggleSection(sectionToShow) {
    // Hide all sections
    editProfileSection.style.display = "none";
    accountSettingsContent.style.display = "none";
    contentMain.style.display = "none";
    contentMain1.style.display = "none"; 
    contentMain2.style.display = "none",
    trashContainer.style.display = "none"; // Hide Trash
    favoritesContainer.style.display = "none"; // Hide Favorites
    navbar.style.visibility = "hidden";

    // Prevent scrolling
    document.body.classList.add('no-scroll');

    // Show only the specified section
    if (sectionToShow === "editProfile") {
      editProfileSection.style.display = "block";
    } else if (sectionToShow === "accountSettings") {
      accountSettingsContent.style.display = "block";
    } else if (sectionToShow === "myVault") {
      contentMain.style.display = "block";
      navbar.style.visibility = "visible";
      document.body.classList.remove('no-scroll');
    } else if (sectionToShow === "contentMain1") {
      contentMain1.style.display = "block"; // Show contentMain1
      favoritesContainer.style.display = "flex"; // Ensure favorites are visible
      navbar.style.visibility = "visible";
      document.body.classList.remove('no-scroll');
    } else if (sectionToShow === "contentMain2") {
      contentMain2.style.display = "block"; // Show contentMain2
      trashContainer.style.display = "flex"; // Ensure trash is visible
      navbar.style.visibility = "visible";
      document.body.classList.remove('no-scroll');
    }
    
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

  myVaultLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("myVault");
  });

  myFavoritesLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("contentMain1");
  });
  
  myTrashLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleSection("contentMain2");
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


// Function to add a new card
function addCard(title, pdfSrc) {
  const cardContainer = document.getElementById('card-container');

  // Get current count of cards to generate a unique ID
  const cardCount = document.querySelectorAll('.card').length;
  const uniqueId = `card-${cardCount + 1}`;

  // Create a new card element
  const newCard = document.createElement('div');
  newCard.className = 'card';
  newCard.setAttribute('data-card-id', uniqueId);
  newCard.setAttribute('data-pdf-src', pdfSrc);

  // Card content (example structure)
  newCard.innerHTML = `
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="fas fa-file file-icon"></i>
        <h3 class="card-title">${title}</h3>
      </div>
      <div class="icon-group">
        <!-- Star Icon -->
        <a class="bx bx-star icon" title="Add to Favorites" onclick="toggleStarColor(this)"></a>
        <!-- Trash Icon -->
        <a class="bx bx-trash icon" title="Move to Trash" onclick="openTrashModal(this)"></a>
        <!-- Info Icon -->
        <a class="bx bx-info-circle icon" title="File Information" onclick="openFileInfoModal('${title}', '1024', '2024-12-01', 'Category', 'Sub-Category', 'Subsidy', '2024-12-01', 'Location')"></a>
      </div>
    </div>
    <div class="pdf-container">
      <iframe src="${pdfSrc}" type="application/pdf" class="pdf-iframe"></iframe>
    </div>
  `;

  // Append the new card to the card container
  cardContainer.appendChild(newCard);

  // Reinitialize event listeners for the new card
  initializeCardEvents();
}

// Function to initialize card click events
function initializeCardEvents() {
  // Get all the cards
  const cards = document.querySelectorAll('.card');

  // Loop through each card and add the click event
  cards.forEach((card) => {
    // Get all icons within this card
    const icons = card.querySelectorAll('.icon');

    // Add click event listeners to each icon
    icons.forEach((icon) => {
      icon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent card click propagation
      });
    });

    // Add click event listener to the card
    card.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the document click handler from firing

      // Remove 'clicked' class from all cards
      cards.forEach((c) => c.classList.remove('clicked'));

      // Add 'clicked' class to the clicked card
      card.classList.add('clicked');
    });

    // Add double-click event listener to open PDF in new tab
    card.addEventListener('dblclick', () => {
      const pdfSrc = card.getAttribute('data-pdf-src');
      window.open(pdfSrc, '_blank'); // Open PDF in a new tab
    });
  });

  // Add a click event listener to the document
  document.addEventListener('click', () => {
    // Remove 'clicked' class from all cards when clicking outside
    cards.forEach(card => card.classList.remove('clicked'));
  });
}

// Your existing code
document.addEventListener('DOMContentLoaded', () => {
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
    const fileInputElement = fileInput.files[0];
    const fileName = document.getElementById('fileLocation').value || "Untitled";

    if (!fileInputElement) {
      alert('Please upload a file before saving.');
      return;
    }

    const fileURL = URL.createObjectURL(fileInputElement);
    addCard(fileName, fileURL);

    // Reset modal fields
    fileInput.value = '';
    document.getElementById('fileLocation').value = '';

    // Close modal
    newModal.style.display = 'none';
  });

  // Cancel new item and close modal
  cancelNewItem.addEventListener('click', () => {
    newModal.style.display = 'none';
  });

  // Close new item modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === newModal) {
      newModal.style.display = 'none';
    }
  });

  // File input change event
  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      fileChosenText.textContent = this.files[0].name;
      removeFileBtn.style.display = 'inline';
    } else {
      fileChosenText.textContent = 'No file chosen';
      removeFileBtn.style.display = 'none';
    }
  });

  // Remove file button
  removeFileBtn.addEventListener('click', function() {
    fileInput.value = '';
    fileChosenText.textContent = 'No file chosen';
    removeFileBtn.style.display = 'none';
  });

  // Open filter modal
  openFilter.addEventListener('click', () => {
    filterModal.style.display = 'flex';
  });

  // Close filter modal
  closeFilterBtn.addEventListener('click', () => {
    filterModal.style.display = 'none';
  });

  // Close filter modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === filterModal) {
      filterModal.style.display = 'none';
    }
  });

  // Initialize card events
  initializeCardEvents();
});
// Reference to the contentMain section
const contentMain = document.getElementById("contentMain");

// Reference to the My Vault link
const myVaultLink = document.getElementById("myVaultLink");

// Event listener for "My Vault" button
myVaultLink.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default link behavior

  // Hide other sections if needed (optional)
  hideOtherSections();

  // Show the contentMain section
  contentMain.style.display = "block";

  // Scroll to contentMain
  contentMain.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Function to hide other sections (if you have multiple sections)
function hideOtherSections() {
  const sections = document.querySelectorAll(".section"); // Replace '.section' with your actual section class names
  sections.forEach(section => {
    section.style.display = "none";
  });
}
