
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



// Ensure this script runs after the DOM is fully loaded, to avoid targeting elements before they are ready
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
  const cardId = card.dataset.cardId;

  // Find the Favorites container
  const favoritesContainer = document.getElementById('favorites-container');

  // Check if the card is already in favorites
  const cardInFavorites = favoritesContainer.querySelector(`[data-card-id="${cardId}"]`);

  // Toggle the star icon's class and color
  if (icon.classList.contains('bx-star')) {
    // Change to filled star (bxs-star) and make it yellow
    icon.classList.remove('bx-star');
    icon.classList.add('bxs-star');
    icon.style.color = '#383838';

    // If the card is not in favorites yet, move it there
    if (!cardInFavorites) {
      const clonedCard = card.cloneNode(true);

      // Ensure the cloned card's star icon works independently
      const clonedStarIcon = clonedCard.querySelector('.bx');
      clonedStarIcon.addEventListener('click', () => toggleStarColor(clonedStarIcon));

      // Set a unique identifier to match the original card
      clonedCard.dataset.cardId = cardId;

      // Append the cloned card to Favorites
      favoritesContainer.appendChild(clonedCard);
    }
  } else {
    // Change to empty star (bx-star) and reset color
    icon.classList.remove('bxs-star');
    icon.classList.add('bx-star');
    icon.style.color = '';

    // Remove the card from the Favorites container
    if (cardInFavorites) {
      cardInFavorites.remove();
    }

    // Also reset the star in the original card in My Vault
    const originalCardInVault = document.querySelector(`[data-card-id="${cardId}"]`);
    if (originalCardInVault) {
      const originalStarIcon = originalCardInVault.querySelector('.bx');
      originalStarIcon.classList.remove('bxs-star');
      originalStarIcon.classList.add('bx-star');
      originalStarIcon.style.color = '';
    }
  }
}

// Event listener for clicking anywhere on the document (to manage the card color toggle in the vault)
document.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('bx-star') || event.target.classList.contains('bxs-star')) {
    // Prevent the document click handler from firing when a card or star is clicked
    event.stopPropagation();

    // Check if the clicked element is inside the favorites section
    const isInFavorites = event.target.closest('#favorites-container');
    const card = event.target.closest('.card');
    const cardId = card.dataset.cardId;

    if (isInFavorites) {
      // In the favorites section: Remove the card when the star is clicked
      if (event.target.classList.contains('bxs-star')) {
        // Change the star to empty (unfilled) and remove the card from favorites
        event.target.classList.remove('bxs-star');
        event.target.classList.add('bx-star');
        event.target.style.color = '';

        const cardInFavorites = document.querySelector(`[data-card-id="${cardId}"]`);
        if (cardInFavorites) {
          cardInFavorites.remove();
        }

        // Reset the star in the original card in My Vault
        const originalCardInVault = document.querySelector(`[data-card-id="${cardId}"]`);
        if (originalCardInVault) {
          const originalStarIcon = originalCardInVault.querySelector('.bx');
          originalStarIcon.classList.remove('bxs-star');
          originalStarIcon.classList.add('bx-star');
          originalStarIcon.style.color = '';
        }
      }
    } else {
      // In the My Vault section: If clicked, toggle between filled and empty stars
      toggleStarColor(event.target);
    }
  }
});


// Trash Modal Functionality
const trashModal = document.getElementById('trashModal');
const closeTrashModalBtn = document.querySelector('.close-btn-trash');
const confirmTrashBtn = document.getElementById('confirmTrash');
const cancelTrashBtn = document.getElementById('cancelTrash');

// Trash container where deleted cards will go
const trashContainer = document.getElementById('trash-container');

// Placeholder to store the removed card's parent element before moving to trash
let lastRemovedCard = null;

// Show Trash Modal
function openTrashModal(cardElement) {
  trashModal.style.display = 'block';

  // Add additional logic to handle the card being moved to trash
  confirmTrashBtn.onclick = () => {
    // Clone the card to keep it intact, including the icons and event listeners
    const cardClone = cardElement.closest('.card').cloneNode(true);

    // Store the original card element for undo
    lastRemovedCard = cardElement.closest('.card');

    // Remove the star icon from the cloned card (optional)
    const starIcon = cardClone.querySelector('.bx-star');
    if (starIcon) {
      starIcon.remove(); // Remove the star icon (or handle as needed)
    }

    // Append the cloned card to the trash container
    trashContainer.appendChild(cardClone);

    // Remove the original card from its current location
    lastRemovedCard.remove();

    // Show the Undo link
    const undoLink = document.getElementById('undoLink');
    undoLink.style.display = 'flex'; // Make the undo button visible
    undoLink.classList.remove('hide'); // Ensure it's visible and reset the transition

    // Set a timer to hide the Undo button after 5 seconds with a fade-out transition
    setTimeout(() => {
      undoLink.classList.add('hide'); // Add hide class to trigger fade-out
      // Clear the last removed card placeholder after the transition
      setTimeout(() => {
        lastRemovedCard = null; // Clear the last removed card placeholder after the fade-out
      }, 500); // Wait for the fade-out transition to complete
    }, 5000); // 5000ms = 5 seconds

    // Close the trash modal
    trashModal.style.display = 'none';
  };
}

// Function to undo the move to trash (restore the card)
function undoTrashAction() {
  // Check if there is a card to restore
  if (lastRemovedCard) {
    // Clone the last removed card to restore it
    const cardClone = lastRemovedCard.cloneNode(true);

    // Reattach the double-click listener to the restored card
    cardClone.addEventListener('dblclick', () => {
      const pdfSrc = cardClone.getAttribute('data-pdf-src');
      openModalOnAnotherPage(pdfSrc); // Ensure this function exists and works
    });

    // Reattach the star icon event listener if necessary
    const restoredStarIcon = cardClone.querySelector('.bx');
    if (restoredStarIcon) {
      restoredStarIcon.addEventListener('click', () => toggleStarColor(restoredStarIcon));
    }

    // Append the cloned card back to the original container (or wherever you want)
    document.querySelector('.card-container').appendChild(cardClone);

    // Remove it from the trash container
    trashContainer.innerHTML = '';

    // Hide the Undo button after it's clicked
    const undoLink = document.getElementById('undoLink');
    undoLink.style.display = 'none'; // Hide the undo button after undoing the action

    // Clear the last removed card placeholder
    lastRemovedCard = null;
  }
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

// Close the undo button when clicking on the close button (bx-x icon)
function closeUndoButton() {
  const undoLink = document.getElementById('undoLink');
  undoLink.style.display = 'none'; // Hide the undo button when close button is clicked
}


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


