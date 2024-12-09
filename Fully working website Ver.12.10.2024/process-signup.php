<?php
// Include the database connection
$mysqli = require __DIR__ . "/database.php";

// Get form inputs
$first_name = $_POST['first_name'] ?? null;
$last_name = $_POST['last_name'] ?? null;
$email = $_POST['email'] ?? null;
$faculty_id = $_POST['faculty_id'] ?? null;
$password = $_POST['password'] ?? null;

// Check if all fields are filled
if (!$first_name || !$last_name || !$email || !$faculty_id || !$password) {
    die("All fields are required.");
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

// Hash the password for security
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare the SQL statement to prevent SQL injection
$sql = "INSERT INTO user (first_name, last_name, email, faculty_id, password) 
        VALUES (?, ?, ?, ?, ?)";

$stmt = $mysqli->prepare($sql);

if (!$stmt) {
    die("SQL error: " . $mysqli->error);
}

// Bind parameters and execute the statement
$stmt->bind_param("sssss", $first_name, $last_name, $email, $faculty_id, $hashed_password);

if ($stmt->execute()) {
    // Successful signup
    echo "Sign-up successful!";
    header("Location: signin.php"); // Redirect to the sign-in page
    exit();
} else {
    // Handle duplicate entry error
    if ($mysqli->errno === 1062) {
        die("Error: Email or Faculty ID already exists.");
    } else {
        die("Error: " . $mysqli->error);
    }
}

// Close the statement
$stmt->close();

// Close the database connection
$mysqli->close();
?>
