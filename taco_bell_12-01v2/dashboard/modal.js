
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

//START - CHANGE COLOR OF CARDS
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card'); // Select all cards

  // Loop through each card and assign a unique `data-card-id`
  cards.forEach((card, index) => {
    const uniqueId = `card-${index + 1}`; // Generate a unique ID (e.g., card-1, card-2, ...)
    card.setAttribute('data-card-id', uniqueId);
  });
});

// Function to toggle the star icon's color and add/remove the card from Favorites
function toggleStarColor(icon) {
  // Find the parent card element
  const card = icon.closest('.card');

  // Find the Favorites container
  const favoritesContainer = document.getElementById('favorites-container');

  // Check if the star icon is filled or empty
  if (icon.classList.contains('bx-star')) {
    // Change to filled star (bxs-star) and make it yellow
    icon.classList.remove('bx-star');
    icon.classList.add('bxs-star');
    icon.style.color = '#383838';

    // Check if the card is already in Favorites
    if (!favoritesContainer.querySelector(`[data-card-id="${card.dataset.cardId}"]`)) {
      // Clone the card to avoid moving the original
      const clonedCard = card.cloneNode(true);

      // Ensure the cloned card's star icon works independently
      const clonedStarIcon = clonedCard.querySelector('.bx');
      clonedStarIcon.addEventListener('click', () => toggleStarColor(clonedStarIcon));

      // Set a unique identifier to match the original card
      clonedCard.dataset.cardId = card.dataset.cardId;

      // Append the cloned card to Favorites
      favoritesContainer.appendChild(clonedCard);
    }
  } else {
    // Change to empty star (bx-star) and reset color
    icon.classList.remove('bxs-star');
    icon.classList.add('bx-star');
    icon.style.color = '';

    // Find and remove the corresponding card in Favorites
    const cardInFavorites = favoritesContainer.querySelector(`[data-card-id="${card.dataset.cardId}"]`);
    if (cardInFavorites) {
      cardInFavorites.remove();
    }
  }
}

//START - MODAL TRASH
// Trash Modal Functionality
const trashModal = document.getElementById('trashModal');
const closeTrashModalBtn = document.querySelector('.close-btn-trash');
const confirmTrashBtn = document.getElementById('confirmTrash');
const cancelTrashBtn = document.getElementById('cancelTrash');

// Show Trash Modal
function openTrashModal(cardElement) {
  trashModal.style.display = 'block';

  // Add additional logic to handle the card being deleted
  confirmTrashBtn.onclick = () => {
    cardElement.closest('.card').remove();
    trashModal.style.display = 'none';
  };
}

// Close Trash Modal
closeTrashModalBtn.addEventListener('click', () => {
  trashModal.style.display = 'none';
});

cancelTrashBtn.addEventListener('click', () => {
  trashModal.style.display = 'none';
});

// Close Trash Modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === trashModal) {
    trashModal.style.display = 'none';
  }
});


//END - MODAL TRASH 


//START - MODAL FILE INFO
// File Info Modal Functionality
function openFileInfoModal(fileName, fileSize, uploadedOn, fileCategory, fileSubCategory, fileSubsidy, fileDate, fileLocation) {
  // Get the modal and show it
  const modal = document.querySelector('.modal-info');
  modal.style.display = 'block';

  // Populate file information dynamically
  const fileInfoDetails = document.querySelector('.file-info-details');
  fileInfoDetails.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      <div style="flex: 1; min-width: 200px;">
        <p><strong>File Name:</strong> ${fileName}</p>
        <p><strong>Category:</strong> ${fileCategory}</p>
        <p><strong>Sub-Category:</strong> ${fileSubCategory}</p>
        <p><strong>Subsidy:</strong> ${fileSubsidy}</p>
        <p><strong>Date:</strong> ${fileDate}</p>
        <p><strong>Location:</strong> ${fileLocation}</p>
      </div>
      <div style="flex: 1; min-width: 200px;">
        <p><strong>File Size:</strong> ${fileSize} KB</p>
        <p><strong>Uploaded On:</strong> ${uploadedOn}</p>
      </div>
    </div>
  `;
}

// Close the File Info Modal
document.querySelector('.close-btn-info').addEventListener('click', () => {
  const modal = document.querySelector('.modal-info');
  modal.style.display = 'none';
});

// Close File Info Modal when clicking outside
document.querySelector('.modal-info').addEventListener('click', (event) => {
  const modalContent = document.querySelector('.modal-content-info');
  if (!modalContent.contains(event.target)) {
    document.querySelector('.modal-info').style.display = 'none';
  }
});


//END - MODAL FILE INFO


