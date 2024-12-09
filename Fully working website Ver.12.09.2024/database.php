<?php
// database.php

$host = 'localhost'; // Database host (use your own host if different)
$dbname = 'faculty_account'; // Your database name
$username = 'root'; // Database username (default for XAMPP is root)
$password = ''; // Database password (default for XAMPP is empty)

try {
    // Create a PDO instance (Database connection)
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception for better error handling
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // If connection fails, display an error
    die("Connection failed: " . $e->getMessage());
}
?>
