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
  const fileInputElement = document.getElementById('fileInput').files[0];
  const fileName = document.getElementById('fileLocation').value;
  const fileCategory = document.getElementById('fileCategory').value;
  const fileSubCategory = document.getElementById('fileSubCategory').value;
  const fileSubsidy = document.getElementById('fileSubsidy').value;
  const fileDate = document.getElementById('fileDate').value;
  const fileLocation = document.getElementById('fileLocation').value;

  // Check if all fields are filled
  if (!fileInputElement || !fileName || !fileCategory || !fileSubCategory || !fileSubsidy || !fileDate || !fileLocation) {
    alert('Please fill in all the fields before saving.');
    return;
  }

  // Create a new card element
  const cardContainer = document.querySelector('.card-container');
  const newCard = document.createElement('div');
  newCard.classList.add('card');

  // Generate a temporary URL for the uploaded file
  const fileURL = URL.createObjectURL(fileInputElement);  // Creating a URL for the uploaded file

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

  // Set the data-pdf-src attribute with the file URL
  newCard.setAttribute('data-pdf-src', fileURL);

  // Append the new card to the card container
  cardContainer.appendChild(newCard);

  // Reset the modal fields
  document.getElementById('fileInput').value = ''; // Clear file input
  document.getElementById('fileLocation').value = ''; // Clear location input
  document.getElementById('fileCategory').value = ''; // Clear category input
  document.getElementById('fileSubCategory').value = ''; // Clear subcategory input
  document.getElementById('fileSubsidy').value = ''; // Clear subsidy input
  document.getElementById('fileDate').value = ''; // Clear date input

  // Close the modal
  document.getElementById('newModal').style.display = 'none';
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




// START - MODAL FOR FILTER

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

// END - MODAL FOR FILTER

// Reset filter inputs
document.getElementById('resetFilter').addEventListener('click', () => {
  // Clear text inputs
  document.getElementById('fileName').value = ''; // Clear Event Name input
  document.getElementById('fileLocation').value = ''; // Clear Location input
  
  // Reset select input
  document.getElementById('fileCategory').selectedIndex = 0; // Reset Category select to first option

  // Reset select input
  document.getElementById('fileSubCategory').selectedIndex = 0;

  // Reset select input
  document.getElementById('fileSubsidy').selectedIndex = 0;

  // Reset month input
  document.getElementById('fileMonth').value = ''; // Clear Date input
  
  // Clear radio buttons
  const radioButtons = document.querySelectorAll('input[name="fileStatus"]');
  radioButtons.forEach((radio) => {
    radio.checked = false; // Uncheck all radio buttons
  });
});

// Add other event listeners as needed...



// START - NEXT TAB FOR CARD

function openModalOnAnotherPage(pdfSrc) {
  const encodedSrc = encodeURIComponent(pdfSrc); // Encode the URL for safety
  window.open(`view-modal.html?pdfSrc=${encodedSrc}`, '_blank'); // Open in a new tab
}
  
//END - NEXT TAB FOR CARD




//START - CHANGE COLOR OF CARDS

// Ensure this script runs after the DOM is fully loaded, to avoid targeting elements before they are ready
document.addEventListener('DOMContentLoaded', function () {
  const card = document.getElementById('myCard'); // Target the card element

  // Single click event to change the color
  card.addEventListener('click', function () {
    // Add a class to change the background color
    card.classList.add('clicked');
  });
});

// Get all the cards
const cards = document.querySelectorAll('.card');

// Loop through each card and add the click event
cards.forEach(card => {
  card.addEventListener('click', (event) => {
    // Prevent the document click handler from firing when a card is clicked
    event.stopPropagation();
    
    // Remove 'clicked' class from all cards
    cards.forEach(card => {
      card.classList.remove('clicked');
    });
    
    // Add 'clicked' class to the clicked card
    card.classList.add('clicked');
  });
});

// Event listener for clicking anywhere on the document
document.addEventListener('click', () => {
  // Remove 'clicked' class from all cards when clicking anywhere on the page
  cards.forEach(card => {
    card.classList.remove('clicked');
  });
});

//END - CHANGE COLOR OF CARDS





// START - CHANGE PASSWORD
const passwordButton = document.getElementById('passwordButton');
const modalPassword = document.getElementById('modalPassword');
const closeBtnPassword = document.querySelector('.close-btn-password'); // Close button for the password modal

// Open password modal when the password button is clicked
passwordButton.addEventListener('click', () => {
  modalPassword.style.display = 'flex'; // or 'block' depending on your CSS
});

// Close the password modal when the close button (X) is clicked
closeBtnPassword.addEventListener('click', () => {
  modalPassword.style.display = 'none';
});

// Optionally, close the modal if clicked outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modalPassword) {
    modalPassword.style.display = 'none';
  }
});

//END - CHANGE PASSWORD
