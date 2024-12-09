<?php
// Include the database connection file
require_once 'database.php';

// Start the session to access user ID
session_start();

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    header('Content-Type: application/json');  // Ensure JSON response
    echo json_encode(['success' => false, 'error' => 'User not logged in.']);
    error_log("User not logged in.");
    exit;
}

// Get the user ID from the session
$user_id = $_SESSION["user_id"];

// Get the old password and new password from the POST request
$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];

// Validate input (ensure non-empty values)
if (empty($oldPassword) || empty($newPassword)) {
    header('Content-Type: application/json');  // Ensure JSON response
    echo json_encode(['success' => false, 'error' => 'Please fill out both fields.']);
    error_log("Please fill out both fields.");
    exit;
}

// Query the database to get the current password of the user
$sql = "SELECT password FROM user WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
$stmt->execute();

// Fetch the current password
$currentPassword = $stmt->fetchColumn();

// Check if the old password matches the current password
if (!password_verify($oldPassword, $currentPassword)) {
    header('Content-Type: application/json');  // Ensure JSON response
    echo json_encode(['success' => false, 'error' => 'Incorrect old password.']);
    error_log("Incorrect old password.");
    exit;
}

// Hash the new password
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Update the password in the database
$updateSql = "UPDATE user SET password = :newPassword WHERE id = :id";
$updateStmt = $pdo->prepare($updateSql);
$updateStmt->bindParam(':newPassword', $hashedPassword, PDO::PARAM_STR);
$updateStmt->bindParam(':id', $user_id, PDO::PARAM_INT);

if ($updateStmt->execute()) {
    header('Content-Type: application/json');  // Ensure JSON response
    echo json_encode(['success' => true]);
    error_log("Password updated successfully.");
} else {
    header('Content-Type: application/json');  // Ensure JSON response
    echo json_encode(['success' => false, 'error' => 'Failed to update password.']);
    error_log("Failed to update password.");
}
?>
