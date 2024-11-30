
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
  if (!pdfSrc) {
    alert("PDF source is missing or invalid.");
    return;
  }
  const encodedSrc = encodeURIComponent(pdfSrc);
  window.open(`view-modal.html?pdfSrc=${encodedSrc}`, '_blank');
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
