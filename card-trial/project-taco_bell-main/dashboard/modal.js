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
  console.log('New item saved!');
  newModal.style.display = 'none';
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

//END - MODAL FOR FILTER

document.addEventListener('DOMContentLoaded', () => {
  const openFilter = document.getElementById('openFilter'); // Assuming you have a button to open the filter modal
  const filterModal = document.querySelector('.modal-filter'); // Filter modal
  const closeFilterBtn = document.querySelector('.close-btn-filter'); // Close button for filter modal

  // Open filter modal when filter button is clicked
  openFilter.addEventListener('click', () => {
      filterModal.style.display = 'flex'; // Show the filter modal
  });

  // Close filter modal when 'X' button is clicked
  closeFilterBtn.addEventListener('click', () => {
      filterModal.style.display = 'none'; // Hide the filter modal
  });

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
});

document.getElementById('fileCategory').addEventListener('focus', function() {
  this.style.position = 'relative';
  this.style.zIndex = '10';
});



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
  modalPassword.style.display = 'block'; // Make the modal visible
});

// Close password modal when the 'X' button is clicked
closeBtnPassword.addEventListener('click', () => {
  modalPassword.style.display = 'none'; // Hide the modal
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modalPassword) {
    modalPassword.style.display = 'none'; // Hide the modal
  }
});


passwordButton.addEventListener('click', () => {
  console.log('Password button clicked!');
  modalPassword.style.display = 'block';
});

//END - CHANGE PASSWORD



//START - UPLOAD FILE
document.getElementById("saveNewItem").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  const fileChosenText = document.querySelector(".file-chosen-text");
  const fileCardsContainer = document.getElementById("fileCardsContainer");

  const file = fileInput.files[0];

  if (file) {
      // Validate file type and size
      if (!file.name.endsWith(".pdf")) {
          alert("Only PDF files are allowed.");
          return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2 MB limit
          alert("File size exceeds 2 MB.");
          return;
      }

      // Create a new card
      const card = document.createElement("div");
      card.className = "card file-card";
      card.innerHTML = `
          <div class="card-header">
              <i class="fas fa-file file-icon"></i>
              <h3 class="card-title">${file.name}</h3>
              <i class="fas fa-ellipsis-v three-dots"></i>
          </div>
          <div class="pdf-container">
              <iframe src="${URL.createObjectURL(file)}#toolbar=0" type="application/pdf" class="pdf-iframe"></iframe>
          </div>
          <button class="btn btn-danger remove-file-card">Remove</button>
      `;

      // Append the card
      fileCardsContainer.appendChild(card);

      // Add event listener for remove button
      card.querySelector(".remove-file-card").addEventListener("click", () => {
          fileCardsContainer.removeChild(card);
      });

      // Reset the input
      fileInput.value = "";
      fileChosenText.textContent = "No file chosen";
      document.querySelector(".remove-file-btn").style.display = "none";
  } else {
      alert("Please choose a file before saving.");
  }
});
