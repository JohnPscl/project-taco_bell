// Ensure the hamburger element exists
const hamburger = document.querySelector('.hamburger');

// Hamburger menu animation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle("open");
    links.forEach(link => link.classList.toggle("fade"));
    hamburger.classList.toggle("toggle");
});

// Function to hide all text and reset vertical lines
function hideAllText(section) {
    document.querySelectorAll(`.${section} .text`).forEach(function(el) {
        el.classList.remove('visible');
    });
    document.querySelectorAll(`.${section} .vertical-line`).forEach(function(line) {
        line.style.height = '40px'; // Reset height for all vertical lines
    });
}

// Common function to show feature text and expand line for any section
function showFeature(section, featureNumber) {
    hideAllText(section); // Hide other texts in the specific section

    const line = document.querySelector(`.${section} .feature${featureNumber} .vertical-line`);
    const text = document.querySelector(`.${section} .text${featureNumber}`);

    line.style.height = '120px'; // Expand the line for the feature
    text.classList.add('visible'); // Show the corresponding text
}

// Update section calls to class selectors, since sections use IDs in HTML
function showStoreFeature1() { showFeature('store', 1); }
function showStoreFeature2() { showFeature('store', 2); }
function showStoreFeature3() { showFeature('store', 3); }

function showManageFeature1() { showFeature('manage', 1); }
function showManageFeature2() { showFeature('manage', 2); }
function showManageFeature3() { showFeature('manage', 3); }

function showVisibilityFeature1() { showFeature('visibility', 1); }
function showVisibilityFeature2() { showFeature('visibility', 2); }
function showVisibilityFeature3() { showFeature('visibility', 3); }

function showSecurityFeature1() { showFeature('security', 1); }
function showSecurityFeature2() { showFeature('security', 2); }
function showSecurityFeature3() { showFeature('security', 3); }

// Initialize default visibility on page load
document.addEventListener("DOMContentLoaded", function() {
    showFeature('store', 1); // Show the first feature of Store section by default
    showFeature('manage', 1); // Show the first feature of Manage section by default
    showFeature('visibility', 1); // Show the first feature of Visibility section by default
    showFeature('security', 1); // Show the first feature of Security section by default
});