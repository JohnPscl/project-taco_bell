<?php
// Include the database connection file
require_once 'database.php';

// Start the session to access user ID
session_start();

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in.']);
    exit;
}

// Get the user ID from the session
$user_id = $_SESSION["user_id"];

// Get the new email and password from the POST request
$newEmail = $_POST['newEmail'];
$confirmPassword = $_POST['confirmPassword'];

// Validate input (ensure non-empty values)
if (empty($newEmail) || empty($confirmPassword)) {
    echo json_encode(['success' => false, 'error' => 'Please fill out both fields.']);
    exit;
}

// Query the database to get the current password of the user
$sql = "SELECT password FROM user WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
$stmt->execute();

// Fetch the current password
$currentPassword = $stmt->fetchColumn();

// Check if the provided password matches the current password
if (!password_verify($confirmPassword, $currentPassword)) {
    echo json_encode(['success' => false, 'error' => 'Incorrect password.']);
    exit;
}

// Validate the new email format
if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email format.']);
    exit;
}

// Update the email in the database
$updateSql = "UPDATE user SET email = :newEmail WHERE id = :id";
$updateStmt = $pdo->prepare($updateSql);
$updateStmt->bindParam(':newEmail', $newEmail, PDO::PARAM_STR);
$updateStmt->bindParam(':id', $user_id, PDO::PARAM_INT);

if ($updateStmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to update email.']);
}
