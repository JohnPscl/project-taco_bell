<?php
session_start();

// Include the database connection file
require_once 'database.php';  // Ensure this is included at the top

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // Ensure the $pdo object is properly initialized and connected
    if (!$pdo) {
        echo "Database connection failed!";
        exit;
    }
    
    // Sanitize the email to prevent SQL injection
    $email = $pdo->quote($_POST["email"]);
    
    // Correct the query to select the user based on the email
    $sql = "SELECT * FROM user WHERE email = $email";  // 'user' is the correct table name here
    
    // Use the prepare method to prepare the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        // Verify the password
        if (password_verify($_POST["password"], $user["password"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["faculty_id"] = $user["faculty_id"];
            $_SESSION["department"] = $user["department"];
            $_SESSION["title"] = $user["title"];
            $_SESSION["email"] = $user["email"];
            $_SESSION["first_name"] = $user["first_name"];
            $_SESSION["last_name"] = $user["last_name"];
            
            // Redirect to the dashboard page
            header("Location: dashboard.php");
            exit;
        }
    }
    
    $is_invalid = true;
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Vault - Sign in or Sign up</title>

    <!--Favicon-->
    <link rel="icon" href="./Assets/Logo/engineering_logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="./Sign-in-assets/sign-in.css">
</head>
<body>
    <div class="container">
        <div class="left">
            <h1>Faculty <span class="light-weight">Vault</span></h1>
            <h2>Comprehensive Certificate Management Solutions.</h2>
        </div>

        <?php if ($is_invalid): ?>
            <p class="error-msg">Invalid email or password. Please try again.</p>
        <?php endif; ?>

        <form class="right" method="post">
            <div class="form">
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder=" " 
                           value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required>
                    <label for="email">Email</label>
                </div>
                <div class="form-group">
                    <input type="password" id="password" name="password" placeholder=" " autocomplete="off" required>
                    <label for="password">Password</label>
                </div>

                <button type="submit" class="login-btn">Sign In</button>
                <div class="pass-link">
                    <a href="forgotpass.php">Forgot your Password?</a>
                </div>
                <div class="create">
                    <a href="signup.php">
                        <button type="button">Create new account</button>
                    </a>
                </div>
            </div>
        </form>
    </div>
</body>
</html>
