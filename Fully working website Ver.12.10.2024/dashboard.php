<?php
session_start();
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Include the database connection file
require_once 'database.php';

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    header("Location: signin.php");
    exit;
}

// Retrieve the logged-in user's details from the database
$user_id = $_SESSION["user_id"];
$stmt = $pdo->prepare("SELECT * FROM user WHERE id = :user_id");
$stmt->bindParam(":user_id", $user_id);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$user) {
    echo "User not found.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Faculty Vault</title>


<!-- Bootstrap CSS -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
<link href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.4/css/boxicons.min.css" rel="stylesheet">
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="dashboard/dashboard.css" />
<link rel="stylesheet" href="dashboard/modal.css" />
<link rel="stylesheet" href="dashboard/account-settings.css" />
<link rel="stylesheet" href="dashboard/editprofile.css" />


    
  </head>
  <body>

    <!-- Navbar -->
    <nav class="navbar">

      <div class="main-content1">
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
        <img src="Assets/Logo/engineering_logo.ico" alt="Logo" >
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
            <a href="#contentMain" class="nav_link" id="myVaultLink">
              <span class="navlink_icon"><i class="bx bx-home-alt"></i></span>
              <span class="navlink">My Vault</span>
            </a>
          </li>
            <li class="item">
                <a href="#contentMain1" class="nav_link" id="myFavorites">
                    <span class="navlink_icon"><i class="bx bx-star"></i></span>
                    <span class="navlink">Favorites</span>
                </a>
            </li>
            <li class="item">
                <a href="#contenMain2" class="nav_link" id="myTrash">
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
                  <a href="#EditProfile" class="nav_link sublink" id="editProfileLink">Edit Profile</a>
                  <a href="#AccountSetting" class="nav_link sublink" id="accountSettingLink">Account Setting</a>
                </ul>
            </li>
        </ul>
      </div>

      <div class="bottom_content">
          <div class="bottom" onclick="toggleDropUp()">
              <div class="user-info">
                  <img class="user-img" src="dashboard/Icons/user.png" />
                  <div class="user-name"><?= htmlspecialchars($user['first_name']) ?> <?= htmlspecialchars($user['last_name']) ?>
              </div>
              <div class="arrow-pos">
                  <i class="bx bx-chevron-up arrow-up"></i>
              </div>
          </div>
          <div class="drop-up" id="drop-up">
              <a href="logout.php" id="signOutBtn" class="logout-link">Sign Out
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

    <!-- Form for file upload -->
    <form action="save_file.php" id="uploadForm" method="POST" enctype="multipart/form-data">

      <!-- File Input Section -->
      <input type="file" name="file" id="fileInput" style="display: none;" accept=".pdf" />
      <label for="fileInput" class="choose-file-btn">Choose File</label>
      <span class="file-chosen-text">No file chosen</span>
      <span class="remove-file-btn" style="display: none;">&times;</span> 

      <!-- Event Name Input Field -->
      <div class="modal-field">
        <label for="eventName" class="modal-label">Event Name</label>
        <div class="input-icon">
          <i class="fas fa-file-alt"></i>
          <input type="text" name="eventName" id="eventName" placeholder="Event Name" class="modal-input modal-input-icon"/>
        </div>
      </div>

      <!-- Category and Sub-Category Fields -->
      <div class="modal-fields-row">
        <div class="modal-field">
          <label for="category" class="modal-label">Category</label>
          <select name="category" id="category" class="modal-input">
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

        <div class="modal-field">
          <label for="subCategory" class="modal-label">Sub Category</label>
          <select name="subCategory" id="subCategory" class="modal-input">
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

      <!-- Subsidy and Date Fields -->
      <div class="modal-fields-row">
        <div class="modal-field">
          <label for="subsidy" class="modal-label">Subsidy</label>
          <select name="subsidy" id="subsidy" class="modal-input">
            <option value="">Select</option>
            <option value="conference">Full Subsidy</option>
            <option value="training">Non-Subsidy</option>
            <option value="seminar">Partial Subsidy</option>
          </select>
        </div>

        <div class="modal-field">
          <label for="date" class="modal-label">Date</label>
          <input type="date" name="date" id="date" class="modal-input"/>
        </div>
      </div>

      <!-- Location Field -->
      <div class="modal-field">
        <label for="location" class="modal-label">Location</label>
        <div class="input-icon">
          <i class="fas fa-map-marker-alt"></i> 
          <input type="text" name="location" id="location" placeholder="City" class="modal-input modal-input-icon"/>
        </div>
      </div>

      <!-- Modal Buttons -->
      <div class="modal-buttons">
        <button type="button" id="cancelNewItem" class="cancel-btn">Cancel</button>
        <button type="submit" id="saveNewItem" class="modal-btn">Save</button>
      </div>
    </form>
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

  <!-- Restore Modal -->
  <div id="restoreModal" class="modal-restore">
    <div class="modal-content">
      <span class="close-btn-restore">&times;</span>
      <h2>Restore File</h2>
      <p>Are you sure you want to restore this file?</p>
      <div class="modal-actions">
        <button id="confirmRestore">Restore</button>
        <button id="cancelRestore" class="cancel-btn-restore">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Delete Permanently Modal -->
  <div id="deleteModal" class="modal-delete-perm">
    <div class="modal-content">
      <span class="close-btn-delete-perm">&times;</span>
      <h2>Delete Permanently</h2>
      <p>Are you sure you want to delete this file permanently?</p>
      <div class="modal-actions">
        <button id="confirmDelete">Delete</button>
        <button id="cancelDelete" class="cancel-btn-delete-perm">Cancel</button>
      </div>
    </div>
  </div>




  <!-- Edit Profile Section -->
<div class="main-content">
    <div id="editProfileSection" class="edit-profile-section" style="display: none;">
      
      <h2 class="page-title">Faculty Information</h2>
      <p class="page-tagline">Review and update your information to enhance your experience</p>
  
      <div class="profile-edit-container1">
        <div class="form-fields-container1">
            <div class="profile-picture-section1">
                <div class="profile-picture-preview1">
                    <!-- Display the current profile image or a default image -->
                    <img id="profileImagePreview" src="uploads/profile_pics/<?= htmlspecialchars($user['profile_picture']) ?>" class="profilepic1" alt="Profile Preview" />
                    <label for="profilePicture" class="image-hover-label">Change Image</label>
                </div>
                <div class="upload-container">
                    <!-- File input to select an image -->
                    <input type="file" id="profilePicture" accept="image/*" onchange="previewImage(event); uploadProfilePicture();" class="upload-input" />
                </div>
            </div>
        
            <div class="form-fields1">
              <div class="modal-field1 input-group2">
                  <label for="user-name" class="modal-label1">
                      <?= htmlspecialchars($user['first_name']) ?> <?= htmlspecialchars($user['last_name']) ?>
                  </label>
                  <input type="text" id="user-name" class="modal-input1" disabled />
              </div>
            </div>
        </div>
      </div>

    
    
    
    <div class="profile-container">
      <div class="profile-header">
      <h2>Profile Details</h2>
        <button id="editButton" onclick="toggleEditing()">Edit</button>
      </div>

      <div class="form-row2">
      <div class="modal-field2">
          <label for="firstName" class="modal-label2">First Name</label>
          <input type="text" id="firstName" class="modal-input2" value="<?= htmlspecialchars($user['first_name']) ?>" disabled />
      </div>
      <div class="modal-field2">
          <label for="lastName" class="modal-label2">Last Name</label>
          <input type="text" id="lastName" class="modal-input2" value="<?= htmlspecialchars($user['last_name']) ?>" disabled />
      </div>
      </div>

      <div class="form-row2">
          <div class="modal-field2">
              <label for="email" class="modal-label2">Email Address</label>
              <input type="email" id="email" class="modal-input2" value="<?= htmlspecialchars($user['email']) ?>" disabled />
          </div>
          <div class="modal-field2">
              <label for="facultyID" class="modal-label2">Faculty ID</label>
              <input type="text" id="facultyID" class="modal-input2" value="<?= htmlspecialchars($user['faculty_id']) ?>" disabled />
          </div>
      </div>

      <div class="modal-field2">
        <label for="departmentText" class="modal-label2">Department</label>
        <input type="text" id="departmentText" class="modal-input2" value="<?= htmlspecialchars($user['department']) ?>" disabled style="width: 40%;" />

        <!-- Dropdown for editing department -->
        <select id="departmentDropdown" class="modal-input2" style="display: none; width: 40%;">
        <option value="Civil Engineering" <?= $user['department'] === 'Civil Engineering' ? 'selected' : '' ?>>Civil Engineering</option>
        <option value="Computer Engineering" <?= $user['department'] === 'Computer Engineering' ? 'selected' : '' ?>>Computer Engineering</option>
        <option value="Electrical Engineering" <?= $user['department'] === 'Electrical Engineering' ? 'selected' : '' ?>>Electrical Engineering</option>
        <option value="Mechanical Engineering" <?= $user['department'] === 'Mechanical Engineering' ? 'selected' : '' ?>>Mechanical Engineering</option>
        </select>
      </div>

      

        
      </div>
    
 

    </div>
    
      
      <!-- Save and Cancel Buttons -->
    
</div>
</div>

<!-- Account Settings Section -->
<div class="accountcontent" id="accountSettingsContent" style="display: none;">
  <h1 class="page-heading">Account Settings</h1>
  <hr class="divider">
  <h2 class="page-title">Security</h2>
  <p class="page-tagline">Recommendations to enhance the security of your account</p>
  <div class="big-rectangle">
    <div class="account-title">Signing In</div>
    <div class="account-description">
      Keep your access to your account seamless by regularly updating this information.
    </div>
    <div class="account-buttons">
    <div class="account-button" data-editable="email" data-bs-toggle="modal" data-bs-target="#emailModal">
        <span>Email</span>
        <span class="user-email editable-field"><?= htmlspecialchars($user['email']) ?></span>
        <i class="bx bx-chevron-right arrow-left-2"></i>
    </div>
    <div class="account-button" data-editable="password" data-bs-toggle="modal" data-bs-target="#passwordModal">
        <span>Password</span>
        <span class="user-password editable-field">****************</span>
        <i class="bx bx-chevron-right arrow-left-2"></i>
    </div>
    <div class="account-button" data-editable="faculty_id" data-bs-toggle="modal" data-bs-target="#facultyIdModal">
        <span>Faculty ID</span>
        <span class="user-id editable-field"><?= htmlspecialchars($user['faculty_id']) ?></span>
        <i class="bx bx-chevron-right arrow-left-2"></i>
    </div>
</div>
  </div>
</div>

<!-- Email Modal -->
<div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="emailModalLabel">Update Email</h5>
        <button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <label for="emailInput" class="form-label">New Email</label>
        <input type="email" class="form-control" id="emailInput" value="">
      </div>
      <div class="modal-body">
        <label for="emailConfirmInput" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="emailConfirmInput">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="confirmEmailBtn">Confirm</button>
      </div>
    </div>
  </div>
</div>


<!-- Password Modal -->
<div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passwordModalLabel">Change Password</h5>
        <button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
          <label for="oldPasswordInput" class="form-label">Old Password</label>
          <input type="password" class="form-control" id="oldPasswordInput">
      </div>
      <div class="modal-body">
          <label for="newPasswordInput" class="form-label">New Password</label>
          <input type="password" class="form-control" id="newPasswordInput">
      </div>
      <div class="modal-body">
          <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="confirmPasswordInput">
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="confirmPasswordBtn">Confirm</button>
      </div>
    </div>
  </div>
</div>
  
<!-- Faculty ID Modal -->
<div class="modal fade" id="facultyIdModal" tabindex="-1" aria-labelledby="facultyIdModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="facultyIdModalLabel">Faculty ID</h5>
        <button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Close">
          &times;
        </button>
      </div>
      <div class="modal-body1">
        <label for="newFacultyIdInput" class="form-label">New Faculty ID</label>
        <input type="text" class="form-control" id="newFacultyIdInput" value="">
      </div>
      <div class="modal-body1">
        <label for="confirmFacultyIdInput" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmFacultyIdInput">
      </div>
      <div class="modal-footer1">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="confirmFacultyIdBtn">Confirm</button>
      </div>
    </div>
  </div>
</div>


<!-- Trash Confirmation Modal -->
<div id="trashModal" class="modal-trash">
  <div class="modal-content-trash">
    <span class="close-btn-trash">&times;</span>
    <p>Are you sure you want to move this file to the trash?</p>
    <button id="confirmTrash" class="btn-trash btn-trash-danger">Move to Trash</button>
    <button id="cancelTrash" class="btn-trash btn-trash-secondary">Cancel</button>
  </div>
</div>

<!-- File Information Modal -->
<div class="modal-info">
  <div class="modal-content-info">
    <span class="close-btn-info">&times;</span>
    <h2 class="modal-info-title">File Information</h2>
    <div class="file-info-details">
      <!-- File information will be dynamically added here -->
    </div>
    <button class="edit-file-info">Edit</button>
  </div>
</div>








<!-- Content Section -->
<div class="contentMain" id="contentMain">
  <h1 class="page-heading">Welcome, <?= htmlspecialchars($user['first_name']) ?></h1>
  <hr class="divider">

  <div class="card-container" id="card-container">
     
    <!-- Card 1 -->
    <div class="card"  data-card-id="card-1"  style="display: none" data-pdf-src="" ondblclick="openModalOnAnotherPage(this.dataset.pdfSrc)">
      <div class="card-header" data-pdf-src="" style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-file file-icon"></i>
          <h3 class="card-title">UNTITLED</h3>
        </div>
        <div class="icon-group">
          <!-- Star Icon -->
          <a class="bx bx-star icon" title="Add to Favorites" onclick="toggleStarColor(this)"></a>
          <!-- Trash Icon -->
          <a class="bx bx-trash icon" title="Move to Trash" onclick="openTrashModal(this)"></a>
          <!-- Info Icon -->
          <a class="bx bx-info-circle icon" title="File Information" onclick="openFileInfoModal(this)"></a>
        </div>
      </div>
      <div class="pdf-container">
        <iframe src="" type="application/pdf" class="pdf-iframe"></iframe>
      </div>
    </div>
    <div class="undo-button" id="undoLink" style="display: none;">
      <span>File moved to trash</span>
      <button id="undoButton" onclick="undoTrashAction()">Undo</button>
      <span id="closeButton"class="close-btn-undo" onclick="closeUndoButton()">&times;</span>
    </div>
  
  </div>
  
  
  

</div>


<!-- Content Section Favorites -->
<div class="contentMain1" id="contentMain1"  style="display: none;">
  <h1 class="page-heading">Favorites</h1>
  <hr class="divider1">

  <div class="card-container1" id="favorites-container" style="display: none;">
    
    
  </div>
</div>



<!-- Content Section Trash -->
<div class="contentMain2" id="contentMain2" style="display: none;">
  <h1 class="page-heading">Trash</h1>
  <hr class="divider2">
  <div class="card-container2" id="trash-container">


  </div>
</div>
  
  


<!-- JavaScript Files -->
<!-- Ensure Bootstrap JS and other dependencies are loaded first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- Your custom dashboard scripts go after -->
<script src="dashboard/dashboard.js"></script>
<script src="dashboard/modal.js"></script>
<script src="dashboard/account-settings.js"></script>
<script src="dashboard/editprofile.js"></script>

<script src="path/to/ajax.js"></script>
<script>
document.getElementById("confirmPasswordBtn").addEventListener("click", function() {
    var oldPassword = document.getElementById("oldPasswordInput").value;
    var newPassword = document.getElementById("newPasswordInput").value;
    var confirmPassword = document.getElementById("confirmPasswordInput").value;

    // Check if new password matches the confirm password
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match!");
        return;
    }

    // Send the password change request to the server via AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "change-password.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send the POST data (oldPassword, newPassword)
    xhr.send("oldPassword=" + oldPassword + "&newPassword=" + newPassword);

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                // Parse the JSON response
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert("Password changed successfully!");

                    // Bootstrap modal instance to hide the modal after success
                    var passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
                    passwordModal.hide();  // Close the modal

                    // Reload the page to reflect changes (optional)
                    window.location.reload();
                } else {
                    alert("Error: " + response.error);
                }
            } catch (e) {
                alert("Error: Invalid JSON response.");
            }
        } else {
            alert("Request failed. Please try again.");
        }
    };
});
document.getElementById("confirmEmailBtn").addEventListener("click", function() {
    var newEmail = document.getElementById("emailInput").value;
    var confirmPassword = document.getElementById("emailConfirmInput").value;

    // Validate the inputs
    if (!newEmail || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Send the email change request to the server via AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "change-email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send the POST data (newEmail, confirmPassword)
    xhr.send("newEmail=" + newEmail + "&confirmPassword=" + confirmPassword);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("Email updated successfully!");
                $('#emailModal').modal('hide');  // Close the modal after successful update
                window.location.reload(); // Reload the page to reflect changes
            } else {
                alert("Error: " + response.error);
            }
        } else {
            alert("Request failed. Please try again.");
        }
    };
});
document.getElementById("confirmFacultyIdBtn").addEventListener("click", function() {
    var newFacultyId = document.getElementById("newFacultyIdInput").value;
    var confirmPassword = document.getElementById("confirmFacultyIdInput").value;

    // Validate the inputs
    if (!newFacultyId || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Send the faculty ID change request to the server via AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "change-faculty-id.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send the POST data (newFacultyId, confirmPassword)
    xhr.send("newFacultyId=" + newFacultyId + "&confirmPassword=" + confirmPassword);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("Faculty ID updated successfully!");
                $('#facultyIdModal').modal('hide');  // Close the modal after successful update
                window.location.reload(); // Reload the page to reflect changes
            } else {
                alert("Error: " + response.error);
            }
        } else {
            alert("Request failed. Please try again.");
        }
    };
});
// Function to toggle between editing and viewing mode
function toggleEditing() {
    const departmentText = document.getElementById('departmentText');
    const departmentDropdown = document.getElementById('departmentDropdown');
    const firstNameField = document.getElementById('firstName');
    const lastNameField = document.getElementById('lastName');
    const editButton = document.getElementById('editButton');

    // Toggle edit mode
    if (departmentDropdown.style.display === 'none') {
        // Enable fields for editing
        firstNameField.disabled = false;
        lastNameField.disabled = false;
        departmentText.style.display = 'none';
        departmentDropdown.style.display = 'inline-block';
        departmentDropdown.disabled = false;
        editButton.textContent = 'Save';
    } else {
        // Get updated values
        const selectedDepartment = departmentDropdown.value;
        const updatedFirstName = firstNameField.value;
        const updatedLastName = lastNameField.value;

        // Send the updated values to the server
        const formData = new FormData();
        formData.append('department', selectedDepartment);
        formData.append('firstName', updatedFirstName);
        formData.append('lastName', updatedLastName);

        fetch('update-profile.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update the text field with the new department
                    departmentText.value = selectedDepartment;
                    alert('Profile updated successfully!');
                } else {
                    alert('Failed to update profile: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });

        // Switch back to non-editable mode
        firstNameField.disabled = true;
        lastNameField.disabled = true;
        departmentDropdown.style.display = 'none';
        departmentText.style.display = 'inline-block';
        departmentDropdown.disabled = true;
        editButton.textContent = 'Edit';
    }
}

// Function to send the updated data to the backend via AJAX
function updateProfileData() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const department = document.getElementById('departmentDropdown').style.display === 'none' 
        ? document.getElementById('departmentText').value
        : document.getElementById('departmentDropdown').value;

    // Prepare the data to send to the server
    const data = new FormData();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('department', department);

    // Make the AJAX request to the PHP backend
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'update-profile.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('Profile updated successfully!');
                // Update the values shown in the profile view (if needed)
                document.getElementById('firstName').value = firstName;
                document.getElementById('lastName').value = lastName;
                document.getElementById('departmentText').value = department;
                // Optionally disable the fields again
                toggleEditing();
            } else {
                alert('Failed to update profile: ' + response.error);
            }
        } else {
            alert('Error with the request.');
        }
    };
    xhr.send(data);
}


function uploadProfilePicture() {
    const formData = new FormData();
    const fileInput = document.getElementById('profilePicture');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const department = document.getElementById('departmentDropdown').value;

    // Add form data fields
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('department', department);

    // Only add the profile picture if a file is selected
    if (fileInput.files.length > 0) {
        formData.append('profilePicture', fileInput.files[0]);
    }

    // Send the form data to the server via AJAX
    fetch('update-profile.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
            // Update the image preview if a new image was uploaded
            if (data.profilePicture) {
                document.getElementById('profileImagePreview').src = 'uploads/profile_pics/' + data.profilePicture;
            }
        } else {
            alert('Failed to update profile: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the profile.');
    });
}

// Save button functionality
document.getElementById("saveNewItem").addEventListener("click", function () {
  const file = fileInput.files[0];
  const eventName = document.getElementById("fileLocation").value;
  const category = document.getElementById("fileCategory").value;
  const subCategory = document.getElementById("fileSubCategory").value;
  const subsidy = document.getElementById("fileSubsidy").value;
  const date = document.getElementById("fileDate").value;
  const location = document.getElementById("fileLocation").value;

  // Check if file is selected and form fields are filled
  if (!file) {
    alert("Please choose a file to upload.");
    return;
  }
  if (!eventName || !category || !subCategory || !subsidy || !date || !location) {
    alert("Please fill out all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("eventName", eventName);
  formData.append("category", category);
  formData.append("subCategory", subCategory);
  formData.append("subsidy", subsidy);
  formData.append("date", date);
  formData.append("location", location);

  // Send data to server via AJAX
  fetch("upload_file.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("File uploaded successfully!");
        // Close the modal after successful upload (optional)
        document.getElementById("newModal").style.display = "none";
      } else {
        alert("Error uploading file: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong, please try again.");
    });
});

  </body>
</html>
