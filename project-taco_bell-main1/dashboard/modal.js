
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
    const pdfSrc = card.getAttribute('data-pdf-src'); // Get PDF source from data attribute
    modalPdf.src = pdfSrc; // Set modal iframe src
    modalCard.classList.remove('hidden-card'); // Show modal
  });
});

// Close modal when the close button is clicked
modalCardClose.addEventListener('click', () => {
  modalCard.classList.add('hidden-card'); // Hide modal
  modalPdf.src = ''; // Clear PDF source
});

// Close modal when clicking outside the modal content
modalCard.addEventListener('click', (e) => {
  if (e.target === modalCard) {
    modalCard.classList.add('hidden-card');
    modalPdf.src = '';
  }
});
