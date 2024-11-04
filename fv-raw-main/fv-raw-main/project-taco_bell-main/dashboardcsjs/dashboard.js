const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");

sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));



darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

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



  // Select the navbar and sections
  const navbar = document.querySelector(".navbar");
  const editProfileLink = document.getElementById('editProfileLink');
  const editProfileSection = document.getElementById('editProfileSection');
  const accountSettingLink = document.getElementById('accountSettingLink');
  const accountSettingsContent = document.getElementById('accountSettingsContent');
  const sidebarLinks = document.querySelectorAll('.nav_link'); // Select all sidebar links

  // Function to disable sidebar links
  function disableSidebarLinks() {
    sidebarLinks.forEach(link => {
      link.classList.add('block'); // Add a disabled class
      link.style.pointerEvents = 'visible'; // Disable click events
    });
  }

  // Function to enable sidebar links
  function enableSidebarLinks() {
    sidebarLinks.forEach(link => {
      link.classList.remove('block'); // Remove the disabled class
      link.style.pointerEvents = 'visible'; // Enable click events
      link.style.color = ''; // Reset color
    });
  }

  // Function to toggle visibility of sections
  function toggleSection(sectionToShow) {
    if (editProfileSection.style.display === "block" || accountSettingsContent.style.display === "block") {
      return; // Prevent navigation if already in one of the sections
    }

    if (sectionToShow === "editProfile") {
      editProfileSection.style.display = "block"; // Show the Edit Profile section
      navbar.style.display = "none"; // Hide the navbar
      disableSidebarLinks(); // Disable sidebar links
    } else if (sectionToShow === "accountSettings") {
      accountSettingsContent.style.display = "block"; // Show the Account Settings section
      navbar.style.display = "none"; // Hide the navbar
      disableSidebarLinks(); // Disable sidebar links
    }
  }

  // Toggle Edit Profile Section and Navbar Visibility
  editProfileLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action
    toggleSection("editProfile");
  });

  // Add a cancel button to return to the previous state
  const cancelEditProfileBtn = document.getElementById('cancelEditProfile');
  cancelEditProfileBtn.addEventListener('click', function () {
    editProfileSection.style.display = "none"; // Hide the Edit Profile section
    navbar.style.display = "flex"; // Show the navbar again
    enableSidebarLinks(); // Enable sidebar links again
  });

  const saveEditProfileBtn = document.getElementById('saveEditProfile');
  saveEditProfileBtn.addEventListener('click', function () {
    // You can add any logic here to save the profile changes if needed
    editProfileSection.style.display = "none"; // Hide the Edit Profile section
    navbar.style.display = "flex"; // Show the navbar again
    enableSidebarLinks(); // Enable sidebar links again
  });

  // Toggle Account Settings Section and Navbar Visibility
  accountSettingLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action
    toggleSection("accountSettings");
  });

  // Add a cancel button for Account Settings
  const cancelEditProfileBtn1 = document.getElementById('cancelEditProfile1');
  cancelEditProfileBtn1.addEventListener('click', function () {
    accountSettingsContent.style.display = "none"; // Hide the Account Settings section
    navbar.style.display = "flex"; // Show the navbar again
    enableSidebarLinks(); // Enable sidebar links again
  });

  const saveEditProfileBtn1 = document.getElementById('saveEditProfile1');
  saveEditProfileBtn1.addEventListener('click', function () {
    // Add any logic here to save the profile changes if needed
    accountSettingsContent.style.display = "none"; // Hide the Account Settings section
    navbar.style.display = "flex"; // Show the navbar again
    enableSidebarLinks(); // Enable sidebar links again
  });

  function updateBreadcrumb(subsection) {
    document.getElementById('currentSubsection').textContent = subsection;
  }

  // For the initial state
  document.getElementById('currentSubsection').textContent = 'Home'; // Default state when not in a subsection
