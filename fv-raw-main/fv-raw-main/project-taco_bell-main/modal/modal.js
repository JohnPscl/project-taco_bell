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
function togglePopUp() {
  const modal = document.getElementById("filterModal");
  const overlay = document.getElementById("filterOverlay");

  // Toggle modal and overlay visibility
  if (modal.style.display === "flex") {
      modal.style.display = "none";
      overlay.style.display = "none"; // Hide overlay
      document.body.style.overflow = "auto"; // Re-enable background scrolling
  } else {
      modal.style.display = "flex";
      overlay.style.display = "block"; // Show overlay
      document.body.style.overflow = "hidden"; // Disable background scrolling
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const openFilter = document.getElementById('openFilter'); // Button to open the filter modal
  const closeFilterBtn = document.querySelector('.close-btn-filter'); // Close button in the modal
  const overlay = document.getElementById("filterOverlay"); // Overlay element

  // Open filter modal when filter button is clicked
  openFilter.addEventListener('click', togglePopUp);

  // Close filter modal when 'X' button is clicked
  closeFilterBtn.addEventListener('click', togglePopUp);

  // Close modal when clicking overlay
  overlay.addEventListener('click', togglePopUp); // Close when clicking overlay

  // Reset filter inputs
  document.getElementById('resetFilter').addEventListener('click', () => {
      // Clear text inputs
      document.getElementById('fileName').value = ''; // Clear Event Name input
      document.getElementById('fileLocation').value = ''; // Clear Location input
      
      // Reset select input
      document.getElementById('fileCategory').selectedIndex = 0; // Reset Category select to first option

      // Reset month input
      document.getElementById('fileMonth').value = ''; // Clear Date input
      
      // Clear radio buttons
      const radioButtons = document.querySelectorAll('input[name="fileStatus"]');
      radioButtons.forEach((radio) => {
          radio.checked = false; // Uncheck all radio buttons
      });
  });

  // Apply filter action
  document.getElementById('applyFilter').addEventListener('click', () => {
      // Add your filter logic here
      console.log("Apply filter clicked");
      togglePopUp(); // Close modal after applying filter
  });
});
