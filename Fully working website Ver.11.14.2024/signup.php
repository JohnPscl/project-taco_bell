<?php
session_start();

include("connection.php");
include("functions.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $first_name = $_POST['fname'];
    $last_name = $_POST['lname'];
    $email_address = $_POST['email'];
    $faculty_id = $_POST['user_id'];
    $password = $_POST['password'];

    if (!empty($first_name) && !empty($last_name) && !empty($email_address) && !empty($faculty_id) && !empty($password)) {
        $password_hashed = password_hash($password, PASSWORD_DEFAULT);

        $query = $con->prepare("INSERT INTO users (first_name, last_name, email_address, faculty_id, password) VALUES (?, ?, ?, ?, ?)");
        $query->bind_param("sssss", $first_name, $last_name, $email_address, $faculty_id, $password_hashed);

        if ($query->execute()) {
            header("Location: signin.php");
            die;
        } else {
            echo "Error: " . $query->error;
        }
    } else {
        echo "Please enter some valid information!";
    }
}
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Faculty Vault - Sign Up</title>

    <!--Favicon-->
    <link rel="icon" href="./Assets/Logo/engineering_logo.ico" type="image/x-icon">

    <!--Custom CSS link-->
    <link rel="stylesheet" href="./create-account/signup.css" />
  </head>
  <body>
    <div class="mid">
      <h1>
        Faculty <span class="light-weight">Vault</span>
      </h1>
    </div>
    <div class="form-wrapper">
      <div class="form-container">
        <div class="form-header">
          <h1>Create a new account</h1>
          <p>Secure your certificates today!</p>
        </div>
        <hr />
        <form id="signup-form" method="POST">
          <div class="name-fields">
            <input type="text" id="first_name" name="first_name" placeholder="First Name" required />
            <input type="text" id="last_name" name="last_name" placeholder="Last Name" required />
          </div>

          <div class="form-control">
            <input type="email" id="email_address" name = "email_address" placeholder="Email" required />
            <small class="error-msg" id="email-error"></small>
          </div>

          <div class="form-control">
            <input type="text" id="faculty_id" name="faculty_id" placeholder="Faculty ID" required />
            <small class="error-msg" id="ID-error"></small>
          </div>

          <div class="form-control">
            <input type="password" id="password" name="password" placeholder="Password" required />
            <small class="error-msg" id="password-error"></small>
          </div>

          <div class="terms">
            <p>Users who engage with Faculty Vault may have shared your contact information with us <a href="#">Learn more.</a></p>
            <p>By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a><br />
              You may receive email or SMS notifications, which you can opt out <br>
              of at any time.</p>
          </div>

          <div class="btn">
            <button type="submit">Sign Up</button>
          </div>

          <div class="alreadysign">
            <a href="signin.php" id="signInLink">Already have an account?</a>
          </div>          
        </form>
      </div>
    </div>
  </body>
  <script src="./create-account/signup.js"></script>
</html>
