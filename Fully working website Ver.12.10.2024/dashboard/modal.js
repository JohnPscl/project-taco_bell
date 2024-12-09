
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

// Function to open PDF when card is clicked


 //start - STAR ICON
 document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card'); // Select all cards

  // Loop through each card and assign a unique `data-card-id` and PDF URL
  cards.forEach((card, index) => {
    const uniqueId = `card-${index + 1}`; // Generate a unique ID (e.g., card-1, card-2, ...)
    card.setAttribute('data-card-id', uniqueId);

    // Add the URL of the PDF (you can replace this with your dynamic URLs)
    card.setAttribute('data-pdf-src', `path/to/your/file${index + 1}.pdf`);

    // Add an event listener to open the PDF when the card is clicked
    card.addEventListener('click', function (event) {
      openCardPDF(card, event); // Call the function to open the PDF
    });
  });
});

// Function to open the PDF in a new tab, ignoring clicks on specific icons
function openCardPDF(card, event) {
  // Check if the click target is one of the icons
  if (
    event.target.classList.contains('bx') || // General check for icons
    event.target.classList.contains('star-icon') || // Specific icon class
    event.target.classList.contains('other-icon-class') // Add other specific classes
  ) {
    event.stopPropagation(); // Prevent the event from triggering card click behavior
    return;
  }

  // Otherwise, open the PDF in a new tab
  const pdfSrc = card.getAttribute('data-pdf-src'); // Get the PDF source
  if (pdfSrc) {
    window.open(pdfSrc, '_blank');
  }
}

// Function to toggle the star icon's color and add/remove the card from Favorites
function toggleStarColor(icon) {
  const card = icon.closest('.card'); // Find the parent card element
  const cardId = card.dataset.cardId; // Get the card's unique ID
  const favoritesContainer = document.getElementById('favorites-container'); // Find the Favorites container
  const cardInFavorites = favoritesContainer.querySelector(`[data-card-id="${cardId}"]`); // Check if the card is already in Favorites

  const isFilled = icon.classList.contains('bxs-star'); // Check if the star is filled

  if (isFilled) {
    // Change to empty star (bx-star) and reset color
    icon.classList.remove('bxs-star');
    icon.classList.add('bx-star');
    icon.style.color = ''; // Reset color

    // Remove the card from Favorites with a delay
    if (cardInFavorites) {
      cardInFavorites.remove();

      // Also reset the original card's star in My Vault
      const originalCardInVault = document.querySelector(`[data-card-id="${cardId}"]`);
      if (originalCardInVault) {
        const originalStarIcon = originalCardInVault.querySelector('.bx');
        originalStarIcon.classList.remove('bxs-star');
        originalStarIcon.classList.add('bx-star');
        originalStarIcon.style.color = '';
      }
    }

    // Update the data-filled attribute to 'false'
    card.setAttribute('data-filled', 'false');
  } else {
    // Change to filled star (bxs-star) and make it yellow
    icon.classList.remove('bx-star');
    icon.classList.add('bxs-star');
    icon.style.color = '#383838';

    // If the card is not in Favorites yet, move it there
    if (!cardInFavorites) {
      const clonedCard = card.cloneNode(true);

      // Set a unique identifier to match the original card
      clonedCard.dataset.cardId = cardId;

      // Add event listener to the cloned card for opening PDF in a new tab
      clonedCard.addEventListener('click', function (event) {
        openCardPDF(clonedCard, event);
      });

      // Append the cloned card to Favorites
      favoritesContainer.appendChild(clonedCard);
    }

    // Update the data-filled attribute to 'true'
    card.setAttribute('data-filled', 'true');
  }
}


// Event listener for clicking anywhere on the document (to manage the card color toggle in the vault)
document.addEventListener('click', (event) => {
  if (event.target && (event.target.classList.contains('bx-star') || event.target.classList.contains('bxs-star'))) {
    event.stopPropagation(); // Prevent the document click handler from firing when a card or star is clicked

    const isInFavorites = event.target.closest('#favorites-container');
    const card = event.target.closest('.card');

    if (isInFavorites) {
      // In the favorites section: Remove the card when the star is clicked with a delay
      if (event.target.classList.contains('bxs-star')) {
        event.target.classList.remove('bxs-star');
        event.target.classList.add('bx-star');
        event.target.style.color = '';

        const cardInFavorites = event.target.closest('.card');
        setTimeout(() => {
          if (cardInFavorites) {
            cardInFavorites.remove();
          }

          // Reset the star in the original card in My Vault
          const originalCardInVault = document.querySelector(`[data-card-id="${card.dataset.cardId}"]`);
          if (originalCardInVault) {
            const originalStarIcon = originalCardInVault.querySelector('.bx');
            originalStarIcon.classList.remove('bxs-star');
            originalStarIcon.classList.add('bx-star');
            originalStarIcon.style.color = '';
          }
        }, 1000); // 1000ms (1 second) delay
      }
    } else {
      // In the My Vault section: If clicked, toggle between filled and empty stars
      toggleStarColor(event.target);
    }
  }
});



// Function to open the trash modal


//START - TRASH
// Trash Modal Functionality
const trashModal = document.getElementById('trashModal');
const closeTrashModalBtn = document.querySelector('.close-btn-trash');
const confirmTrashBtn = document.getElementById('confirmTrash');
const cancelTrashBtn = document.getElementById('cancelTrash');

// Trash container where deleted cards will go
const trashContainer = document.getElementById('trash-container');

// Placeholder to store the removed card's parent element before moving to trash
let lastRemovedCard = null;
let originalCardContainer = null; // Variable to store the original card container

// Show Trash Modal
function openTrashModal(cardElement) {
  trashModal.style.display = 'block';

  // Store the original card container before moving the card to trash
  originalCardContainer = cardElement.closest('.card-container');

  confirmTrashBtn.onclick = () => {
    // Clone the card to keep it intact, including the icons and event listeners
    const cardClone = cardElement.closest('.card').cloneNode(true);

    // Store the original card element for undo
    lastRemovedCard = cardElement.closest('.card');

    // Remove the existing icons (star, edit, etc.) and replace with restore and delete icons
    const iconGroup = cardClone.querySelector('.icon-group');
    iconGroup.innerHTML = `
      <!-- Only Restore and Delete icons -->
      <a class="bx bx-refresh icon" title="Restore" onclick="restoreFromTrash(this)"></a>
      <a class="bx bx-trash icon" title="Delete Permanently" onclick="deleteForever(this)"></a>
    `;

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
  if (lastRemovedCard) {
    // Clone the last removed card to restore it
    const cardClone = lastRemovedCard.cloneNode(true);

    // Reattach the double-click listener to the restored card
    cardClone.addEventListener('dblclick', (event) => {
      event.stopPropagation();
      const pdfSrc = cardClone.getAttribute('data-pdf-src');
      window.open(pdfSrc, '_blank');
    });

    // Reattach the star icon event listener and set the correct class (filled or empty)
    const starIcon = cardClone.querySelector('.bx');
    if (starIcon) {
      const isFilled = cardClone.getAttribute('data-filled') === 'false'; // Check if the card was previously filled
      if (isFilled) {
        starIcon.classList.remove('bx-star');
        starIcon.classList.add('bxs-star');
        starIcon.style.color = '#383838'; // Set the color for filled stars
      } else {
        starIcon.classList.remove('bxs-star');
        starIcon.classList.add('bx-star');
        starIcon.style.color = ''; // Reset the color for empty stars
      }
      starIcon.addEventListener('click', () => toggleStarColor(starIcon)); // Reattach the click event for star icon
    }

    // Reattach the trash and info icons event listeners
    const trashIcon = cardClone.querySelector('.bx-trash');
    if (trashIcon) {
      trashIcon.addEventListener('click', () => openTrashModal(trashIcon));
    }

    const infoIcon = cardClone.querySelector('.bx-info-circle');
    if (infoIcon) {
      infoIcon.addEventListener('click', () => openFileInfoModal(infoIcon));
    }

    // Append the cloned card back to the original container
    originalCardContainer.appendChild(cardClone);

    // Remove it from the trash container
    trashContainer.innerHTML = '';

    // Hide the Undo button after it's clicked
    const undoLink = document.getElementById('undoLink');
    undoLink.style.display = 'none'; // Hide the undo button after undoing the action

    // Clear the last removed card placeholder
    lastRemovedCard = null;
    originalCardContainer = null;
  }
}

// Function to restore the card from trash
function restoreFromTrash(iconElement) {
  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.appendChild(card); 
  const cardClone = iconElement.closest('.card'); // Get the card that was moved to trash


  // Reattach the double-click listener to the restored card
  cardClone.addEventListener('dblclick', () => {
    const pdfSrc = cardClone.getAttribute('data-pdf-src');
    openModalOnAnotherPage(pdfSrc); // Ensure this function exists and works
  });

  // Restore original icons (e.g., star, trash, info)
  const iconGroup = cardClone.querySelector('.icon-group');
  iconGroup.innerHTML = `
    <a class="bx bx-star icon" title="Add to Favorites" onclick="toggleStarColor(this)"></a>
    <a class="bx bx-trash icon" title="Move to Trash" onclick="openTrashModal(this)"></a>
    <a class="bx bx-info-circle icon" title="File Information" onclick="openFileInfoModal(this)"></a>
  `;

  // Reattach event listeners for the icons
  reattachIconEventListeners(cardClone);

  // Restore the star state (filled or empty)
  const starIcon = cardClone.querySelector('.bx');
  const isFilled = cardClone.getAttribute('data-filled') === 'true'; // Check if the card was previously filled
  if (isFilled) {
    starIcon.classList.remove('bx-star');
    starIcon.classList.add('bxs-star');
    starIcon.style.color = '#383838'; // Set the color for filled stars
  } else {
    starIcon.classList.remove('bxs-star');
    starIcon.classList.add('bx-star');
    starIcon.style.color = ''; // Reset the color for empty stars
  }

  // Append the restored card back to the original container
  document.querySelector('.card-container').appendChild(cardClone);

  // Remove the card from the trash container
  const trashContainer = document.getElementById('trash-container');
  trashContainer.innerHTML = '';

  // Hide the Undo button after restoring
  const undoLink = document.getElementById('undoLink');
  undoLink.style.display = 'none'; // Hide the undo button after the card is restored

  // Clear the last removed card placeholder
  lastRemovedCard = null;
 
}

// Delete the card forever
function deleteForever(element) {
  const cardToDelete = element.closest('.card');
  cardToDelete.remove();
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


  //END - TRASH

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
        <p class="label-info"><strong>File Name</strong></p>
        <p class="value-info" data-label="File Name">${fileName}</p>

        <p class="label-info"><strong>Category</strong></p>
        <p class="value-info" data-label="Category">${fileCategory}</p>

        <p class="label-info"><strong>Sub-Category</strong></p>
        <p class="value-info" data-label="Sub-Category">${fileSubCategory}</p>

        <p class="label-info"><strong>Subsidy</strong></p>
        <p class="value-info" data-label="Subsidy">${fileSubsidy}</p>
      </div>
      <div style="flex: 1; min-width: 200px;">
        <p class="label-info"><strong>File Size</strong></p>
        <p class="value-info" data-label="File Size">${fileSize} KB</p>

        <p class="label-info"><strong>Uploaded On</strong></p>
        <p class="value-info" data-label="Uploaded On">${uploadedOn}</p>

        <p class="label-info"><strong>Location</strong></p>
        <p class="value-info" data-label="Location">${fileLocation}</p>

        <p class="label-info"><strong>Date</strong></p>
        <p class="value-info" data-label="Date">${fileDate}</p>
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
        <p class="label-info"><strong>File Name</strong></p>
        <p class="value-info" data-label="File Name">${fileName}</p>

        <p class="label-info"><strong>Category</strong></p>
        <p class="value-info" data-label="Category">${fileCategory}</p>

        <p class="label-info"><strong>Sub-Category</strong></p>
        <p class="value-info" data-label="Sub-Category">${fileSubCategory}</p>

        <p class="label-info"><strong>Subsidy</strong></p>
        <p class="value-info" data-label="Subsidy">${fileSubsidy}</p>
      </div>
      <div style="flex: 1; min-width: 200px;">
        <p class="label-info"><strong>File Size</strong></p>
        <p class="value-info" data-label="File Size">${fileSize} KB</p>

        <p class="label-info"><strong>Uploaded On</strong></p>
        <p class="value-info" data-label="Uploaded On">${uploadedOn}</p>

        <p class="label-info"><strong>Location</strong></p>
        <p class="value-info" data-label="Location">${fileLocation}</p>

        <p class="label-info"><strong>Date</strong></p>
        <p class="value-info" data-label="Date">${fileDate}</p>
      </div>
    </div>
  `;
}

// Close the File Info Modal and reset to "Edit"
document.querySelector('.close-btn-info').addEventListener('click', () => {
  const modal = document.querySelector('.modal-info');
  modal.style.display = 'none';

  // Reset the Edit button text to "Edit" when closing the modal
  const editButton = document.querySelector('.edit-file-info');
  editButton.textContent = 'Edit'; // Revert to "Edit" when the modal is closed
});

// Close File Info Modal when clicking outside
document.querySelector('.modal-info').addEventListener('click', (event) => {
  const modalContent = document.querySelector('.modal-content-info');
  if (!modalContent.contains(event.target)) {
    document.querySelector('.modal-info').style.display = 'none';

    // Reset the Edit button text to "Edit" when clicking outside
    const editButton = document.querySelector('.edit-file-info');
    editButton.textContent = 'Edit'; // Revert to "Edit" when the modal is closed
  }
});

// Edit button functionality
document.querySelector('.edit-file-info').addEventListener('click', function () {
  const editButton = this;
  const fileValues = document.querySelectorAll('.value-info');

  if (editButton.textContent === 'Edit') {
    // Switch to "Save" mode
    editButton.textContent = 'Save';

    fileValues.forEach(valueElement => {
      const label = valueElement.dataset.label; // Identify the label of the field
      const value = valueElement.textContent.trim();

      let input;

      if (label === 'Category' || label === 'Sub-Category' || label === 'Subsidy') {
        // Create a dropdown for Category, Sub-Category, and Subsidy
        input = document.createElement('select');
        input.className = 'editable-input value-info';
        input.dataset.label = label;

        // Add the current value as the placeholder option (first option)
        const placeholderOption = document.createElement('option');
        placeholderOption.value = value;
        placeholderOption.textContent = value || `Select ${label}`;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        input.appendChild(placeholderOption);

        // Add options to the dropdown (static values for this example)
        const options = label === 'Category' 
          ? ['Colloquiums', 'Courses/Bootcamp', 'Forum', 'Lectures', 'Mastercalsses',
            'Networking Events', 'Online Seminar (Webinar)', 'Onsite Seminar', 'Round Tables/Panel Discussions',
            'Summits', 'Symposiums', 'Training', 'Workshops', 'Others'
          ]
          : label === 'Sub-Category'
            ? ['Community Engagement', 'Educational Leadership', 'Educational Pedagogy', 
              'Personal Development', 'Professional Development (Technical)', 'Professional Development (Non-Technical)',
              'Others'
            ]
            : ['Full Subsidy', 'Non-Subsidy', 'Partial Subsidy'];

        options.forEach(optionValue => {
          const option = document.createElement('option');
          option.value = optionValue;
          option.textContent = optionValue;
          input.appendChild(option);
        });

        // Set the current value as the selected option if it's available
        if (value) {
          input.value = value;
        }
      } else if (label === 'Date') {
        // For the Date field, create an input of type 'date'
        input = document.createElement('input');
        input.type = 'date';
        input.value = value; // Set the current date value
        input.className = 'editable-input value-info';
        input.dataset.label = label;
      } else {
        // For other fields, use an input
        input = document.createElement('input');
        input.type = 'text';
        input.placeholder = value; // Use the value as placeholder
        input.className = 'editable-input value-info';
        input.dataset.label = label;

        if (label === 'File Size' || label === 'Uploaded On') {
          input.disabled = true; // Disable input for non-editable fields
          input.className = 'non-editable-input value-info'; // Add a specific class for styling
        } else {
          input.classList.add('with-line'); // Add a class for inputs that will have a bottom line
        }
      }

      valueElement.parentNode.replaceChild(input, valueElement);
    });
  } else {
    // Switch to "Edit" mode and save changes
    editButton.textContent = 'Edit';

    const inputs = document.querySelectorAll('.value-info');
    inputs.forEach(input => {
      const label = input.dataset.label;
      const newValue = input.value.trim() || input.placeholder;
      const valueElement = document.createElement('p');
      valueElement.className = 'value-info';
      valueElement.dataset.label = label;
      valueElement.textContent = newValue;

      // Remove the bottom line class when switching back to non-editable
      if (input.classList.contains('with-line')) {
        valueElement.classList.remove('with-line');
      }

      input.parentNode.replaceChild(valueElement, input);
    });
  }
});


//END - MODAL FILE INFO


//START - CARD CLICKED (Favorites)

document.addEventListener('DOMContentLoaded', function () {
  const favoritesContainer = document.getElementById('favorites-container');

  // Add event listener to the parent container for dynamic card clicks
  favoritesContainer.addEventListener('click', function (e) {
    // Check if the clicked element is a card
    const card = e.target.closest('.card');

    // If clicked outside a card, remove the highlight from all cards
    if (!card) {
      const highlightedCards = favoritesContainer.querySelectorAll('.card.highlighted');
      highlightedCards.forEach((highlightedCard) => {
        highlightedCard.classList.remove('highlighted');
      });
      return;
    }

    // If a card is clicked, remove highlight from all cards and add to the clicked one
    const allCards = favoritesContainer.querySelectorAll('.card');
    allCards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove('highlighted');
      }
    });

    // Toggle the highlight on the clicked card
    card.classList.toggle('highlighted');
  });
});


//END - CARD CLICKED (Favorites)


//START - CARD CLICKED (Trash)

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const trashContainer = document.getElementById('trash-container');

  // Check if the container exists
  if (trashContainer) {
    // Add click event to the document for outside clicks
    document.addEventListener('click', (event) => {
      // Reset all cards to their original state
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => card.classList.remove('clicked'));

      // Check if the clicked element is inside a card
      const clickedCard = event.target.closest('.card');
      if (clickedCard && trashContainer.contains(clickedCard)) {
        clickedCard.classList.add('clicked'); // Highlight the clicked card
      }
    });
  }
});
//END - CARD CLICKED (Trash)


// START - MODAL FOR RESTORE AND DELETE

// Restore Modal Elements
const restoreModal = document.getElementById('restoreModal');
const closeRestoreModalBtn = document.querySelector('.close-btn-restore');
const confirmRestoreBtn = document.getElementById('confirmRestore');
const cancelRestoreBtn = document.getElementById('cancelRestore');

// Delete Modal Elements
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModalBtn = document.querySelector('.close-btn-delete-perm');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

// Temporary variable to track the card being restored or deleted
let activeCard = null;

// Function to Open Restore Modal
function openRestoreModal(cardElement) {
  restoreModal.style.display = 'block';
  activeCard = cardElement.closest('.card'); // Track the card to be restored
}

// Confirm Restore
confirmRestoreBtn.onclick = () => {
  if (activeCard) {
    // Restore the card to its original container
    originalCardContainer.appendChild(activeCard);

    // Reset icons (e.g., star, trash, info)
    const iconGroup = activeCard.querySelector('.icon-group');
    iconGroup.innerHTML = `
      <a class="bx bx-star icon" title="Add to Favorites" onclick="toggleStarColor(this)"></a>
      <a class="bx bx-trash icon" title="Move to Trash" onclick="openTrashModal(this)"></a>
      <a class="bx bx-info-circle icon" title="File Information" onclick="openFileInfoModal(this)"></a>
    `;

    // Reattach event listeners to the restored card's icons
function reattachIconEventListeners(cardElement) {
  // Star icon event listener
  const starIcon = cardElement.querySelector('.bx-star');
  if (starIcon) {
    starIcon.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card click from firing
      toggleStarColor(starIcon); // Your star icon functionality
    });
  }

  // Trash icon event listener
  const trashIcon = cardElement.querySelector('.bx-trash');
  if (trashIcon) {
    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card click from firing
      openTrashModal(trashIcon); // Your trash icon functionality
    });
  }

  // Info icon event listener
  const infoIcon = cardElement.querySelector('.bx-info-circle');
  if (infoIcon) {
    infoIcon.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card click from firing
      openFileInfoModal(infoIcon); // Your info icon functionality
    });
  }
}

// Re-enable card click functionality with its data-card-id to open a new tab
activeCard.addEventListener('click', function () {
  const pdfSrc = this.getAttribute('data-pdf-src');  // Get the PDF source URL
  console.log(pdfSrc); // Check if the correct URL is being retrieved
  window.open(pdfSrc, '_blank'); // Opens the PDF in a new tab
});


// Prevent card click when an icon is clicked
document.querySelectorAll('.card .icon').forEach((icon) => {
  icon.addEventListener('click', function (event) {
    event.stopPropagation();  // Prevent card's click event from firing
  });
});

// Clear the activeCard and hide the Restore Modal
activeCard = null;
restoreModal.style.display = 'none';  // Hide the modal after restoring

}};

// Cancel or Close Restore Modal
closeRestoreModalBtn.onclick = () => closeRestoreModal();
cancelRestoreBtn.onclick = () => closeRestoreModal();
function closeRestoreModal() {
  restoreModal.style.display = 'none';
  activeCard = null; // Clear the tracked card
}

// Function to Open Delete Permanently Modal
function openDeleteModal(cardElement) {
  deleteModal.style.display = 'block';
  activeCard = cardElement.closest('.card'); // Track the card to be deleted
}

// Confirm Delete
confirmDeleteBtn.onclick = () => {
  if (activeCard) {
    // Permanently remove the card
    activeCard.remove();

    // Clear activeCard and hide the Delete Modal
    activeCard = null;
    deleteModal.style.display = 'none';
  }
};

// Cancel or Close Delete Modal
closeDeleteModalBtn.onclick = () => closeDeleteModal();
cancelDeleteBtn.onclick = () => closeDeleteModal();
function closeDeleteModal() {
  deleteModal.style.display = 'none';
  activeCard = null; // Clear the tracked card
}

// Event Listener for Restore and Delete Buttons in Trash
function restoreFromTrash(restoreIcon) {
  openRestoreModal(restoreIcon);
}

function deleteForever(deleteIcon) {
  openDeleteModal(deleteIcon);
}

// Helper Function to Reattach Event Listeners to Restored Card Icons
function reattachIconEventListeners(cardElement) {
  // Star icon event listener
  const starIcon = cardElement.querySelector('.bx-star');
  if (starIcon) {
    starIcon.addEventListener('click', () => toggleStarColor(starIcon));
  }

  // Trash icon event listener
  const trashIcon = cardElement.querySelector('.bx-trash');
  if (trashIcon) {
    trashIcon.addEventListener('click', () => openTrashModal(trashIcon));
  }

  // File information icon event listener
  const infoIcon = cardElement.querySelector('.bx-info-circle');
  if (infoIcon) {
    infoIcon.addEventListener('click', () => openFileInfoModal(infoIcon));
  }
}

// END - MODAL FOR RESTORE AND DELETE
