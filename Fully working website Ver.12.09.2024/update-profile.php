<?php
// Include the database connection file
require_once 'database.php'; // Make sure to include your DB connection

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
        if (move_uploaded_file($fileTmpPath, $uploadFile)) {
            // Successfully uploaded the image, now update the database with the new image name
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid image type. Only JPEG, PNG, and GIF are allowed.']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No image uploaded.']);
    exit;
}

// Prepare the SQL update statement to save profile details (including profile picture)
$sql = "UPDATE user SET first_name = :firstName, last_name = :lastName, department = :department";

if ($newFileName) {
    // Only add profile_picture field if an image was uploaded
    $sql .= ", profile_picture = :profilePicture";
}

$sql .= " WHERE id = :id";

// Prepare the statement
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':firstName', $firstName, PDO::PARAM_STR);
$stmt->bindParam(':lastName', $lastName, PDO::PARAM_STR);
$stmt->bindParam(':department', $department, PDO::PARAM_STR);
$stmt->bindParam(':id', $user_id, PDO::PARAM_INT);

if ($newFileName) {
    $stmt->bindParam(':profilePicture', $newFileName, PDO::PARAM_STR);
}

if ($stmt->execute()) {
    // If the update is successful, return the success response
    echo json_encode(['success' => true, 'profilePicture' => $newFileName]);
} else {
    // If the update failed, return the error message
    echo json_encode(['success' => false, 'error' => 'Failed to update profile.']);
}
?>
