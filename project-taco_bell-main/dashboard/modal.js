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

// JavaScript to toggle dropdown menu visibility
const threeDots = document.querySelector('.three-dots');
const dropdownMenu = document.querySelector('.dropdown-menu');

threeDots.addEventListener('click', () => {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Get modal elements
const modalCard = document.getElementById('modal-card');
const modalPdf = document.getElementById('modal-pdf');
const modalCardClose = document.getElementById('modal-card-close');

// Get all cards
const cards = document.querySelectorAll('.card');

// Open modal when a card is clicked
cards.forEach(card => {
  card.addEventListener('click', () => {
    const pdfSrc = card.getAttribute('data-pdf-src'); // Fetch the specific PDF source
    modalPdf.src = pdfSrc; // Set the PDF source
    modalCard.classList.remove('hidden-card'); // Show the modal
  });
});

// Close modal when the close button is clicked
modalCardClose.addEventListener('click', () => {
  modalCard.classList.add('hidden-card'); // Hide the modal
  modalPdf.src = ''; // Clear the iframe src for the next use
});

// Close modal when clicking outside the modal content
modalCard.addEventListener('click', (e) => {
  if (e.target === modalCard) {
    modalCard.classList.add('hidden-card');
    modalPdf.src = '';
  }
});

//Change Password Modal

document.addEventListener('DOMContentLoaded', () => {
  const passwordButton = document.getElementById('passwordButton');
  const modalPassword = document.getElementById('modalPassword');
  const closePasswordBtn = document.querySelector('.close-btn-password');

  // Open modal
  passwordButton.addEventListener('click', () => {
      modalPassword.style.display = 'block';
  });

  // Close modal
  closePasswordBtn.addEventListener('click', () => {
      modalPassword.style.display = 'none';
  });

  // Close modal by clicking outside of it
  window.addEventListener('click', (event) => {
      if (event.target === modalPassword) {
          modalPassword.style.display = 'none';
      }
  });
});


// Open modal in a new tab
function openModalOnAnotherPage(pdfSrc) {
  const encodedSrc = encodeURIComponent(pdfSrc); // Encode the URL for safety
  window.open(`view-modal.html?pdfSrc=${encodedSrc}`, '_blank'); // Open in a new tab
}
