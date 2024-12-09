<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "faculty_account";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Debugging: Dump $_FILES to check the file details
    var_dump($_FILES);
    exit; // Stop execution to check the output

    // Check if a file has been uploaded and if all necessary form fields are set
    if (isset($_FILES['file']) && isset($_POST['eventName'])) {

        // Retrieve form data
        $eventName = $_POST['eventName'];
        $category = $_POST['category'];
        $subCategory = $_POST['subCategory'];
        $subsidy = $_POST['subsidy'];
        $date = $_POST['date'];
        $location = $_POST['location'];
        
        // Handle the file upload
        $file = $_FILES['file'];
        $fileName = basename($file['name']);
        $fileTmpName = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];
        $fileType = $file['type'];

        // Additional debug info
        echo "File Name: " . $fileName . "<br>";
        echo "File Size: " . $fileSize . "<br>";
        echo "File Error: " . $fileError . "<br>";
        echo "File Type: " . $fileType . "<br>";

        // Check if the file was uploaded without error
        if ($fileError !== 0) {
            echo json_encode(['success' => false, 'message' => 'File upload error: ' . $fileError]);
            exit;
        }
        
        // Validate file type (only allow PDF files)
        if ($fileType != 'application/pdf') {
            echo json_encode(['success' => false, 'message' => 'Only PDF files are allowed.']);
            exit;
        }

        // Define the upload directory
        $uploadDir = 'uploads/';

        // Check if the uploads directory exists, if not create it
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Generate a unique file name to avoid overwriting
        $uniqueFileName = uniqid('', true) . "_" . $fileName;
        $uploadPath = $uploadDir . $uniqueFileName;

        // Move the uploaded file to the target directory
        if (!move_uploaded_file($fileTmpName, $uploadPath)) {
            echo json_encode(['success' => false, 'message' => 'Failed to save the file.']);
            exit;
        }

        // Prepare the SQL query to insert the file details into the database
        $sql = "INSERT INTO files (event_name, category, sub_category, subsidy, date, location, file_name, file_path) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);

        // Check if the statement was prepared successfully
        if ($stmt === false) {
            echo json_encode(['success' => false, 'message' => 'Error preparing statement: ' . $conn->error]);
            exit;
        }

        // Bind parameters and execute the query
        $stmt->bind_param("ssssssss", $eventName, $category, $subCategory, $subsidy, $date, $location, $fileName, $uploadPath);

        // Execute the insert query
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'File uploaded successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error saving to database: ' . $stmt->error]);
        }

        // Close the prepared statement and the database connection
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or invalid file.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
// Return a proper JSON response
echo json_encode(['success' => false, 'message' => 'File upload error: ' . $_FILES['file']['error']]);
exit;

?>
