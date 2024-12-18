<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Vault - Forgot Password</title>

    <!--Favicon-->
    <link rel="icon" href="./Assets/Logo/engineering logo.ico" type="image/x-icon">
    
    <!--Custom CSS link-->
    <link rel="stylesheet" href="forgot-assets/forgotpass.css">
</head>
<body>
    <div class="container">
        <div class="left">
            <h1>Forgot <span class="light-weight">Password?</span></h1>
            <h2>Don’t worry, we’ve got you covered</h2>
            <p>Provide your details to reset your password <br> and get back to your account.</p>
        </div>
        <div class="right">
            <div class="form">
                <form id="reset-password-form"> <!-- Add form tag -->
                    <!-- Email Input -->
                    <div class="form-group">
                        <input type="email" id="email" placeholder=" " autocomplete="off" required>
                        <label for="email">Email <span id="emailError" class="error-msg" style="display: none; color: red;"></span></label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="faculty" placeholder=" " autocomplete="off" required>
                        <label for="faculty">Faculty ID <span id="facultyError" class="error-msg" style="display: none; color: red;"></span></label>
                    </div>
                    <div class="form-group">
                        <input type="password" id="new1password" placeholder=" " autocomplete="off" required>
                        <label for="new1password">New Password <span id="newpasswordError" class="error-msg" style="display: none; color: red;"></span></label>
                    </div>
                    <div class="form-group">
                        <input type="password" id="confirmpassword" placeholder=" " autocomplete="off" required>
                        <label for="confirmpassword">Confirm Password <span id="confimartionpasswordError" class="error-msg" style="display: none; color: red;"></span></label>
                    </div>
                    <!-- Reset Password Button -->
                    <button type="" class="login-btn">Reset Password</button> <!-- Change type to submit -->
                </form>
                <!-- Create New Account Section -->
                <div class="create">
                    <a href="signin.php">
                        Sign in with password</a>
                </div>
            </div>
        </div>
    </div>
    <script src="forgot-assets/forgotpass.js"></script>
</body>
</html>
