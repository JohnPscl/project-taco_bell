<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Faculty Vault</title>

    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="dashboard/dashboard.css" />
    <link rel="stylesheet" href="dashboard/modal.css" />

    
  </head>
  <body>

    <!-- Navbar -->
    <nav class="navbar">

      <div class="main-content">
        <div class="search-container">
          <div class="search-bar">
            <input type="text" placeholder="Search...">
            <a href="#" class="clear-search">&times;</a> <!-- The X icon for clearing the search -->
            <button class="filter-btn" id="openFilter">
                <i class="bx bx-filter"></i>
            </button>
          </div>
        </div>
      </div>
      
    

    </nav>
 
    <!-- Sidebar -->
    <nav class="sidebar">
      <div class="logo_item">
        <img src="Assets/Logo/engineering logo.ico" alt="Logo" >
        <span>Faculty Vault</span>
    </div>
      <div>
          <a href="#" class="btn-link">
              <button class="new-btn" id="openNewModal">
                  <img src="dashboard/Icons/plus.png" alt="Plus Icon" class="btn-icon"> New
              </button>
          </a>
      </div>
  
      <div class="menu_content">
          <ul class="menu_items">
              <li class="item">
                  <a href="dashboard.php" class="nav_link" onclick="loadContent('myVault.php')">
                      <span class="navlink_icon"><i class="bx bx-home-alt"></i></span>
                      <span class="navlink">My Vault</span>
                  </a>
              </li>
              <li class="item">
                  <a href="#" class="nav_link" onclick="loadContent('favorites.php')">
                      <span class="navlink_icon"><i class="bx bx-star"></i></span>
                      <span class="navlink">Favorites</span>
                  </a>
              </li>
              <li class="item">
                  <a href="#" class="nav_link" onclick="loadContent('trash.php')">
                      <span class="navlink_icon"><i class="bx bx-trash"></i></span>
                      <span class="navlink">Trash</span>
                  </a>
              </li>
              <li class="item">
                  <div class="nav_link submenu_item">
                      <span class="navlink_icon"><i class="bx bx-cog"></i></span>
                      <span class="navlink">Settings</span>
                      <i class="bx bx-chevron-right arrow-left"></i>
                  </div>
                  <ul class="menu_items submenu">
                      <li><a href="personal-info.php" class="nav_link sublink" onclick="loadContent('personalInfo.php')">Personal Info</a></li>
                      <li><a href="account-settings.php" class="nav_link sublink" onclick="loadContent('accountSettings.php')">Account Settings</a></li>
                  </ul>
              </li>
          </ul>
      </div>

      <div class="bottom_content">
          <div class="bottom" onclick="toggleDropUp()">
              <div class="user-info">
                  <img class="user-img" src="dashboard/Icons/user.png" />
                  <div class="user-name">Ysa Bela</div>
              </div>
              <div class="arrow-pos">
                  <i class="bx bx-chevron-up arrow-up"></i>
              </div>
          </div>
          <div class="drop-up" id="drop-up">
              <a href="#" id="signOutBtn" class="logout-link">Sign Out
                  <i class="bx bx-log-out"></i>
              </a>
          </div>
      </div>
  </div>
</nav>



<!-- Modal for Filter -->
<div class="modal-filter">
  <div class="modal-filter-content">
    <span class="close-btn-filter">&times;</span> <!-- Close button -->
    <h2>Filter</h2>
    
    <div class="filter-container">
      <label for="fileName" class="filter-label">Event Name</label>
      <input type="text" id="fileName" placeholder="Enter a term that matches part of the file name" class="filter-input"/>
    </div>

    <div class="filter-container">
      <label for="fileCategory" class="filter-label">Category</label>
      <select id="fileCategory" class="filter-input short-input">
        <option value="">Select</option>
        <option value="colloquiums">Colloquiums</option>
        <option value="courses">Courses/Bootcamp</option>
        <option value="forum">Forum</option>
        <option value="lectures">Lectures</option>
        <option value="masterClasses">Masterclasses</option>
        <option value="mentorshipPrograms">Mentorship Programs</option>
        <option value="networkingEvents">Networking Events</option>
        <option value="webinar">Online Seminar (Webinar)</option>
        <option value="seminar">Onsite Seminar</option>
        <option value="roundTables">Round Tables/Panel Discussions</option>
        <option value="summits">Summits</option>
        <option value="symposiums">Symposiums</option>
        <option value="training">Training</option>
        <option value="workshop">Workshop</option>
        <option value="others">Others</option>
      </select>
    </div>

    <div class="filter-container">
      <label for="fileSubCategory" class="filter-label">Sub Category</label>
      <select id="fileSubCategory" class="filter-input short-input">
        <option value="">Select</option>
        <option value="webinar">Community Engagement</option>
        <option value="seminar">Educational Leadership</option>
        <option value="webinar">Educational Pedagogy</option>
        <option value="seminar">Personal Development</option>
        <option value="conference">Professional Development (Technical)</option>
        <option value="training">Professional Development (Non-Technical)</option>
        <option value="">Others</option>
      </select>
    </div>

    <div class="filter-container">
      <label for="fileSubsidy" class="filter-label">Subsidy</label>
      <select id="fileSubsidy" class="filter-input short-input">
        <option value="">Select</option>
        <option value="conference">Full Subsidy</option>
        <option value="training">Non-Subsidy</option>
        <option value="seminar">Partial Subsidy</option>
      </select>
    </div>
    

    <div class="filter-container">
      <label for="fileDateFrom" class="filter-label">Date</label>
      
      <!-- Date From -->
      <div class="date-range">
        <input type="month" id="fileDateFrom" placeholder="From" class="filter-input short-input" />
        <span class="date-separator">to</span>
        <input type="month" id="fileDateTo" placeholder="To" class="filter-input short-input" />
      </div>
    </div>
    

    <div class="filter-container">
      <label for="fileLocation" class="filter-label">Location</label>
      <input type="text" id="fileLocation" placeholder="Enter city" class="filter-input"/>
    </div>
  
    
    <div class="modal-buttons">
      <button id="resetFilter" class="reset-filter-btn">Reset</button>
      <button id="applyFilter" class="apply-filter-btn">Apply Filter</button>
    </div>
    
  </div>
</div>




<!-- New Modal -->
<div id="newModal" class="modal-new">
  <div class="modal-new-content">
    <span class="close-btn-new">&times;</span> <!-- close button -->
    <h2>Upload File</h2>

    
    
    <input type="file" id="fileInput" style="display: none;" accept=".pdf" />
    
    <label for="fileInput" class="choose-file-btn">Choose File</label>
    <span class="file-chosen-text">No file chosen</span>
    <span class="remove-file-btn" style="display: none;">&times;</span> 



    <!-- New Input Field -->
    <div class="modal-field">
      <label for="fileName" class="modal-label">Event Name</label>
      <div class="input-icon">
        <i class="fas fa-file-alt"></i>
        <input type="text" id="fileLocation" placeholder="Event Name" class="modal-input modal-input-icon"/>
      </div>
    </div>

    <!-- Name and Description Fields in the Same Row -->
    <div class="modal-fields-row">

    <!-- Name Field -->
      <div class="modal-field">
      <label for="fileCategory" class="modal-label">Category</label>
      <select id="fileCategory" class="modal-input">
        <option value="">Select</option>
        <option value="colloquiums">Colloquiums</option>
        <option value="courses">Courses/Bootcamp</option>
        <option value="forum">Forum</option>
        <option value="lectures">Lectures</option>
        <option value="masterClasses">Masterclasses</option>
        <option value="mentorshipPrograms">Mentorship Programs</option>
        <option value="networkingEvents">Networking Events</option>
        <option value="webinar">Online Seminar (Webinar)</option>
        <option value="seminar">Onsite Seminar</option>
        <option value="roundTables">Round Tables/Panel Discussions</option>
        <option value="summits">Summits</option>
        <option value="symposiums">Symposiums</option>
        <option value="training">Training</option>
        <option value="workshop">Workshop</option>
        <option value="others">Others</option>
      </select>
      </div>

    <!-- Description Field -->
    <div class="modal-field">
      <label for="fileSubCategory" class="modal-label">Sub Category</label>
      <select id="fileSubCategory" class="modal-input">
        <option value="">Select</option>
        <option value="webinar">Community Engagement</option>
        <option value="seminar">Educational Leadership</option>
        <option value="webinar">Educational Pedagogy</option>
        <option value="seminar">Personal Development</option>
        <option value="conference">Professional Development (Technical)</option>
        <option value="training">Professional Development (Non-Technical)</option>
        <option value="">Others</option>
      </select>
      </div>

    </div>

      <!-- Name and Description Fields in the Same Row -->
      <div class="modal-fields-row">

        <!-- Name Field -->
          <div class="modal-field">
          <label for="fileSubsidy" class="modal-label">Subsidy</label>
          <select id="fileSubsidy" class="modal-input">
            <option value="">Select</option>
            <option value="conference">Full Subsidy</option>
            <option value="training">Non-Subsidy</option>
            <option value="seminar">Partial Subsidy</option>
          </select>
          </div>
    
        <!-- Description Field -->
        <div class="modal-field">
          <label for="fileDate" class="modal-label">Date</label>
          <input type="date" id="fileDate" class="modal-input"/>
          </div>
    
        </div>


    <!-- New Input Field -->
    <div class="modal-field">
      <label for="fileLocation" class="modal-label">Location</label>
      <div class="input-icon">
        <i class="fas fa-map-marker-alt"></i> 
        <input type="text" id="fileLocation" placeholder="City" class="modal-input modal-input-icon"/>
      </div>
    </div>

    <!-- Buttons Container -->
    <div class="modal-buttons">
      <button id="cancelNewItem" class="cancel-btn">Cancel</button>
      <button id="saveNewItem" class="modal-btn">Save</button>
    </div>
  
  </div>
</div>



<!-- Quit Modal -->
<div id="quitModal" class="modal" style="display: none;">
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <p class="modal-message">Are you sure you want to sign out?</p>
    <button id="confirmQuit">Yes</button>
    <button id="cancelQuit">No</button>
  </div>
  </div>




<!-- Content Section -->
<!-- Content Section -->
<div class="content">
  <h1 class="page-heading">Welcome, Ysa</h1>
  <hr class="divider">

  <div class="card-container">
     
    <!-- Card 1 -->
    <div class="card" data-pdf-src="dashboard/Icons/Certificate.pdf" ondblclick="openModalOnAnotherPage(this.dataset.pdfSrc)">
      <div class="card-header">
        <i class="fas fa-file file-icon"></i>
        <h3 class="card-title">IOT CONFERENCE</h3>
        <i class="fas fa-ellipsis-v three-dots"></i>
      </div>
      <div class="pdf-container">
        <iframe src="dashboard/Icons/Certificate.pdf#toolbar=0" type="application/pdf" class="pdf-iframe"></iframe>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card" data-pdf-src="dashboard/Icons/Regaspe_Quiz.pdf" ondblclick="openModalOnAnotherPage(this.dataset.pdfSrc)">
      <div class="card-header">
        <i class="fas fa-file file-icon"></i>
        <h3 class="card-title">REGASPE QUIZ</h3>
        <i class="fas fa-ellipsis-v three-dots"></i>
      </div>
      <div class="pdf-container">
        <iframe src="dashboard/Icons/Regaspe_Quiz.pdf#toolbar=0" type="application/pdf" class="pdf-iframe"></iframe>
      </div>
    </div>

  </div>
</div>




<!-- JavaScript Files -->
<script src="dashboard/dashboard.js"></script>
<script src="dashboard/modal.js"></script>
<script src="dashboard/account-settings.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>


    
  </body>
</html>
