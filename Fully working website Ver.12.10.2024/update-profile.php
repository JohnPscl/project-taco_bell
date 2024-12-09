<?php
// Include the database connection file
require_once 'database.php'; // Ensure you include your DB connection

// Start the session to access user ID
session_start();

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in.']);
    exit;
}

// Get the user ID from the session
$user_id = $_SESSION["user_id"];

// Get the updated profile data from the POST request
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$department = $_POST['department'] ?? '';

// Validate input fields
if (!$firstName || !$lastName || !$department) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit;
}

// Initialize profile picture filename variable
$newFileName = null;

// Check if a profile picture was uploaded
if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['profilePicture']['tmp_name'];
    $fileName = $_FILES['profilePicture']['name'];
    $fileSize = $_FILES['profilePicture']['size'];
    $fileType = $_FILES['profilePicture']['type'];

    // Set the target directory and file path
    $uploadDir = 'uploads/profile_pics/';
    $newFileName = $user_id . '_' . time() . '_' . $fileName; // Unique file name
    $uploadFile = $uploadDir . $newFileName;

    // Check file type (allow only image files)
    if (in_array($fileType, ['image/jpeg', 'image/png', 'image/gif'])) {
        // Move the uploaded file to the target directory
        if (!move_uploaded_file($fileTmpPath, $uploadFile)) {
            echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid image type. Only JPEG, PNG, and GIF are allowed.']);
        exit;
    }
}

// Prepare the SQL update statement to save profile details (including profile picture)
$sql = "UPDATE user SET first_name = :firstName, last_name = :lastName, department = :department";
$params = [
    ':firstName' => $firstName,
    ':lastName' => $lastName,
    ':department' => $department,
    ':id' => $user_id,
];

if ($newFileName) {
    // Only add profile_picture field if an image was uploaded
    $sql .= ", profile_picture = :profilePicture";
    $params[':profilePicture'] = $newFileName;
}

$sql .= " WHERE id = :id";

// Prepare the statement
$stmt = $pdo->prepare($sql);

if ($stmt->execute($params)) {
    // If the update is successful, return the success response
    echo json_encode(['success' => true, 'profilePicture' => $newFileName]);
} else {
    // If the update failed, return the error message
    echo json_encode(['success' => false, 'error' => 'Failed to update profile.']);
}
?>
