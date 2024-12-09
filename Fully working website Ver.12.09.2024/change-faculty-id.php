<?php
// Include the database connection file
require_once 'database.php';  // Ensure this is included at the top

// Start the session to access user ID
session_start();

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in.']);
    exit;
}

// Get the user ID from the session
$user_id = $_SESSION["user_id"];

// Get the new faculty ID and confirm password from the POST request
$newFacultyId = $_POST['newFacultyId'];
$confirmPassword = $_POST['confirmPassword'];

// Validate input (ensure non-empty values)
if (empty($newFacultyId) || empty($confirmPassword)) {
    echo json_encode(['success' => false, 'error' => 'Please fill out all fields.']);
    exit;
}

// Query the database to get the current password of the user
$sql = "SELECT password FROM user WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
$stmt->execute();

// Fetch the current password
$currentPassword = $stmt->fetchColumn();

// Check if the confirm password matches the current password
if (!password_verify($confirmPassword, $currentPassword)) {
    echo json_encode(['success' => false, 'error' => 'Incorrect password.']);
    exit;
}

// Update the faculty_id in the database
$updateSql = "UPDATE user SET faculty_id = :newFacultyId WHERE id = :id";
$updateStmt = $pdo->prepare($updateSql);
$updateStmt->bindParam(':newFacultyId', $newFacultyId, PDO::PARAM_STR);
$updateStmt->bindParam(':id', $user_id, PDO::PARAM_INT);

if ($updateStmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to update faculty ID.']);
}
?>
