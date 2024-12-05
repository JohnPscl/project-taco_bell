<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Vault - Sign in or Sign up</title>

    <!--Favicon-->
    <link rel="icon" href="<?php echo './Assets/Logo/engineering logo.ico'; ?>" type="image/x-icon">
    
    <!--Custom CSS Link-->
    <link rel="stylesheet" href="<?php echo './Sign-in-assets/sign-in.css'; ?>">
</head>
<body>  

    <!--Title-->
    <div class="container">
        <div class="left">
            <h1>Faculty <span class="light-weight">Vault</span></h1>
            <h2>Comprehensive Certificate Management Solutions.</h2>
        </div>

        <!--Form-->
        <div class="right">
            <div class="form">
                <form method="post" action="login.php">
                    <!-- Email Input -->
                    <div class="form-group">
                        <input type="text" id="email" name="email" placeholder=" " autocomplete="off" required>
                        <label for="email">Email <span id="emailError" class="error-msg" style="display: none; color: transparent;"></span></label>
                    </div>
                    <div class="form-group">
                        <input type="password" id="password" name="password" placeholder=" " autocomplete="off" required>
                        <label for="password">Password <span id="passwordError" class="error-msg" style="display: none; color: transparent;"></span></label>
                    </div>

                    <!-- Login Button -->
                    <button type="submit" class="login-btn">Sign In</button>
                </form>

                <div class="pass-link">
                    <a href="forgotpass.php" id="forgot-password-link">Forgot your Password?</a>
                </div>
                <br><br>
                <hr>
                <br>

                <!-- Create New Account Section -->
                <div class="create">
                    <a href="createacc.php" id="create-account-link">
                        <button type="button">Create new account</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <script src="<?php echo './Sign-in-assets/signin.js'; ?>"></script>
</body>
</html>
