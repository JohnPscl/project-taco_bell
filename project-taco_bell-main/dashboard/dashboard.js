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
  event.stopPropagation(); // Para hindi mawala ang menu kapag pinindot sa ibang lugar.
  
  // Hanapin ang parent ng element na may tatlong tuldok
  const card = event.target.closest(".card");
  
  // Hanapin ang dropdown menu sa loob ng card
  let dropdownMenu = card.querySelector(".dropdown-menu");

  // Kung hindi pa naka-attach ang dropdown sa tamang lugar, ilagay ito
  if (!dropdownMenu) {
    dropdownMenu = document.getElementById("dropdown-menu").cloneNode(true);
    card.appendChild(dropdownMenu);
    dropdownMenu.classList.add("active"); // Magdagdag ng visible class
  } else {
    dropdownMenu.classList.toggle("active");
  }
}

// Mag-add ng listener para isara ang menu kapag nag-click sa ibang lugar
document.addEventListener("click", () => {
  const activeMenus = document.querySelectorAll(".dropdown-menu.active");
  activeMenus.forEach((menu) => menu.classList.remove("active"));
});









// Counter to keep track of the card numbers


saveNewItem.addEventListener('click', () => {
  // Get values from input fields
  const fileInputElement = document.getElementById('fileInput').files[0];
  const fileName = document.getElementById('fileLocation').value || "Untitled"; // Default title
  const cardContainer = document.getElementById('card-container'); // Target the container

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

  // Add content to the new card
  newCard.innerHTML = `
  
    <div class="card-header">
      <i class="fas fa-file file-icon"></i>
      <h3 class="card-title">${fileName.toUpperCase()}</h3>
      <a class="fas fa-ellipsis-v three-dots" onclick="toggleMenu(event)"></a>
    </div>
    <div class="pdf-container">
      <iframe src="${fileURL}" type="application/pdf" class="pdf-iframe"></iframe>
    </div>
    <div class="dropdown-container">
      <div class="dropdown-menu" id="dropdown-menu">
        <ul>
          <li><a href="#">File Information</a></li>
          <li><a href="#">Add to Favorites</a></li>
          <li><a href="#">Move to Trash</a></li>
          <li><a href="#">Rename</a></li>
          <li><a href="#">Delete</a></li>
        </ul>
      </div>
    </div>
  `;

  // Append the new card to the card container
  cardContainer.appendChild(newCard);

  // Reset the modal fields
  document.getElementById('fileInput').value = ''; // Clear file input
  document.getElementById('fileLocation').value = ''; // Clear location input

  // Close the modal
  document.getElementById('newModal').style.display = 'none';
});

function updateCardCounter() {
  const cardCounter = document.getElementById('card-counter');
  const totalCards = document.querySelectorAll('.card-container .card').length; // Bilangin ang lahat ng cards

}

// Tawagin ang updateCardCounter function pagkatapos mag-save ng card
cardContainer.appendChild(newCard);
updateCardCounter();